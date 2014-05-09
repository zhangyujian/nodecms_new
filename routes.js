// JavaScript Document
var index      = require('./routes/index')
  , admin      = require('./routes/admin');
module.exports = function(app){
	
	// Routes
	app.get('/', index.index);
	app.get('/login.html', index.login);

	// Admin Routes
	app.get('/admin', admin.index);
	app.get('/admin/user', admin.user);
	
	app.post('/admin/adduser',admin.adduser);
	app.get('/admin/deluser/:id',admin.deluser);
	app.get('/admin/edituser/:id',admin.edituser);
	app.post('/admin/updateuser/:id',admin.updateuser);

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



