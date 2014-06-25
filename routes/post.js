var mysql         = require('mysql')
  , TEST_DATABASE = 'nodecms'
  , md5           = require('./common').md5
  , session       = require('./common').session
  , bc            = require('buffer-concat')
  , fs            = require('fs')
  , markdown      = require('markdown').markdown;

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

exports.newpost = function(req, res){
    session(req, res, function(){
        if( req.method === 'GET' ){
            connection.query(
                'SELECT * FROM cat order by id desc',
                function selectCb(err, results, fields) {
                    if (err) {
                        throw err;
                    }

                    fs.readdir('./public/upload/img/', function(err,data){
                        if(err){
                            console.error(err);
                        }else{
                            var arr = [];
                            for (var i = 0; i < data.length; i++) {
                                arr.push(data[i]);
                            }
                            res.render('admin/newPost', {
                                title: "添加新文章",
                                user: req.session.user,
                                tables:results,
                                imgs: arr,
                                message: req.flash('message')
                            });
                        }
                    });

                }
            );
        }
        else if( req.method === 'POST' ){
            var date = new Date;
            var sql = "INSERT INTO posts SET title=?, author=?, date=?, content=?, cid=?",
                values = [ req.body.title, req.session.user.username, date, req.body.content, req.body.cid];
            connection.query(sql, values, 
                function(err, results){
                    if (err) {
                        throw err;
                    }
                    req.flash('message','文章添加成功！');
                    res.redirect('/admin/post');
                }
            );
        }
    });
};

//delete post
exports.delpost = function(req, res){
    session(req, res, function(){
        var sql = "DELETE FROM posts WHERE id =?",
            values = connection.escape(parseInt(req.params.id));
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                req.flash('message','删除成功');
                res.redirect('/admin/post');
            }
        );
        
    });
}