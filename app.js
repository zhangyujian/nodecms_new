/**
 * Module dependencies.
 */

var express     = require('express')
  , path        = require('path')
  , flash       = require('connect-flash')
  , config      = require('./config').config
  , app         = express();

// Configuration
app.configure(function(){
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
  app.engine('.html', require('ejs').__express);
  app.use(flash());
  app.use(express.favicon());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.session_secret,
  }));
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(express.favicon(__dirname + config.favicon));//设置favicon.ico
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//routes
require('./routes')(app);

//config 渲染到模板
app.locals({
  config:config
});

app.listen(config.port, function(){
  console.log("Express server listening on port " + config.port);
});
