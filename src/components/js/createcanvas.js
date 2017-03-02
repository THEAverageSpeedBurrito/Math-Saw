var {Stock, Component} = require('./constructors')
var origin = {x: 0, y: 0};
var scale = 10;
var usedStock = [];
var canvas;

function createCanvas (stock, components) {
  var root = document.getElementById('cutRender');
  canvas = root.getContext("2d");

  //create and draw original stock
  if(usedStock.length === 0){
    usedStock.push(new Stock(48, 4));
  }
  canvas.rect(origin.x, origin.y, usedStock[0].width * scale, usedStock[0].length * scale)

  //evaluate components
  components.forEach((comp) => {
    if(usedStock[0].willFit(comp)){
      console.log('fits');
    }
  });

  canvas.stroke();
}

function placeComponent(stock, comp){
  usedStock.forEach((stock) => {

  })
}

function placeAdditional(stock, comp){
  if(stock.willFit(comp)){

      var opt1 = stock.pieces[0]
      var opt2 = stock.pieces[1];

    if(opt1.willFit(comp) && opt1.willFit(comp)){
      if(opt1.area - comp.area > opt2.area - comp.area) {
        handlePlacement(opt2, comp);
      }else{
        handlePlacement(opt1, comp);
      }
    }else if(opt1.willFit(comp)){
      handlePlacement(opt1, comp);
    }else{
      handlePlacement(opt2, comp);
    }
  }
  canvas.rect(origin.x, origin.y, comp.width*scale, comp.length*scale);
}

function handlePlacement(stock, comp){
  origin.x = stock.x * scale;
  origin.y = stock.y * scale;

  if(stock.width === comp.width && stock.length === comp.length){
    stock.allUsed = true;
    console.log('all used');
  }
}

function determinePieces (stock, comp) {
  stock.pieces.push(
    new Stock(stock.length, stock.width - comp.width, comp.width, 0),
    new Stock(stock.length - comp.length, stock.width, 0, comp.length)
  )
}

module.exports = createCanvas;
