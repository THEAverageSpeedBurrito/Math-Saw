//constructors
function Component (length, width, x, y) {
  this.x = 0;
  this.y = 0;
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
  this.pieces = [];
  this.allUsed = false;
}

//prototypes

Stock.prototype.willFit = function (component) {
  var stock = this;

  if(stock.allUsed == false){
    if(fitsV(stock, component)){
      return true;
    }else if(fitsH(stock, component)){
      //flips component if measurements are reversed
      var tempLength = component.length;
      component.length = component.width;
      component.width = tempLength;

      return true;
    }
  }
  return false;
};

Stock.prototype.setLeftovers = function (component) {
  var stock = this;
  var difLength, difWidth;

  if(stock.fitsExactly(component)){
    stock.allUsed = true;
    Stock.pieces = stock;
  }else{
    var difLength = (stock.length - component.length);
    var difWidth = (stock.width - component.width);

    if(difLength === 0) {
      stock.x += component.width;
      console.log('I take up the whole width');
    }else if(difWidth === 0) {
      stock.y += component.length;
      console.log('I take up the whole length');
    }else{

      stock.pieces.push(
        new Stock(stock.length, difWidth, component.width, 0 + stock.y),
        new Stock(difLength, stock.width, 0 + stock.x, component.length)
      );
    }
  }
}

Stock.prototype.fitsExactly = function (component) {
  return (this.length === component.length && this.width === component.width);
}

Stock.prototype.hasPieces = function () {
  return (this.pieces.length !== 0);
}

//Helper Functions
function fitsV (stock, comp) {
  return (stock.length >= comp.length && stock.width >= comp.width);
}

function fitsH (stock, comp) {
  return (stock.length >= comp.width && stock.width >= comp.length);
}

module.exports = {
  Component,
  Stock
};
