var http = require('http');

var mysql = require('mysql');
var TEST_DATABASE = 'nodecms';
var TEST_TABLE = 'testnodetable2';

var connection = mysql.createConnection({
    host : 'localhost',
	  port : 3306,
    user : 'root',
    password : 'root',
});


//不指定回调函数，如果出错，则体现为客户端错误
connection.query('USE '+TEST_DATABASE);
/*
//创建数据库
connection.query('CREATE DATABASE '+TEST_DATABASE, function(err) {
  if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
    throw err;
  }
});



//创建表格,插入数据
connection.query(
  'CREATE TABLE '+TEST_TABLE+
  '(id INT(11) AUTO_INCREMENT, '+
  'name VARCHAR(255), '+
  'PRIMARY KEY (id))'
);
*/
connection.query(
  'INSERT INTO '+TEST_TABLE+' '+
  'SET name = ?',
  ['nodejs1']
);

var query = connection.query(
  'INSERT INTO '+TEST_TABLE+' '+
  'SET name = ?',
  ['nodejs2']
);

//查询，并设置回调函数
connection.query(
  'SELECT * FROM '+TEST_TABLE,
  function selectCb(err, results, fields) {
    if (err) {
      throw err;
    }

    console.log(results);
    console.log(fields);
    connection.end();
  }
);



http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('<b>Hello World</b>');
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');