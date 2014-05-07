var path = require('path');

exports.config = {
	debug: true,
	name: 'NODECMS',
	description: 'NODECMS - 文章管理系统，开源管理系统，NODEJS',
	keywords: 'NODECMS,文章管理系统,开源管理系统,NODEJS',
	favicon: '/public/favicon.ico',
	//Service
	port: 3000,
	session_secret: 'NODECMS',
    datapath: path.join(__dirname, '/public/data/img')
};