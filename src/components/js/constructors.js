//constructors
function Component (length, width) {
  this.length = length;
  this.width = width;
  this.area = length * width;
}

function Stock (length, width, x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this.length = length;
  this.width = width;
  this.area = length * width;
  this.areaLeft = this.area;
  this.allUsed = false;
  this.pieces = [];
}

//prototypes
Stock.prototype.willFit = function (component) {
  var stock = this;
  if(component.width <= stock.width && component.length <= stock.length){
    if(component.width === stock.width && component.length === stock.length){
      stock.allUsed = true;
    }
    return true;
  }
  return false;
};

module.exports = {
  Component,
  Stock
};
