(function() {
  "use strict";

  MyDef.VM.SceneManager = function(){
    var self = this;
    //--------------------
    //  Initialize
    //--------------------
    var SCENE = {
      SUBJECT: 0,
      PLAY:    1,
      _SIZEOF: 2
    };
    self.scene = SCENE.SUBJECT;
    //--------------------
    //  Scenes
    //--------------------
    self.sceneSubject = new MyDef.VM.SceneSubject(self);
    self.scenePlay    = new MyDef.VM.ScenePlay(self);
    //--------------------
    //  Start
    //--------------------
    self.start = function(){
        self.sceneSubject.activate();
    };
    //--------------------
    //  Choice Subject
    //--------------------
    self.choiceSubject = function(){
      self.sceneSubject.deActivate();
      self.scenePlay.activate();
    };
  };
  var scene_manager = new MyDef.VM.SceneManager();
  scene_manager.start();

})();