var {Stock, Component} = require('./constructors')
var origin = {x: 0, y: 0};
var scale = 10;
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

    var compatible = usableStock.filter((st) => {
      return st.willFit(comp);
    }).sort((a, b) => {
      return a.area - b.area;
    })

    //gets the fit with the smallest loss
    stock = compatible[0];

    if(stock){
      setOrigin(stock);
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
    }else{

    }
    // setOrigin(stock);


    //create new stock & disable used stock
    // stock.allUsed = true;
    usedStock.unshift(
    )
  });

  canvas.stroke();
}

function setOrigin (stock){
  origin.x = stock.x * scale;
  origin.y = stock.y * scale;
}

function getPossible (stock, comp) {
  var all = [stock];

  for(let i = 0; i < all.length; i++) {
    if(all[i].hasPieces()){
      all.push(all[i].pieces[0], all[i].pieces[1]);
    }
  }

  return all.filter((obj) => {
    return !obj.hasPieces() && obj.willFit(comp);
  });
}

function getBestFit(pieces, comp){
  if(pieces.length === 1){
    return pieces[0];
  }else{
    var best = {
      index: 0,
      val: Infinity
    };
    pieces.forEach((piece) => {
      if(piece.area - comp.area < best.val) {
        best.val = piece.area - comp.area;
        best.index = pieces.indexOf(piece);
      }
    })
    return pieces[best.index];
  }
}


module.exports = createCanvas;
