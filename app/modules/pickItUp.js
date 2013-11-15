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

PickItUp.prototype.removeIncompleteOrder = function(orderNumber) {
};

PickItUp.prototype.completeOrder = function(orderNumber) {
};

PickItUp.prototype.serveOrder = function(orderNumber) {
};

PickItUp.prototype.removeOrder = function(orderNumber) {
};

module.exports = PickItUp;