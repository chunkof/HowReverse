(function() {
"use strict";
  //------------------
  // Cell
  //------------------
  MyDef.ViewM.Cell = function (spec) {
    var self = this;
    self.owner     = spec.owner;
    self.type      = ko.observable(CELL_TYPE.EMPTY);
    self.cell_x    = spec.cell_x;
    self.cell_y    = spec.cell_y;
    self.row_end   = (spec.owner.w == self.cell_x+1);
    self.notifyClick = function(){
      console.log("x:"+self.cell_x+ ",y:"+self.cell_y);
      self.type(CELL_TYPE.STONE1);
    };
  };

  //------------------
  // Bord
  //------------------
  MyDef.ViewM.Bord = function (spec) {
    var self = this;
    self.w = spec.w;
    self.h = spec.h;
    // cells
    self.cells =  ko.observableArray();
    for (var y=0; y<spec.h; ++y){
      for (var x=0; x<spec.w; ++x) {
        var cell = new MyDef.ViewM.Cell({owner:self, cell_x:x, cell_y:y});
        self.cells.push(cell);
      }
    }
  };

  //------------------
  // ViewModel
  //------------------
  var ViewModel = function() {
    var self = this;
    self.subject_bord = ko.observable(new MyDef.ViewM.Bord({w:8, h:8}));
    self.play_bord    = ko.observable(new MyDef.ViewM.Bord({w:8, h:8}));
  };

  // Activates knockout.js
  ko.applyBindings(new ViewModel());

})();