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
    var subject = MyDef.BordMaker.getSubject();
    var play    = MyDef.BordMaker.getEmpty(subject);
    self.subject_bord = ko.observable(new MyDef.VM.Bord({model:subject}));
    self.play_bord    = ko.observable(new MyDef.VM.Bord({model:play}));
    self.undo = function(){
      self.play_bord().undo();
    };
    // binding
    var scene = $('#scene-play')[0];
    self.isActive = ko.observable(false);
    ko.cleanNode(scene);
    ko.applyBindings(self, scene);
    //--------------------
    //  Activate
    //--------------------
    self.activate = function(){
      self.isActive(true);
    };
    //--------------------
    //  DeActivate
    //--------------------
    self.deActivate = function(){
      self.isActive(false);
    };
  };

})();