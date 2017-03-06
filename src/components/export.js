import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import createCanvas from './js/createcanvas'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const Export = React.createClass({
  getInitialState: function () {
    return {
      stock: this.props.stock,
      components: this.props.components,
      cutWidth: this.props.cutWidth,
    }
  },

  componentDidMount: function () {
    var stock = this.state.stock;
    var components = this.state.components;
    var cutWidth = this.state.cutWidth;
    var root = document.getElementById('cutRender');
    var canvas = root.getContext("2d");
    var scale = 7;

    //perform algorithmic operation
    createCanvas(stock, components, root, canvas, scale, cutWidth);

    //canvas functionality
    root.addEventListener('mousemove', function (event) {
      var container = document.getElementById('mainContainer');
      var x = event.pageX - root.offsetLeft - container.offsetLeft;
      var y = event.pageY - root.offsetTop - container.offsetTop;

      var length = document.getElementById('length')
      var width = document.getElementById('width')
      var name = document.getElementById('name')

      components.forEach((comp) => {
        if(x > comp.x && x < comp.x + comp.width*scale && y > comp.y && y < comp.y + comp.length*scale){
          canvas.fillStyle = 'blue'
          canvas.fillRect(comp.x, comp.y, comp.width*scale, comp.length*scale)
          canvas.stroke();

          length.textContent = comp.length
          width.textContent = comp.width
          name.textContent = comp.name
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
        <div>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Width</TableHeaderColumn>
                <TableHeaderColumn>Depth</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            <TableRow >
                <TableRowColumn id="name"></TableRowColumn>
                <TableRowColumn id="length"></TableRowColumn>
                <TableRowColumn id="width"></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <canvas id="cutRender" width="800" height="1000">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </main>
    )
  },
});

export default Export;
