/* --- CREACIÓN DEL MAPA Y CONTROLES --- */
//Variables:
var map = {};
var vistaMapa = {};
var overlayPopup = {};
var capaBaseVTusig = {};
var arrayCapasYaAnadidasAPopup = [];

//Función CrearMapa()
/*
FUNCIONALIDAD:
  Crea:
    - el primer mapa base,
    - los controles del mapa (escala lineal, posición del puntero, mapa overview, atribuciones),
    - la vista,
    - el popup vacío y la capa overlay para contenerlo,
    - añade la funcionalidad del popup con el evento onclick sobre las features de las capas GEOJSON que se carguen
      (el contenido del popup sobre capas WMS, que generan un GetFeatureInfo, se crea en el archivo popup.js con la función AnadirGetFeatureInfoWMSAPopup(...)).
  Esta función se ejecuta al cargar la página.
*/
function CrearMapa(){
  // Mapa base a cargar al inicio (Teselas Vectoriales USIG)
  /*capaBaseVTusig = new ol.layer.VectorTile({
    titulo_es: 'Vector Tiles uSIG light',
    tipo: 'OGC:WMTS', //Campo necesario únicamente para generar el contexto.
    queryable : false, //Campo necesario únicamente para generar el contexto.
    tileGrid: ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 24}),
    tilePixelRatio: 8,
    baseLayer: true,
    visible: true,
    declutter: true,
    //Opciones añadidas para mejorar el renderizado de las teselas
    preload:Infinity,
    updateWhileInteracting:true,
    updateWhileAnimating:true,
    useInterimTilesOnError:true,
    source: new ol.source.VectorTile({
      format: new ol.format.MVT(),
      attributions: '<a href="http://unidadsig.cchs.csic.es/sig/" target="_blank">Unidad SIG</a> | © <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> | © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      url: 'http://usig-teselas.cchs.csic.es/data/v3/{z}/{x}/{y}.pbf'
    }),
  });
  // Estilo a aplicar a las teselas:
 // var style = 'js/estilosVT/light.json'; El estilo que estaba, el light
 var style = 'js/estilosVT/light.json';
    fetch(style).then(function(response) {
      response.json().then(function(glStyle) {
        olms.applyStyle(capaBaseVTusig, glStyle, 'openmaptiles').then(function() {
          capaBaseVTusig.set('name','vector_tiles_usig_light');
          capaBaseVTusig.setOpacity(0.8);
          map.getLayers().removeAt(0);
          map.getLayers().insertAt(0,capaBaseVTusig);
          map.getView().setMaxZoom(20);
        });
      });
    });*/


  var tilegrid =  ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 24});
  var sea = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    attributions: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>'+ '© <a href="http://unidadsig.cchs.csic.es/sig/">uSIG</a> ',
    format: new ol.format.MVT(),
    overlaps:true,
    tileGrid: tilegrid,
    tilePixelRatio: 8,
    url: 'http://161.111.47.198:8080/data/elem_marinos/{z}/{x}/{y}.pbf?',
    zIndex:-20
  }),
  baseLayer: true,
  declutter:true,
  preload:Infinity,
  updateWhileInteracting:true,
  updateWhileAnimating:true,
  useInterimTilesOnError:true,
});
var ground = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    url: 'http://usig-teselas.cchs.csic.es/data/v3/{z}/{x}/{y}.pbf',
    tilePixelRatio: 8,
  }),
  baseLayer: true,
  declutter:true,
  queryable : false,
  preload:Infinity,
  updateWhileInteracting:true,
  updateWhileAnimating:true,
  useInterimTilesOnError:true,
});

var ground_text = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    url: 'http://usig-teselas.cchs.csic.es/data/v3/{z}/{x}/{y}.pbf',
    tilePixelRatio: 8,
  }),
  zIndex:-5,
  declutter:true,
  queryable : false,
  preload:Infinity,
  updateWhileInteracting:true,
  updateWhileAnimating:true,
  useInterimTilesOnError:true,
});



var styleground = 'js/estilosVT/blue_ground.json'
fetch(styleground).then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyBackground(map, glStyle);
    olms.applyStyle(ground, glStyle, 'openmaptiles').then(function() {
      ground.setOpacity(1);
      ground.setZIndex(-25);
      map.addLayer(ground);
    });
  });
});
var stylesea = 'js/estilosVT/blue_sea.json'
fetch(stylesea).then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(sea, glStyle, 'elementos_marinos').then(function() {
      sea.setOpacity(1);
      sea.setZIndex(-20);
      map.addLayer(sea);
      });
    });
 });
var stylegroundtext = 'js/estilosVT/blue_ground_text.json'
fetch(stylegroundtext).then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(ground_text, glStyle, 'openmaptiles').then(function() {
      ground_text.setOpacity(1);
      ground_text.setZIndex(-5);
      map.addLayer(ground_text);
    });
  });
});

var capaBaseVTusig = new ol.layer.Group({
  layers:[ground, sea, ground_text],
  queryable : false,
});
capaBaseVTusig.set('name','vector_tiles_usig_oceanbasemap');
capaBaseVTusig.set('titulo_es','Vector Tiles uSIG OceanBaseMap');
capaBaseVTusig.setOpacity(1);




  /* -- CREACIÓN DEL MAPA -- */
  // Centro (Lon, Lat) y zoom inicial del mapa
  var LonLat_centro = [-3, 39];
  var Zoom_inicial = 6;

  /* Controles del mapa */
  // Escala lineal:
  var scaleLineControl = new ol.control.ScaleLine({
    target: 'escalaLineal'
  });

  // Longitud y latitud de la posición del puntero:
  var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: function(coord){ return ol.coordinate.format(coord, '{x}, {y}', 4)+' (lon, lat) - EPSG:4326';},
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('posicionMouse'),
    undefinedHTML: '&nbsp;'
  });

  // Mapa overview:
  // Mapa base a colocar en el overview map (Teselas Vectoriales USIG)
  var capaBaseOverviewMapVTusig = new ol.layer.VectorTile({
    titulo_es: 'Vector Tiles uSIG light',
    tipo: 'OGC:WMTS', //Campo necesario únicamente para generar el contexto.
    queryable : false, //Campo necesario únicamente para generar el contexto.
    tileGrid: ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 24}),
    tilePixelRatio: 8,
    baseLayer: true,
    visible: true,
    declutter: true,
    //opciones de mejora del renderizado de las teselas
    preload:Infinity,
    updateWhileInteracting:true,
    updateWhileAnimating:true,
    useInterimTilesOnError:true,
	//rendermode: 'image',
    source: new ol.source.VectorTile({
      format: new ol.format.MVT(),
      attributions: '<a href="http://unidadsig.cchs.csic.es/sig/" target="_blank">Unidad SIG</a> | © <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> | © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      url: 'http://usig-teselas.cchs.csic.es/data/v3/{z}/{x}/{y}.pbf'
    }),
  });
  // Estilo a aplicar a las teselas:
  var style = 'js/estilosVT/light.json';
    fetch(style).then(function(response) {
      response.json().then(function(glStyle) {
        olms.applyStyle(capaBaseOverviewMapVTusig, glStyle, 'openmaptiles').then(function() {
          capaBaseOverviewMapVTusig.set('name','vector_tiles_usig_light');
          capaBaseOverviewMapVTusig.setOpacity(0.8);
        });
      });
    });

  var capaBaseOSMOverviewMap = new ol.layer.Tile({
    titulo_es: 'OSM Base Map',
    tipo: 'OGC:WMTS',
    queryable : false,
    source: new ol.source.OSM({
      attributions: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    })
  });

  var overviewMapControl = new ol.control.OverviewMap({
    layers: [capaBaseOverviewMapVTusig],
    className: 'ol-overviewmap ol-custom-overviewmap',
    collapseLabel: '\u00BB',
    label: '\u00AB',
    collapsed: true,
    tipLabel: 'Mapa de situación'
  });

  // Atribución:
  var attribution = new ol.control.Attribution({
    collapsed: false,
    collapsible: false
  });

  /* Creación de la vista */
  vistaMapa = new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.fromLonLat(LonLat_centro),
    zoom: Zoom_inicial,
	//zoomFactor:1.5,
    minZoom: 3,
    maxZoom: 28,
    extent: [-20026376.39, -20048966.10, 20026376.39, 20048966.10],
    constrainResolution: true
  });

  /* Creación del popup y su overlay */
  var divPopup = document.getElementById('popup');
  var contenidoPopup = document.getElementById('popup-content');
  var cerrarPopup = document.getElementById('popup-closer');
  overlayPopup = new ol.Overlay({
   element: divPopup,
   autoPan: true,
   autoPanAnimation: {
     duration: 250
   }
  });

  /* Creación del mapa */
  map = new ol.Map({
    layers: [capaBaseVTusig],
    target: 'map',
    view: vistaMapa,
    overlays: [overlayPopup],
    interactions : ol.interaction.defaults({doubleClickZoom :true}),
    controls: ol.control.defaults({
      attributionOptions: {
        collapsible: false
      }
    }).extend([
      scaleLineControl, mousePositionControl, overviewMapControl
    ]),
  });


map.getLayers().removeAt(0);
map.getLayers().insertAt(0,capaBaseVTusig);
map.getView().setMaxZoom(20);

  //Deshabilitar el zoom con el evento "doble click":
  var dblClickInteraction;
  map.getInteractions().getArray().forEach(function(interaction) {
    if (interaction instanceof ol.interaction.DoubleClickZoom) {
      dblClickInteraction = interaction;
    }
  });
  map.removeInteraction(dblClickInteraction);

  //Asignar el color de fondo:
  $("#map").css({'background':'#f7f6f6'});

  //CAPAS GEOJSON: añadir en el evento onclick en el mapa, la funcionalidad del popup:
  map.on('singleclick', function(evt) {
    var pixel = evt.pixel;

    //Vaciar el contenido del popup anterior, y hacerlo desaparecer:
    $("#acordeonPopup").empty();
    $("#popup").css("display","none");

    //Array para controlar si ya se ha generado el evento en una capa para no repetirla con diferentes DATOS
    //(esto es lo que ocurre cuando se hace click en elementos que están muy próximos porque estamos con un nivel de zoom demasiado grande)
    arrayCapasYaAnadidasAPopup = [];
    //Función para obtener TODAS las features cargadas en el punto en que se hace click:
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      //8 condiciones:
      // - que exista una feature,
      // - que no sea del mapa base (el que está en posición 0 siempre (esto es necesario al disponer de mapas base con teselas vectoriales),
      // - que no se haya añadido ya información de alguna feature de la misma capa,
      // - que la capa sea visible (que tenga una opacidad superior al 0.05),
      // - 2: que la capa no sea la capa creada para guardar las mediciones sobre el mapa ni los dibujos realizados, y
      // - 2: que el modo medición esté desactivado; y que el modo dibujo también.
      if ((medicionHabilitada == false) && (dibujoHabilitado == false)){
        if (feature && (layer != map.getLayers().getArray()[0]) && (arrayCapasYaAnadidasAPopup.indexOf(layer.values_.name) == -1) && (layer.getOpacity() > 0.05) && (layer.values_.name != 'capaMedicion') && (layer.values_.name != 'capaDibujo')){
          //Si se trata de la primera capa de la que se va a añadir info al popup; que esté desplegada:
          if (arrayCapasYaAnadidasAPopup.length == 0){
            AnadirFeatureGeojsonAPopup(evt,feature,layer,"collapse show colapsable_popup");
            //Hacer aparecer el popup:
            $("#popup").css("display","");
            //En otro caso, cerrada:
          } else {
            AnadirFeatureGeojsonAPopup(evt,feature,layer,"collapse colapsable_popup");
          }
          //Añadir el título de la capa utilizada para controlar que no se vuelve a cargar:
          arrayCapasYaAnadidasAPopup.push(layer.values_.name);
        }
      }
    });
  });
}

/* BUSCADOR DE LUGARES - GEONAMES */
//Función Localiza(callbackData)
/*
FUNCIONALIDAD:
  Función para utilizar GeoNames, donde se introduce el usuario y el número máximo de resultados a mostrar.
*/
function Localiza(callbackData) {
  $.ajax({
    url: 'http://api.geonames.org/searchJSON?',
    data: {
      username: 'visualizador_hd',
      q:localizar.value,
      maxRows: 10
    },
    dataType: 'json',
    success:function(data){
      callbackData(data);
    }
  });
};

//Función Localiza(callbackData)
/*
FUNCIONALIDAD:
  Función a ejecutar en el callback de la anterior.
  Crea una tabla con una fila por cada registro coincidente con la búsqueda.
*/
function CrearResultado(resultado){
  document.getElementById("tablaLugares").innerHTML = "";
  var lugares = resultado.geonames;
  //Crear las diferentes filas a añadir al resultado:
  for (var i = 0; i < lugares.length; i++) {
    var filaLugari = document.createElement("a");
    filaLugari.innerHTML = lugares[i].toponymName + ', ' + lugares[i].adminName1;
    filaLugari.setAttribute("class","fila_lugar_i");
    filaLugari.setAttribute("id","filaLugar" + lugares[i].toponymName);
    filaLugari.setAttribute("href","javascript:CentrarMapa('" + lugares[i].lng + "','" + lugares[i].lat + "');");
    //Añadir las filas a la lista:
    document.getElementById("tablaLugares").appendChild(filaLugari);
  }
  //Al hacer click fuera: que se elimine la lista creada:
  $("html").click(function() {
    document.getElementById("tablaLugares").innerHTML = "";
    document.getElementById("localizar").value = "";
    $("html").unbind('click');
  });
}

//Función para centrar el mapa en las coordenadas de la línea en la que se haya hecho click:
function CentrarMapa(lng,lat){
  map.getView().setCenter(ol.proj.fromLonLat([Number(lng),Number(lat)]));
  map.getView().setZoom(14);
  document.getElementById("tablaLugares").innerHTML = "";
  document.getElementById("localizar").value = "";
}
