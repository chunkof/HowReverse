(function() {
  "use strict";
  //---------------------
  // Access
  //---------------------
  MyDef.Subjects = {};
  MyDef.Subjects.getIndex = function(id){
    for (var i=0; i<MyDef.Subjects.data.length; ++i){
      var data = MyDef.Subjects.data[i];
      if (id == data.id){
        return i;
      }
    }
    return null;
  };
  //---------------------
  // Data
  //---------------------
  MyDef.Subjects.data = [];
  MyDef.Subjects.data.push({
      id  :'1',
      w:1, h:3,
      stoneLoop:[CELL_TYPE.STONE1,CELL_TYPE.STONE2],
      cells:[[ '1'],[ '1'],[ '1']]
    });
  MyDef.Subjects.data.push({
      id  :'2',
      type : "plane_code",
      code : "1412_696969fefefe4169e1ffb6c1_2222"
  });
  MyDef.Subjects.data.push({
      id  :'3',
      w:3, h:3,
      stoneLoop:[CELL_TYPE.STONE1,CELL_TYPE.STONE2],
      cells:[
        [ '-', '1', '-'],
        [ '1', '1', '1'],
        [ '-', '2', '-']
      ]
  });
  MyDef.Subjects.data.push({
      id  :'4',
      type : "plane_code",
      code : "3312_89f6f8f7ff8c4169e1ffb6c1_1-1-1-2-1"
  });
  MyDef.Subjects.data.push({
      id  :'5',
      w:4, h:4,
      stoneLoop:[CELL_TYPE.STONE1,CELL_TYPE.STONE2],
      cells:[
        [ '1', '-', '-', '2'],
        [ '-', '2', '1', '-'],
        [ '-', '1', '2', '-'],
        [ '2', '-', '-', '1']
      ]
  });
  MyDef.Subjects.data.push({
      id  :'6',
      type : "plane_code",
      code : "3412_6d554af4d4a84169e1ffb6c1_111-21222-22"
  });
  MyDef.Subjects.data.push({
      id  :'dog',
      type : "plane_code",
      code : "6512_bf9b44dec59e4169e1ffb6c1_-1----11---2-1111--1--1--2--2-"
  });
  MyDef.Subjects.data.push({
      id  :'white',
      w: 4, h: 4,
      stoneLoop:[CELL_TYPE.STONE1,CELL_TYPE.STONE2],
      cells: [
        ['-', '2', '2', '-'],
        ['2', '2', '2', '2'],
        ['2', '2', '2', '2'],
        ['2', '2', '2', '2']
      ]
  });
  MyDef.Subjects.data.push({
      id  :'flower',
      type : "plane_code",
      code : "56123_fcd5ed70b068feff66ffb6c1_--1---131---1--2-2-2-222---2--"
  });
})();