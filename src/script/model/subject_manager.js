(function() {
  "use strict";
  // Bord Spec
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
  var entity = undefined;
  MyDef.M.getSubjectManager = function(){
    if (entity != undefined){
      return entity;
    }
    entity = new MyDef.M.SubjectManager();
    return entity;
  };
  MyDef.M.SubjectManager = function(){
    var self = this;
    // get Bord
    self.getBord = function(id){
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
  };


})();