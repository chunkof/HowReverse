function importJS() {
  var scripts;
  scripts =
    [
      // script start------------------------------
      'script/common_def.js',
      'script/model.js',
      'script/view_model.js'
      // script end------------------------------
    ]
  ;
  for (var i=0; i<scripts.length; i++) {
    document.write('<script type="text/javascript" src="' +scripts[i] +'"><\/script>');
  }
}
importJS();
