(function() {
  "use strict";

  MyDef.VM.SceneManager = function(){
    var self = this;
    //--------------------
    //  Initialize
    //--------------------
    //--------------------
    //  Scenes
    //--------------------
    self.sceneMenu    = new MyDef.VM.SceneMenu(self);
    self.sceneSubject = new MyDef.VM.SceneSubject(self);
    self.scenePlay    = new MyDef.VM.ScenePlay(self);
    self.sceneEditMenu= new MyDef.VM.SceneEditMenu(self);
    self.sceneEdit    = new MyDef.VM.SceneEdit(self);
    self.stackScene   = [];
    //--------------------
    //  Start
    //--------------------
    self.start = function(){
      var bord_model =  MyDef.URI.getBordModel(location);
      if (null != bord_model){
        self.scenePlay.activate(bord_model);
      }
      self.sceneMenu.activate();
    };
    //--------------------
    //  Choice Menu
    //--------------------
    self.choiceMenu = function(menu_id){
      var curr_scene = self.sceneMenu;
      var next_scene = self.sceneMenu;
      if ('subject' == menu_id) next_scene = self.sceneSubject;
      if ('edit'    == menu_id) next_scene = self.sceneEditMenu;

      self.stackScene.push(curr_scene);
      curr_scene.deActivate();
      next_scene.activate();
    };
    //--------------------
    //  Choice Subject
    //--------------------
    self.choiceSubject = function(subject_id){
      self.stackScene.push(self.sceneSubject);
      self.sceneSubject.deActivate();
      var subject = MyDef.BordMaker.getSubject(subject_id);
      self.scenePlay.activate(subject);
    };
    //--------------------
    //  End
    //--------------------
    self.end = function(scene){
      var curr_scene = scene;
      var next_scene = self.stackScene.pop();
      curr_scene.deActivate();
      next_scene.activate();
    };
  };
  var scene_manager = new MyDef.VM.SceneManager();
  scene_manager.start();

})();