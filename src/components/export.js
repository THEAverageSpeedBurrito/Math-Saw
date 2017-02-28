import React from 'react';
import createCanvas from './js/createcanvas'

//components
import NavBar from './navbar';

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
    var canvas = createCanvas(stock, components);
  },

  render: function () {
    return (
      <main>
        <NavBar/>
          <div className="container">
            Export page/view
          </div>
      </main>
    )
  },
});

export default Export;
