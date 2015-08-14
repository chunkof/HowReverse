(function() {
"use strict";
  //------------------
  // ViewModel
  //------------------
  MyDef.VM.ScenePlay = function(owner) {
    var self = this;
    self.owner = owner;
    //--------------------
    //  Initialize
    //--------------------
    self.undo = function(){
      self.play_bord().undo();
    };
    self.back = function(){
      self.owner.end(self);
    };
    // binding
    var scene = $('#scene-play')[0];
    self.isActive = ko.observable(false);
    ko.cleanNode(scene);
    ko.applyBindings(self, scene);
    //--------------------
    //  Activate
    //--------------------
    self.activate = function(subject){
      var play    = MyDef.BordMaker.toEmptyBord(subject);
      self.subject_bord = ko.observable(new MyDef.VM.Bord({owner:self, model:subject, playable:false}));
      self.play_bord    = ko.observable(new MyDef.VM.Bord({owner:self, model:play,    playable:true}));
      self.subject_id = subject.id;
      MyUtD.SetCssStoneColors(subject.stoneColors);

      self.isActive(true);
    };
    //--------------------
    //  DeActivate
    //--------------------
    self.deActivate = function(){
      self.isActive(false);
    };
    //--------------------
    //  Receive Notify
    //--------------------
    self.notifyFullFilled = function(){
      var solved = self.subject_bord().hasSameCells(self.play_bord());
      if (false == solved){
        return;
      }

      setTimeout(function(){
        alert("Good!!");
        if (undefined == self.subject_id){
          return;
        }
        var subject_manager = MyDef.M.getSubjectManager();
        subject_manager.notifyClear(self.subject_id);
      }, 200);
    };
  };

})();