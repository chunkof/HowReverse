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
    self.activate = function(setting){
      self.setting = setting;
      var model = MyDef.BordMaker.getCanvas(setting);
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
    //  to URI
    //--------------------
    self.toURI = function(){
      var model = self.edit_bord().model;
      model = MyDef.BordConverter.getMinimized(model);
      var uri  = MyDef.URI.createPlayURI(model);
      self.code(uri);
    };
    //--------------------
    //  to Code
    //--------------------
    self.toCode = function(){
      self.toURI();//todo:
    };
    //--------------------
    //  clear
    //--------------------
    self.clear = function(){
      var model = MyDef.BordMaker.getCanvas(self.setting);
      self.edit_bord(new MyDef.VM.Bord({owner:self, model:model, playable:true, mode:'edit'}));
    };
  };

})();