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
}

//prototypes

//evaluate deeper layers of pieces
Stock.prototype.willFit = function (component) {
  var stock = this;

  if(stock.pieces.length !== 0){
    stock.forEach((piece) => {
      stock.willFit(piece);
    })
  }else{
    if(fitsV(stock, component) && fitsH(stock, component)){
      return true;
    }else if(fitsV(stock, component)){
      return true;
    }else if(fitsH(stock, component)){
      return true;
    }
  }
  return false;
};

Stock.prototype.fitsExactly = function (component) {
  return (this.length === component.length && this.width === component.width);
}

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
