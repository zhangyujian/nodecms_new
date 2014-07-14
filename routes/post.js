var mysql         = require('mysql')
  , md5           = require('./common').md5
  , session       = require('./common').session
  , connection    = require('./common').connection
  , bc            = require('buffer-concat')
  , fs            = require('fs')
  , format        = require('../libs/util').format
  , markdown      = require('markdown').markdown;

//article list
exports.post = function(req, res){
    session(req, res, function(){
        var total = 0,
            num = 0,
            page = 1,
            tables = {};

        var urlArr = req.url.split("?page=");
        if(urlArr.length != 1 ){
            page = urlArr[1];
        }

        connection.query(
            'SELECT count(*) FROM posts',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                total = results[0]['count(*)'];
                num++;
                render();
            }
        );

        connection.query(
            'SELECT * FROM posts order by id desc limit '+ (parseInt(2*page) - 2) +',2',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                tables = results;
                num++;
                render();
                
            }
        );

        function render(){
            if(num==2){
                res.render('admin/post', {
                    title: "文章管理",
                    tables:tables,
                    total: total,
                    user: req.session.user,
                    message: req.flash('message')
                });
            }else{
                return;
            }
        }

    });
};

exports.newpost = function(req, res){
    session(req, res, function(){
        if( req.method === 'GET' ){
            var tables = {},
                imgs   = []
                num    = 0;

            connection.query(
                'SELECT * FROM cat order by id desc',
                function selectCb(err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    tables = results;
                    num++;
                    render();
                }
            );

        connection.query(
            'SELECT * FROM media order by id desc',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                imgs = results;
                num++;
                render();
            }
        );
/*
        fs.readdir('./public/upload/img/', function(err,data){
            if(err){
                console.error(err);
            }else{
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr.push(data[i]);
                }
                imgs = arr;
                num++;
                render();
            }
        });
*/

            function render(){
                if(num==2){
                    res.render('admin/newPost', {
                        title: "添加新文章",
                        user: req.session.user,
                        tables:tables,
                        imgs: imgs,
                        message: req.flash('message')
                    });
                }else{
                    return;
                }
            }
            

        }
        else if( req.method === 'POST' ){
            var date = new Date;
            var sql = "INSERT INTO posts SET title=?, author=?, date=?, content=?, cid=?, feature=?",
                values = [ req.body.title, req.session.user.username, date, req.body.content, req.body.cid, req.body.feature];
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

//edit post
exports.editpost = function(req, res){
    session(req, res, function(){
        var post  = {}
            cats   = {},
            imgs   = []
            num    = 0;

        var sql = "SELECT * FROM posts WHERE id =?",
            values = connection.escape(parseInt(req.params.id));
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                post = results[0];
                num++;
                render();
                
            }
        );

        connection.query(
            'SELECT * FROM cat order by id desc',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                cats = results;
                num++;
                render();
            }
        );

        connection.query(
            'SELECT * FROM media order by id desc',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                imgs = results;
                num++;
                render();
            }
        );
/*
        fs.readdir('./public/upload/img/', function(err,data){
            if(err){
                console.error(err);
            }else{
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr.push(data[i]);
                }
                imgs = arr;
                num++;
                render();
            }
        });
*/

        function render(){
            if(num==3){
                res.render('admin/editPost', {
                    title: "编辑文章",
                    post: post,
                    cats: cats,
                    imgs: imgs,
                    user: req.session.user,
                    message: req.flash('message')
                });
            }else{
                return;
            }
        }

        
    });
}


exports.updatepost = function(req, res){
    session(req, res, function(){
        var date = new Date;
        var sql = "UPDATE posts SET title=?, author=?, date=?, content=?, cid=?, feature=? WHERE id =?",
            values = [ req.body.title, req.session.user.username, date, req.body.content, req.body.cid, req.body.feature, connection.escape(parseInt(req.params.id))];
        connection.query(sql, values, 
            function(err, results){
                if (err) {
                    throw err;
                }
                req.flash('message','文章添加成功！');
                res.redirect('/admin/post');
            }
        );
    });
};