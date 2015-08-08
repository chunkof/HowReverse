(function() {
  "use strict";
  // BordSpec
  MyDef.BordDatas = {
    '1': {
      w:1, h:3,
      stoneLoop:[CELL_TYPE.STONE1,CELL_TYPE.STONE2],
      cells:[
        [ '1'],
        [ '1'],
        [ '1']
      ]
    },
    '2': {
      type : "plane_code",
      code : "1412_696969fefefe4169e1ffb6c1_2222"
    },
    '3': {
      w:3, h:3,
      stoneLoop:[CELL_TYPE.STONE1,CELL_TYPE.STONE2],
      cells:[
        [ '-', '1', '-'],
        [ '1', '1', '1'],
        [ '-', '2', '-']
      ]
    },
    '4': {
      type : "plane_code",
      code : "3312_89f6f8f7ff8c4169e1ffb6c1_1-1-1-2-1"
    },
    '5': {
      w:4, h:4,
      stoneLoop:[CELL_TYPE.STONE1,CELL_TYPE.STONE2],
      cells:[
        [ '1', '-', '-', '2'],
        [ '-', '2', '1', '-'],
        [ '-', '1', '2', '-'],
        [ '2', '-', '-', '1']
      ]
    },
    '6': {
      type : "plane_code",
      code : "3412_6d554af4d4a84169e1ffb6c1_111-21222-22"
    },
    '7': {
      type : "plane_code",
      code : "6512_bf9b44dec59e4169e1ffb6c1_-1----11---2-1111--1--1--2--2-"
     },
    '8': {
      w: 4, h: 4,
      stoneLoop:[CELL_TYPE.STONE1,CELL_TYPE.STONE2],
      cells: [
        ['-', '2', '2', '-'],
        ['2', '2', '2', '2'],
        ['2', '2', '2', '2'],
        ['2', '2', '2', '2']
      ]
    },
    '9': {
      type : "plane_code",
      code : "56123_fcd5ed70b068feff66ffb6c1_--1---131---1--2-2-2-222---2--"
    },
    '10': {
      type : "plane_code",
      code : "5412_696969fefefe4169e1ffb6c1_11-11-121--222--222-"
    },
    '11': {
      type : "plane_code",
      code : "3412_db1a1afefefe4169e1ffb6c1_111222222111"
    },
    _end_:true
  };
  MyDef.BordMaker = [];
  MyDef.BordMaker.getSubject  = function(id){
    var subject = MyDef.BordDatas[id];
    if (subject.type == "plane_code"){
      subject = MyDef.BordConverter.planeCodeToBord(subject.code);
    }

    if (subject.stoneColors != undefined){
      for (var i=0; i<6; ++i){
        if (subject.stoneColors[i] === undefined){
          subject.stoneColors.push(MyDef.DefaultStoneColors[i]);
        }

      }
    }else{
      subject.stoneColors = MyUt.cloneArray(MyDef.DefaultStoneColors);
    }



    return subject;
  };

  MyDef.BordMaker.getCanvas  = function(setting){
    var stones =[];
    if (2 == setting.pixel_pattern){
      stones = [CELL_TYPE.STONE1,CELL_TYPE.STONE2];}
    if (3 == setting.pixel_pattern){
      stones = [CELL_TYPE.STONE1,CELL_TYPE.STONE2,CELL_TYPE.STONE3];}
    if (4 == setting.pixel_pattern){
      stones = [CELL_TYPE.STONE1,CELL_TYPE.STONE2,CELL_TYPE.STONE3,CELL_TYPE.STONE4];}
    if (5 == setting.pixel_pattern){
      stones = [CELL_TYPE.STONE1,CELL_TYPE.STONE2,CELL_TYPE.STONE3,CELL_TYPE.STONE4,CELL_TYPE.STONE5];}

    var bord = new MyDef.M.Bord({
      w: 8, h: 8,
      cells: [
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?'],
        ['?', '?', '?', '?', '?', '?', '?', '?']
      ],
      stoneLoop : stones,
      stoneColors : setting.stoneColors
    });


    return bord;
  };

  MyDef.BordMaker.toEmptyBord = function(org_bord){
    var cells = MyUt.cloneArray(org_bord.cells);
    for (var y=0; y<org_bord.h; ++y) {
      for (var x = 0; x < org_bord.w; ++x) {
        var org = cells[y][x];
        cells[y][x]=(org==CELL_TYPE.BLANK) ? CELL_TYPE.BLANK : CELL_TYPE.EMPTY;
      }
    }

    return new MyDef.M.Bord({
      w:org_bord.w,
      h:org_bord.h,
      cells:cells,
      stoneLoop:org_bord.stoneLoop,
      stoneColors:org_bord.stoneColors
    });
  };


})();