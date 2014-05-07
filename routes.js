// JavaScript Document
var index      = require('./routes/index')
  , admin      = require('./routes/admin');
module.exports = function(app){
	
	// Routes
	app.get('/', index.index);
	app.get('/login.html', index.login);

	// Admin Routes
	app.get('/admin', admin.index);
	
	app.get('/admin/login.html', admin.login);
	app.post('/admin/login.html',admin.login);

	app.get('*', function(req, res){
	    res.render('404', {
	        title: '404'
	    })
	});

};



