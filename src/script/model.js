(function() {
  "use strict";

  //------------------
  // Bord
  //------------------
  var Bord = function (spec) {
    var self = this;
    self.w = spec.w;
    self.h = spec.h;
    self.cells =  [];
    for (var y=0; y<spec.h; ++y){
      for (var x=0; x<spec.w; ++x) {
        self.cells.push(cell);
      }
    }
  };


})();