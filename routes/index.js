var mysql         = require('mysql')
  , TEST_DATABASE = 'nodecms'
  , md5           = require('./common').md5
  , session       = require('./common').session
  , connection    = require('./common').connection
  , bc            = require('buffer-concat');

exports.index = function(req, res){
	connection.query('USE '+TEST_DATABASE);
	connection.query(
	  'SELECT * FROM user',
	  function selectCb(err, results, fields) {
	    if (err) {
	      throw err;
	    }
	    res.render('default/index', { 
	    	tables: results,
	    	title: "首页"
	    });
	  }
	);
};

exports.contact = function(req, res){
	res.render('default/contact', {
		title: "联系我们"
	});
};

exports.about = function(req, res){
	res.render('default/about', {
		title: "关于我们"
	});
};

exports.product = function(req, res){
	res.render('default/product', {
		title: "案例展示"
	});
};

exports.server = function(req, res){
	res.render('default/server', {
		title: "服务报价"
	});
};

exports.movie = function(req, res){
	res.render('default/movie', {
		title: "微电影"
	});
};

exports.login = function(req, res){
	fs.readdir('./views/', function(err,fileNameArray){
	    if(err){
	        console.error(err);
	    }else{
	        
	    	//var fileNameArray = JSON.parse(fileNameArray);
	    	console.log(fileNameArray);
		    res.render('default/login', {
				title: "登录"
			});
		}
	});

};