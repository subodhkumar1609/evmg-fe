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
	
	
	var emailObject = req.body;
	console.log(emailObject)
	console.log('Email request is recieved : ' + emailObject.name + ' : ' + emailObject.email);	
	utils.sendEmailToHost(emailObject);
	res.send("recievd");
})

app.listen(process.env.PORT || 5000)	