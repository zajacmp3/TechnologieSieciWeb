var config = require('./config');

exports.news = function(req, res) {
	config.connection.query('SELECT * FROM articles', function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};