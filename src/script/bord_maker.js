(function() {
  "use strict";
  MyDef.BordMaker = [];
  MyDef.BordMaker.getSubject  = function(){
    return new MyDef.Model.Bord({
      w:4,
      h:4,
      cells:[
        [ '-', '*', '*', '-'],
        [ 'o', 'o', 'o', 'o'],
        [ '*', 'o', 'o', '*'],
        [ 'o', '*', '*', 'o']
      ]
    });
  };

  MyDef.BordMaker.getEmpty = function(org_bord){
    var cells = MyDef.Ut.cloneArray(org_bord.cells);
    for (var y=0; y<org_bord.h; ++y) {
      for (var x = 0; x < org_bord.w; ++x) {
        var org = cells[y][x];
        cells[y][x]=(org==CELL_TYPE.BLANK) ? CELL_TYPE.BLANK : CELL_TYPE.EMPTY;
      }
    }

    return new MyDef.Model.Bord({
      w:org_bord.w,
      h:org_bord.h,
      cells:cells
    });
  };

  MyDef.BordMaker.getViewModel = function(model){
    return new MyDef.ViewM.Bord({
      w:model.w,
      h:model.h,
      cells:model.cells
    });
  };

})();