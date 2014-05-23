var mysql         = require('mysql')
  , TEST_DATABASE = 'nodecms'
  , path          = require('path')
  , md5           = require('./common').md5
  , session       = require('./common').session
  , fs            = require('fs')
  , config        = require('../config').config
  , bc            = require('buffer-concat')
  , multiparty    = require('multiparty');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : TEST_DATABASE,
});

connection.connect();

// uploadify 
exports.upload = function (req, res) {
    session(req, res, function(){
        if( req.method === 'GET' ){
            fs.readdir('./public/upload/temp/', function(err,data){
                if(err){
                    console.error(err);
                }else{
                    var arr = [];
                    for (var i = 0; i < data.length; i++) {
                        arr.push(data[i]);
                    }
                    //console.log(arr);
                    res.render('admin/upload', {
                        title: "文件上传",
                        user: req.session.user,
                        tables: arr,
                        message: req.flash('message')
                    });
                }
            });
            
        }
        else if( req.method === 'POST' ){
            var options = {
                    uploadDir : './public/upload/temp',
                    keepExtensions : false,
                    maxFilesSize: 204800
                },
                form = new multiparty.Form(options),
                done = false;
            
            form.on('error', function(err) {
                console.log(err);
                done = true;
                req.resume();
            });
            
            form.on('progress', function(bytesReceived, bytesExpected) {
                var rate = ((bytesReceived / bytesExpected)*100) + "% uploaded";
                console.log(rate);
            });
            
            form.parse(req, function(err, fields, files) {
                if(done){
                    req.flash('message','�ļ�����2M���������ϴ�');
                }else{
                    req.flash('message','上传成功');
                }
                res.redirect('/admin/upload');
            });
        }
    });
};