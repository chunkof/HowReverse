(function() {
"use strict";
  //------------------
  // Cell
  //------------------
  MyDef.VM.Cell = function (spec) {
    var self = this;
    //-------
    // Initialize
    //-------
    self.owner = spec.owner;
    self.type = ko.observable(spec.type);
    self.x = spec.x;
    self.y = spec.y;
    self.existClass = (CELL_TYPE.BLANK == self.type()) ? "" : "cell-exist";
    self.putClass = ko.computed(function() {
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
    //-------
    // notify click
    //-------
    self.notifyClick = function(){
      self.owner.cellClicked(self);
    };
  };

  //------------------
  // Bord
  //------------------
  MyDef.VM.Bord = function (spec) {
    var self = this;
    //-------
    // Initialize
    //-------
    var model = spec.model;
    self.model = model;
    self.w = model.w;
    self.h = model.h;
    // next stone
    self.nextStone = ko.observable(model.nextStone);
    self.nextStoneClass = ko.computed(function() {
      var type = self.nextStone();
      if (CELL_TYPE.STONE1==type){return "stone1";}
      if (CELL_TYPE.STONE2==type){return "stone2";}
      return "";
    });
    // cells
    var cnt_stone1=0;
    var cnt_stone2=0;
    self.cells =  ko.observableArray();
    for (var y=0; y<self.h; ++y){
      for (var x=0; x<self.w; ++x) {
        var type = model.cells[y][x];
        var cell = new MyDef.VM.Cell({owner:self, x:x, y:y, type:type});
        if (CELL_TYPE.STONE1==type) ++cnt_stone1;
        if (CELL_TYPE.STONE2==type) ++cnt_stone2;
        self.cells.push(cell);
      }
    }
    self.cntStone1 =ko.observable(cnt_stone1);
    self.cntStone2 =ko.observable(cnt_stone2);
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
    // undo
    //-------
    self.undo = function(){
      model.undo();
      self.syncModel();
    };
    //-------
    // sync cells
    //-------
    self.syncModel = function(){
      // cells
      var cnt_stone1=0;
      var cnt_stone2=0;
      for (var y=0; y<self.h; ++y){
        for (var x=0; x<self.w; ++x) {
          var num = x + y*self.w;
          var cell = self.cells()[num];
          var type = model.cells[y][x];
          if (CELL_TYPE.STONE1==type) ++cnt_stone1;
          if (CELL_TYPE.STONE2==type) ++cnt_stone2;
          cell.type(type);
        }
      }
      self.cntStone1(cnt_stone1);
      self.cntStone2(cnt_stone2);
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
    self.subject_bord = ko.observable(new MyDef.VM.Bord({model:subject}));
    self.play_bord    = ko.observable(new MyDef.VM.Bord({model:play}));
    self.undo = function(){
      self.play_bord().undo();
    };
  };

  // Activates knockout.js
  ko.applyBindings(new ViewModel(), $("#play-mode")[0]);

})();