/**
 * Created by Administrator on 2017/11/8.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const MessageSchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    // 登录的那个人
    author_id:{
        type:String,
        ref:'User'   // 参考的某个数据集合
    },
    // 当前的文章
    article_id:{
        type:String,
        ref:'Article'
    },
    // 被@的那个人
    target_id:{
        type:String,
        ref:'User'
    },
    // 创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    // 消息通知类型
    atType:{
        type:String
    },
    // 回复的那条id
    reply_id:{
        type:String,
        ref:'Reply'
    },
    // 是否已读
    has_read:{
        type:Boolean,
        default:false
    },
//    消息内容
    text:{
        type:String
    },
//  图片
    data:{
        type:String
    }
})

MessageSchema.statics = {
    // 获取未读消息的个数
    getNoReadCounts:(id, callback) =>{
        Message.find({'target_id':id, has_read:false}).count( (err, count) =>{
            if(err){
                callback(err);
            }else {
                callback(null, count);
            }
        })
    },
    // 获取所有的未读消息
    getNoReadMsgs:(target_id, callback) =>{
        Message.find({'target_id':target_id,has_read:false}).populate('author_id article_id').then( (noReadMsgs)=>{
            callback(null, noReadMsgs);
        }).catch( (err) =>{
            callback(err);
        })
    },
    //获取当前用户所有的at消息
    getAtMsgs:(target_id, callback) =>{
        console.log(1212);
        Message.find({$or:[{'target_id':target_id, atType:"at"},{'target_id':target_id, atType:"replyAt"}]})
            .populate('author_id article_id').then( (msg)=>{
            console.log(msg);
            callback(null, msg);
        }).catch( (err) =>{
            callback(err);
        })
    },
    //获取当前用户的所有未读的At的消息
    getAtNoMsgs:(target_id, callback) =>{
        Message.find({$or:[{'target_id':target_id, atType:"at",has_read:false},
            {'target_id':target_id, atType:"replyAt",has_read:false}]}).then((noReadMsgs)=>{
            callback(null,noReadMsgs);
        }).catch((err)=>{
            callback(err);
        })
    },
    //获取当前用户的所所有评论
    getCriticMsgs:(target_id, callback) =>{
           Message.find({'target_id':target_id, atType:"reply"}).populate('author_id article_id target_id').then( (msg)=>{
            console.log(msg);
            callback(null, msg);
        }).catch( (err) =>{
            callback(err);
        })
    },

    getCriNoMsgs:(target_id, callback) =>{
        Message.find({'target_id':target_id, atType:"reply",has_read:false}).then( (noReadMsgs)=>{
            console.log(noReadMsgs);
            callback(null, noReadMsgs);
        }).catch( (err) =>{
            callback(err);
        })
    },
    // 获取所有的已读消息
    getReadMsgs:(target_id, callback) =>{
        Message.find({'target_id':target_id, has_read:true}).populate('author_id article_id').then( (readMsgs)=>{
            callback(null, readMsgs);
        }).catch( (err) =>{
            callback(err);
        })
    },
    getMessageById:(message_id, callback) =>{
        Message.findOne({'_id':message_id, has_read:false}).populate('author_id article_id').then( (message)=>{
            callback(null, message);
        }).catch( (err) =>{
            callback(err);
        })
    }
}

const Message = mongoose.model('Message',MessageSchema);
module.exports = Message
