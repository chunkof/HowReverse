(function() {
  "use strict";
  //------------------
  // Bord
  // @spec : BordSpec
  //------------------
  MyDef.M.Bord = function(spec) {
    var self = this;
    self.w = spec.w;
    self.h = spec.h;
    self.cells =  spec.cells;
    //--------
    // stone
    //--------
    self.stoneLoop = MyUt.cloneArray(spec.stoneLoop);
    self.nextStone = self.stoneLoop[0];
    self.stoneColors = MyUt.cloneArray(spec.stoneColors);
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
      self.nextStone = StoneUtil.getNext(self.nextStone, self.stoneLoop);
    };
    //--------
    // undo
    //--------
    self.versionController = new MyDef.M.BordVersionController();
    self.undo = function(){
      self.versionController.undo(self);
    };

    //--------
    // Memento
    //--------
    self.crateMemento = function(){
      return new MyDef.M.BordMemento(self.cells, self.nextStone);
    };
    self.setMemento = function(memento){
      self.cells     = MyUt.cloneArray(memento.cells);
      self.nextStone = memento.nextStone;
    };
  };

  //------------------
  // Bord Memento
  //------------------
  MyDef.M.BordMemento = function (cells, next_stone) {
    this.cells     = MyUt.cloneArray(cells);
    this.nextStone = next_stone;
  };

  //------------------
  // Bord Version Controller(Caretaker)
  //------------------
  MyDef.M.BordVersionController  = function () {
    var self = this;
    self.mementoList = [];
    self.record = function(bord){
      var memento = new MyDef.M.BordMemento(bord.cells, bord.nextStone);
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
  // Stone Utility
  //------------------
  var StoneUtil=[];
  StoneUtil.createLoop = function(tail){
    var array = [];
    for (var i=0; i<STONE_LOOP.length; i++) {
      var stone = STONE_LOOP[i];
      array.push(stone);
      if (stone == tail){
        break;
      }
    }
    return array;
  };
  StoneUtil.getNext = function(current, loop){
    // get current pos
    var current_pos=0;
    for (var i =0; i<loop.length; i++) {
      if (loop[i] == current){
        current_pos = i;
      }
    }
    // get next
    var next_pos = (current_pos+1 < loop.length) ? current_pos+1 : 0;
    return loop[next_pos];
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
    var target_type = undefined;
    for (var x=put_x+dir_x, y=put_y+dir_y;
         (x>=0)&&(x<w)&&(y>=0)&&(y<h);
         x+=dir_x, y+=dir_y)
    {
      var current = cells[y][x];
      if (put_type == current){
        do_reverse = (other_s_cnt>0);
        break;
      }
      var is_other_s = MyUtD.isOtherStone(put_type, current);
      if (false == is_other_s){
        break;
      }
      if (undefined == target_type){
        target_type = current;
      }
      else if (target_type != current){
      //  do_reverse = false;
      //  break;
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
      is_other_s = MyUtD.isOtherStone(put_type, current);
      if (false == is_other_s){
        break;
      }
      cells[y][x] = put_type;
    }
  };

})();