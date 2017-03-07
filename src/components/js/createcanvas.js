var {Stock, Component} = require('./constructors')
var origin;
var usedStock;
var usableStock;
var scale;
var canvas;

function createCanvas (stock, components, root, canvasInherit, scaleInherit, cutWidth) {
  usedStock = [];
  usableStock = [];
  origin = {x: 0, y: 0}
  canvas = canvasInherit;
  scale = scaleInherit;

  canvas.lineWidth = 10;
  //create and draw original stock
  if(usedStock.length === 0){
    usedStock.push(new Stock(96, 4));
    usableStock.push(usedStock[0]);
  }
  canvas.rect(origin.x, origin.y, usedStock[0].width * scale, usedStock[0].length * scale)

  //sort components largest area first
  components.sort((a, b) => {
    return b.area - a.area;
  });

  components.forEach((comp) => {
    //gets the fit with the smallest loss of area
    stock = findFitting(comp)[0];

    if(stock){
      calculatePlacement(stock, comp, cutWidth);
    }else{
      console.log("Cant seem to fit that anywhere, adding a new board");
      var stockOrigin = {
        x: (usedStock[0].x + usedStock[0].width + 1),
        y: 0
      }

      var newStock = new Stock(96, 4, stockOrigin.x, stockOrigin.y);
      usedStock.unshift(newStock)
      usableStock.push(newStock);

      canvas.rect(newStock.x * scale, newStock.y * scale, newStock.width * scale, newStock.length * scale);

      stock = findFitting(comp)[0];
      calculatePlacement(stock, comp, cutWidth);
    }
  });

  canvas.stroke();

  //Canvas interactivity

}

function setOrigin (stock){
  origin.x = stock.x * scale;
  origin.y = stock.y * scale;
}

function calculatePlacement(stock, comp, cutWidth) {
  setOrigin(stock);
  comp.x = origin.x;
  comp.y = origin.y;

  canvas.rect(origin.x, origin.y, comp.width * scale, comp.length * scale);

  if(!stock.fitsExactly(comp)){
    var difLength = stock.length - comp.length;
    var difWidth = stock.width - comp.width;

    if(difLength === 0){
      usableStock.push(
        new Stock(stock.length, difWidth - cutWidth, stock.x + comp.width + cutWidth, stock.y)
      )
    }else if(stock.width === comp.width){
      usableStock.push(
        new Stock(difLength - cutWidth, stock.width, stock.x, stock.y + comp.length + cutWidth)
      )
    }else{
      usableStock.push(
        new Stock(comp.length, stock.width - comp.width - cutWidth, stock.x + comp.width + cutWidth, stock.y),
        new Stock(stock.length - comp.length - cutWidth, stock.width, stock.x, stock.y + comp.length + cutWidth)
      )
    }
  }
  stock.allUsed = true;
  // comp.length *= scale;
  // comp.width *= scale;
}

function findFitting(comp){
  var compatible = usableStock.filter((st) => {
    return st.willFit(comp);
  }).sort((a, b) => {
    return a.area - b.area;
  })

  return compatible;
}

module.exports = createCanvas;
