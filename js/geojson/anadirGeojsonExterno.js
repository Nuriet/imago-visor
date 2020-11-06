//ESTILO PERSONALIZADO
//Variable para llevar una cuenta del número de capas Geojson cargadas, y poder asignarlas un color diferente:
var numeroCapaGeojsonCargada = 0;
//Array de colores a asignar a los Geojson que se vayan cargando:
  //Paleta de colores elegida: http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=12
var arrayColoresGeojsonBorde = ['#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777','#777777'];
var arrayColoresGeojsonRelleno = ['#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#ffff99','#a6cee3','#1f78b4','#33a02c','#e31a1c','#ff7f00','#6a3d9a','#b15928'];

//FUNCIÓN AnadirGeojsonExterno(geojsonEntrada,nombreCapaEntrada,opacidadEntrada)
/*
ENTRADAS:
  geojsonEntrada: geojson cargado por el usuario, proveniente de la función CargarCapa(...).
	nombreCapaEntrada: nombre que se va a dar a la capa en el menú de gestión de capas, en la leyenda, etc...  Proviene de la función CargarCapa(...); y anteriormente de la función CargarArchivoExternoExaminar(...) o CargarArchivoExternoArrastrar(...), donde el título se construye a partir del nombre del archivo.
	opacidadEntrada: valor de opacidad con el que se tiene que cargar la capa. Por defecto, en las funciones CargarArchivoExternoExaminar(...) o CargarArchivoExternoArrastrar(...) se le da el valor 1.
FUNCIONALIDAD:
  Crea la fuente de datos vectorial a partir del geojson de entrada; después asigna un estilo en función del tipo de geometría,
  recorriendo los arrays de colores creados arriba, después crea la capa capa vectorial y la añade al mapa.
*/
function AnadirGeojsonExterno(geojsonEntrada,nombreCapaEntrada,opacidadEntrada) {
  //Detecta el tipo de geometría de la capa a cargar:
  var tipoFeature = geojsonEntrada.features[0].geometry.type;
  //Se crea la fuente vectorial:
  var fuenteVector = new ol.source.Vector({
    features: (new ol.format.GeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })).readFeatures(geojsonEntrada)
  });
  //Se crean los estilos para cada tipo de geometría:
  colorBordeI = arrayColoresGeojsonBorde[numeroCapaGeojsonCargada];
  colorRellenoI = arrayColoresGeojsonRelleno[numeroCapaGeojsonCargada];
  var image = new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: colorRellenoI
    }),
    stroke: new ol.style.Stroke({
      color: colorBordeI,
      width: 1
    })
  });
  var AsignarEstilo = {
    'Point': new ol.style.Style({
      image: image
    }),
    'LineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: colorRellenoI,
        width: 1
      })
    }),
    'MultiLineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: colorRellenoI,
        width: 1
      })
    }),
    'MultiPoint': new ol.style.Style({
      image: image
    }),
    'MultiPolygon': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: colorBordeI,
        width: 1
      }),
      fill: new ol.style.Fill({
        color: colorRellenoI
      })
    }),
    'Polygon': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: colorBordeI,
        width: 1
      }),
      fill: new ol.style.Fill({
        color: colorRellenoI
      })
    }),
    'GeometryCollection': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: colorBordeI,
        width: 1
      }),
      fill: new ol.style.Fill({
        color: colorRellenoI
      }),
      image: new ol.style.Circle({
        radius: 6,
        fill: null,
        stroke: new ol.style.Stroke({
          color: colorBordeI
        })
      })
    }),
    'Circle': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: colorBordeI,
        width: 1
      }),
      fill: new ol.style.Fill({
        color: colorRellenoI
      })
    })
  };
  //Función para devolver el estilo correspondiente dependiendo del tipo de geometría:
  var funcionDeEstilo = function(feature) {
    return AsignarEstilo[feature.getGeometry().getType()];
  };

  //Se crea la capa vectorial, con todos los atributos necesarios para el funcionamiento del visualizador:
  var capaVectorialEntrada = new ol.layer.Vector({
    name: nombreCapaEntrada.replace(/ /g,"_"),
    titulo_es: nombreCapaEntrada,
  	extent: [fuenteVector.getExtent()[0]-(fuenteVector.getExtent()[2]-fuenteVector.getExtent()[0])*0.1,fuenteVector.getExtent()[1]-(fuenteVector.getExtent()[3]-fuenteVector.getExtent()[1])*0.1,fuenteVector.getExtent()[2]+(fuenteVector.getExtent()[2]-fuenteVector.getExtent()[0])*0.1,fuenteVector.getExtent()[3]+(fuenteVector.getExtent()[3]-fuenteVector.getExtent()[1])*0.1],
  	abstract: "Capa cargada por el usuario desde un archivo local.",
    source: fuenteVector,
    style: funcionDeEstilo,
    tipo_feature: tipoFeature,
    color_borde: colorBordeI,
    color_relleno: colorRellenoI,
    origen_geojson: "usuario"
  });

  //Añadir la capa al mapa:
  map.addLayer(capaVectorialEntrada);
  //Añadir la capa a la leyenda, y hacerla visible (si estaba invisible):
  AñadirALeyenda(capaVectorialEntrada,'geojson_externo');
  AbrirLeyenda();
  //Añadir la capa al menú de gestión de capas:
  AnadirAGestionCapas(capaVectorialEntrada,'geojson');

  //Hacer zoom al extent de la nueva capa vectorial cargada:
  var anchoSidebar = document.getElementById('sidebar').offsetWidth + 15;
  map.getView().fit(fuenteVector.getExtent(),{size:map.getSize(),padding:[15,15,15,anchoSidebar]});

  //Sumar 1 a la varible que guarda el número de capas geojson cargadas (para controlar los colores del array utilizados):
  if (numeroCapaGeojsonCargada < arrayColoresGeojsonBorde.length - 1){
    numeroCapaGeojsonCargada = numeroCapaGeojsonCargada + 1;
  } else {
    numeroCapaGeojsonCargada = 0;
  }
}
