var fs = require('fs');
var config = require('../config').config;
var mysql = require('mysql');
var TEST_DATABASE = 'nodecms';
require('buffer-concat');


var connection = mysql.createConnection({
    host : 'localhost',
	port : 3306,
    user : 'root',
    password : 'root',
});

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
	    connection.end();
	  }
	);
	
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