//Función GenerarContexto()
/*
FUNCIONALIDAD:
  Crea un texto en xml con la información del mapa (extent, mapa base, capas cargadas...); y lo convierte en xml,
  para después descargarlo en la máquina del usuario.
  Para ello, dentro ejecuta otra función (CapasContexto()), que va recorriendo las capas añadidas al mapa para extraer su información
  y añadirla al texto xml.
  Por último, se genera de manera dinámica el nombre del archivo que se va a descargar.
REQUERIMIENTOS:
    js/fuente/FileSaver.js
*/
function GenerarContexto(){
  //Se cierra el menú de contexto:
  CerrarMenuContexto();
  //Generar el texto del archivo xml:
  var xmlString = '<?xml version="1.0" ?><root>' +
    '<ows-context:OWSContext xmlns:ows-context="http://www.opengis.net/ows-context" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ows="http://www.opengis.net/ows" version="0.3.1" id="ows-context-ex-1-v3">' +
      '<ows-context:General>' +
        '<ows:BoundingBox crs="' + map.getView().getProjection().getCode() +
        '" minx="' + map.getView().calculateExtent()[0] +
        '" miny="' + map.getView().calculateExtent()[1] +
        '" maxx="' + map.getView().calculateExtent()[2] +
        '" maxy="' + map.getView().calculateExtent()[3] + '">' +
        '</ows:BoundingBox>' +
      '</ows-context:General>' +
     '<ows-context:LayerList>' +
      CapasContexto() +
      '</ows-context:LayerList>' +
    '</ows-context:OWSContext>'+
  '</root>';

  //Función CapasContexto()
  /*
  FUNCIONALIDAD:
    Recorre el array de capas cargadas al mapa, y añade la información necesaria al texto xml del contexto; distinguiendo
    si se trata de un servicio WMS o WMTS o de una capa creada a partir de un GeoJSON.
  */
  function CapasContexto(){
    var xmlCapas = "";
    for (var i=0; i<map.getLayers().getArray().length; i++){
      if ((map.getLayers().getArray()[i].values_.tipo == 'OGC:WMS') || (map.getLayers().getArray()[i].values_.tipo == 'OGC:WMTS')){
        xmlCapai = '<ows-context:Layer hidden="false" opacity="' + map.getLayers().getArray()[i].values_.opacity +
        '" queryable="' + map.getLayers().getArray()[i].values_.queryable + '">' +
        '<ows:Name>' + map.getLayers().getArray()[i].values_.name + '</ows:Name>' +
        '<ows:Title>' + map.getLayers().getArray()[i].values_.titulo_es + '</ows:Title>' +
        '<ows:Server service="' + map.getLayers().getArray()[i].values_.tipo +
        '" version="' + map.getLayers().getArray()[i].values_.version + '">' +
        '<ows:OnlineResource xlink:type="simple" xlink:href="' + map.getLayers().getArray()[i].getSource().urls[0] +
        '" />' +
        '</ows:Server>' +
        '</ows-context:Layer>';
        xmlCapas += xmlCapai;
      } else if (map.getLayers().getArray()[i].values_.tipo == 'GEOJSON'){
        xmlCapai = '<ows-context:Layer hidden="false" opacity="' + map.getLayers().getArray()[i].values_.opacity +
        '" queryable="' + map.getLayers().getArray()[i].values_.queryable + '">' +
        '<ows:Name>' + map.getLayers().getArray()[i].values_.name + '</ows:Name>' +
        '<ows:Title>' + map.getLayers().getArray()[i].values_.titulo_es + '</ows:Title>' +
        '<ows:Server service="' + map.getLayers().getArray()[i].values_.tipo +
        '" version="' + map.getLayers().getArray()[i].values_.version + '">' +
        '<ows:OnlineResource xlink:type="simple" xlink:href="' + map.getLayers().getArray()[i].values_.ruta_descarga +
        '" />' +
        '</ows:Server>' +
        '</ows-context:Layer>';
        xmlCapas += xmlCapai;
      }
    }
    return xmlCapas;
  }

  //Dar el nombre al archivo:
  var time = new Date().getTime();
  var fechaYHora = new Date(time);
  var ano = (fechaYHora.getFullYear()).toString();
  var mes = (fechaYHora.getMonth() + 1).toString();
  var dia = (fechaYHora.getDate()).toString();
  var hora = (fechaYHora.getHours()).toString();
  var min = (fechaYHora.getMinutes()).toString();
  var seg = (fechaYHora.getSeconds()).toString();
  var filename = "contexto_io-" + ano + mes + dia + '-' + hora + min + seg;

  //Crear el archivo y descargarlo en el ordenador del usuario:
  var blob = new Blob([xmlString], {type: "text/xml;charset=utf-8"});
  saveAs(blob, filename+".xml");
}
