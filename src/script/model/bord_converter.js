(function() {
  "use strict";
  MyDef.BordConverter = [];
  var self = MyDef.BordConverter;
  // Bord -> Compress Code
  MyDef.BordConverter.bordToCode = function(bord){
    var plane_code    = self.bordToPlaneCode(bord);
    var compress_code = self.planeCodeToCompressCode(plane_code);
    return compress_code;
  };
  // Plane Code -> Bord
  MyDef.BordConverter.bordToPlaneCode = function(bord){
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
  // Bord -> Plane Code
  MyDef.BordConverter.planeCodeToBord = function(code){

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
  // Plane Code -> Compress Code
  MyDef.BordConverter.planeCodeToCompressCode = function(plane) {
    var compress = "";
    compress += plane.charAt(0);
    compress += plane.charAt(1);

    var cells_code = plane.slice(2);
    var cell_num   = Number(plane.charAt(0)) * Number(plane.charAt(1));

    for (var i=0; i<cell_num;){
      // Get type.
      var type0 = cells_code.charAt(i++);
      var type1 = (i<cell_num)?cells_code.charAt(i++) : CELL_TYPE.BLANK;
      var type2 = (i<cell_num)?cells_code.charAt(i++) : CELL_TYPE.BLANK;
      // to Base64
      var bit0 = MyUtD.cellTypeToEditNumber(type0) << 4;
      var bit1 = MyUtD.cellTypeToEditNumber(type1) << 2;
      var bit2 = MyUtD.cellTypeToEditNumber(type2);
      var code = MyUt.numToBase64(bit0|bit1|bit2);
      // Add
      compress += code;
    }

    return compress;
  };
  MyDef.BordConverter.compressCodeToPlaneCode = function(compress){
    var plane = "";

    plane += compress.charAt(0);
    plane += compress.charAt(1);

    var cells_code = compress.slice(2);
    var cell_num   = Number(compress.charAt(0)) * Number(compress.charAt(1));
    var code_num   = cell_num*3;
    for (var i=0; i<code_num; ++i){
      var code = MyUt.base64ToNum(cells_code[i]);
      plane += MyUtD.EditNumberToCellType((code >> 4)&3);
      plane += MyUtD.EditNumberToCellType((code >> 2)&3);
      plane += MyUtD.EditNumberToCellType((code)&3);
    }

    return plane;
  };
})();