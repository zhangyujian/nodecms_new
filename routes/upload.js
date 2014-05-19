var mysql         = require('mysql')
  , TEST_DATABASE = 'nodecms'
  , md5           = require('./common').md5
  , session       = require('./common').session
  , fs            = require('fs')
  , config        = require('../config').config
  , bc            = require('buffer-concat');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : TEST_DATABASE,
});

connection.connect();

// uploadify 
exports.upload = function (req, res) {
	session(req, res, function(){
		if( req.method === 'GET' ){
			res.render('admin/upload', {
                title: "文件上传",
                user: req.session.user
            });
		}
    	else if( req.method === 'POST' ){
    		var fileDesc = req.files,
			    path = fileDesc.Filedata.path,
			    name = path.split("temp\\")[1];
			res.send(name);
    	}

	});
};