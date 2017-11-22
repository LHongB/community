
const User = require('../model/User');
const Article = require('../model/Article');
// 数据验证模块，
const validator = require('validator');
const Dbset = require('../model/db');
const setting = require('../setting');
// const auth = require('../common/auth');
exports.index = (req,res,next) => {
    console.log(2111);
    Article.getFullArticles((err, articles) =>{
        if(err){
            return res.json({error:1,err});
        }
        res.json({error:0,articles})
    })
}
exports.indexs = (req,res,next) => {
    res.render('index',{
        title:'首页--微博',
        layout:'indexEJS'
    })
}
exports.indexr = (req,res,next) => {
    res.render('user',{
        title:'user',
        layout:'indexEJS'
    })
}
/* GET home page. */



