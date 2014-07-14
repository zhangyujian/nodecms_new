var mysql         = require('mysql')
  , TEST_DATABASE = 'nodecms'
  , md5           = require('./common').md5
  , session       = require('./common').session
  , connection    = require('./common').connection
  , bc            = require('buffer-concat');

connection.connect();

exports.index = function(req, res){
    session(req, res, function(){
        var num = 0,
            data = {};
        function render(){
            res.render('admin/index', {
                title: "欢迎登录NODECMS后台系统",
                data: data,
                user: req.session.user,
                message: req.flash('message')
            });
        }



        connection.query(
            'SELECT SUM(DATA_LENGTH)+SUM(INDEX_LENGTH) FROM information_schema.TABLES WHERE TABLE_SCHEMA="'+TEST_DATABASE+'"',//获取数据库大小
            function selectCb(err, results) {
                if (err) {
                    throw err;
                }
                data.size = results[0]["SUM(DATA_LENGTH)+SUM(INDEX_LENGTH)"]/(1024*1024);

                connection.query(
                    'SELECT * FROM user',//用户数量
                    function selectCb(err, results) {
                        if (err) {
                            throw err;
                        }
                        data.num = results.length;

                        render();

                    }
                );

            }
        );

    });
};

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
                    res.redirect('/admin/login');
                }
                else if(results[0].password != md5(req.body.password)){
                    //密码错误
                    req.flash('message','您输入的密码有误!');
                    res.redirect('/admin/login');
                }
                else{
                    req.session.user = results[0];
                    res.redirect('/admin');
                }
            }
        );
    }
};

// admin logout
exports.logout = function(req, res){
    session(req, res, function(){
        req.session.user = false;
        res.redirect('/admin');
    });
}