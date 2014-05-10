var express = require('express'),
	http = require('http'),
	path = require('path'),
	routes = require('./routes'),
	model = require('./model');

var app = express();
var myAgent = new http.Agent();
myAgent.maxSockets = 100;

app.set('port', process.env.PORT || 9000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '..', 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/test', routes.index);

//CRUD news
//http://127.0.0.1:9000/server/newsSelect
app.get('/server/newsSelect', model.newsSelect);
//http://127.0.0.1:9000/server/newsInsert?title=test&content=testcontent&author=testauthor&created=2014-05-10%2015:21:21&modified=2014-05-10%2015:21:21
app.get('/server/newsInsert', model.newsInsert);
//http://127.0.0.1:9000/server/newsDelete?title=test&content=testcontent&author=testauthor&created=2014-05-10%2015:21:21&modified=2014-05-10%2015:21:21
app.get('/server/newsDelete', model.newsDelete);
//http://127.0.0.1:9000/server/newsUpdate?title=test&content=testcontent&author=testauthor&created=2014-05-10%2015:21:21&modified=2014-05-10%2015:21:21&set={%22author%22%20:%20%22dupa%22}
app.get('/server/newsUpdate', model.newsUpdate);

//CRUD services
app.get('/server/serviceSelect', model.serviceSelect);
app.get('/server/serviceInsert', model.serviceInsert);
app.get('/server/serviceDelete', model.serviceDelete);
app.get('/server/serviceUpdate', model.serviceUpdate);

//CRUD reservation
app.get('/server/reservationSelect', model.reservationSelect);
app.get('/server/reservationInsert', model.reservationInsert);
app.get('/server/reservationDelete', model.reservationDelete);
app.get('/server/reservationUpdate', model.reservationUpdate);

var server = http.createServer(app);

var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

var domainURI = "http://localhost:" + app.get('port');

io.sockets.on('connection', function (socket) {
	
	function updateReservation(){
		socket.emit('reservationChange', {});
	    socket.broadcast.emit('reservationChange', {});
	}
	
    socket.on('reserve', function(data) {
    	if(data.is_reserved) {
    		console.log("DUPA");
	    	http.get({hostname: 'localhost', port:app.get('port'), path: "/server/reservationInsert?service_id="+data.serviceId+"&row="+data.rowId+"&seat="+data.seatId, agent: myAgent} , function(res) {
	    		  console.log("Got response: " + res.statusCode);
	    		  updateReservation();
	    		}).on('error', function(e) {
	    		  console.log("Got error: " + e.message);
			});
    	} else {
    		console.log("EDUPA");
    		http.get({hostname: 'localhost', port:app.get('port'), path: "/server/reservationDelete?service_id="+data.serviceId+"&row="+data.rowId+"&seat="+data.seatId, agent: myAgent} , function(res) {
	    		  console.log("Got response: " + res.statusCode);
	    		  updateReservation();
	    		}).on('error', function(e) {
	    		  console.log("Got error: " + e.message);
			});
    	}
    });
});