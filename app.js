var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var routers = require('./routes/routers');
var staffs = require('./routes/staffs');
var users = require('./routes/users');
var vtrs = require('./routes/vtrs');
var points = require('./routes/points');
var coins = require('./routes/coins');
var faq = require('./routes/faq');
var cms = require('./routes/cms');
var notices = require('./routes/notices');
var businessContacts = require('./routes/businessContacts');
var communities = require('./routes/communities');
var kyc = require('./routes/kyc');
var temp = require('./routes/temp');
var personal = require('./routes/personal');
var opposition = require('./routes/opposition');
var batch = require('./routes/batch');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(session({
  secret: 'bitweb123', //Only enable https
  name: 'bitweb_sid',
  // store: new MongoStore({ url: DB_URI}), // connect-mongo session store
  proxy: false,
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: {
      //maxAge: 1000 * 60 * 60 // 쿠키 유효기간 하루 (24시간) * 30일 //현재 무기한
      expires: 1000 * 60 * 60 // 쿠키 유효기간 (1시간)
  }
}));


app.use('/', routers);
app.use('/users', users);
app.use('/staffs', staffs);
app.use('/vtrs', vtrs);
app.use('/points', points);
app.use('/coins', coins);
app.use('/faq', faq);
app.use('/cms', cms);
app.use('/personal', personal);
app.use('/notice', notices);
app.use('/businessContact', businessContacts);
app.use('/community', communities);
app.use('/kyc', kyc);
app.use('/temp', temp);
app.use('/opposition', opposition);
app.use('/batch', batch);

//add plugin
app.use('/sb-admin', express.static(__dirname + '/public/javascripts/vendor/sb-admin/'));
app.use('/text-editor', express.static(__dirname + '/public/javascripts/vendor/jQuery-text-editor/'));
app.use('/summernote', express.static(__dirname + '/public/javascripts/vendor/summernote/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
