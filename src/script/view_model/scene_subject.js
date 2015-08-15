(function() {
  "use strict";
  MyDef.VM.SubjectPanel = function(owner,spec){
    var self = this;
    self.owner = owner;
    self.id = spec.id;
    var disp = "no."+(spec.index+1).toString() + ":" + spec.id;
    if (true == spec.cleared){
      disp = disp+"(cleared)";
    }else{

    }
    self.display_name = disp;
    self.click = function(){
      self.owner.notifyChoie(self.id);
    };
  };
  //------------------
  // ViewModel
  //------------------
  MyDef.VM.SceneSubject = function(owner) {
    var self = this;
    self.owner = owner;
    self.manager = MyDef.M.getSubjectManager();

    //--------------------
    //  Initialize
    //--------------------
    // binding
    var scene = $('#scene-subject')[0];
    self.isActive = ko.observable(false);
    ko.cleanNode(scene);
    ko.applyBindings(self, scene);
    self.subject_panels = ko.observableArray();
    //--------------------
    //  Activate
    //--------------------
    self.activate = function(){
      // Init Subject Panel
      self.remakePanels();
      // activate
      self.isActive(true);
    };
    self.remakePanels = function(){
      self.subject_panels.removeAll();
      var subject_num = self.manager.getNum();
      for (var i = 0; i<subject_num; ++i){
        var info = self.manager.getInfoByIndex(i);
        var panel = new MyDef.VM.SubjectPanel(self,info);
        self.subject_panels.push(panel);
      }
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
    self.notifyChoie = function(subject_id){
      self.owner.choiceSubject(subject_id);
    };
    //--------------------
    //  back
    //--------------------
    self.back = function(){
      self.owner.end(self);
    };
    //--------------------
    //  reset
    //--------------------
    self.reset = function(){
      self.manager.resetAllResult();
      self.remakePanels();
    };
  };

})();