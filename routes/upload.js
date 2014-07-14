var mysql         = require('mysql')
  , path          = require('path')
  , md5           = require('./common').md5
  , session       = require('./common').session
  , connection    = require('./common').connection
  , fs            = require('fs')
  , config        = require('../config').config
  , bc            = require('buffer-concat')
  , multiparty    = require('multiparty');

// uploadify 
exports.upload = function (req, res) {
    session(req, res, function(){
        if( req.method === 'GET' ){
            
            
            var total = 0,
                num = 0,
                page = 1,
                tables = {};

            var urlArr = req.url.split("?page=");
            if(urlArr.length != 1 ){
                page = urlArr[1];
            }

            connection.query(
                'SELECT count(*) FROM media',
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
                'SELECT * FROM media order by id desc limit '+ (parseInt(2*page) - 2) +',2',
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
                    res.render('admin/upload', {
                        title: "文件上传",
                        tables:tables,
                        total: total,
                        user: req.session.user,
                        message: req.flash('message')
                    });
                }else{
                    return;
                }
            }
            
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
                    res.redirect('/admin/upload');
                }else{
                    for (var i = 0; i < files.files.length; i++) {
                        var oldname = files.files[i].path.split("\\upload\\img\\")[1];
                        var sql = "INSERT INTO media SET oldname=?",
                            values = [ oldname ];
                        connection.query(sql, values, 
                            function(err, results){
                                if (err) {
                                    throw err;
                                }
                            }
                        );
                    };

                    req.flash('message','上传成功');
                    res.redirect('/admin/upload');
                    
                }
                
            });
        }
    });
};

//delete img
exports.delimg = function(req, res){
    session(req, res, function(){
        fs.unlink('./public/upload/img/'+req.params.name, function(err,data){
            if(err){
                console.error(err);
                req.flash('message','删除失败');
                res.redirect('/admin/upload');
            }else{
                req.flash('message','删除成功');
                res.redirect('/admin/upload');
            }
        });
        
    });
}