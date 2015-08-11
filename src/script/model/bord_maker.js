(function() {
  "use strict";

  MyDef.BordMaker = [];
  MyDef.BordMaker.getSubject  = function(id){
    var subject_manager = MyDef.M.getSubjectManager();
    return subject_manager.getBord(id);
  };

  MyDef.BordMaker.getCanvas  = function(setting){
    var stones =[];
    if (2 == setting.pixel_pattern){
      stones = [CELL_TYPE.STONE1,CELL_TYPE.STONE2];}
    if (3 == setting.pixel_pattern){
      stones = [CELL_TYPE.STONE1,CELL_TYPE.STONE2,CELL_TYPE.STONE3];}
    if (4 == setting.pixel_pattern){
      stones = [CELL_TYPE.STONE1,CELL_TYPE.STONE2,CELL_TYPE.STONE3,CELL_TYPE.STONE4];}
    if (5 == setting.pixel_pattern){
      stones = [CELL_TYPE.STONE1,CELL_TYPE.STONE2,CELL_TYPE.STONE3,CELL_TYPE.STONE4,CELL_TYPE.STONE5];}

    var bord = new MyDef.M.Bord({
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
      ],
      stoneLoop : stones,
      stoneColors : setting.stoneColors
    });


    return bord;
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
      stoneLoop:org_bord.stoneLoop,
      stoneColors:org_bord.stoneColors
    });
  };


})();