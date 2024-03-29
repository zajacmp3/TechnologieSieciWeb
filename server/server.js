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
//http://127.0.0.1:9000/server/newsDelete?title=test&content=testcontent&author=testauthor&created=2014-05-10%2015:21:21&modified=2014-05-10%2015:21:21
//http://127.0.0.1:9000/server/newsUpdate?title=test&content=testcontent&author=testauthor&created=2014-05-10%2015:21:21&modified=2014-05-10%2015:21:21&set={%22author%22%20:%20%22dupa%22}

//CRUD services
app.get('/server/serviceSelect', model.serviceSelect);

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
//Update news
app.post('/admin/newsEdit', ensureAuthenticated, function(req, res){
	var params = req.body;
	var now = new Date();
	params.modified = now.getFullYear() + ":" + now.getMonth() + ":" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	var id = params.id;
	delete params.id;
	req.query = {id: id, set : params};
	model.newsUpdate(req, res);
	res.redirect('/admin');
});
//Remove news
app.get('/admin/newsRemove/:id', ensureAuthenticated, function(req, res){
	req.query = {id: req.params.id};
	model.newsDelete(req, res);
	res.redirect('/admin');
});
//Add news
app.post('/admin/newsAdd', ensureAuthenticated, function(req, res){
	req.query = req.body;
	var now = new Date();
	req.query.modified = now.getFullYear() + ":" + now.getMonth() + ":" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	model.newsInsert(req, res);
	res.redirect('/admin');
});

//Services Managment

//Update service
app.post('/admin/serviceEdit', ensureAuthenticated, function(req, res){
	var params = req.body;
	var now = new Date();
	params.modified = now.getFullYear() + ":" + now.getMonth() + ":" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	var id = params.id;
	delete params.id;
	req.query = {id: id, set : params};
	model.serviceUpdate(req, res);
	res.redirect('/admin#/services');
});
//Remove service
app.get('/admin/serviceRemove/:id', ensureAuthenticated, function(req, res){
	req.query = {id: req.params.id};
	model.serviceDelete(req, res);
	res.redirect('/admin#/services');
});
//clean service
app.get('/admin/serviceClean/:id', ensureAuthenticated, function(req, res){
	req.query = {service_id: req.params.id};
	model.reservationDelete(req, res);
	res.redirect('/admin#/services');
});
//Add service
app.post('/admin/serviceAdd', ensureAuthenticated, function(req, res){
	req.query = req.body;
	var now = new Date();
	req.query.modified = now.getFullYear() + ":" + now.getMonth() + ":" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	model.serviceInsert(req, res);
	res.redirect('/admin#/services');
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
	}
	
    socket.on('reserve', function(data) {
			preReservedSeats = [];
			if(data.length < 2)
				return;

			var emailAddress = data.email;
			//Generating random string used to confirm reservation by email
			var confirmId = Math.random().toString(36).substr(10);

  for(var i = 0; i<data.data.length; i++) {
    http.get({hostname: 'localhost', port:app.get('port'), path: "/server/reservationDelete?service_id="+data.data[i].serviceId+"&row="+data.data[i].rowId+"&seat="+data.data[i].seatId, agent: myAgent});
    http.get({hostname: 'localhost', port:app.get('port'), path: "/server/reservationInsert?service_id="+data.data[i].serviceId+"&row="+data.data[i].rowId+"&seat="+data.data[i].seatId+"&status=2&confirmId="+confirmId, agent: myAgent} , updateReservation);
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