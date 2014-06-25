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

//cat list
exports.cat = function(req, res){
    session(req, res, function(){
        connection.query(
            'SELECT * FROM cat order by id desc',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                res.render('admin/cat', {
                    title: "分类管理",
                    tables:results,
                    user: req.session.user,
                    message: req.flash('message')
                });
            }
        );
    });
};

// add cat
exports.addcat = function(req, res){
    session(req, res, function(){
        connection.query(
            'SELECT * FROM cat WHERE name ='+ connection.escape(req.body.name) ,
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                if( results !="" ){
                    req.flash('message','分类名称已存在');
                }else{
                    var sql = "INSERT INTO cat SET name=?, link=?",
                        values = [ req.body.name, req.body.link];
                    connection.query(sql, values, 
                        function(err, results){
                            if (err) {
                                throw err;
                            }
                        }
                    );
                    req.flash('message','分类添加成功！');
                }
                res.redirect('/admin/cat');
            }
        );
    });
};

//delete cat
exports.delcat = function(req, res){
    session(req, res, function(){
        var sql = "DELETE FROM cat WHERE id =?",
            values = connection.escape(parseInt(req.params.id));
        connection.query(sql, values,
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                req.flash('message','删除成功');
                res.redirect('/admin/cat');
            }
        );
        
    });
}

//edit user
exports.editcat = function(req, res){
    session(req, res, function(){
        var sql = "SELECT * FROM cat WHERE id =?",
            values = connection.escape(parseInt(req.params.id));
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                res.render('admin/editCat', {
                    title: "编辑分类",
                    table: results[0],
                    user: req.session.user,
                    message: req.flash('message')
                });
            }
        );
    });
}

//update cat
exports.updatecat = function(req, res){
    session(req, res, function(){
        //var uid = parseInt(req.params.id);
        var sql = "UPDATE cat SET name =?, link =? WHERE id =?",
            values = [ req.body.name, req.body.link, connection.escape(parseInt(req.params.id))];
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                req.flash('message','修改成功');
                res.redirect('/admin/cat');
            }
        );
    });
}