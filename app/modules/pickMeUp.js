var Order = require('./order');
var Orders = require('./orders');

// Main Order System
function PickMeUp() {
    this.ordersInProgress = Orders;
    this.ordersCompleted = Orders;
    this.orderNum = 1;
}

PickMeUp.prototype.addOrder = function(orderNum) {
    if(orderNum){
        this.ordersInProgress.add(Order(orderNum));
        this.orderNum ++;
    }
};

PickMeUp.prototype.removeIncompleteOrder = function(orderNum) {
    if(orderNum){
        this.ordersInProgress.remove(orderNum);
    }
};

PickMeUp.prototype.completeOrder = function(orderNum) {
    if(orderNum){
        var order = this.ordersInProgress.getOrder(orderNum);
        order.toCompleted();
        this.ordersInProgress.remove(orderNum);
        this.ordersCompleted.add(order);
    }
};

PickMeUp.prototype.serveOrder = function(orderNum) {
    if(orderNum){
        var order = this.ordersCompleted.getOrder(orderNum);
        order.completeOrder.toServed();
        this.ordersCompleted.remove(orderNum);
    }
};

PickMeUp.prototype.removeOrder = function(orderNum) {
    if(orderNum){
        this.ordersCompleted.remove(orderNum);
    }
};

module.exports = PickMeUp;