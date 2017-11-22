/**
 * Created by Administrator on 2017/11/11.
 */
const formidable = require('formidable')
const fs = require('fs')

exports.img = (req,res,next)=>{

    console.log(121)
    var formidable = require("formidable"); //载入 formidable

    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    var post = {},
        file = {};
    form.uploadDir = 'public/uploads';  //文件上传 临时文件存放路径

    //文件路径
    let filePath = 'public/uploads/'


    form.on('error', function(err) {
        console.log(err); //各种错误
    })
    //POST 普通数据 不包含文件 field 表单name value 表单value
        .on('field', function(field, value) {
            if (form.type == 'multipart') {  //有文件上传时 enctype="multipart/form-data"
                if (field in post) { //同名表单 checkbox 返回array 同get处理
                    if (util.isArray(post[field]) === false) {
                        post[field] = [post[field]];
                    }
                    post[field].push(value);
                    return;
                }
            }
            post[field] = value;
        })
        .on('file', function(field, file) { //上传文件
            console.log(field,file)
            let fileName = '.jpg'

            let ms =  Date.now()
            console.log(ms)
            file[field] = file;

            fs.rename(file.path,filePath + ms + fileName,(err)=>{

                res.json({error:0,
                    message:'上传成功',
                    url:'uploads/' + ms + fileName
                })
            })

        })
    form.parse(req); //解析request对象
}

