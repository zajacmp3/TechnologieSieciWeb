var config = require('./config.js');

var connection = config.connection;

exports.newsSelect = function(req, res) {
	connection.query(config.jsonToQuery('select', 'articles', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.newsInsert = function(req, res) {
	connection.query(config.jsonToQuery('insert', 'articles', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.newsDelete = function(req, res) {
	connection.query(config.jsonToQuery('delete', 'articles', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.newsUpdate = function(req, res) {
	connection.query(config.jsonToQuery('update', 'articles', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};