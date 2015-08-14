(function() {
  "use strict";
  var entity = undefined;
  //--------------------
  //--------------------
  MyDef.M.getSubjectManager = function(){
    if (entity != undefined){
      return entity;
    }
    entity = new MyDef.M.SubjectManager();
    return entity;
  };
  //--------------------
  //--------------------
  MyDef.M.SubjectManager = function(){
    var self = this;
    //--------------------
    self.getBord = function(id){
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
    self.getNum = function(){
      return MyDef.Subjects.data.length;
    };
    //--------------------
    self.getInfoByIndex = function(index){
      var subject = MyDef.Subjects.data[index];
      if (undefined == subject){
        return undefined;
      }
      var cleared = (true == subject.cleared);
      return {id : subject.id, cleared: cleared};
    };
    //--------------------
    self.notifyClear = function(id){
      var index = MyDef.Subjects.getIndex(id);
      MyDef.Subjects.data[index].cleared = true;
    };
    //--------------------
    self.resetAllResult = function(){
      for (var i=0; i<MyDef.Subjects.data.length; ++i){
        MyDef.Subjects.data[i].cleared = undefined;
      }
    };
  };


})();