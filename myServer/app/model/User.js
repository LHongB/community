/**
 * Created by Administrator on 2017/11/4.
 */
const  mongoose = require('mongoose');
const  shortid = require('shortid');
const  Schema  = mongoose.Schema;
const UserSchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //登录名
    loadName:{
        type:String,
        require:true
    },
    //用户名
    username:{
        type:String,
        require:true
    },
    //密码
    password:{
        type:String,
        require:true
    },
    //性别
    sex:{
       type:Boolean
    },
    //住址
    location:{
        type:String
    },
    //个人简介
    motto:{
        type:String,
        default:''
    },
    //个人头像
    avatar:{
        type:String,
        default:'images/default-avatar.jpg'
    },
    //创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    // 更新时间
    update_time:{
        type:Date,
        default:Date.now
    },
    // 文章数量
    article_count:{
        type:Number,
        default:0
    },
    // 回复数量
    reply_count:{
        type:Number,
        default:0
    },
    //收藏数量
    favourites_count:{
        type:Number,
        default:0
    },
    //点赞数量
    praise:{
        type:Number,
        default:0
    },
    //相册
    photo:{
        type:Number,
        default:0
    },
    // 积分
    score:{
        type:Number,
        default:0
    },
    // 关注数
    follows:{
        type:Number,
        default:0
    },
    // 粉丝数
    be_followed:{
        type:Number,
        default:0
    },
    //关注的人
    follows_user:{
        type:Array,
    },
    //粉丝
    be_followed_user:{
        type:Array,
    },
    //是否允许所有人对我私信
    allow_msg:{
        type:Boolean,
        default:true,
    },
    //是否是加V用户
    verified:{
        type:Boolean,
        default:false,
    },
//    用户微博
    status:{
        type:String,
        ref:"Article"
    },
    //用户收藏微博
    favourites_article:{
        type:Array,
    },
    //是否允许所有人对我的微博评论
    allow_comment:{
        type:Boolean,
        default:true
    },
  //  用户的互粉数
  bi_fllow:{
        type:Number,
        default:0
  }
})
UserSchema.statics = {
    /// 通过id查找用户，并返回数据
    getUserById:(id, callback) => {
        User.findOne({'_id':id}).then((user)=>{
            callback(null, user);
        }).catch((err)=>{
            callback(err);
        })
    },
    // 通过name查找用户
    getUserByName:(name, callback) => {
        User.findOne({'username':name}).then((user)=>{
            callback(null, user);
        }).catch((err)=>{
            callback(err);
        })
    },
    // 通过email属性查找用户
    getUserByEmail:(email, callback) => {
        User.findOne({'loadName':email}).then((user)=>{
            callback(null, user);
        }).catch((err)=>{
            callback(err);
        })
    },
    // 通过多个名称，获取多个用户信息  $in
//  { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
    getUsersByNames:(users, callback) =>{
        User.find({username:{$in:users}}).then((users) =>{
            callback(null, users);
        }).catch((err) =>{
            callback(err);
        })
    },
    getUsersByIds:(users, callback) =>{
        User.find({_id:{$in:users}}).then((users) =>{
            callback(null, users);
        }).catch((err) =>{
            callback(err);
        })
    },
//    查找所有用户
    getFullUsers:(callback) =>{
        User.find().sort({'create_time':-1}).then( (users) =>{
            callback(null, users);
        }).catch( (err) =>{
            callback(err);
        })
    },
}
const  User = mongoose.model('User',UserSchema);
module.exports = User;