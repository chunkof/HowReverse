// Utility
MyDef.Ut  = [];
(function() {
  "use strict";
  MyDef.Ut.cloneArray = function(org){
    return $.extend(true, [], org);
  };
})();

// Utility on Domain
MyDef.UtD = [];
(function() {
  "use strict";
  MyDef.UtD.isStone = function(type){
    return  (
      (CELL_TYPE.STONE1==type)||
      (CELL_TYPE.STONE2==type)
    );

  };
  MyDef.UtD.isOtherStone = function(rhs, lhs){
    if (rhs == lhs){
      return false;
    }

    var is_stone = MyDef.UtD.isStone(lhs);
    return is_stone;
  };
})();