var express  = require('express');
var app      = express();
var hostServer = '';



const bodyParser = require('body-parser');
var utils = require('./lib/utils');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get("/emailer", function(req, res) {
	//console.log(req);
	console.log('Email Request recieved');
	res.send("hi");
})

app.post("/emailer", function(req, res) {
	try {
		var emailObject = req.body;
		console.log('Email request is recieved : ' + emailObject.name + ' : ' + emailObject.email);	
		utils.sendEmailToHost(emailObject);
		var status = {statusCode : 200, statusMessage : 'Email Send Success'};
		res.send(status);
	} catch (err) {
		var status = {statusCode : 500, statusMessage : 'Email Send Failure'};
		res.send(status);
	}
})

app.listen(process.env.PORT || 5000)	