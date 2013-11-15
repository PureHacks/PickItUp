var Order = require('./order');
var Orders = require('./orders');

// Main Order System
function PickItUp() {
    this.ordersInProgress = Orders;
    this.ordersCompleted = Orders;
    this.orderNum = 1;
}

PickItUp.prototype.addOrder = function(orderNum) {
    if(orderNum){
        this.ordersInProgress.add(Order(orderNum));
        this.orderNum ++;
    }
};

PickItUp.prototype.removeIncompleteOrder = function(orderNum) {
    if(orderNum){
        this.ordersInProgress.remove(orderNum);
    }
};

PickItUp.prototype.completeOrder = function(orderNum) {
    if(orderNum){
        var order = this.ordersInProgress.getOrder(orderNum);
        order.toCompleted();
        this.ordersInProgress.remove(orderNum);
        this.ordersCompleted.add(order);
    }
};

PickItUp.prototype.serveOrder = function(orderNum) {
    if(orderNum){
        var order = this.ordersCompleted.getOrder(orderNum);
        order.completeOrder.toServed();
        this.ordersCompleted.remove(orderNum);
    }
};

PickItUp.prototype.removeOrder = function(orderNum) {
    if(orderNum){
        this.ordersCompleted.remove(orderNum);
    }
};

module.exports = PickItUp;