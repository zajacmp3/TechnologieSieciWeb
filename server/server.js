var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , model = require('./model');

var app = express();

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
//http://127.0.0.1:9000/server/newsSelect
app.get('/server/serviceSelect', model.serviceSelect);
//http://127.0.0.1:9000/server/newsInsert?title=test&content=testcontent&author=testauthor&created=2014-05-10%2015:21:21&modified=2014-05-10%2015:21:21
app.get('/server/serviceInsert', model.serviceInsert);
//http://127.0.0.1:9000/server/newsDelete?title=test&content=testcontent&author=testauthor&created=2014-05-10%2015:21:21&modified=2014-05-10%2015:21:21
app.get('/server/serviceDelete', model.serviceDelete);
//http://127.0.0.1:9000/server/newsUpdate?title=test&content=testcontent&author=testauthor&created=2014-05-10%2015:21:21&modified=2014-05-10%2015:21:21&set={%22author%22%20:%20%22dupa%22}
app.get('/server/serviceUpdate', model.serviceUpdate);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});