var config = require('./config.js');

//Database configuration
function configureDb() {
	var mysql = require('mysql');
	var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
		password : ''
	});
	connection.query('USE tsw');
	return connection;
}

exports.newsSelect = function(req, res) {
	console.log(req.query);
	var connection = configureDb();
	connection.query(config.jsonToQuery('select', 'articles', req.query), function(err, rows){
    res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.newsInsert = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('insert', 'articles', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.newsDelete = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('delete', 'articles', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.newsUpdate = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('update', 'articles', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

//Services
exports.serviceSelect = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('select', 'services', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.serviceInsert = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('insert', 'services', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.serviceDelete = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('delete', 'services', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.serviceUpdate = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('update', 'services', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

//Reservation
exports.reservationSelect = function(req, res) {
	console.log(req.query);
	var connection = configureDb();
	connection.query(config.jsonToQuery('select', 'reservation', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.reservationInsert = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('insert', 'reservation', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.reservationDelete = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('delete', 'reservation', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.reservationUpdate = function(req, res) {
	var connection = configureDb();
	connection.query(config.jsonToQuery('update', 'reservation', req.query), function(err, rows){
		res.send({ err : err, rows: rows });
	});
	connection.end();
};

exports.check_auth_user = function (username,password,done,passport,public_id){
	var connection = configureDb();
	connection.query(config.jsonToQuery('select', 'users', {username: username, password: password}), function(err, rows){
        if(rows.length > 0){
            //serialize the query result save whole data as session in req.user[] array  
						var res=rows[0]; 
            passport.serializeUser(function(res, done) {
                done(null,res);
            });
            passport.deserializeUser(function(id, done) {
                done(null,res);
            });
            //console.log(JSON.stringify(results));
            //console.log(results[0]['member_id']);
            return done(null, res);
        }else{
            return done(null, false); 
        }
	});
	connection.end();
};