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
    sess.session(req, res, function(){
        connection.query(
            'SELECT * FROM user order by id desc',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                res.render('admin/index', {
                    title: "欢迎登录NODECMS后台系统",
                    tables:results,
                    user: req.session.user,
                    message: req.flash('message')
                });
            }
        );
    });
};

// add user
exports.adduser = function(req, res){
    sess.session(req, res, function(){
        connection.query(
            'SELECT * FROM user WHERE email ='+ connection.escape(req.body.newemail) ,
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                if( results !="" ){
                    req.flash('message','邮箱已被注册');
                }else{
                    var sql = "INSERT INTO user SET email=?, username=?, password=?",
                        values = [ req.body.newemail, req.body.newusername, md5(req.body.newpassword)];
                    connection.query(sql, values, 
                        function(err, results){
                            if (err) {
                                throw err;
                            }
                        }
                    );
                    req.flash('message','新用户添加成功！');
                }
                res.redirect('/admin');
            }
        );
    });
};

//delete user
exports.deluser = function(req, res){
    sess.session(req, res, function(){
        var sql = "DELETE FROM user WHERE id =?",
            values = connection.escape(parseInt(req.params.id));
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
            }
            //req.flash('message','删除成功');//不支持get方式？
        );
        res.redirect('/admin');
    });
}

//edit user
exports.edituser = function(req, res){
    sess.session(req, res, function(){
        var sql = "SELECT * FROM user WHERE id =?",
            values = connection.escape(parseInt(req.params.id));
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                console.log(results);
                res.render('admin/edituser', {
                    title: "编辑用户",
                    table: results[0],
                    user: req.session.user,
                    message: req.flash('message')
                });
            }
        );
    });
}

// admin login
exports.login = function(req, res){
    if( req.method === 'GET' ){
        if( req.session.user ){
            res.redirect('/admin');
        }else{
            res.render('admin/login', {
                title: "登录",
                message: req.flash('message')
            });
        }
    }
    else if( req.method === 'POST' ){
        connection.query(
            'SELECT * FROM user WHERE email ='+ connection.escape(req.body.email) ,
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                if( results =="" ){
                    //用户不存在
                    req.flash('message','您输入的用户不存在');
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