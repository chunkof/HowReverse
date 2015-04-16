(function() {
  "use strict";
  //------------------
  // Bord
  //------------------
  MyDef.Model.Bord = function (spec) {
    var self = this;
    self.w = spec.w;
    self.h = spec.h;
    self.cells =  spec.cells;
    self.putStone = function(x,y){
      self.cells[y][x] = CELL_TYPE.STONE1;
    };
  };


})();