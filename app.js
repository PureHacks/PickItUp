
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, sys = require('sys')
	, orders = require('./routes/orders');


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
	app.use(express.favicon(__dirname + '/app/assets/img/favicon.ico'));
	app.use(express.errorHandler());
}
else {
	// production
	app.set('views', __dirname + '/dist');
	app.use(express.static(path.join(__dirname, 'dist')));
	app.use(express.favicon(__dirname + '/app/assets/img/favicon.ico'));
}



app.get('/', routes.index);
app.get('/order/all', orders.getAllOrders);
app.post('/order/create', orders.create);
app.post('/order/:orderNumber/ready', orders.complete);
app.post('/order/:orderNumber/picked-up', orders.serve);
//app.get('/orders', routes.orders);



module.exports = app;

var io = require('socket.io').listen(http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port') + ' ' + process.env.NODE_ENV);
}));
