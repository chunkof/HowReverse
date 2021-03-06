function importJS() {
  var scripts;
  scripts =
    [
      // script start------------------------------
      'script/_def.js',
      'script/utility.js',
      // model
      'script/model/bord.js',
      'script/model/subject_data.js',
      'script/model/store_data.js',
      'script/model/subject_manager.js',
      'script/model/bord_maker.js',
      'script/model/bord_converter.js',
      'script/model/uri.js',
      // view model
      'script/view_model/bord.js',
      // scene
      'script/view_model/scene_menu.js',
      'script/view_model/scene_play.js',
      'script/view_model/scene_edit_menu.js',
      'script/view_model/scene_edit.js',
      'script/view_model/scene_subject.js',
      'script/view_model/scene_manager.js'
      // script end------------------------------
    ]
  ;
  for (var i=0; i<scripts.length; i++) {
    document.write('<script type="text/javascript" src="' +scripts[i] +'"><\/script>');
  }
}
importJS();
