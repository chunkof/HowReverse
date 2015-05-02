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

})();