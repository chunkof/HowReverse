(function() {
  "use strict";
  //------------------
  // ViewModel
  //------------------
  MyDef.VM.SceneMenu = function(owner) {
    console.log("url="+location);
    var self = this;
    self.owner = owner;
    //--------------------
    //  Initialize
    //--------------------
    // binding
    var scene = $('#scene-menu')[0];
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
    //  choice
    //--------------------
    self.choice = function(menu_id){
      owner.choiceMenu(menu_id);
    }
  };

})();