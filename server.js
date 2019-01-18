var proxy = require('express-http-proxy');
var app = require('express')();


var hostServer = 'https://sbd-eventmg.herokuapp.com/groups';
 
app.use('/be', proxy(hostServer));

app.listen(process.env.PORT || 5000)	