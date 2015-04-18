// Utility
MyUt  = [];
(function() {
  "use strict";
  MyUt.cloneArray = function(org){
    return $.extend(true, [], org);
  };
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
})();