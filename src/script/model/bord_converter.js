(function() {
  "use strict";
  MyDef.BordConerter = [];
  MyDef.BordConerter.bordToPlaneCode = function(bord){
    var code ="";
    code += bord.w.toString();
    code += bord.h.toString();
    for (var y=0; y<bord.h; ++y){
      for (var x=0; x<bord.w; ++x) {
        code += bord.cells[y][x].toString();
      }
    }
    return code;
  };

  MyDef.BordConerter.planeCodeToBord = function(code){

    var spec ={};
    spec.w = Number(code.charAt(0));
    spec.h = Number(code.charAt(1));

    spec.cells = [];
    var cells_code = code.slice(2);
    var cnt = 0;
    for (var y=0; y<spec.h; ++y){
      var row = [];
      for (var x=0; x<spec.w; ++x) {
        row.push(cells_code.charAt(cnt));
        ++cnt;
      }
      spec.cells.push(row);
    }

    return new MyDef.M.Bord(spec);
  };

  MyDef.BordConerter.planeCodeToCompressCode = function(plane) {
    var compress = "";
    compress += plane.charAt(0);
    compress += plane.charAt(1);

    var cells_code = plane.slice(2);
    var cell_num   = Number(plane.charAt(0)) * Number(plane.charAt(1));

    for (var i=0; i<cell_num; ++i){
      // Get type.
      var type0 = cells_code.charAt(i++);
      var type1 = (i<cell_num)?cells_code.charAt(i++) : CELL_TYPE.BLANK;
      var type2 = (i<cell_num)?cells_code.charAt(i++) : CELL_TYPE.BLANK;
      // to Base64
      var bit0 = MyUtD.cellTypeToNumber(type0) << 4;
      var bit1 = MyUtD.cellTypeToNumber(type1) << 2;
      var bit2 = MyUtD.cellTypeToNumber(type2);
      var code = MyUt.numToBase64(bit0|bit1|bit2);
      // Add
      compress += code;
    }

    return compress;
  };
})();