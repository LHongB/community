/**
 * Created by Administrator on 2017/11/7.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const setting = require('../setting');
const _ = require('lodash');
const at = require('../common/at');
const Reply = require('./Reply');

//  日期格式化工具
const moment = require('moment');

// 设置全局语言  -- 使用中文
moment.locale('zh-cn');

const ArticleSchema = new Schema({
    // 微博id
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //内容
    content:{
        type:String,
        require:true
    },
    //创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    //是否被点赞
    favorited:{
      type:Boolean,
      default:false
    },
    //是否被收藏
    collect:{
        type:Boolean,
        default:false
    },
    //是否被截断
    truncated:{
        type:Boolean,
        default:false
    },
    //作者
    author:{
        type:String,
        ref:'User'
    },
    // 图片地址
    pic_ids:{
        type:Array,
        default:[]
    },
    //图片
    pics:{
       type:Array,
       default:[]
    },
    //被转发的微博
    retweeted_status:{
       type:Object,
        ref:'Article'
    },
    //转发此微博的文章
    ward_arc:{
        type:Array,
        ref:'Article'
    },
    // 浏览次数 === 点击量
    click_num:{
        type:Number,
        default:0
    },
    //转发数
    reposts_count:{
        type:Number,
        default:0
    },
    // 回复次数
    reply_num:{
        type:Number,
        default:0
    },
    // 点赞数量
    likes_num:{
        type:Number,
        default:0
    },
    //点赞的人
    likes_user:{
      type:Array,
    },
    // 最后回复的那个人
    last_reply_author:{
        type:String,
        ref:'User'
    },
    // 最后回复的内容  === 最后的那个回复
    last_reply:{
        type:String,
        ref:'Reply'
    },
    // 最后回复的时间
    last_reply_time:{
        type:Date,
        default:Date.now
    },
    //私密性
    visible:{
      type:Object
    },
    // 删除功能
    deleted:{
        type:Boolean,
        default:false
    }

})

// 设置静态方法
ArticleSchema.statics = {
    // 通过id查找当前文章
    getArticleById:(id, callback) =>{
            // populate() 关联查询 --- 查询并获取参考集合的数据
            Article.findOne({'_id':id, deleted:false}).populate( 'author' ).then( (article) =>{
                // console.log(article);
                // 判断文章是否存在
                if( !article ){
                    return callback(null, '文章不存在或已删除')
                }
                // 获取当前文章所有的回复列表
                Reply.getReplysByArticleId(article._id, (err, replys) =>{
                    callback(null,'',  article, replys);
                })
            }).catch( (err) =>{
                callback(err);
            })
    },
    //通过转发文章的id查找文章
    getWardArticleById:(id, callback) =>{
        Article.find({'retweeted_status._id':id, deleted:false}).populate('author').then( (article) =>{
            // console.log(22222);
            // console.log(article);
            // 判断文章是否存在
            if( !article ){
                return callback(null, '文章不存在或已删除')
            }
            callback(null,'',  article);
            // // 获取当前文章所有的回复列表
            // Reply.getReplysByArticleId(article._id, (err, replys) =>{
            //     callback(null,'',  article, replys);
            // })
            // console.log(article);
        }).catch( (err) =>{
            callback(err);
        })
    },
    //管理员通过id删除当前文章
    getArticleGById:(id,callback)=>{
            Article.remove({'_id':id}).then((article)=>{
                if(!article){
                    return callback(null,'文章不存在或已删除')
                }
            }).catch((err)=>{
                callback(err);
            })
    },
    // 获取所有的文章列表
    getFullArticles:(callback) =>{
        Article.find({deleted:false}).sort({'create_time':-1}).populate('author').then( (articles) =>{
            callback(null, articles);
        }).catch( (err) =>{
            callback(err);
        })
    },
    //多id查询
    getArticleByIds:(articles, callback) =>{
        Article.find({_id:{$in:articles}}).then((article) =>{
            callback(null, article);
        }).catch((err) =>{
            callback(err);
        })
    },
//    模糊查询
    postSerach:(search,callback) =>{
        Article.find({content:search}).then((articles) =>{
            callback(null, articles);
        }).catch( (err) =>{
            callback(err);
        })
    }

}
//  设置实例对象的方法
ArticleSchema.methods.create_time_ago = function(){
    // this.create_time;
    let time = moment(this.create_time).fromNow();
    return time;
}

const Article = mongoose.model('Article',ArticleSchema);
module.exports = Article

