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
    self.code = ko.observable();
    ko.cleanNode(scene);
    ko.applyBindings(self, scene);
    //--------------------
    //  Activate
    //--------------------
    self.activate = function(){
      var model = MyDef.BordMaker.getCanvas();
      self.edit_bord = ko.observable(new MyDef.VM.Bord({owner:self, model:model, playable:true, mode:'edit'}));
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
    //--------------------
    //  to Code
    //--------------------
    self.toCode = function(){
      var model = self.edit_bord().model;
      var code  = MyDef.BordConerter.bordToPlaneCode(model);
      self.code(code);
    };
    //--------------------
    //  to Bord
    //--------------------
    self.toBord = function(){
      var code = self.code();
      var model = MyDef.BordConerter.planeCodeToBord(code);
      self.edit_bord(new MyDef.VM.Bord({owner:self, model:model, playable:true, mode:'edit'}));
    };
    //--------------------
    //  clear
    //--------------------
    self.clear = function(){
      var model = MyDef.BordMaker.getCanvas();
      self.edit_bord(new MyDef.VM.Bord({owner:self, model:model, playable:true, mode:'edit'}));
    };
  };

})();