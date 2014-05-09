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

//Services
exports.serviceSelect = function(req, res) {
	connection.query(config.jsonToQuery('select', 'services', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.serviceInsert = function(req, res) {
	connection.query(config.jsonToQuery('insert', 'services', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.serviceDelete = function(req, res) {
	connection.query(config.jsonToQuery('delete', 'services', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.serviceUpdate = function(req, res) {
	connection.query(config.jsonToQuery('update', 'services', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

//Reservation
exports.reservationSelect = function(req, res) {
	connection.query(config.jsonToQuery('select', 'reservation', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.reservationInsert = function(req, res) {
	connection.query(config.jsonToQuery('insert', 'reservation', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.reservationDelete = function(req, res) {
	connection.query(config.jsonToQuery('delete', 'reservation', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};

exports.reservationUpdate = function(req, res) {
	connection.query(config.jsonToQuery('update', 'reservation', req.query), function(err, rows){
	    res.send({ err : err, rows: rows });
	});
};