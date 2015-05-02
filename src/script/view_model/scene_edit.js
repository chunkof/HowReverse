(function() {
"use strict";
  //------------------
  // ViewModel
  //------------------
  MyDef.VM.SceneEdit = function(owner) {
    var self = this;
    self.owner = owner;
    // binding
    var scene = $('#scene-edit')[0];
    self.isActive = ko.observable(false);
    ko.cleanNode(scene);
    ko.applyBindings(self, scene);
    //--------------------
    //  Activate
    //--------------------
    self.activate = function(){
      var edit = MyDef.BordMaker.getCanvas();
      self.edit_bord    = ko.observable(new MyDef.VM.Bord({owner:self, model:edit, playable:true, mode:'edit'}));
      self.isActive(true);
    };
    //--------------------
    //  DeActivate
    //--------------------
    self.deActivate = function(){
      self.isActive(false);
    };
    //--------------------
    //  undo
    //--------------------
    self.undo = function(){
      self.edit_bord().undo();
    };
    //--------------------
    //  back
    //--------------------
    self.back = function(){
      self.owner.end(self);
    };
  };

})();