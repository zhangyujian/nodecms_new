// JavaScript Document
var index      = require('./routes/index')
  , admin      = require('./routes/admin')
  , user       = require('./routes/user')
  , art        = require('./routes/post')
  , upload	   = require('./routes/upload')
  , data	   = require('./routes/data')
  , cat		   = require('./routes/cat');

module.exports = function(app){
	
	// Routes
	app.get('/', index.index);
	app.get('/contact', index.contact);
	app.get('/about', index.about);
	app.get('/product', index.product);
	app.get('/movie', index.movie);
	app.get('/server', index.server);
	// Admin Routes
	app.get('/admin', admin.index);
		//user
	app.get('/admin/user', user.user);
	app.post('/admin/adduser',user.adduser);
	app.get('/admin/deluser/:id',user.deluser);
	app.get('/admin/edituser/:id',user.edituser);
	app.post('/admin/updateuser/:id',user.updateuser);
		//cat
	app.get('/admin/cat', cat.cat);
	app.post('/admin/addcat',cat.addcat);
	app.get('/admin/delcat/:id',cat.delcat);
	app.get('/admin/editcat/:id',cat.editcat);
	app.post('/admin/updatecat/:id',cat.updatecat);
		//article
	app.get('/admin/post', art.post);
	app.get('/admin/newpost', art.newpost);
	app.post('/admin/addpost', art.newpost);
	app.get('/admin/delpost/:id', art.delpost);
	app.get('/admin/editpost/:id',art.editpost);
	app.post('/admin/updatepost/:id',art.updatepost);
	//app.post('/admin/updatearticle/:id',admin.updatearticle);

		//date
	app.get('/admin/data',data.data);
	app.post('/admin/export',data.export);

		//upload
	app.get('/admin/upload',upload.upload);
	app.post('/admin/upload',upload.upload);
	app.get('/admin/delimg/:name',upload.delimg);

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



