(function() {
  "use strict";
  MyDef.VM.SceneEditMenu = function(owner) {
    var self = this;
    self.owner = owner;
    //--------------------
    //  Initialize
    //--------------------
    // binding
    var scene = $('#scene-edit-menu')[0];
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
    //--------------------
    //  ok
    //--------------------
    self.ok = function(setting){
      alert("ok:" + setting.pixcel_pattern.value);
    };
    //--------------------
    //  back
    //--------------------
    self.back = function(){
      self.owner.end(self);
    };
  };

})();