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