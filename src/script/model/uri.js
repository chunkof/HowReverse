(function() {
  "use strict";
  MyDef.URI = [];
  var self = MyDef.URI;
  MyDef.URI.baseURI = location.href.replace(location.search,"");
  MyDef.URI.createPlayURI = function(bord){
    var code = MyDef.BordConverter.bordToCode(bord);
    var uri = self.baseURI + '?bord=' + code;
    return uri;
  };
  MyDef.URI.getBordModel = function(org_uri){
    var uri = new URI(org_uri);
    var query = uri.search(true);
    var compress_code = query.bord;
    if (undefined == compress_code){
      return null;
    }
    var plane_code = MyDef.BordConverter.compressCodeToPlaneCode(compress_code);
    var bord       = MyDef.BordConverter.planeCodeToBord(plane_code);

    return bord;
  }
})();