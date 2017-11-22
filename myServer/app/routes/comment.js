/**
 * Created by Administrator on 2017/11/11.
 */
// 二级回复的路由函数处理
//引入静态
const setting = require('../setting');
const validator = require('validator');
const Article = require('../model/Article');
const User = require('../model/User');
// 导入消息通知机制
const at = require('../common/at');
const Reply = require('../model/Reply');

const saveMessage = require('../common/message');

const Comment = require('../model/Comment');
// 添加二级回复
exports.postComment = (req, res, next) =>{
    console.log(req.body);
    let content = validator.trim( String(req.body.content) );
    // let article_id = req.params.article_id;
    // let reply_id = req.body.reply_id;
    // let reply_author = req.body.reply_author;
    // 当是三级以上的回复时，获取二级回复的id
    let comment_author_id = req.body.author;
    // console.log(comment_author_id);

    if( content === '' ){
        return res.end('内容不能为空');
    }
    if(comment_author_id){
        console.log(111);
        var reply_id = req.body.reply_id
        User.getUserById(comment_author_id, (err, user) =>{
            return comment_author = user.username;
        })
        console.log(222);
    } else {
        console.log(33);
        var  reply_id = req.params.id;
    }
    console.log(reply_id);
        // 判断一级留言是否存在
    Reply.getReplyById(reply_id, (err, replyMsg, reply) =>{
            console.log(333);
            if(err){
                return res.end(err);
            }
            if(replyMsg){
                return res.json({error:1,message:'',error:replyMsg})
            }
            console.log(11)
                let article_id = reply.article_id;
                let reply_author = reply.author;
                let article_author_id = reply.article_author_id;
                console.log(article_author_id);
                 console.log(reply);
                     // console.log(comment_author);
        let comment = new Comment();
        comment.author = req.session.user._id;
        comment.content = content;
        comment.article_id = article_id;
        comment.reply_id = reply_id;
        comment.reply_author = reply_author;
        comment.article_author = article_author_id;
        if( comment_author_id ){
            comment.oldauthor = comment_author;
        }
        comment.save().then( ( data ) =>{
                return data;
            }).then((data)=>{
                Article.getArticleById(article_id, (err, msg, article) =>{
                    if(err){
                        return res.end(err);
                    }
                    if(msg){
                        return res.json({
                            error:1,
                            message:'',
                            error:msg
                        })
                    }
                    article.reply_num += 1;
                    article.save();
                })
                return data;
            }).then( (data) =>{
               console.log('000');
                console.log(data._id);
                // 1. 发表评论的人，积分+5，回复数量+1
                User.getUserById(req.session.user._id, (err, user) =>{
                    user.score += 5;
                    user.reply_count += 1;
                    user.save();
                    req.session.user = user;
                })
                console.log(111);
                return data;
            }).then( (data) =>{
                // 2. 相对应的一级回复，回复数量+1
                reply.comment_num += 1;
                reply.save();
                console.log(reply);
                // 3. 优先通知一级回复的作者，有人给他留言了
                if( reply_author.toString() !== req.session.user._id.toString ){
                    saveMessage.saveReplyMessage(article_id, req.session.user._id, reply_author, reply_id);
                }
                console.log(222);
                return data;

            }).then( (data) =>{
                // 4. 再通知文章作者(屏蔽自我留言)，有人给他留言了
                // 如果文章作者是一级回复的作者，不需要进行通知了
                if( reply_author.toString() !== article_author_id.toString() ){
                    if( reply_author.toString() !== req.session.user._id.toString() ){
                        saveMessage.saveReplyMessage(article_id, req.session.user._id, article_author_id,reply_id, data._id);
                    }
                }
                return data;
                console.log(444);
            }).then( (data) =>{
                // 5. 通知被@的那个人，有人提到他了
                at.sendAtMessage(content, article_id, req.session.user._id, data._id);
                return data;
                console.log(555);
            }).then( (data) =>{

                Comment.getCommentById(data._id, (err, comments) =>{
                    if(err){
                        return res.end(err);
                    }
                    // res.render('comment', {
                    //     comments:comments
                    // })
                    res.json({error:0,comments})
                })
                console.log(666);
            }).catch( (err) =>{
                res.end(err);
            })

        })


}
//查找当前id的二级回复
exports.comment = (req,res,next)=>{
    console.log(req.params.id);
    let id = req.params.id;
    Comment.getCommentById(id,(err,comments)=>{
        if(err){
            return res.end(err)
        }
        res.json({error:0,comments})
    })

}
// 显示二级回复
exports.showComments = (req, res, next) =>{
    console.log( req.params.id );
    let reply_id = req.params.id;
    // 所有的二级回复
    Comment.getCommentsByReplyId(reply_id, (err, comments) =>{
        if(err){
            return res.end(err);
        }
        console.log(comments);
        //
        // res.render('comment', {
        //     comments:comments
        // })
        res.json({error:0,comments})
    })
}