/**
 * Created by Administrator on 2017/11/11.
 */
const express = require('express');
const router = express.Router();
const setting = require('../setting');
const validator = require('validator');
const Article = require('../model/Article');
const User = require('../model/User');
// 导入消息通知机制
const at = require('../common/at');
const Reply = require('../model/Reply');
const saveMessage = require('../common/message');
const fs = require('fs');
var multer = require('multer')
var picture=[]
var storage = multer.diskStorage({
    destination:'public/uploads',
    filename: function (req, file, cb) {
        // console.log(req.params.id);
        var suffix = file.mimetype.split("/")[1];
        var fileName = file.fieldname + '-' + Date.now() + "." + suffix;
        picture.push('uploads/'+ fileName);
        cb(null,fileName);
        // cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
})
var upload = multer({ storage: storage })

router.post('/article',upload.array('photo',6),(req,res,next)=> {
    console.log(picture);
    console.log(req.body);
    req.body.picture=picture;
    console.log(req.body.picture);
    req.body.pics = req.body.picture;
    let content = validator.trim(req.body.content);
    let error;
    // console.log(req.session.user);
    req.body.author = req.session.user._id;
    let newObj = new Article(req.body);
    newObj.save().then((article) => {
        picture=[]
        User.getUserById(req.session.user._id,(err,user) => {
            if(err){
                return res.end(err);
            }
            user.score += 5;
            user.article_count += 1;
            user.save();
            req.session.user = user;
            at.sendAtMessage(content, article._id, req.session.user._id);
            res.json({error:0,article})
        }).catch((err) => {
            res.end(err);
        })
    })
})

module.exports = router;