var express = require('express')
, jsdom = require('jsdom')
, request = require('request')
, url = require('url');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Founds');
  err.status = 404;
  next(err);
});
// ruta principal

app.get('/coches', function(req, res){
    //Tell the request that we want to fetch youtube.com, send the results to a callback function
        request({uri:'http://youtube.com'}, function(err, response, body){
          var self = this;
          console.log('cacafuti');
          self.items = new Array();//I feel like I want to save my results in an array
          //Just a basic error check
          if(err && response.statusCode !== 200){console.log('Request error.');}
          //Send the body param as the HTML code we will parse in jsdom
          //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
          jsdom.env({
            html: body,
            scripts: ['http://code.jquery.com/jquery-1.6.min.js']
          }, function(err, window){
            //Use jQuery just as in a regular HTML page
            var $ = window.jQuery;
             
            console.log($('title').text());
            res.end($('title').text());
          });
        });
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

