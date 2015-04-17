(function() {
"use strict";
  //------------------
  // Cell
  //------------------
  MyDef.ViewM.Cell = function (spec) {
    var self = this;
    self.owner = spec.owner;
    self.type = ko.observable(spec.type);
    self.x = spec.x;
    self.y = spec.y;
    self.exist_class = (CELL_TYPE.BLANK == self.type()) ? "" : "cell_exist";
    self.put_class = ko.computed(function() {
      var type = this.type();
      if (CELL_TYPE.STONE1==type){
        return "stone1";
      }
      if (CELL_TYPE.STONE2==type){
        return "stone2";
      }
      return "";
    }, this);
    self.row_end = (spec.owner.w == self.x+1);
    self.notifyClick = function(){
      console.log("x:"+self.x+ ",y:"+self.y);
      self.owner.cellClicked(self);
    };
  };

  //------------------
  // Bord
  //------------------
  MyDef.ViewM.Bord = function (spec) {
    var self = this;
    var model = spec.model;
    self.model = model;
    self.w = model.w;
    self.h = model.h;
    self.nextStone = ko.observable(model.nextStone);
    // cells
    self.cells =  ko.observableArray();
    for (var y=0; y<self.h; ++y){
      for (var x=0; x<self.w; ++x) {
        var cell = new MyDef.ViewM.Cell({owner:self, x:x, y:y, type:model.cells[y][x]});
        self.cells.push(cell);
      }
    }
    //-------
    // cell clicked
    //-------
    self.cellClicked = function(cell){
      if (CELL_TYPE.EMPTY != cell.type()){
        return;
      }
      model.putStone(cell.x, cell.y);
      self.syncModel();
    };
    //-------
    // sync cells
    //-------
    self.syncModel = function(){
      // cells
      for (var y=0; y<self.h; ++y){
        for (var x=0; x<self.w; ++x) {
          var num = x + y*self.w;
          var cell = self.cells()[num];
          cell.type(model.cells[y][x]);
        }
      }
      // other
      self.nextStone(model.nextStone);
    };
  };

  //------------------
  // ViewModel
  //------------------
  var ViewModel = function() {
    var self = this;
    var subject = MyDef.BordMaker.getSubject();
    var play    = MyDef.BordMaker.getEmpty(subject);
    self.subject_bord = ko.observable(new MyDef.ViewM.Bord({model:subject}));
    self.play_bord    = ko.observable(new MyDef.ViewM.Bord({model:play}));
  };

  // Activates knockout.js
  ko.applyBindings(new ViewModel());

})();