import React from 'react';
import CreateCanvas from './js/createcanvas'

const Export = React.createClass({
  getInitialState: function () {
    return {
      stock: this.props.stock,
      components: this.props.components
    }
  },

  componentDidMount: function () {
    //Initialize lodaing animation

    //perform algorithmic operation
    CreateCanvas(this,state.stock, this.state.components);
  },

  render: function () {
    return (
      <p>Goodbye World</p>
    )
  }
});

export default Export;
