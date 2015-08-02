"use strict";
var CELL_TYPE = {
  BLANK :   '-',
  EMPTY :   '?',
  STONE1:   '1',
  STONE2:   '2',
  STONE3:   '3',
  STONE4:   '4',
  STONE5:   '5',
  STONE6:   '6'
};
var STONE_LOOP = [
   CELL_TYPE.STONE1
  ,CELL_TYPE.STONE2
  ,CELL_TYPE.STONE3
  ,CELL_TYPE.STONE4
  ,CELL_TYPE.STONE5
  ,CELL_TYPE.STONE6
];

var MyDef    = [];
MyDef.VM = []; // ViewModel
MyDef.M  = []; // Model

MyDef.DefaultStoneColors = [
   "696969"    // dim gray
  ,"ffffff"    // white
  ,"4169e1"    // royal blue
  ,"ffb6c1"    // light pink
  ,"228b22"    // forest green
  ,"ffa500"    // orange
];