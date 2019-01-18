/*
var proxy = require('express-http-proxy');
var app = require('express')();


var hostServer = 'https://sbd-eventmg.herokuapp.com/groups';
 
app.use('/be', proxy(hostServer));

app.listen(process.env.PORT || 5000)	
*/

var express  = require('express');
var app      = express();
//var hostServer = 'https://sbd-eventmg.herokuapp.com';
const https =  require('https');
 
//app.use(express.static("foapp"));

app.all("/be/*", function(req, res) {
    console.log('redirecting to host server');
    console.log(req.method);
    console.log(req.url);
    console.log(req.body);
   // apiProxy.web(req, res, {target: hostServer});
   
    
    var options = {
    		  hostname: 'localhost',
    		  port: 8080,
    		  path: '/eventms/' + req.url,
    		  method: req.method,
    		  headers: {
    			    'Content-Type': 'application/json'
    			 	   }
    }
    

    const reqForward = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
      
      reqForward.on('data', (d) => {
        process.stdout.write(d)
      })
    })

    reqForward.on('error', (error) => {
      console.error(error)
    })

    if(req.method == 'POST' || req.method == 'PUT')
    	reqForward.write(req.body)
    
    console.error(res)
    console.error(res.body)	
    reqForward.end()
});

app.listen(process.env.PORT || 5000)