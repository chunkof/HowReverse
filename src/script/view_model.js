"use strict";


var CELL_TYPE = {
  BLANK :   0,
  EMPTY :   1,
  STONE1:   2,
  STONE2:   3,
  _SIZEOF : 4
};

//------------------
// Cell
//------------------
var ViewCell = function (spec) {
  var self = this;
  self.type = CELL_TYPE.EMPTY;
  self.cell_x    = spec.cell_x;
  self.cell_y    = spec.cell_y;
  self.row_end   = (spec.owner.w == self.cell_x+1);
  self.notifyClick = function(){
    console.log("x:"+self.cell_x+ ",y:"+self.cell_y);
  };
};

//------------------
// Bord
//------------------
var ViewBord = function (spec) {
  var self = this;
  self.w = spec.w;
  self.h = spec.h;
  // cells
  self.cells =  ko.observableArray();
  for (var y=0; y<spec.h; ++y){
    for (var x=0; x<spec.w; ++x) {
      var cell = new ViewCell({owner:self, cell_x:x, cell_y:y});
      self.cells.push(cell);
    }
  }
};

//------------------
// ViewModel
//------------------
var ViewModel = function() {
  var self = this;
  self.bord = ko.observable(new ViewBord({w:8, h:8}));
};

// Activates knockout.js
ko.applyBindings(new ViewModel());
