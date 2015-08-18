(function() {
  "use strict";
  var storage_name = "_pixreversi_";
  var _store_data = {};
  var _store_data_default = {version:"0.0.1",result:{}};
  MyDef.M.StoreData = {};
  var p = MyDef.M.StoreData;
  //-------------
  p.SyncSubjectBaseStorage = function(){
    _store_data = p._read();
    for (var i=0; i<MyDef.Subjects.data.length; ++i){
      var id = MyDef.Subjects.data[i].id;
      var storage_result = _store_data.result[id];
      if (undefined == storage_result){
        continue;
      }
      MyDef.Subjects.data[i].cleared = storage_result.cleared;
    }
  };
  //-------------
  p.SyncSubjectBasData = function(){
    _store_data.result = {};
    for (var i=0; i<MyDef.Subjects.data.length; ++i){
      var data = MyDef.Subjects.data[i];
      var id = data.id;
      var cleared = data.cleared;
      if (true == cleared){
        _store_data.result[id] = {cleared:true}
      }
    }
    p._write(_store_data);
  };
  //-------------
  p.ClearSubjectStorage = function(){
    _store_data.result = {};
    p._write(_store_data);
  };
  //-------------
  p._write = function(data){
    if (!store.enabled){
      return;
    }
    store.set(storage_name, data);
  };
  //-------------
  p._read = function(){
    if (!store.enabled){
      return null;
    }
    var data = store.get(storage_name);
    if (!data){
      data = _store_data_default;
    }
    return data;
  };
})();