/**
 * Created by Administrator on 2017/11/7.
 */
//引入静态
const setting = require('../setting');
const validator = require('validator');
const _ = require('lodash');
const Article = require('../model/Article');
const User = require('../model/User');
// 导入消息通知机制
const at = require('../common/at');
const Reply = require('../model/Reply');
const Comment = require('../model/Comment')
// 文章的详情页面展示
exports.index = (req,res,next)=>{
    let article_id = req.params.id;
    console.log(article_id);
    Article.getArticleById(article_id, (err,msg, article,replys) =>{
        if(err){
            return res.json({error:1,err});
        }
        if(msg){
            return res.json( {
                error:1,
                message:'',
                error:msg
            })
        }
        article.click_num++;
        article.save();
        User.getUsersByIds(article.likes_user,(err,users)=>{
            if(err){
                return res.end(err);
            }
            res.json({error:0,data:article,replys,users})
        })
        // console.log(article);
    })
}
//文章点赞的增加
exports.likesAdd = (req,res,next) =>{
    // console.log("likes");
    // console.log(10101010101010);
    let article_id = req.params.id;
    console.log(article_id);
    Article.getArticleById(article_id, (err,msg, article,replys) =>{
        if(err){
            return res.json({error:1,err});
        }
        if(msg){
            return res.json( {
                error:1,
                message:'',
                error:msg
            })
        }
        article.likes_num++;
        article.likes_user.push(req.session.user._id);
        article.likes_user = _.uniq(article.likes_user);
        article.save();
        console.log(article);
        res.json({error:0,msg:'success',data:article,replys})
    })
    Reply.getReplyById(article_id,(err,msg,reply) =>{
        if(err){
            return res.json({error:1,err});
        }
        if(msg){
            return res.json( {
                error:1,
                message:'',
                error:msg
            })
        }
        // console.log(111);
        reply.likes_num++;
        console.log(reply);
        // reply.likes_user.push(req.session.user._id);
        reply.likes_user.push(req.session.user._id);
        reply.likes_user = _.uniq(reply.likes_user);
        reply.save();
        console.log(reply.likes_num)
        res.json({error:0,msg:'success',reply})
    })
    // console.log(66666);
    Comment.getCommentById(article_id,(err,comments) => {
        // console.log('success1');
        // console.log(111);
        if(err){
            return res.json({error:1,err});
        }
        // console.log(comments);
        // console.log(333333);
        comments.likes_num++;
        // console.log(comments._id);
        comments.likes_user.push(req.session.user._id);
        // console.log(1111);
        // comments.favorited = true;
        comments.save();
        // console.log('成功');
        res.json({error:0,msg:'success',comments})
    })
}
//文章点赞的减少
exports.likesCut = (req,res,next) =>{
    console.log("----------------");
    let article_id = req.params.id;
    // console.log(article_id);
    Article.getArticleById(article_id, (err,msg, article,replys) =>{
        if(err){
            return res.json({error:1,err});
        }
        if(msg){
            return res.json( {
                error:1,
                message:'',
                error:msg
            })
        }
        article.likes_num--;
        // article.likes_user.pop();
        // let ins = article.likes_user.indexOf(article_id);
        // article.likes_user.splice(ins,1)
        article.save();
        console.log(article);
        res.json({error:0,msg:'success',data:article,replys})
    })
    Reply.getReplyById(article_id,(err,msg,reply) =>{
        if(err){
            return res.json({error:1,err});
        }
        if(msg){
            return res.json( {
                error:1,
                message:'',
                error:msg
            })
        }
        reply.likes_num--;
        console.log(reply);
        // reply.likes_user.pop();
        let ins = reply.likes_user.indexOf(article_id);
        reply.likes_user.splice(ins,1)
        reply.save();
        console.log(reply.likes_num)
        res.json({error:0,msg:'success',reply})
    })
    Comment.getCommentById(article_id,(err,comments) => {
        // console.log('success1');
        // console.log(111);
        if(err){
            return res.json({error:1,err});
        }
        // console.log(comments);
        // console.log(333333);
        comments.likes_num--;
        // console.log(comments._id);
        let ins = comments.favourites_article.indexOf(article_id);
        comments.favourites_article.splice(ins,1)
        // console.log(1111);
        // comments.favorited = true;
        comments.favorited = false;
        comments.save();
        // console.log('成功');
        res.json({error:0,msg:'success',comments})
    })

}
//查找单条文章
exports.finArt = (req,res,next) =>{
    // console.log(1111);
    let article_id = req.params.id;
    // console.log(article_id);
    Article.getArticleById(article_id, (err,msg, article,replys) =>{
        if(err){
            return res.json({error:1,err});
        }
        if(msg){
            return res.json( {
                error:1,
                message:'',
                error:msg
            })
        }
        // console.log(article);
        res.json({error:0,data:article,replys})
    })
}
//文章的转发
exports.ward = (req,res,next) => {
        // console.log(req.body);
        console.log(req.body.retweeted_status._id)
        let id = req.body.retweeted_status._id;
        let content = validator.trim(req.body.content);
        let newObj = new Article(req.body);
        newObj.save().then((article)=>{
            console.log(6666666666);
            Article.getArticleById(id,(err,msg, article,replys) => {
                console.log(4454545);
                if(err){
                    return res.end(err);
                }
                article.reposts_count += 1;
                article.save();
                console.log(4454545);
                // console.log(article);
            })
            return article;
        }).then((article)=>{
            console.log("---------------");
            console.log(id);
            User.getUserById(req.session.user._id,(err,user) => {
                if(err){
                    return res.end(err);
                }
                user.score += 5;
                user.article_count += 1;
                user.save();
                console.log(33333);
                // console.log(user);
                // console.log(article);
                req.session.user = user;
                at.sendAtMessage(content, article._id, req.session.user._id);
                res.json({error:0,article})
            }).catch((err) => {
                res.end(err);
            })
        })
}
//用户删除当前文章
exports.deletedY = (req,res,next) => {
    let article_id = req.params.id;
    // console.log(article_id);
    Article.getArticleById(article_id, (err,msg, article,replys) =>{
        if(err){
            return res.json({error:1,err});
        }
        if(msg){
            return res.json( {
                error:1,
                message:'',
                error:msg
            })
        }
        article.deleted = true;
        article.save();
        // console.log(article);
        res.json({error:0,data:article,replys})
    })
}
//转发的文章显示
exports.wardArt = (req,res,next) => {
    console.log(req.body);
    console.log(11111);
    let id = req.params.id;
    Article.getWardArticleById(id,(err,msg,article) =>{
        if(err){
            return res.json({error:1,err});
        }
        if(msg){
            return res.json( {
                error:1,
                message:'',
                error:msg
            })
        }

        res.json({error:0,data:article})
    })
}
//搜索
exports.search = (req,res,next) =>{
     let search = req.body.val;
    search = new RegExp("^.*" + search + ".*$");
    Article.postSerach(search,(err,articles)=>{
       if(err){
          return res.end(err);
       }
       console.log(articles);
       res.json({error:0,articles})
    })
}

