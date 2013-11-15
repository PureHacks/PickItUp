// Collection of Orders
function Orders() {
    this.orders = {};
}

Orders.prototype.add = function(order) {
    if (order){
        this.orders.push(order);
    }
};

Orders.prototype.remove = function(orderNum) {
    if (orderNum){
        var order = this.orders.getOrder(orderNum)
        var index = this.orders.indexOf(order);
        if (index > -1) {
            this.orders.splice(index, -1);
        }
    }
};

Orders.prototype.getOrder = function(orderNumber) {
    if (orderNumber){
        return this.orders.filter(order.orderNumber == orderNumber);
    }
};

Orders.prototype.getNumOrders = function(order) {
    return this.orders.length;
};

module.exports = Orders;