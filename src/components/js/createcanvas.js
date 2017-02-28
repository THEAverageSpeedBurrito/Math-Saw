var {Stock, Component} = require('./constructors')
var origin = {x: 0, y: 0};
var scale = 10;
var usedStock = [new Stock(48, 4)];
var canvas;

function createCanvas (stock, components) {
  var root = document.getElementById('cutRender');
  canvas = root.getContext("2d");

  canvas.rect(0, 0, usedStock[0].width * scale, usedStock[0].length * scale)

  components.forEach((comp) => {
    if(usedStock[0].pieces.length === 0) {
      placeNew(usedStock[0], comp);
    }else{
      console.log('ive been cut');
      placeAdditional(usedStock[0], comp);
    }
  })

  canvas.stroke();
}

function placeNew(stock, comp){
  if(stock.willFit(comp)){
    console.log('fresh Board :)');
    canvas.rect(origin.x, origin.y, comp.width*scale, comp.length*scale);

    if(comp.width === stock.width){
      origin.y = comp.length * scale;
    }else{
      stock.pieces.push(
        new Stock(stock.length, stock.width - comp.width, comp.width, 0),
        new Stock(stock.length - comp.length, stock.width, 0, comp.length)
      )
      console.log(stock);
    }
  }
}

function placeAdditional(stock, comp){
  return null;
}

module.exports = createCanvas;
