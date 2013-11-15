// Single order
function Order(orderNumber) {
    this.orderNumber = orderNumber;
    this.orderCreated = new Date();
    this.orderCompleted = undefined;
    this.orderServed = undefined;
}

Order.prototype.toCompleted = function() {
    this.orderCompleted = new Date();
};

Order.prototype.toServed = function() {
    this.orderServed = new Date();
};

module.exports = Order;

// Collection of Orders
function Orders() {
    this.orders = {};
}

Orders.prototype.add = function(order) {
    this.orderCompleted = new Date();
};

Orders.prototype.remove = function(order) {
    this.orderServed = new Date();
};

Orders.prototype.remove = function(order) {
    this.orderServed = new Date();
};

module.exports = Orders;