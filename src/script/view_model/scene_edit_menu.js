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
      self.setDefaultStoneColors();
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
      var setting = [];
      setting.pixel_pattern = $("#pixel_pattern option:selected").text();
      setting.stoneColors   = [
             $("#stone_color1").spectrum("get").toHexString().substr(1)
            ,$("#stone_color2").spectrum("get").toHexString().substr(1)
            ,$("#stone_color3").spectrum("get").toHexString().substr(1)
            ,$("#stone_color4").spectrum("get").toHexString().substr(1)];

      MyUtD.SetCssStoneColors(
        setting.stoneColors
      );
      self.owner.goEdit(setting);
    };
    //--------------------
    //  back
    //--------------------
    self.back = function(){
      self.owner.end(self);
    };
    self.setDefaultStoneColors = function(){
      $("#stone_color1").spectrum({color: "696969"});
      $("#stone_color2").spectrum({color: "fefefe"});
      $("#stone_color3").spectrum({color: "4169e1"});
      $("#stone_color4").spectrum({color: "ffb6c1"});
    };
  };

})();