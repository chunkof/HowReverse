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
    self.nextStone = CELL_TYPE.STONE1;
    self.putStone = function(put_x,put_y){


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

      self.nextStone = (self.nextStone==CELL_TYPE.STONE1) ? CELL_TYPE.STONE2: CELL_TYPE.STONE1;
    };
  };

  //------------------
  // Bord Logic
  //------------------
  var Logic=[];
  Logic.reverse = function(bord, put_type,put_x,put_y, dir_x, dir_y){
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
    for (var x=put_x+dir_x, y=put_y+dir_y;
         (x>=0)&&(x<w)&&(y>=0)&&(y<h);
         x+=dir_x, y+=dir_y)
    {
      var current = cells[y][x];
      if (put_type == current){
        break;
      }
      var is_other_s = MyDef.UtD.isOtherStone(put_type, current);
      if (false == is_other_s){
        break;
      }
      cells[y][x] = put_type;
    }
  };

})();