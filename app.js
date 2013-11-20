
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , sys = require('sys')
  , exec = require('child_process').exec

var app = express();

// all environments
app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);


if ('production' !== process.env.NODE_ENV) {
  // development only
  app.set('views', __dirname + '/app');
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
}
else {
  // production
  app.set('views', __dirname + '/dist');
  app.use(express.static(path.join(__dirname, 'dist')));
}


app.use(express.favicon(__dirname + 'favicon.ico')); 

var pickupOrderNumbers = [];
var pickupOrderIndex = 0;
var displayNumberTime = 3000; //in ms

app.get('/', routes.index);

app.post('/orderReady', function(req, res){//sendnumber
  
  var orderNumber = req.body.orderNumber;
  if(pickupOrderNumbers.indexOf(orderNumber) == -1){
    pickupOrderNumbers.push(orderNumber);
  }
  res.send({ orderNumber: orderNumber , type : 'added' });
});

app.post('/removeOrder', function(req, res){//sendnumber
  var orderNumber = req.body.orderNumber;
  var index = pickupOrderNumbers.indexOf(orderNumber);
  if (index > -1) {
      pickupOrderNumbers.splice(index, 1);
  }
  res.send({ orderNumber: orderNumber , type : 'removed' });
});


var refreshDisplay = function(){
  if(pickupOrderIndex >=pickupOrderNumbers.length ){
    pickupOrderIndex = 0;
  }
  if(pickupOrderNumbers.length > 0){
    exec(__dirname + "/output_number.sh "+pickupOrderNumbers[pickupOrderIndex]+" " + displayNumberTime);
    pickupOrderIndex++;
  }
}

setInterval(refreshDisplay,displayNumberTime + 200);



module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port') + ' ' + process.env.NODE_ENV);
});
