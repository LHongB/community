var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fs = require('fs');
var multer = require('multer')
const _ = require('lodash');
const partials = require('express-partials');
const session = require('express-session');
// 导入设置文件
const setting = require('./setting');
// 导入用户设置文件
const auth = require('./common/auth');
var storage = multer.diskStorage({
    destination:'public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
        // cb(null,Date.now()+'.jpg')
    }
})
var upload = multer({ storage: storage })
//引入routes.js路由文件
const routes = require('./routes');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser( setting.cookie_secret ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:setting.cookie_secret,
    resave:true,
    saveUninitialized:true
}))
app.use(auth.create_session);
app.use( require('./routes/photo') );
app.use('/', routes);
// 检测用户是否登陆 /checkLogin
app.use(function(req,res,next){
    if(req.session.user){
        res.json({error:0,message:'已有用户登录',user:req.session.user})
    }
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3002,()=>{
  console.log('node is OK');
})
module.exports = app;
