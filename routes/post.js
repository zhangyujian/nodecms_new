var mysql         = require('mysql')
  , TEST_DATABASE = 'nodecms'
  , md5           = require('./common').md5
  , session       = require('./common').session
  , bc            = require('buffer-concat');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : TEST_DATABASE,
});

connection.connect();

//article list
exports.post = function(req, res){
    session(req, res, function(){
        connection.query(
            'SELECT * FROM posts order by id desc',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                res.render('admin/post', {
                    title: "文章管理",
                    tables:results,
                    user: req.session.user,
                    message: req.flash('message')
                });
            }
        );
    });
};

exports.newPost = function(req, res){
    session(req, res, function(){
        if( req.method === 'GET' ){
            res.render('admin/newPost', {
                title: "添加新文章",
                user: req.session.user,
                message: req.flash('message')
            });
        }
        else if( req.method === 'POST' ){
            var sql = "INSERT INTO post SET email=?, username=?, password=?",
                values = [ req.body.email, req.body.username, md5(req.body.password)];
            connection.query(sql, values, 
                function(err, results){
                    if (err) {
                        throw err;
                    }
                    req.flash('message','新用户添加成功！');
                    res.redirect('/admin/post');
                }
            );
        }
    });
};