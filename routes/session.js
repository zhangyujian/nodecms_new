exports.session = function(req,res,callback){//登录，保存session
	if (req.session.user) {
        req.session.cookie.expires = new Date(Date.now() + 1000 * 60 * 30);
        //req.session.cookie.maxAge = 1000 * 10;
        callback && callback();
    }else{
        req.session.cookie.expires = false;
        //req.session.cookie.maxAge = false;
        res.redirect('/admin/login.html');
    }
};

