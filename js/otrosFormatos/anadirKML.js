//FUNCIÓN AnadirKML(dataEntrada,tituloEntrada)
/*
ENTRADAS:
  dataEntrada: KML cargado por el usuario, proveniente de la función CargarCapa(...).
	tituloEntrada: nombre que se va a dar a la capa en el menú de gestión de capas, etc...  Proviene de la función CargarCapa(...); y anteriormente de la función CargarArchivoExternoExaminar(...) o CargarArchivoExternoArrastrar(...), donde el título se construye a partir del nombre del archivo.
FUNCIONALIDAD:
  Crea la fuente de datos vectorial a partir del KML de entrada, crea la capa vectorial y la añade al mapa.
*/
function AnadirKML(dataEntrada,tituloEntrada){
  //Se crea la fuente:
  var fuenteVector = new ol.source.Vector({
    features: (new ol.format.KML()).readFeatures(dataEntrada,({
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }))
  })

  //Se crea la capa:
  var capaVectorialEntrada = new ol.layer.Vector({
    name: tituloEntrada.replace(/ /g,"_"),
    titulo_es: tituloEntrada,
    extent: [fuenteVector.getExtent()[0]-(fuenteVector.getExtent()[2]-fuenteVector.getExtent()[0])*0.1,fuenteVector.getExtent()[1]-(fuenteVector.getExtent()[3]-fuenteVector.getExtent()[1])*0.1,fuenteVector.getExtent()[2]+(fuenteVector.getExtent()[2]-fuenteVector.getExtent()[0])*0.1,fuenteVector.getExtent()[3]+(fuenteVector.getExtent()[3]-fuenteVector.getExtent()[1])*0.1],
    abstract: "Capa cargada por el usuario desde un archivo local.",
    source: fuenteVector,
    tipo: 'KML'
  });

  //Añadir la capa al mapa:
  map.addLayer(capaVectorialEntrada);
  //No se añade la capa a la leyenda (porque estos archivos no tienen leyenda).
  //Añadir la capa al menú de gestión de capas:
  AnadirAGestionCapas(capaVectorialEntrada,'kml');

  //Hacer zoom al extent de la nueva capa vectorial cargada:
  var anchoSidebar = document.getElementById('sidebar').offsetWidth + 15;
  map.getView().fit(fuenteVector.getExtent(),{size:map.getSize(),padding:[15,15,15,anchoSidebar]});
}
