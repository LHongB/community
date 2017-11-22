/**
 * Created by Administrator on 2017/11/6.
 */
const express = require('express');
const router = express.Router();
//引入首页的路由文件
const home = require('./routes/index');
const user = require('./routes/users');
const article = require('./routes/article');
const reply = require('./routes/reply');
const comment = require('./routes/comment');
const message = require('./routes/message');
const img = require('./routes/img');
const fs = require('fs');
var multer = require('multer')
var picture=[]
var storage = multer.diskStorage({
    destination:'public/uploads',
    filename: function (req, file, cb) {
        // console.log(req.params.id);
        var suffix = file.mimetype.split("/")[1];
        var fileName = file.fieldname + '-' + Date.now() + "." + suffix;
        picture.push(fileName);
        cb(null,fileName);
        // cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
})
var upload = multer({ storage: storage })
//首页
router.get('/homes',home.index);
//注册数据处理
router.post('/register',user.postZhuce);
//登录数据处理
router.post('/login', user.postLogin);
// 退出
router.get('/logout', user.tuichu);
//微博发布
// router.post('/article',upload.array('photo',6),article.postCreate);
//转发
router.post('/ward/:id',article.ward);
//收藏
router.get('/collect/:id',user.collect);
//取消收藏
router.get('/collectOff/:id',user.collectOff);
//评论
router.post('/reply/:id',reply.postReply);
//二级回复
router.post('/comment/:id',comment.postComment)
//查找二级回复
router.get('/CComent/:id',comment.comment)
//详情
router.post('/article/:id',article.index);
//点赞+
router.get('/likesAdd/:id',article.likesAdd);
//点赞-
router.get('/likesCut/:id',article.likesCut);
//查找单条微博
router.get('/finArt/:id',article.finArt);
//用户删除单条文章
router.get('/deletedY/:id',article.deletedY);
//二级回复显示
router.post('/Comments/:id',comment.showComments);
//转发内容显示
router.get('/wardArt/:id',article.wardArt);
//消息个数
router.get('/mesCount',message.counts);
//获取At的消息
router.get('/at',message.at);
//更新当前的未读At的消息
router.get('/upAt',message.upAt);
//获取评论的消息
router.get('/critic',message.critic)
//更新当前的未读的评论
router.get('/upCri',message.upCri);
//搜索
router.post('/search',article.search);
//收藏显示
router.get('/collect',user.collects);
//所有用户
router.get('/new',user.new);
//关注
router.get('/follows/:id',user.follows);
//关注显示
router.get('/guan',user.guan);
//粉丝显示
router.get('/fen',user.fen);
router.post('/img',img.img)


module.exports = router;