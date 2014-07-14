var mysql         = require('mysql')
  , md5           = require('./common').md5
  , session       = require('./common').session
  , connection    = require('./common').connection
  , bc            = require('buffer-concat');

//cat list
exports.data = function(req, res){
    session(req, res, function(){
        res.render('admin/data', {
            title: "数据管理",
            user: req.session.user,
            message: req.flash('message')
        });
    });
};

exports.export = function(req, res){
    session(req, res, function(){
        connection.query(
            'mysqldump -hlocalhost -uroot -proot nodecms > testtest.sql',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                req.flash('message','导出成功！');
                res.redirect('/admin/data');
            }
        );
    });
};