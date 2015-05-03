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
  MyUt.numToBase64 = function(org){
    return base64list.charAt(org);
  }
})();

// Utility on Domain
MyUtD = [];
(function() {
  "use strict";
  MyUtD.isStone = function(type){
    return  (
      (CELL_TYPE.STONE1==type)||
      (CELL_TYPE.STONE2==type)
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

    return 0;
  };
})();