// Utility
MyUt  = [];
(function() {
  "use strict";
  MyUt.cloneArray = function(org){
    return $.extend(true, [], org);
  };
  MyUt.withDefault = function(org, def){
    if (undefined == org){
      return def;
    }
    return org;
  };
  //-----------
  // base64
  //-----------
  var base64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-_';
  MyUt.numToBase64 = function(num){
    return base64list.charAt(num);
  };
  MyUt.base64ToNum = function(code){
    for (var i=0; i<base64list.length; ++i){
      if (code == base64list.charAt(i)){
        return i;
      }
    }
    return 0;
  }
})();

// Utility on Domain
MyUtD = [];
(function() {
  "use strict";
  MyUtD.isStone = function(type){
    return  (
        (CELL_TYPE.STONE1==type)
      ||(CELL_TYPE.STONE2==type)
      ||(CELL_TYPE.STONE3==type)
      ||(CELL_TYPE.STONE4==type)
      ||(CELL_TYPE.STONE5==type)
      ||(CELL_TYPE.STONE6==type)
    );

  };
  MyUtD.isOtherStone = function(rhs, lhs){
    if (rhs == lhs){
      return false;
    }

    var is_stone = MyUtD.isStone(lhs);
    return is_stone;
  };
  MyUtD.cellTypeToEditNumber = function(type){
    if (CELL_TYPE.BLANK  == type) return 0;
    if (CELL_TYPE.EMPTY  == type) return 0;
    if (CELL_TYPE.STONE1 == type) return 1;
    if (CELL_TYPE.STONE2 == type) return 2;
    if (CELL_TYPE.STONE3 == type) return 3;
    if (CELL_TYPE.STONE4 == type) return 4;
    if (CELL_TYPE.STONE5 == type) return 5;
    if (CELL_TYPE.STONE6 == type) return 6;
    return 0;
  };
  MyUtD.EditNumberToCellType = function(num){
    var type = CELL_TYPE.BLANK;
    if (0 == num) type = CELL_TYPE.BLANK;
    if (1 == num) type = CELL_TYPE.STONE1;
    if (2 == num) type = CELL_TYPE.STONE2;
    if (3 == num) type = CELL_TYPE.STONE3;
    if (4 == num) type = CELL_TYPE.STONE4;
    if (5 == num) type = CELL_TYPE.STONE5;
    if (6 == num) type = CELL_TYPE.STONE6;

    return type;
  };

  var addCSSRule = function(sheet, selector, rules, index) {
    if("insertRule" in sheet) {
      sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else if("addRule" in sheet) {
      sheet.addRule(selector, rules, index);
    }
  };

// Use it!

  MyUtD.SetCssStoneColors = function(colors){
    var str = "\n" +
      ".stone1 {background-color:red}\n" +
      ".stone2 {background-color:blue}";

    var str = "\n";
    str = str + ".stone1 {background-color:#" +colors[0] + "}";
    str = str + ".stone2 {background-color:#" +colors[1] + "}";
    str = str + ".stone3 {background-color:#" +colors[2] + "}";
    str = str + ".stone4 {background-color:#" +colors[4] + "}";
    str = str + ".stone5 {background-color:#" +colors[5] + "}";

    $('#stoneColors').html(str);

  }
})();