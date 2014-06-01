var express = require('express'),
	http = require('http'),
	path = require('path'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	routes = require('./routes'),
	model = require('./model'),
	email = require('./email');

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
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '..', 'app')));
//Express viewing engine configure
app.set('views', path.join(__dirname, '..', 'app/views'));
app.engine('html', require('ejs').renderFile);

passport.use(new LocalStrategy(
    function(username, password, done) {
        return model.check_auth_user(username,password,done,passport);
    }
));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/test', routes.index);
app.get('/confirm/:confirmId', email.confirm);

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

//Admin Panel
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/#/admin'
    })
);
app.get('/admin', ensureAuthenticated, function(req, res){
	res.render('admin/index.html');
});

var server = http.createServer(app);

var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

var domainURI = "http://localhost:" + app.get('port');

io.sockets.on('connection', function (socket) {
	
	var preReservedSeats = [];
	
	function updateReservation() {
	    io.sockets.emit('reservationChange', {});
	}
	
	function preReserveChange(data) {
    	preReservedSeats.push(data);
    	if(data.is_prereserved) {
	    	http.get({hostname: 'localhost', port:app.get('port'), path: "/server/reservationInsert?service_id="+data.serviceId+"&row="+data.rowId+"&seat="+data.seatId+"&status=1", agent: myAgent} , function(res) {
    		  console.log("Got response: " + res.statusCode);
    		  updateReservation();
    		}).on('error', function(e) {
    		  console.log("Got error: " + e.message);
	    	});
    	} else {
    		http.get({hostname: 'localhost', port:app.get('port'), path: "/server/reservationDelete?service_id="+data.serviceId+"&row="+data.rowId+"&seat="+data.seatId, agent: myAgent} , function(res) {
      		  console.log("Got response: " + res.statusCode);
    		  updateReservation();
    		}).on('error', function(e) {
    		  console.log("Got error: " + e.message);
    		});
    	}
    };
	
    socket.on('reserve', function(data) {
    	preReservedSeats = [];
    	if(data.length < 2)
    		return;
    	
    	var emailAddress = data.email;
    	//Generating random string used to confirm reservation by email
    	var confirmId = Math.random().toString(36).substr(10);
    	
    	for(var i = 0; i<data.data.length; i++) {
    		http.get({hostname: 'localhost', port:app.get('port'), path: "/server/reservationDelete?service_id="+data.data[i].serviceId+"&row="+data.data[i].rowId+"&seat="+data.data[i].seatId, agent: myAgent});
        	http.get({hostname: 'localhost', port:app.get('port'), path: "/server/reservationInsert?service_id="+data.data[i].serviceId+"&row="+data.data[i].rowId+"&seat="+data.data[i].seatId+"&status=2&confirmId="+confirmId, agent: myAgent} , function(res) {
    		  console.log("Got response: " + res.statusCode);
    		  updateReservation();
    		}).on('error', function(e) {
    		  console.log("Got error: " + e.message);
    		});
    	}
		//Sending email confirmation
		email.sendEmail(emailAddress, confirmId);
    });
    socket.on('prereserve', preReserveChange);
    
    //If client disconnects with pre reserved seats server will remove them.
	socket.on('disconnect', function() {
		for(var record in preReservedSeats) {
			preReserveChange({rowId: preReservedSeats[record].rowId, seatId: preReservedSeats[record].seatId, serviceId: preReservedSeats[record].serviceId, is_prereserved: false});
		}
		preReservedSeats = [];
	});
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/#/admin');
}