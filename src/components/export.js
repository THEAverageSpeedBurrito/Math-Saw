import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import createCanvas from './js/createcanvas'
//components

const Export = React.createClass({
  getInitialState: function () {
    return {
      stock: this.props.stock,
      components: this.props.components,
    }
  },

  componentWillMount() {
    console.log(this.state.stock, this.state.components);
  },

  componentDidMount: function () {
    var stock = this.state.stock;
    var components = this.state.components;
    var root = document.getElementById('cutRender');
    var canvas = root.getContext("2d");
    var scale = 12;

    //perform algorithmic operation
    createCanvas(stock, components, root, canvas, scale);

    root.addEventListener('mousemove', function (event) {
      var container = document.getElementById('mainContainer');
      var x = event.pageX - root.offsetLeft - container.offsetLeft;
      var y = event.pageY - root.offsetTop - container.offsetTop;

      components.forEach((comp) => {
        if(x > comp.x && x < comp.x + comp.width*scale && y > comp.y && y < comp.y + comp.length*scale){
          canvas.fillStyle = 'blue'
          canvas.fillRect(comp.x, comp.y, comp.width*scale, comp.length*scale)
          canvas.stroke();
        }else{
          canvas.fillStyle = 'white'
          canvas.fillRect(comp.x, comp.y, comp.width*scale, comp.length*scale)
          canvas.stroke();
        }
      })
    })
  },

  //basic wrapper html
  render: function () {
    return (
      <main>
        <canvas id="cutRender" width="800" height="800">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </main>
    )
  },
});

export default Export;
