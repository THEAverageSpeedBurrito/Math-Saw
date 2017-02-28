import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import createCanvas from './js/createCanvas'
//components

const Export = React.createClass({
  getInitialState: function () {
    return {
      stock: this.props.stock,
      components: this.props.components
    }
  },

  componentDidMount: function () {
    var stock = this.state.stock;
    var components = this.state.components;
    //Initialize lodaing animation

    //perform algorithmic operation
    createCanvas(stock, components);
  },

  //basic wrapper html
  render: function () {
    return (
      <main>
          <div className="container">
            <canvas id="cutRender" width="300" height="150">
              Your browser does not support the HTML5 canvas tag.
            </canvas>
          </div>
      </main>
    )
  },
});

export default Export;
