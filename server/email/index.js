var nodemailer = require("nodemailer");
var config = require("./config.js");
var model = require('../model');
var http = require('http');

exports.confirm = function(req, response){
	http.get('http://' + req.headers.host + '/server/reservationUpdate?confirmId=' + req.params.confirmId + '&set={%22confirmId%22%20:%20%22%22}', function(res) {
		//This is kinda clever. Browser remembers tha this redirects and does not ever again do this. Thanks browser!
		response.writeHead(301,
		  {Location: 'http://' + req.headers.host}
		);
		response.end();
	});
	console.log('/server/reservationUpdate?confirmId=' + req.params.confirmId + '&set={%22confirmId%22%20:%20%22%22}');
};

exports.sendEmail = function(email, confirmId) {
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: config.username,
	        pass: config.password
	    }
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: "Twoja Parafia ✔ <twoja@parafia.com>", // sender address
	    to: email, // list of receivers
	    subject: "Potwierdź rezerwację miejsca ✔", // Subject line
	    text: "Wklej ten link do przeglądarki by potwierdzić: http://localhost:9000/confirm/" + confirmId + " ✔", // plaintext body
	    html: "<a href='http://localhost:9000/confirm/" + confirmId + "'>Kliknij aby potwierdzić złożenie rezerwacji</a>" // html body
	};

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	    }

	    // if you don't want to use this transport object anymore, uncomment following line
	    //smtpTransport.close(); // shut down the connection pool, no more messages
	});
};