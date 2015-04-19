(function() {
  "use strict";
  //------------------
  // ViewModel
  //------------------
  MyDef.VM.SceneSubject = function(owner) {
    var self = this;
    self.owner = owner;
    //--------------------
    //  Initialize
    //--------------------
    // binding
    var scene = $('#scene-subject')[0];
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
    self.choice = function(){
      owner.choiceSubject();
    }
  };

})();