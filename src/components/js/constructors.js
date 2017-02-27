'use strict';

//constructors
function Component (length, width) {
  this.length = length;
  this.width = width;
  this.area = length * width;
}

function Stock (length, width) {
  this.length = length;
  this.width = width;
  this.area = length * width;
  this.areaLeft = this.area;
  this.allUsed = false;
  this.cuts = [];
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
