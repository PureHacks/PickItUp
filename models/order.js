// Single order
function Order(orderNumber) {
	this.orderNumber = orderNumber;
	this.orderCreated = new Date();
	this.orderCompleted = undefined;
	this.orderServed = undefined;

	this.toCompleted = function() {
		this.orderCompleted = new Date();
	};
	this.toServed = function() {
		this.orderServed = new Date();
	};
};

module.exports = Order;