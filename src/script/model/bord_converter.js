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
    // stoneLoop
    for (var i=0; i<bord.stoneLoop.length; ++i){
      code += bord.stoneLoop[i];
    }
    code += '_';
    // stoneColors
    for (var i=0; i<bord.stoneColors.length; ++i){
      code += bord.stoneColors[i];
    }
    code += '_';
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
    var pos=0; // pos in code
    // w h
    spec.w = Number(code.charAt(pos++));
    spec.h = Number(code.charAt(pos++));
    // stoneLoop
    spec.stoneLoop = [];
    while (true){
      var c = code.charAt(pos++);
      if (c == '_'){
        break;
      }
      spec.stoneLoop.push(c);
    }
    // stoneColors
    spec.stoneColors = [];
    while (true){
      var c = code.charAt(pos);
      if (c == '_'){
        pos++;
        break;
      }
      var color = code.substr(pos, 6);
      pos = pos+6;
      spec.stoneColors.push(color);
    }
    // cells
    spec.cells = [];
    var cells_code = code.slice(pos);
    for (var y=0; y<spec.h; ++y){
      var row = [];
      for (var x=0; x<spec.w; ++x) {
        var index = x + y*spec.w;
        row.push(cells_code.charAt(index));
        ++pos;
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

    return plane;
  };
  // minimize
  MyDef.BordConverter.getMinimized = function(org){
    // check effective area;
    var min_x = org.w, max_x = 0;
    var min_y = org.h, max_y = 0;
    var has_stone = false;
    for (var y=0; y<org.h; ++y) {
      for (var x = 0; x < org.w; ++x) {
        var cell = org.cells[y][x];
        if (cell==CELL_TYPE.EMPTY){
          continue;
        }
        has_stone = true;
        min_x = Math.min(x, min_x);
        max_x = Math.max(x, max_x);
        min_y = Math.min(y, min_y);
        max_y = Math.max(y, max_y);
      }
    }

    // check
    if (false == has_stone){
      return org;
    }

    // make minimized
    var w = max_x - min_x + 1;
    var h = max_y - min_y + 1;
    var cells = [];
    for (var y=0; y<h; ++y) {
      var row = [];
      for (var x = 0; x < w; ++x) {
        var cell = org.cells[min_y+y][min_x+x];
        cell = (cell==CELL_TYPE.EMPTY) ? CELL_TYPE.BLANK : cell;
        row.push(cell);
      }
      cells.push(row);
    }
    return new MyDef.M.Bord({
      w:w,
      h:h,
      cells:cells,
      stoneLoop:org.stoneLoop,
      stoneColors:org.stoneColors
    });
  }
})();