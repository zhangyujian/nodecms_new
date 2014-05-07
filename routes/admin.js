var fs            = require('fs')
  , config        = require('../config').config
  , crypto        = require('crypto')
  , mysql         = require('mysql')
  , TEST_DATABASE = 'nodecms'
  , sess          = require('./session');

require('buffer-concat');

//创建md5方法
function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
});

connection.query('USE '+TEST_DATABASE);

exports.index = function(req, res){
    sess.session(req,res);
    connection.query(
        'SELECT * FROM user',
        function selectCb(err, results, fields) {
            if (err) {
                throw err;
            }
            res.render('admin/index', {
                title: "欢迎登录NODECMS后台系统",
                tables:results,
                user: req.session.user
            });
        }
    );
    
};

// admin login
exports.login = function(req, res){
    if( req.method === 'GET' ){
        if( req.session.user ){
            res.redirect('/admin');
        }else{
            //console.log(req.flash('message'));
            res.render('admin/login', {
                title: "登录",
                message: req.flash('message')
            });
        }
    }
    else if( req.method === 'POST' ){
        connection.query(
            'SELECT * FROM user WHERE email ='+ connection.escape(req.body.username) ,
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                console.log(results);
                if( results =="" ){
                    //用户不存在
                    req.flash('message','您输入的用户名不存在');
                    res.redirect('/admin/login.html');
                }
                else if(results[0].password != req.body.password){
                    //密码错误
                    req.flash('message','您输入的密码有误!');
                    res.redirect('/admin/login.html');
                }
                else{
                    req.session.user = results[0];
                    res.redirect('/admin');
                }
            }
        );
    }
};