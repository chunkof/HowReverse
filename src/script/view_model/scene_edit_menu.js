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
    self.ok = function(form){
      var setting = {
        pixel_pattern : form.pixel_pattern.value
      };
      self.owner.goEdit(setting);
    };
    //--------------------
    //  back
    //--------------------
    self.back = function(){
      self.owner.end(self);
    };
  };

})();