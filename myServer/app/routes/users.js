
const User = require('../model/User');
const _ = require('lodash');
// 数据验证模块，
const validator = require('validator');
const Dbset = require('../model/db');
const setting = require('../setting');
const auth = require('../common/auth');
const Article = require('../model/Article');
const formidable = require('formidable')
const fs = require('fs')
//注册
exports.postZhuce = (req,res,next) => {
    // console.log(req.body);
    // 服务端进行数据验证
    let name = req.body.username;
    let password = req.body.pwd;
    let loadName = req.body.loadName;
    // 错误数据 / 验证失败的数据
    let error = '';
    if( !validator.matches(name,/^[\u4e00-\u9fff\w]{4,24}$/, 'g') ){
        error = '用户名不合法，以字母开头，数字、字母、_';
    }
    if( !validator.matches(password, /^[a-z0-9_-]{6,18}$/, 'g') ){
        error = '密码不合法，长度为5-11';
    }
    if( !validator.isEmail(loadName) ){
        error = '登录方式不合法'
    }
    if(error){
        return res.json({err:1,error});
    }
    // 判断用户是否存在  or([{},{}])多条件查找
    User.findOne().or([{username:name}, {loadName:loadName}]).then( (user) => {
        if(user){
            return res.json({err:1,msg:'用户名/呢称已存在'});
        }
        // 存储数据
        // 密码加密
        let newPsd = Dbset.encrypt(password, setting.PSDkey);
        req.body.password = newPsd;
        // console.log(req.body);
        Dbset.addOne(User, req, res, 'success');
        console.log('zhuce')
    }).catch((err) => {
        res.json({err:1,err});
    })
}
//登录
exports.postLogin = (req,res,next) => {
    // console.log(req.body);
    let name = req.body.loadName;
    let password = req.body.pwd;
    let error ;
    if( !validator.isEmail(name) ){
        error = '邮箱不合法'
    }
    if( !validator.matches(password, /^[a-z0-9_-]{6,18}$/, 'g') ){
        error = '密码不合法，长度为5-11';
    }
    if(error){
        return res.end(error);
    }
    console.log(name);
    User.getUserByEmail(name, (err, user) => {
        if(err){
            return res.json({err:1,err});
        }
         // console.log(user);
        if(!user){
            return res.json({err:1,msg:'用户/邮箱不存在，请注册...'});
        }
        //判断密码是否相等， 先加密
        let newPsd = Dbset.encrypt(password, setting.PSDkey);
        if( newPsd !== user.password ){
            return res.json({err:1,msg:'密码不相等，请重新输入'});
        }
        console.log(user);
        // 创建cookie
        auth.create_cookie(user,res);
        res.json({err:0,msg:'success'});
    })
}
//收藏
exports.collect = (req,res,next) => {
    let artId = req.params.id;
    let id = req.session.user._id;
    console.log(artId);
    console.log(id);
    User.getUserById(id,(err,user) => {
        if(err){
            res.end(err)
        }
        if(!user){
            return res.json({error:1,msg:'用户/邮箱不存在，请注册...'});
        }
        user.favourites_article.push(artId);
        user.favourites_article = _.uniq(user.favourites_article);
        console.log(user.favourites_article);
         user.save();
         res.json({error:0,user})
        console.log(user);
    })
}
//取消收藏
exports.collectOff = (req,res,next) => {
    let artId = req.params.id;
    let id = req.session.user._id;
    console.log(artId);
    console.log(id);
    User.getUserById(id,(err,user) => {
        if(err){
            res.end(err)
        }
        if(!user){
            return res.json({error:1,msg:'用户/邮箱不存在，请注册...'});
        }
        // user.favourites_article.pop();
        // user.save();
        let ins = user.favourites_article.indexOf(artId);
        user.favourites_article.splice(ins,1)
        user.save();
        // console.log(ins);
        // console.log(user.favourites_article);
        res.json({error:0,user})
        console.log(user);
    })
}
//收藏文章显示
exports.collects = (req,res,next) =>{
    console.log(111);
    let id = req.session.user._id;
    User.getUserById(id,(err,user) => {
        if(err){
            res.end(err)
        }
        if(!user){
            return res.json({error:1,msg:'用户/邮箱不存在，请注册...'});
        }
        console.log(user.favourites_article);
        Article.getArticleByIds(user.favourites_article,(err,article)=>{
            if(err){
                return res.end(err);
            }
            res.json({error:0,article})
        })
    })
}
//所有用户
exports.new = (req,res,next) =>{
    User.getFullUsers((err,users) =>{
        if(err){
            res.end(err)
        }
        res.json({error:0,users})
    })
}
//关注
exports.follows = (req,res,next) =>{
    let id = req.params.id;
    console.log(id);
    User.getUserById(req.session.user._id,(err,user)=>{
        if(id != req.session.user._id){
            user.follows_user.push(id)
            user.follows_user = _.uniq(user.follows_user);
            user.save();
            console.log(user);
        }
        User.getUserById(id,(err,user)=>{
            if(id != req.session.user._id){
                user.be_followed_user.push(req.session.user._id)
                user.be_followed_user = _.uniq(user.be_followed_user);
                user.save();
                console.log(user);
            }
        })
        res.json({error:0,user})
    })
}
//关注显示
exports.guan = (req,res,next) =>{
    let id = req.session.user._id
    User.getUserById(id,(err,user) => {
        if(err){
            res.end(err)
        }
        if(!user){
            return res.json({error:1,msg:'用户/邮箱不存在，请注册...'});
        }
        console.log(user.follows_user);
        User.getUsersByIds(user.follows_user,(err,users)=>{
            if(err){
                return res.end(err);
            }
            res.json({error:0,users})
        })
    })
}
//粉丝显示
exports.fen = (req,res,next) =>{
    let id = req.session.user._id
    User.getUserById(id,(err,user) => {
        if(err){
            res.end(err)
        }
        if(!user){
            return res.json({error:1,msg:'用户/邮箱不存在，请注册...'});
        }
        console.log(user.be_followed_user);
        User.getUsersByIds(user.be_followed_user,(err,users)=>{
            if(err){
                return res.end(err);
            }
            res.json({error:0,users})
        })
    })
}
//退出
exports.tuichu = (req, res, next) => {
    console.log('退出')
    req.session.destroy();
    res.clearCookie(setting.auth_cookie_name);
    res.json({error:0, message:'success'})
}






