var crypto = require('crypto');
var mysql  = require('mysql');
//md5
exports.md5 = function(str){
	var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};
//session
exports.session = function(req,res,callback){//登录，保存session
	if (req.session.user) {
        req.session.cookie.expires = new Date(Date.now() + 1000 * 60 * 30);
        //req.session.cookie.maxAge = 1000 * 10;
        callback && callback();
    }else{
        req.session.cookie.expires = false;
        //req.session.cookie.maxAge = false;
        res.redirect('/admin/login');
    }
};

exports.connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'nodecms',
});