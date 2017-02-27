'use strict';

//Constructors
function Component (length, width) {
  this.length = length;
  this.width = width;
  this.area = length * width;
}

function Stock (length, width) {
  this.length = length;
  this.width = width;
  this.area = length * width;
  this.areaLeft = this.area;
  this.allUsed = false;
  this.cuts = [];
  this.pieces = [];
}

function Orientation (length, width){
  this.length = length;
  this.width = width;
}

//Prototypes
Stock.prototype.makeCut = function(component) {
  // if(fits.fits(component, this)){
  //   console.log('nonall');
  // }else{
  //   console.log('it doesnt fit');
  // }
};

module.exports = Stock, Component;
