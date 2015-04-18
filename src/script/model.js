(function() {
  "use strict";
  //------------------
  // Bord
  //------------------
  MyDef.Model.Bord = function(spec) {
    var self = this;
    self.w = spec.w;
    self.h = spec.h;
    self.cells =  spec.cells;
    //--------
    // stone
    //--------
    self.nextStone = CELL_TYPE.STONE1;
    self.putStone = function(put_x, put_y){
      // record
      self.versionController.record(self);
      // put
      self.cells[put_y][put_x] = self.nextStone;
      // reverse
      Logic.reverse(self, self.nextStone, put_x, put_y,   0,-1);
      Logic.reverse(self, self.nextStone, put_x, put_y,   0, 1);
      Logic.reverse(self, self.nextStone, put_x, put_y,  -1, 0);
      Logic.reverse(self, self.nextStone, put_x, put_y,   1, 0);
      Logic.reverse(self, self.nextStone, put_x, put_y,  -1, 1);
      Logic.reverse(self, self.nextStone, put_x, put_y,  -1,-1);
      Logic.reverse(self, self.nextStone, put_x, put_y,   1, 1);
      Logic.reverse(self, self.nextStone, put_x, put_y,   1,-1);
      // next
      self.nextStone = (self.nextStone==CELL_TYPE.STONE1) ? CELL_TYPE.STONE2: CELL_TYPE.STONE1;
    };
    //--------
    // undo
    //--------
    self.versionController = new MyDef.Model.BordVersionController();
    self.undo = function(){
      self.versionController.undo(self);
    };

    //--------
    // Memento
    //--------
    self.crateMemento = function(){
      return new MyDef.Model.BordMemento(self.cells, self.nextStone);
    };
    self.setMemento = function(memento){
      self.cells     = MyDef.Ut.cloneArray(memento.cells);
      self.nextStone = memento.nextStone;
    };
  };

  //------------------
  // Bord Memento
  //------------------
  MyDef.Model.BordMemento = function (cells, next_stone) {
    this.cells     = MyDef.Ut.cloneArray(cells);
    this.nextStone = next_stone;
  };

  //------------------
  // Bord Version Controller(Caretaker)
  //------------------
  MyDef.Model.BordVersionController  = function () {
    var self = this;
    self.mementoList = [];
    self.record = function(bord){
      var memento = new MyDef.Model.BordMemento(bord.cells, bord.nextStone);
      self.mementoList.push(memento);
    };
    self.undo = function(bord){
      var memento =  self.mementoList.pop();
      if (memento != undefined) {
        bord.setMemento(memento);
      }
    };
  };

  //------------------
  // Bord Logic
  //------------------
  var Logic=[];
  Logic.reverse = function(bord, put_type, put_x, put_y, dir_x, dir_y){
    var w = bord.w;
    var h = bord.h;
    var cells= bord.cells;

    // check
    var other_s_cnt= 0;
    var do_reverse = false;
    for (var x=put_x+dir_x, y=put_y+dir_y;
         (x>=0)&&(x<w)&&(y>=0)&&(y<h);
         x+=dir_x, y+=dir_y)
    {
      var current = cells[y][x];
      if (put_type == current){
          do_reverse = (other_s_cnt>0);
          break;
      }
      var is_other_s = MyDef.UtD.isOtherStone(put_type, current);
      if (false == is_other_s){
        break;
      }
      ++other_s_cnt;
    }
    // do reverse
    if (false == do_reverse){
      return;
    }
    for (x=put_x+dir_x, y=put_y+dir_y;
         (x>=0)&&(x<w)&&(y>=0)&&(y<h);
         x+=dir_x, y+=dir_y)
    {
      current = cells[y][x];
      if (put_type == current){
        break;
      }
      is_other_s = MyDef.UtD.isOtherStone(put_type, current);
      if (false == is_other_s){
        break;
      }
      cells[y][x] = put_type;
    }
  };

})();