/**
 * Created by Administrator on 2017/11/10.
 */
const Message = require('../model/Message');
exports.index = (req,res,next)=>{
    // 获取登录用户的所有消息

    let target_id = req.session.user._id;
    // 未读消息和已读消息
    Message.getNoReadMsgs(target_id, (err, noReadMsgs) =>{
        if(err){
            return res.end(err);
        }
        Message.getReadMsgs(target_id, (err, readMsgs) =>{
            if(err){
                return res.end(err);
            }
        })
    });

}
exports.at = (req,res,next)=>{
    // console.log(121);
    // console.log(req.session.user._id);
    Message.getAtMsgs(req.session.user._id,(err,msg)=>{
        if(err){
            return next();
        }
        console.log(222);
        console.log(msg);
        res.json({error:0,msg})
    })
}
exports.upAt = (req,res,next) =>{
    console.log("at");
    Message.getAtNoMsgs(req.session.user._id,(err,noReadMsgs)=>{
        if(err){
            return res.end(err);
        }
        console.log('aaaa');
        noReadMsgs.forEach( (message, index) =>{
            message.has_read = true;
            message.save();
            console.log('sssa');
            if( index === noReadMsgs.length - 1 ){
                // 当所有的未读的has_read更新为true时，返回响应数据
                res.json({error:0,msg:'success'});
            }
        })
    })
}
exports.critic = (req,res,next) =>{
    console.log(11);
 Message.getCriticMsgs(req.session.user._id,(err,msg)=>{
     console.log(22);
      if(err){
          return next();
      }
     console.log(222);
     console.log(msg);
       res.json({error:0,msg})
    })
}
exports.upCri = (req,res,next) =>{
    console.log("at");
    Message.getCriNoMsgs(req.session.user._id,(err,noReadMsgs)=>{
        if(err){
            return res.end(err);
        }
        console.log('aaaa');
        noReadMsgs.forEach( (message, index) =>{
            message.has_read = true;
            message.save();
            console.log('sssa');
            if( index === noReadMsgs.length - 1 ){
                // 当所有的未读的has_read更新为true时，返回响应数据
                res.json({error:0,msg:'success'});
            }
        })
    })
}
exports.counts = (req,res,next) =>{
    Message.getNoReadCounts(req.session.user._id,  (err, count) =>{
    if(err){
        return next();
    }
    res.json({error:0,count})

})
}
// 更新一条
exports.updateone = (req, res, next) =>{
    let message_id = req.params.message_id;
    Message.getMessageById(message_id, (err, message) =>{
        if(err){
            return res.end(err);
        }
        message.has_read = true;
        message.save();
        res.end('success');
    })
}


// 更新所有的消息
exports.updateall = (req, res, next) =>{
    // 获取作者id
    let target_id = req.session.user._id;
    // 获取该作者所有的未读消息
    Message.getNoReadMsgs(target_id, (err, noReadMsgs) =>{
        if(err){
            return res.end(err);
        }
        noReadMsgs.forEach( (message, index) =>{
            message.has_read = true;
            message.save();
            if( index === noReadMsgs.length - 1 ){
                // 当所有的未读的has_read更新为true时，返回响应数据
                res.end('success');
            }
        })

    });
}