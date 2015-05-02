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
    self.existClass =ko.computed(function() {
      var type = self.type();
      if (CELL_TYPE.BLANK == type){
        return "";
      }
      if ('edit' == self.owner.mode)
      {
        if (CELL_TYPE.EMPTY == type){
          return "cell-half-exist";
        }

      }

      return "cell-exist";
    });

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
    self.owner = spec.owner;
    self.model = spec.model;
    self.w = spec.model.w;
    self.h = spec.model.h;
    self.playable = spec.playable;
    self.mode = spec.mode;
    // next stone
    self.nextStone = ko.observable(self.model.nextStone);
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
        var type = self.model.cells[y][x];
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
      self.model.putStone(cell.x, cell.y);
      self.syncModel();
    };
    //-------
    // undo
    //-------
    self.undo = function(){
      self.model.undo();
      self.syncModel();
    };
    //-------
    // sync cells
    //-------
    self.syncModel = function(){
      // cells
      var cnt_stone1=0;
      var cnt_stone2=0;
      var cnt_empty =0;
      for (var y=0; y<self.h; ++y){
        for (var x=0; x<self.w; ++x) {
          var num = x + y*self.w;
          var cell = self.cells()[num];
          var type = self.model.cells[y][x];
          if (CELL_TYPE.STONE1==type) ++cnt_stone1;
          if (CELL_TYPE.STONE2==type) ++cnt_stone2;
          if (CELL_TYPE.EMPTY ==type) ++cnt_empty;
            cell.type(type);
        }
      }
      self.cntStone1(cnt_stone1);
      self.cntStone2(cnt_stone2);
      // other
      self.nextStone(self.model.nextStone);
      // notify
      if (0 == cnt_empty){
        self.owner.notifyFullFilled(self);
      }
    };
    //--------------------
    //  Has Same Cells
    //--------------------
    self.hasSameCells = function(another){
      // check w h
      if ((self.w!=another.w) || (self.h!=another.h)){
        return false;
      }
      // check cells
      for (var y=0; y<self.h; ++y) {
        for (var x = 0; x < self.w; ++x) {
          var num = x + y * self.w;
          var self_type    = self.cells()[num].type();
          var another_type = another.cells()[num].type();
          if (self_type != another_type){
            return false;
          }
        }
      }
      return true;
    };
  };

})();