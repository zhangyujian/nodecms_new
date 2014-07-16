var mysql         = require('mysql')
  , md5           = require('./common').md5
  , session       = require('./common').session
  , connection    = require('./common').connection
  , bc            = require('buffer-concat');

//user list
exports.user = function(req, res){
    session(req, res, function(){
        connection.query(
            'SELECT * FROM user order by id desc',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                res.render('admin/user', {
                    title: "用户管理",
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
    session(req, res, function(){
        connection.query(
            'SELECT * FROM user WHERE email ='+ connection.escape(req.body.email) ,
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                if( results !="" ){
                    req.flash('message','邮箱已被注册');
                }else{
                    var sql = "INSERT INTO user SET email=?, username=?, password=?",
                        values = [ req.body.email, req.body.username, md5(req.body.password)];
                    connection.query(sql, values, 
                        function(err, results){
                            if (err) {
                                throw err;
                            }
                        }
                    );
                    req.flash('message','新用户添加成功！');
                }
                res.redirect('/admin/user');
            }
        );
    });
};

//delete user
exports.deluser = function(req, res){
    session(req, res, function(){
        var sql = "DELETE FROM user WHERE id =?",
            values = connection.escape(parseInt(req.params.id));
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                req.flash('message','删除成功');
                res.redirect('/admin/user');
            }
        );
        
    });
}

//edit user
exports.edituser = function(req, res){
    session(req, res, function(){
        var sql = "SELECT * FROM user WHERE id =?",
            values = connection.escape(parseInt(req.params.id));
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                res.render('admin/editUser', {
                    title: "编辑用户",
                    table: results[0],
                    user: req.session.user,
                    message: req.flash('message')
                });
            }
        );
    });
}

//update user
exports.updateuser = function(req, res){
    session(req, res, function(){
        //var uid = parseInt(req.params.id);
        var sql = "UPDATE user SET username =?, email =?, password = ? WHERE id =?",
            values = [ req.body.username, req.body.email, md5(req.body.password), connection.escape(parseInt(req.params.id))];
        connection.query(sql, values, 
            function selectCb(err, results) {
                if (err) {
                    console.log(err);
                }
                req.flash('message','修改成功');
                res.redirect('/admin/user');
            }
        );
    });
}