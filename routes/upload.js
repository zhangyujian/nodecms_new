var mysql         = require('mysql')
  , TEST_DATABASE = 'nodecms'
  , path          = require('path')
  , md5           = require('./common').md5
  , session       = require('./common').session
  , fs            = require('fs')
  , config        = require('../config').config
  , bc            = require('buffer-concat');

var multiparty = require('multiparty');

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
            res.render('admin/upload', {
                title: "文件上传",
                user: req.session.user,
                message: req.flash('message')
            });
        }
        else if( req.method === 'POST' ){
            //console.log(__dirname);
            var form = new multiparty.Form({
                    uploadDir:'./public/upload/temp',
                    maxFilesSize: 20480000
                });

            form.on('progress', function(bytesReceived, bytesExpected) {
                console.log(((bytesReceived / bytesExpected)*100) + "% uploaded");
            });
            form.parse(req, function(err, fields, files) {
                if(err){
                    console.log(err);
                    //req.flash('message','文件大小超过2M');
                    //res.send(err);
                }else{
                    var path = files.Filedata[0].path,
                        name = path.split("temp\\")[1];
                    res.send(name);
                }
            });
        }
    });
};