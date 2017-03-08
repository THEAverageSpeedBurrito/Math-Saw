import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import createCanvas from './js/createcanvas'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Row, Col} from 'react-grid-system';
import {List, ListItem} from 'material-ui/List';

var stats = {
  compCount: 0,
  areaUsed: 0,
  stockCount: 0,
  stockArea: 0,
  waste: 0,
}

const Export = React.createClass({
  getInitialState: function () {
    return {
      stock: this.props.stock,
      components: this.props.components,
      cutWidth: this.props.cutWidth,
      stats: stats,
    }
  },

  componentDidMount: function () {
    var stock = this.state.stock;
    var components = this.state.components;
    var cutWidth = this.state.cutWidth;
    var root = document.getElementById('cutRender');
    var canvas = root.getContext("2d");
    var scale = 10;

    //set dimensions of canvas
    var canvasContainer = document.getElementById('canvasContainer');
    root.height = canvasContainer.offsetHeight
    root.width = canvasContainer.offsetWidth;

    window.addEventListener('resize', function () {
      root.height = canvasContainer.offsetHeight
      root.width = canvasContainer.offsetWidth;
      stock = createCanvas(stock, components, root, canvas, scale, cutWidth)
    })

    //perform algorithmic operation
    var usedStock = createCanvas(stock, components, root, canvas, scale, cutWidth);
    //get used stock
    this.setState({
      stock: usedStock
    }, function() {
      this.calculateStats();
    });

    //canvas functionality
    root.addEventListener('mousemove', function (event) {
      var container = document.getElementById('mainContainer');
      var x = event.pageX - root.offsetLeft - container.offsetLeft;
      var y = event.pageY - root.offsetTop - container.offsetTop;

      var length = document.getElementById('length')
      var width = document.getElementById('width')
      var name = document.getElementById('name')
      var area = document.getElementById('area')

      components.forEach((comp) => {
        if(x > comp.x && x < comp.x + comp.width*scale && y > comp.y && y < comp.y + comp.length*scale){
          canvas.fillStyle = 'blue'
          canvas.fillRect(comp.x, comp.y, comp.width*scale, comp.length*scale)
          canvas.stroke();

          length.textContent = comp.length + 'in'
          width.textContent = comp.width + 'in'
          name.textContent = comp.name
          area.textContent = comp.area + 'in^2'
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
      <main id="export">
        <div>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Length</TableHeaderColumn>
                <TableHeaderColumn>Width</TableHeaderColumn>
                <TableHeaderColumn>Area</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            <TableRow >
                <TableRowColumn id="name"></TableRowColumn>
                <TableRowColumn id="length"></TableRowColumn>
                <TableRowColumn id="width"></TableRowColumn>
                <TableRowColumn id="area"></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Row>
          <Col sm={12} md={3}>
            <List>
              <ListItem primaryText={this.state.stats.compCount} secondaryText="Total Components" />
              <ListItem primaryText={this.state.stats.areaUsed} secondaryText="Component Area"/>
              <ListItem primaryText={this.state.stats.stockCount} secondaryText="Boards Used" />
              <ListItem primaryText={this.state.stats.stockArea} secondaryText="Stock Area" />
              <ListItem primaryText={this.state.stats.waste} secondaryText="Left Over area" />
            </List>
          </Col>
          <Col sm={12} md={9}>
            <div id="canvasContainer">
              <canvas id="cutRender">
                Your browser does not support the HTML5 canvas tag.
              </canvas>
            </div>
          </Col>
        </Row>
      </main>
    )
  },

  calculateStats() {
    this.state.components.forEach((comp) => {
      stats.areaUsed += parseInt(comp.area);
    })

    this.state.stock.forEach((stock) => {
      stats.stockArea += parseInt(stock.area);
    })

    stats.waste = stats.stockArea - stats.areaUsed;
    stats.compCount = this.state.components.length;
    stats.stockCount = this.state.stock.length;

    this.setState({
      stats: stats
    })
  }
});

export default Export;
