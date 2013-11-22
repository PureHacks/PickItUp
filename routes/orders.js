/*
 * Handels the orders
 */



var Order = require('../models/order')
	, Orders = require('../models/orders')
	, exec = require('child_process').exec

var orderNum = 1
	,maxOrderNum = 99
	,ordersInProgress = new Orders()
	,ordersCompleted = new Orders()
	,ordersCompletedIndex = 0
	,displayNumberTime = 3000; //in ms


exports.create = function(req, res) {
	var newOrder = new Order(orderNum);
	ordersInProgress.add(newOrder);
	if(orderNum < maxOrderNum){
		orderNum ++;
	}else{
		orderNum = 1;
	}
	//TODO: store in persistance layer
	res.send({ orderNumber: newOrder.orderNumber , action : 'added' });
};

exports.complete = function(req, res) {
	var orderNum = req.params.orderNumber;
	if(orderNum){
		var order = ordersInProgress.getOrder(orderNum);
		if(order){
			order.toCompleted();
			ordersInProgress.remove(orderNum);
			ordersCompleted.add(order);
			res.send({ orderNumber: orderNum , action : 'complete' });
			//TODO: store in persistance layer
		}else{
			res.send({ error: "Order Not Found" , action : 'complete' });
		}
	}
	
};

exports.serve = function(req, res) {
	var orderNum = req.params.orderNumber;
	if(orderNum){
		var order = ordersCompleted.getOrder(orderNum);

		if(order){
			order.toServed();
			ordersCompleted.remove(orderNum);
			res.send({ orderNumber: orderNum , action : 'added' });
		}else{
			res.send({ error: "Order Not Found" , action : 'added' });
		}
		//TODO: store in persistance layer
	}
};

exports.getAllOrders = function(req, res) {
	res.send({ ordersCompleted: ordersCompleted , ordersInProgress : ordersInProgress});
};


var refreshDisplay = function(){
	if(ordersCompletedIndex >= ordersCompleted.getNumOrders() ){
		ordersCompletedIndex = 0;
	}
	if(ordersCompleted.getNumOrders() > 0){
		exec(__dirname + "/output_number.sh "+ordersCompleted[ordersCompletedIndex]+" " + displayNumberTime);
		ordersCompletedIndex++;
	}
}

setInterval(refreshDisplay, displayNumberTime + 200);


/*app.post('/orderReady', function(req, res){//sendnumber
	
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



*/
