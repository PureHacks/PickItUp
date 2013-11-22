// Collection of Orders


function Orders(){
	this.orders = [];

	this.add = function(order) {
		if (order){
			this.orders.push(order);
		}
	};

	this.remove = function(orderNum) {
		if (orderNum){
			var index = this.orders.indexOf(this.getOrder(orderNum));
			if (index > -1) {
				this.orders.splice(index, -1);
			}
		}
	};

	this.getOrder = function(orderNumber) {
		if (orderNumber){
			var order = this.orders.filter(function(o){return o.orderNumber == orderNumber});
			if(order.length > 0){
				return order[0];
			}			
		}
		return undefined;
	};

	this.getNumOrders = function(order) {
		return this.orders.length;
	};
};

module.exports = Orders;