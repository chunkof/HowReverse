(function() {
  "use strict";
  MyDef.BordMaker = [];
  // BordSpec
  MyDef.BordDatas = {
    '1': {
      w:1, h:3,
      cells:[
        [ '1'],
        [ '1'],
        [ '1']
      ],
      stones:[CELL_TYPE.STONE1,CELL_TYPE.STONE2]
    },
    '2': {
      w:3, h:3,
      cells:[
        [ '-', '1', '-'],
        [ '1', '1', '1'],
        [ '-', '2', '-']
      ],
      stones:[CELL_TYPE.STONE1,CELL_TYPE.STONE2]
    },
    '3': {
      w:4, h:2,
      cells:[
        [ '-', '2', '2', '-'],
        [ '1', '1', '1', '1']
      ],
      stones:[CELL_TYPE.STONE1,CELL_TYPE.STONE2]
    },
    '4': {
      w:4, h:4,
      cells:[
        [ '1', '-', '-', '2'],
        [ '-', '2', '1', '-'],
        [ '-', '1', '2', '-'],
        [ '2', '-', '-', '1']
      ],
      stones:[CELL_TYPE.STONE1,CELL_TYPE.STONE2]
    },
    '5': {
      w: 4, h: 4,
      cells: [
        ['-', '2', '2', '-'],
        ['2', '2', '2', '2'],
        ['2', '2', '2', '2'],
        ['2', '2', '2', '2']
      ],
      stones:[CELL_TYPE.STONE1,CELL_TYPE.STONE2]
     },
    '6': {
      w: 4, h: 4,
      cells: [
        ['-', '1', '2', '-'],
        ['2', '1', '2', '1'],
        ['1', '1', '2', '1'],
        ['2', '1', '1', '2']
      ],
      stones:[CELL_TYPE.STONE1,CELL_TYPE.STONE2]
    },
    '7': {
      w: 4, h: 4,
      cells: [
        ['-', '1', '2', '-'],
        ['2', '2', '1', '2'],
        ['1', '1', '2', '2'],
        ['2', '2', '2', '2']
      ],
      stones:[CELL_TYPE.STONE1,CELL_TYPE.STONE2]
    },
    _end_:true
  };
  MyDef.BordMaker.getSubject  = function(id){
    return MyDef.BordDatas[id];
  };

  MyDef.BordMaker.getCanvas  = function(){
    return new MyDef.M.Bord({
      w: 8, h: 8,
      cells: [
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?']
      ]
    });
  };

  MyDef.BordMaker.toEmptyBord = function(org_bord){
    var cells = MyUt.cloneArray(org_bord.cells);
    for (var y=0; y<org_bord.h; ++y) {
      for (var x = 0; x < org_bord.w; ++x) {
        var org = cells[y][x];
        cells[y][x]=(org==CELL_TYPE.BLANK) ? CELL_TYPE.BLANK : CELL_TYPE.EMPTY;
      }
    }

    return new MyDef.M.Bord({
      w:org_bord.w,
      h:org_bord.h,
      cells:cells,
      stones:org_bord.stones
    });
  };

  MyDef.BordMaker.getViewModel = function(model){
    return new MyDef.VM.Bord({
      w:model.w,
      h:model.h,
      cells:model.cells
    });
  };

})();