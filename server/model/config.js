//Database configuration
var mysql = require('mysql');
var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : ''
});
connection.query('USE tsw');

//Setting variable that is available through this model.
exports.connection = connection;
