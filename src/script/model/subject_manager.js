(function() {
  "use strict";
  var entity = undefined;
  //--------------------
  // MyDef.M.getSubjectManager
  //--------------------
  MyDef.M.getSubjectManager = function(){
    if (entity != undefined){
      return entity;
    }
    entity = new MyDef.M.SubjectManager();
    return entity;
  };
  //--------------------
  // MyDef.M.SubjectManager
  //--------------------
  var p = function(){ this.initialize();}
  MyDef.M.SubjectManager = p;
  //--------------------
  p.prototype.initialize = function(){
    this.loadFromStore();
  };
  //--------------------
  p.prototype.loadFromStore = function(){
    //todo;
  };
  //--------------------
  p.prototype.getBord = function(id){
    var index = MyDef.Subjects.getIndex(id);
    var subject = MyDef.Subjects.data[index];
    if (subject.type == "plane_code"){
      var id = subject.id;
      subject = MyDef.BordConverter.planeCodeToBord(subject.code);
      subject.id = id;
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
  //--------------------
  p.prototype.getNum = function(){
    return MyDef.Subjects.data.length;
  };
  //--------------------
  p.prototype.getInfoByIndex = function(index){
    var subject = MyDef.Subjects.data[index];
    if (undefined == subject){
      return undefined;
    }
    var cleared = (true == subject.cleared);
    return {id : subject.id, index: index, cleared: cleared};
  };
  //--------------------
  p.prototype.notifyClear = function(id){
    var index = MyDef.Subjects.getIndex(id);
    MyDef.Subjects.data[index].cleared = true;
  };
  //--------------------
  p.prototype.resetAllResult = function(){
    for (var i=0; i<MyDef.Subjects.data.length; ++i){
      MyDef.Subjects.data[i].cleared = undefined;
    }
  };
  

})();