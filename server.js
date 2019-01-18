var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var hostServer = 'https://sbd-eventmg.herokuapp.com';
 
app.use(express.static("foapp"));

app.get("/", function (req, res,next) {
	 res.redirect("/"); 
});

app.all("/be/*", function(req, res) {
    console.log('redirecting to host server');
    apiProxy.web(req, res, {target: hostServer});
});

app.listen(80);