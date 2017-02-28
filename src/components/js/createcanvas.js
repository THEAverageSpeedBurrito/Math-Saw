function createCanvas (stock, components) {
  var root = document.getElementById('cutRender');

  var canvas = root.getContext("2d");
  canvas.rect(20,20,150,100);
  canvas.stroke();
}

module.exports = createCanvas;
