var {Stock, Component} = require('./constructors')
var origin = {x: 0, y: 0};
var scale = 12;
var usedStock = [];
var usableStock = [];
var canvas;

function createCanvas (stock, components) {
  var root = document.getElementById('cutRender');
  canvas = root.getContext("2d");

  //create and draw original stock
  if(usedStock.length === 0){
    usedStock.push(new Stock(48, 4));
  }
  canvas.rect(origin.x, origin.y, usedStock[0].width * scale, usedStock[0].length * scale)

  usableStock.push(usedStock[0]);

  components.forEach((comp) => {
    //gets the fit with the smallest loss
    stock = findFitting(comp)[0];

    if(stock){
      calculatePlacement(stock, comp);
    }else{
      console.log("Cant seem to fit that anywhere, adding a new board");
      var stockOrigin = {
        x: (usedStock[0].x + usedStock[0].width + 1),
        y: 0
      }

      var newStock = new Stock(48, 4, stockOrigin.x, stockOrigin.y);
      usedStock.unshift(newStock)
      usableStock.push(newStock);

      canvas.rect(newStock.x * scale, newStock.y * scale, newStock.width * scale, newStock.length * scale);

      stock = findFitting(comp)[0];
      calculatePlacement(stock, comp);
    }
  });

  canvas.stroke();
  console.log(components);
  root.addEventListener('click', function (event) {
    var x = event.pageX - root.offsetLeft;
    var y = event.pageY - root.offsetTop;
    console.log(x, y);

    components.forEach((comp) => {
      if(x > comp.x && x < comp.x + comp.width && y > comp.y && y < comp.y + comp.length){
        canvas.fillStyle = 'blue'
        canvas.fillRect(comp.x, comp.y, comp.width, comp.length)
        canvas.stroke();
      }
    })
  })
}

function setOrigin (stock){
  origin.x = stock.x * scale;
  origin.y = stock.y * scale;
}

function calculatePlacement(stock, comp) {
  setOrigin(stock);
  comp.x = origin.x;
  comp.y = origin.y;

  canvas.rect(origin.x, origin.y, comp.width * scale, comp.length * scale);

  if(!stock.fitsExactly(comp)){
    var difLength = stock.length - comp.length;
    var difWidth = stock.width - comp.width;

    if(difLength === 0){
      usableStock.push(
        new Stock(stock.length, difWidth, stock.x + comp.width, stock.y)
      )
    }else if(stock.width === comp.width){
      usableStock.push(
        new Stock(difLength, stock.width, stock.x, stock.y + comp.length)
      )
    }else{
      usableStock.push(
        new Stock(comp.length, stock.width - comp.width, stock.x + comp.width, stock.y),
        new Stock(stock.length - comp.length, stock.width, stock.x, stock.y + comp.length)
      )
    }
  }
  stock.allUsed = true;
  comp.length *= scale;
  comp.width *= scale;
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
