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
    var stock = usedStock[0];

    if(stock.willFit(comp)){
      //Render component
      if(stock.hasPieces()){
        var pieces = getPossible(stock, comp);
        var piece = getBestFit(pieces, comp);
        console.log(pieces, piece);
        setOrigin(piece, comp);
        canvas.rect(origin.x, origin.y, comp.width * scale, comp.length * scale)
        piece.setLeftovers(comp);
      }else{
        canvas.rect(origin.x, origin.y, comp.width * scale, comp.length * scale);
        stock.setLeftovers(comp);
      }
    }else{
      //generate & render new stock
    }
  });

  canvas.stroke();
}

function setOrigin (stock, comp){
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
