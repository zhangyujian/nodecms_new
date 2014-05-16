// JavaScript Document
var index      = require('./routes/index')
  , admin      = require('./routes/admin')
  , user       = require('./routes/user')
  , art        = require('./routes/post')
  , upload	   = require('./routes/upload');

module.exports = function(app){
	
	// Routes
	app.get('/', index.index);
	app.get('/login.html', index.login);

	// Admin Routes
	app.get('/admin', admin.index);
		//user
	app.get('/admin/user', user.user);
	app.post('/admin/adduser',user.adduser);
	app.get('/admin/deluser/:id',user.deluser);
	app.get('/admin/edituser/:id',user.edituser);
	app.post('/admin/updateuser/:id',user.updateuser);
		//article
	app.get('/admin/post', art.post);
	app.get('/admin/newPost', art.newPost);
	//app.post('/admin/addarticle',article.addarticle);
	//app.get('/admin/delarticle/:id',article.delarticle);
	//app.get('/admin/editarticle/:id',article.editarticle);
	//app.post('/admin/updatearticle/:id',admin.updatearticle);

	app.post('/admin/upload',upload.upload);

	//Admin Login Routes
	app.get('/admin/login', admin.login);
	app.post('/admin/login',admin.login);
	app.get('/admin/logout',admin.logout);

	app.get('*', function(req, res){
	    res.render('admin/404', {
	        title: '404'
	    })
	});

};



