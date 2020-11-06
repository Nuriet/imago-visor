//Variable para llevar una cuenta del número de capas GPX cargadas, y poder asignarlas un color diferente:
var numeroCapaGPXCargada = 0;

//Array de colores a asignar a los GPX que se vayan cargando:
  //Paleta de colores elegida (se ha invertido el orden): http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=12
var arrayColoresGPXBorde = ['#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777'];
var arrayColoresGPXRelleno = ['#b15928','#6a3d9a','#ff7f00','#e31a1c','#33a02c','#1f78b4','#ffff99','#cab2d6','#fdbf6f','#fb9a99','#b2df8a','#a6cee3'];

//FUNCIÓN AnadirGPX(dataEntrada,tituloEntrada)
/*
ENTRADAS:
  dataEntrada: GPX cargado por el usuario, proveniente de la función CargarCapa(...).
	tituloEntrada: nombre que se va a dar a la capa en el menú de gestión de capas, etc...  Proviene de la función CargarCapa(...); y anteriormente de la función CargarArchivoExternoExaminar(...) o CargarArchivoExternoArrastrar(...), donde el título se construye a partir del nombre del archivo.
FUNCIONALIDAD:
  Crea la fuente de datos vectorial a partir del GPX de entrada, asigna el estilo siguiendo los arrays creados arriba,
  crea la capa vectorial y la añade al mapa.
*/
function AnadirGPX(dataEntrada,tituloEntrada){
  //Se crean los estilos para cada tipo de geometría:
  colorBordeI = arrayColoresGPXBorde[numeroCapaGPXCargada];
  colorRellenoI = arrayColoresGPXRelleno[numeroCapaGPXCargada];

  //Función de estilo:
  var style = {
    'Point': new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: colorRellenoI
        }),
        radius: 5,
        stroke: new ol.style.Stroke({
          color: colorBordeI,
          width: 1
        })
      })
    }),
    'LineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: colorRellenoI,
        width: 3
      })
    }),
    'MultiLineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: colorRellenoI,
        width: 3
      })
    })
  };

  //Se crea la fuente:
  var fuenteVector = new ol.source.Vector({
    features: (new ol.format.GPX()).readFeatures(dataEntrada,({
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }))
  })

  //Crear la capa vectorial:
  var capaVectorialEntrada = new ol.layer.Vector({
    name: tituloEntrada.replace(/ /g,"_"),
    titulo_es: tituloEntrada,
    extent: [fuenteVector.getExtent()[0]-(fuenteVector.getExtent()[2]-fuenteVector.getExtent()[0])*0.1,fuenteVector.getExtent()[1]-(fuenteVector.getExtent()[3]-fuenteVector.getExtent()[1])*0.1,fuenteVector.getExtent()[2]+(fuenteVector.getExtent()[2]-fuenteVector.getExtent()[0])*0.1,fuenteVector.getExtent()[3]+(fuenteVector.getExtent()[3]-fuenteVector.getExtent()[1])*0.1],
    abstract: "Capa cargada por el usuario desde un archivo local.",
    source: fuenteVector,
    tipo: "GPX",
    style: function(feature) {
      return style[feature.getGeometry().getType()];
    },
    tipo_feature: 'LineString',
    color_borde: colorBordeI,
    color_relleno: colorRellenoI
  });

  //Añadir la capa al mapa:
  map.addLayer(capaVectorialEntrada);
  //Añadir la capa a la leyenda, y hacerla visible (si estaba invisible):
  AñadirALeyenda(capaVectorialEntrada,'gpx');
  AbrirLeyenda();
  //Añadir la capa al menú de gestión de capas:
  AnadirAGestionCapas(capaVectorialEntrada,'gpx');

  //Hacer zoom al extent de la nueva capa vectorial cargada:
  var anchoSidebar = document.getElementById('sidebar').offsetWidth + 15;
  map.getView().fit(fuenteVector.getExtent(),{size:map.getSize(),padding:[15,15,15,anchoSidebar]});

  //Actualizar el contador de capas GPX cargadas, para elegir otro color desde los arrays creados arriba:
  if (numeroCapaGPXCargada < arrayColoresGPXBorde.length - 1){
    numeroCapaGPXCargada = numeroCapaGPXCargada + 1;
  } else {
    numeroCapaGPXCargada = 0;
  }
}
