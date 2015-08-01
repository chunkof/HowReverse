(function() {
  "use strict";
  MyDef.BordConverter = [];
  var self = MyDef.BordConverter;
  // Bord -> Compress Code
  MyDef.BordConverter.bordToCode = function(bord){
    var plane_code    = self.bordToPlaneCode(bord);
    return plane_code;

    var compress_code = self.planeCodeToCompressCode(plane_code);
    return compress_code;
  };
  // Bord -> Plane Code
  MyDef.BordConverter.bordToPlaneCode = function(bord){
    var code ="";
    // w h
    code += bord.w.toString();
    code += bord.h.toString();
    // stones
    /*
    for (var i=0; i<bord.stoneLoop.length; ++i){
      code += bord.stoneLoop[i];
    }
    code += '_';
    */
    // cell
    for (var y=0; y<bord.h; ++y){
      for (var x=0; x<bord.w; ++x) {
        code += bord.cells[y][x].toString();
      }
    }
    return code;
  };
  // Plane Code -> Bord
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
    alert('');
    var compress = "";
    compress += plane.charAt(0);
    compress += plane.charAt(1);
    // cells
    var cells_code = plane.slice(2);
    var cell_num   = Number(plane.charAt(0)) * Number(plane.charAt(1));
    for (var i=0; i<cell_num;){
      // Get type.
      var type0 = cells_code.charAt(i++);
      var type1 = (i<cell_num)?cells_code.charAt(i++) : CELL_TYPE.BLANK;
      // to Base64
      var bit0 = MyUtD.cellTypeToEditNumber(type0) << 3;
      var bit1 = MyUtD.cellTypeToEditNumber(type1);
      var code = MyUt.numToBase64(bit0|bit1);
      // Add
      compress += code;
    }

    return compress;
  };
  MyDef.BordConverter.compressCodeToPlaneCode = function(compress){
    var plane = "";

    // w h
    plane += compress.charAt(0);
    plane += compress.charAt(1);
    // cell
    var cells_code = compress.slice(2);
    var cell_num   = Number(compress.charAt(0)) * Number(compress.charAt(1));
    var code_num   = cell_num*2;
    for (var i=0; i<code_num; ++i){
      var code = MyUt.base64ToNum(cells_code[i]);
      plane += MyUtD.EditNumberToCellType((code >> 3)&7);
      plane += MyUtD.EditNumberToCellType((code)&7);
    }
    // stones


    return plane;
  };
})();