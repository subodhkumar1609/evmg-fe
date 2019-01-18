var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var hostServer = 'http://localhost:8080/eventms';
 
//app.use(express.static("foapp"));

app.all("/be/*", function(req, res) {
    console.log('redirecting to host server');
    apiProxy.web(req, res, {target: hostServer});
});
/*
app.get("/fo", function (req, res,next) {
	 res.redirect("/"); 
});
*/
app.listen(process.env.PORT || 5000)	