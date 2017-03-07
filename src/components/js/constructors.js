//constructors
function Component (length, width, x, y, name, id) {
  this.id = id || 0;
  this.name = name;
  this.x = x || 0;
  this.y = y || 0;
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
  // this.pieces = [];
}

//prototypes

Stock.prototype.willFit = function (component) {
  var stock = this;

  if(stock.allUsed === false){
    if(fitsV(stock, component)){
      return true;
    }else if(fitsH(stock, component)){
      //flips component if measurements are reversed
      swap(component);
      return true;
    }
  }
  return false;
};

Stock.prototype.fitsExactly = function (component) {
  return (this.length === component.length && this.width === component.width);
}

//Helper Functions
function fitsV (stock, comp) {
  return (stock.length >= comp.length && stock.width >= comp.width);
}

function fitsH (stock, comp) {
  return (stock.length >= comp.width && stock.width >= comp.length);
}

function swap (component) {
  var tempLength = component.length;
  component.length = component.width;
  component.width = tempLength;
}

module.exports = {
  Component,
  Stock
};
