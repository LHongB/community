
const User = require('../model/User');
const setting = require('../setting');
const Message = require('../model/Message');

const auth = {
    create_cookie:function(user,res){
        let auth_token = `${user._id}$$$$`;
        console.log('222');
        res.cookie(setting.auth_cookie_name, auth_token,{
            signed:true, maxAge:1000 * 60 * 6 * 24 * 30, path:'/'
        }  )

    },
    create_session:function(req, res, next){
        // console.log(req.signedCookies );

        if(req.session.user){
            console.log('user已设置');
            req.session.isLogin = true;
            next();
            // 查找通知消息的个数
            // Message.getNoReadCounts(req.session.user._id,  (err, count) =>{
            //     if(err){
            //         return next();
            //     }
            //     req.session.msgCount = count;
            //
            // })

        }else {
            console.log('未设置user');
            let auth_token = req.signedCookies[setting.auth_cookie_name];
            // console.log(auth_token);
            if( !auth_token ){
                return next();
            }
            // split()将字符串分割成数组
            let auth = auth_token.split('$$$$');
            // console.log(auth);
            let user_id = auth[0];
            User.getUserById(user_id, (err, user) => {
                if(err){
                    return next();
                }
                req.session.user = user;
                req.session.isLogin = true;
                next();
                // 查找通知的个数
                // Message.getNoReadCounts(user._id, (err, count) =>{
                //     if(err){
                //         return next();
                //     }
                //     req.session.msgCount = count;
                //
                // })


            })


        }

    }
}
module.exports = auth;
