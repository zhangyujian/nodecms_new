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
            fs.readdir('./public/upload/img/', function(err,data){
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
            /****上传并穿件日期文件夹
            var date = new Date();
            var year = date.getFullYear();
            var mon = date.getMonth();
            var folderName = year+"-"+(mon+1);
            var dirPath = "./public/upload/temp/"+folderName+"/";

            if(!fs.existsSync(dirPath)){
                fs.mkdirSync(dirPath);
            }
            ************************/
            
            var options = {
                    uploadDir : "./public/upload/img/",
                    keepExtensions : false,
                    maxFilesSize: 2*1024*1024
                },
                form = new multiparty.Form(options),
                done = false;
            
            form.on('error', function(err) {
                done = true;
                req.resume();
            });
            
            form.on('progress', function(bytesReceived, bytesExpected) {
                var rate = ((bytesReceived / bytesExpected)*100) + "% uploaded";

            });
            
            form.parse(req, function(err, fields, files) {
                if(done){
                    req.flash('message','文件超过2M，请重新上传');
                }else{
                    req.flash('message','上传成功');
                }
                res.redirect('/admin/upload');
            });
        }
    });
};