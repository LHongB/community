/**
 * Created by Administrator on 2017/10/9.
 */
// 处理消息通知机制 @某人 的情况
// 1.判断内容中是否有@user的出现,最终得到[@user]
// 2.如果有，通知被@的那个人
const User = require('../model/User');
// 是个js工具库(方法库)，对数组或对象进行处理
const _ = require('lodash');
const saveMessage = require('./message');


const at = {
    getAtUsers:(content) =>{
        console.log('消息通知');
        console.log(content);

        // 排除掉非法字符 ，以及邮箱
        let ignoreRegexs = [
            /```.+?```/g, // 去除单行的 ```
            /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
            /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
            /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
            /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
            /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
        ]
        // 凡是匹配以上的验证规则的内容，被替换成''
        ignoreRegexs.forEach((item) =>{
            // replace(验证规则， 新内容)
            content = content.replace(item, '');
        })
        // console.log(content);
        // 获取@user   user的验证规则 /@[a-zA-Z0-9_]/
        // @as
        let pattern = /@[a-zA-Z0-9_]+\b/igm;
        let results = content.match(pattern);

        let users = [];

        if( results ){
            results.forEach( (result) =>{

                users.push( result.slice(1) )
            })
        }
        // 得到的是有重复用户的数组
        // console.log(users);
        // 进行数组排重，得到唯一的元素
        users = _.uniq(users);
        console.log(users);
        return users;
    },
    // sendAtMessage('', '', '')
    sendAtMessage:(content, article_id, author_id, reply_id) =>{
        // at.getAtUsers(content);
        //  [user1,user2,....] 查找用户，并给用户发送消息
        User.getUsersByNames(at.getAtUsers(content), (err, users)=>{
            if(err){
                return res.end(err);
            }
            // 发送通知消息
            console.log(users);
            users.forEach((user)=>{
                console.log(user);
                console.log('aaa');
                // 当前的文章 , 文章作者， 被@的那个人
                // @的时候，要屏蔽掉对自身的@信息
                if( author_id !== user._id ){
                    if( !reply_id ){
                        saveMessage.saveAtMessage(article_id, author_id, user._id);
                    }else {
                        saveMessage.saveReplyAtMessage(article_id, author_id, user._id, reply_id);
                    }
                }
            })
        })
    },

}

module.exports = at;

