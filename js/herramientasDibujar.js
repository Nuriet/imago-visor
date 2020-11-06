//Funciones AbrirMenuDibujar() y CerrarMenuDibujar()
/*
FUNCIONALIDAD:
  Estas funciones hacen aparecer y desaparecer, respectivamente, el menú de botones de las herramientas de dibujar.
*/
function AbrirMenuDibujar(){
  $("#menuDibujar").css({'display':'flex'});
  $("#btnCerrarMenuDibujar").css({'display':'flex'});
  $("#btnAbrirMenuDibujar").css({'display':'none'});
}
function CerrarMenuDibujar(){
  $("#menuDibujar").css({'display':'none'});
  $("#btnCerrarMenuDibujar").css({'display':'none'});
  $("#btnAbrirMenuDibujar").css({'display':'flex'});
}

//Función HabilitarDibujo(tipoDibujo)
/*
FUNCIONALIDAD:
  Utiliza la variable global "dibujoHabilitado" para indicar si se está dibujando o no.
  En función del botón sobre el que se pulse, el atributo de entrada indicará si se tiene que dibujar un punto ('Point'), una línea ('Line'), un polígono ('Polygon'), una anotación ('Anotacion') o nada ('None').
  Se añade en el evento "singleclick" la ejecución de la función CrearDibujo(tipoDibujo) (que se crea más abajo en este archivo).
ENTRADAS:
  tipoDibujo: "Point", "LineString", "Polygon", "Anotacion" o "None". Dependiendo del botón sobre el que se haya hecho click dentro del menú de dibujo.
*/
var dibujoHabilitado = false;
function HabilitarDibujo(tipoDibujo){
  dibujoHabilitado = true;
  map.on('singleclick', CrearDibujo(tipoDibujo));
}

//Función CrearDibujo(tipoDibujo)
/*
FUNCIONALIDAD:
  Esta función se ejecuta en el evento onclick sobre el mapa cuando se ha pinchado en algún botón, a través de la función
  "HabilitarDibujo(tipoDibujo)" creada arriba.
  Crea la capa vectorial que servirá para guardar el resultado del dibujo y la funcionalidad de dibujar sobre el mapa.
  Mientras esté activada la opción de dibujo de un tipo de feature, se podrán dibujar múltiples hasta desactivar la opción correspondiente.
ENTRADAS:
  tipoDibujo: "Point", "LineString", "Polygon", "Anotacion" o "None". Dependiendo del botón sobre el que se haya hecho click dentro del menú de dibujo.
*/

//Variables vacías necesarias:
var capaDibujo = {};
var objetoTooltipAyudaDibujar;
var tooltipAyudaDibujar;
var helpMsgDibujar;

function CrearDibujo(tipoDibujo){
  //Eliminar los tooltips generados (si es que había alguno), y el evento anterior al mover el mapa (si es que lo había):
  $('.tooltip_solo_dibujar').css('display','none');
  map.un('pointermove',eventoMovimientoDibujar);

  //Se crea la fuente:
  var fuenteCapaDibujo = new ol.source.Vector({
    wrapX: false
  });

  //Se configura la capa vectorial RESULTADO DEL DIBUJO (creada como variable global):
  capaDibujo = new ol.layer.Vector({
    source: fuenteCapaDibujo,
    name: 'capaDibujo',
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(140, 140, 140, 0.6)'
      }),
      stroke: new ol.style.Stroke({
        color: '#A80C76',
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#A80C76'
        })
      })
    })
  });

  //Función a aplicar con el movimiento del ratón:
  var eventoMovimientoDibujar = function(evt) {
    if (evt.dragging) {
      return;
    }
    helpMsgDibujar = tipDibujarInicio;
    if (tipoDibujo) {
      //Asignar el texto a mostrar en función del tipo de geometría que se dibuja:
      var geom = (tipoDibujo);
      if (tipoDibujo == 'Polygon') {
        helpMsgDibujar = tipDibujarPoligono;
      } else if (tipoDibujo == 'LineString') {
        helpMsgDibujar = tipDibujarLinea;
      } else if (tipoDibujo == 'Point') {
        helpMsgDibujar = tipDibujarPunto;
      } else if (tipoDibujo == 'Anotacion') {
        helpMsgDibujar = tipDibujarAnotacion;
      }
    }
    //Sólo si se está dibujando algo:
    if (tipoDibujo != 'None'){
      objetoTooltipAyudaDibujar.innerHTML = helpMsgDibujar;
      tooltipAyudaDibujar.setPosition(evt.coordinate);
      objetoTooltipAyudaDibujar.classList.remove('hidden');
    }
  };
  map.on('pointermove', eventoMovimientoDibujar);

  //Variable "global" para guardar la herramienta de dibujar:
  var draw;
  var eventoCrearAnotacion;
  //Función para añadir la interacción de dibujar:
  function addInteraction(tipoDibujoEntrada) {
    //Añadir estilos adecuados a los botones:
    $('#btnDibujarPoint').addClass('div_opcion_menu_dibujar_inactivo');
    $('#btnDibujarLineString').addClass('div_opcion_menu_dibujar_inactivo');
    $('#btnDibujarPolygon').addClass('div_opcion_menu_dibujar_inactivo');
    $('#btnDibujarAnotacion').addClass('div_opcion_menu_dibujar_inactivo');
    $('#btnBorrarDibujoFeature').removeClass('div_opcion_menu_dibujar_activo');
    //Cambiar el estilo del botón seleccionado:
    $('#btnDibujar' + tipoDibujoEntrada).removeClass('div_opcion_menu_dibujar_inactivo');
    $('#btnDibujar' + tipoDibujoEntrada).addClass('div_opcion_menu_dibujar_activo');

    //En función del atributo de entrada, crear el control de dibujar correspondiente:
    // A) Point, LineString o Polygon:
    if ((tipoDibujoEntrada == 'Point') || (tipoDibujoEntrada == 'LineString') || (tipoDibujoEntrada == 'Polygon')) {
      draw = new ol.interaction.Draw({
        source: fuenteCapaDibujo,
        type: tipoDibujoEntrada,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(140, 140, 140, 0.2)'
          }),
         stroke: new ol.style.Stroke({
           color: '#F3AB00',
           lineDash: [10, 10],
           width: 2
         }),
         image: new ol.style.Circle({
           radius: 5,
           stroke: new ol.style.Stroke({
             color: '#F3AB00'
           }),
           fill: new ol.style.Fill({
           color: 'rgba(140, 140, 140, 0.2)'
           })
         })
        })
      });
      map.addInteraction(draw);
      //Ejecutar las funciones que crean los Tooltips de ayuda:
      crearTooltipAyudaDibujar();

    // B) Anotacion:
    } else if (tipoDibujoEntrada == 'Anotacion') {
      //Ejecutar las funciones que crean los Tooltips de ayuda:
      crearTooltipAyudaDibujar();
      //Evento para crear una anotación con un click:
      eventoCrearAnotacion = function(evt) {
        //Función para crear el tooltip (creada abajo):
        crearTooltipFijoAnotacion();
        sketch = evt.feature;
        var tooltipCoord = evt.coordinate;
        objetoTooltipFijoAnotacion.innerHTML = '<form><input type="text" class="contenido_etiqueta" name="contenidoEtiqueta" value="' + inputEtiqueta + '"></form>';
        tooltipFijoAnotacion.setPosition(tooltipCoord);
      };
      map.on('click',eventoCrearAnotacion);

      //Función para crear el tooltip fijo con la anotación:
      function crearTooltipFijoAnotacion() {
        objetoTooltipFijoAnotacion = document.createElement('div');
        objetoTooltipFijoAnotacion.className = 'tooltip_solo_anotacion tooltip_medir_dibujar tooltip_medir_dibujar-measure';
        tooltipFijoAnotacion = new ol.Overlay({
          element: objetoTooltipFijoAnotacion,
          offset: [0, -15],
          positioning: 'bottom-center'
        });
        map.addOverlay(tooltipFijoAnotacion);
      }

    // C) No dibujar nada:
    } else if (tipoDibujoEntrada == 'None') {
      map.removeInteraction(draw);
    }

    //En todos los casos: función para eliminar el control de dibujar en el evento onclick:
    function TerminarDibujo(){
      //Cambios en los botones del menú "dibujar":
      $('#btnDibujarPoint').unbind('click');
      $('#btnDibujarLineString').unbind('click');
      $('#btnDibujarPolygon').unbind('click');
      $('#btnBorrarDibujoFeature').unbind('click');
      $('#btnDibujarAnotacion').unbind('click');

      $('#btnDibujarPoint').removeClass('div_opcion_menu_dibujar_inactivo');
      $('#btnDibujarLineString').removeClass('div_opcion_menu_dibujar_inactivo');
      $('#btnDibujarPolygon').removeClass('div_opcion_menu_dibujar_inactivo');
      $('#btnBorrarDibujoFeature').removeClass('div_opcion_menu_dibujar_inactivo');
      $('#btnDibujarAnotacion').removeClass('div_opcion_menu_dibujar_inactivo');

      $('#btnDibujarPoint').removeClass('div_opcion_menu_dibujar_activo');
      $('#btnDibujarLineString').removeClass('div_opcion_menu_dibujar_activo');
      $('#btnDibujarPolygon').removeClass('div_opcion_menu_dibujar_activo');
      $('#btnBorrarDibujoFeature').removeClass('div_opcion_menu_dibujar_activo');
      $('#btnDibujarAnotacion').removeClass('div_opcion_menu_dibujar_activo');

      //Eliminar todos los tooltips de dibujo generados:
      $('.tooltip_solo_dibujar').css('display','none');

      //Eliminar los eventos asociados al mapa relacionados con "dibujar":
      map.un('pointermove',eventoMovimientoDibujar);
      map.un('click',eventoCrearAnotacion);

      //Desactivar el estado de "dibujar":
      dibujoHabilitado = false;
      //Dejar de dibujar:
      map.removeInteraction(draw);
      //Ejecutar la función para terminar de borrar features (por si se estaba ejecutando):
      DesactivarBorrarDibujoFeature();
    }

    //En todos los casos: Cambiar los eventos onclick en los diferentes botones:
    $('#btnDibujarPoint').unbind('onclick');
    $('#btnDibujarLineString').unbind('onclick');
    $('#btnDibujarPolygon').unbind('onclick');
    $('#btnBorrarDibujoFeature').unbind('onclick');
    $('#btnDibujarAnotacion').unbind('onclick');
    $('#btnDibujarPoint').on('click',TerminarDibujo);
    $('#btnDibujarLineString').on('click',TerminarDibujo);
    $('#btnDibujarPolygon').on('click',TerminarDibujo);
    $('#btnDibujarAnotacion').on('click',TerminarDibujo);

    //En todos los casos: Añadir la ejecución de la función finalizadora del dibujo a diferentes botones:
    $('#btnDibujarNada').on('click',TerminarDibujo);
    $('#btnBorrarDibujoFeature').on('click',TerminarDibujo);
    $('#btnBorrarDibujoFeature').on('click',BorrarDibujoFeature);
    $('#btnDescargarDibujo').on('click',TerminarDibujo);
    $('#btnBorrarDibujoCompleto').on('click',TerminarDibujo);
    $('#btnCerrarMenuDibujar').on('click',TerminarDibujo);
    $('#btnAbrirMenuMedir').on('click',TerminarDibujo);
    $('#btnAbrirMenuContexto').on('click',TerminarDibujo);
    $('#btnDibujarAnotacion').on('click',TerminarDibujo);
  }

  //Ejecutar la función creada arriba:
  addInteraction(tipoDibujo);
  //Añadir la capa dibujada al mapa:
  map.addLayer(capaDibujo);
  //Indicar que ya no se está borrando el dibujo (por si antes se estaba haciendo):
  borradoDibujoHabilitado = false;
}

//Función para crear el tooltip de ayuda:
function crearTooltipAyudaDibujar() {
  if (objetoTooltipAyudaDibujar) {
    objetoTooltipAyudaDibujar.parentNode.removeChild(objetoTooltipAyudaDibujar);
  }
  objetoTooltipAyudaDibujar = document.createElement('div');
  objetoTooltipAyudaDibujar.className = 'tooltip_medir_dibujar tooltip_solo_dibujar hidden';
  tooltipAyudaDibujar = new ol.Overlay({
    element: objetoTooltipAyudaDibujar,
    offset: [15, 0],
    positioning: 'center-left'
  });
  map.addOverlay(tooltipAyudaDibujar);
}

//Función BorrarDibujoCompleto()
/*
FUNCIONALIDAD:
  Elimina todos los dibujos de punto, línea o superficie realizados, y también las anotaciones creadas.
*/
function BorrarDibujoCompleto(){
  //1º ELIMINAR TODAS LAS CAPAS DE DIBUJO:
  //Crear un array con los nombres de las capas cargadas (TODAS):
  var arrayTitulosCapasCargadasDespues = [];
  arrayCapasCargadasYaYCapaDibujo = map.getLayers().getArray();
  for (var i=0; i<arrayCapasCargadasYaYCapaDibujo.length; i++){
    var tituloCapaCargadaYai = arrayCapasCargadasYaYCapaDibujo[i].get('name');
    arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
  }
  //Obtener el número de capas "capaDibujo" que se han añadido al mapa:
  var numeroCapasDibujo = 0;
  for (var i = 0; i < arrayTitulosCapasCargadasDespues.length; i++){
    if (arrayTitulosCapasCargadasDespues[i] == 'capaDibujo'){
      numeroCapasDibujo += 1;
    }
  }
  //Eliminar las capas que se llaman "capaDibujo" del mapa:
  for (var j = 0; j < numeroCapasDibujo; j++){
    //Eliminar del mapa la capa que tiene como título el nombre 'capaDibujo':
    if (arrayTitulosCapasCargadasDespues.indexOf('capaDibujo') != -1){
      map.getLayers().removeAt(arrayTitulosCapasCargadasDespues.indexOf('capaDibujo'));
    }
  }

  //2º ELIMINAR TODOS LOS TOOLTIPS DE DIBUJO Y DE ANOTACIÓN GENERADOS:
  $('.tooltip_solo_dibujar').css('display','none');
  $('.tooltip_solo_anotacion').css('display','none');

  //Indicar que ya no se está borrando el dibujo (por si antes se estaba haciendo):
  dibujoHabilitado = false;
  borradoDibujoHabilitado = false;
}

//Función BorrarDibujoFeature()
/*
FUNCIONALIDAD:
  Elimina las features sobre las que se haga doble click:
*/
var borradoDibujoHabilitado = false;
function BorrarDibujoFeature(){
  //Cambio de estilo de botones:
  $('#btnBorrarDibujoFeature').removeClass('div_opcion_menu_dibujar_inactivo');
  $('#btnBorrarDibujoFeature').addClass('div_opcion_menu_dibujar_activo');

  //Indicar que se están usando herramientas de dibujar, y que se está borrando:
  dibujoHabilitado = true;
  borradoDibujoHabilitado = true;

  //Añadir en el evento onclick, sobre la feature que haya en el pixel clickado; la funcionalidad de eliminarla:
  map.on('click', function(evt) {
    var pixel = evt.pixel;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      if (borradoDibujoHabilitado === true){
        if (feature && (layer != map.getLayers().getArray()[0]) && (layer.values_.name == 'capaDibujo')){
          layer.getSource().removeFeature(feature);
        }
      }
    });
  })
  //Añadir al botón el evento para dejar de utilizar la funcionalidad de borrar features al hacer click sobre ellas:
  $('#btnBorrarDibujoFeature').on('click',DesactivarBorrarDibujoFeature);

  //Función a aplicar con el movimiento del ratón:
  var eventoMovimientoDibujar = function(evt) {
    if (evt.dragging) {
      return;
    }
    objetoTooltipAyudaDibujar.innerHTML = tipDibujarBorrar;
    tooltipAyudaDibujar.setPosition(evt.coordinate);
    objetoTooltipAyudaDibujar.classList.remove('hidden');
  };
  map.on('pointermove', eventoMovimientoDibujar);

  //Ejecutar las funciones que crean los Tooltips de ayuda:
  crearTooltipAyudaDibujar();
}

//Función DesactivarBorrarDibujoFeature()
/*
FUNCIONALIDAD:
  Elimina la funcionalidad de borrar features con el doble click sobre ellas:
*/
function DesactivarBorrarDibujoFeature(){
  //Cambiar de clase los botones necesarios:
  $('#btnDibujarPoint').removeClass('div_opcion_menu_dibujar_inactivo');
  $('#btnDibujarLineString').removeClass('div_opcion_menu_dibujar_inactivo');
  $('#btnDibujarPolygon').removeClass('div_opcion_menu_dibujar_inactivo');
  $('#btnBorrarDibujoFeature').removeClass('div_opcion_menu_dibujar_activo');

  //Indicar que ya no se está ni dibujando ni borrando dibujo:
  dibujoHabilitado = false;
  borradoDibujoHabilitado = false;

  //Asignar de nuevo el evento onclick sobre el botón para poder volver a borrar features en el futuro:
  $('#btnBorrarDibujoFeature').unbind('click');
  $('#btnBorrarDibujoFeature').on('click',BorrarDibujoFeature);

  //Eliminar todos los tooltips de dibujo generados:
  $('.tooltip_solo_dibujar').css('display','none');
}

//Función DescargarDibujo()
/*
FUNCIONALIDAD:
  Crea un objeto geoJSON vacío, y le añade las diferentes geometrías que se han ido dibujando en el mapa.
  Después genera el archivo con el nombre especificado y lo descarga en la máquina del usuario.
*/
function DescargarDibujo(){
  //Cambiar de clase los botones necesarios:
  $('#btnDibujarPoint').removeClass('div_opcion_menu_dibujar_inactivo');
  $('#btnDibujarLineString').removeClass('div_opcion_menu_dibujar_inactivo');
  $('#btnDibujarPolygon').removeClass('div_opcion_menu_dibujar_inactivo');
  $('#btnBorrarDibujoFeature').removeClass('div_opcion_menu_dibujar_activo');

  //Indicar que ya no se está ni dibujando ni borrando dibujo:
  dibujoHabilitado = false;
  borradoDibujoHabilitado = false;

  //CREACIÓN DEL GEOJSON A DESCARGAR
  //1º) Creación de su estructura básica:
  var objetoGeojsonADescargar = {};
  objetoGeojsonADescargar.type = "FeatureCollection";
  var crsObjetoGeojsonADescargar = {};
  crsObjetoGeojsonADescargar.type = "name";
  var propiedadesCrsObjetoGeojsonADescargar = {};
  propiedadesCrsObjetoGeojsonADescargar.name = "urn:ogc:def:crs:OGC:1.3:CRS84";
  crsObjetoGeojsonADescargar.properties = propiedadesCrsObjetoGeojsonADescargar;
  objetoGeojsonADescargar.crs = crsObjetoGeojsonADescargar;
  objetoGeojsonADescargar.bbox = [];
  var featuresObjetoGeojsonADescargar = [];

  //2º) Añadirle todas las features dibujadas:
  //Crear un array con los nombres de las capas cargadas (TODAS):
  var arrayTitulosCapasCargadasDespues = [];
  arrayCapasCargadasYaYCapaDibujo = map.getLayers().getArray();
  for (var i=0; i<arrayCapasCargadasYaYCapaDibujo.length; i++){
    var tituloCapaCargadaYai = arrayCapasCargadasYaYCapaDibujo[i].get('name');
    arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
  }

  //Obtener el número de capas "capaDibujo" que se han añadido al mapa:
  var numeroCapasDibujo = 0;
  for (var i = 0; i < arrayTitulosCapasCargadasDespues.length; i++){
    if (arrayTitulosCapasCargadasDespues[i] == 'capaDibujo'){
      numeroCapasDibujo += 1;
    }
  }

  //Array con las posiciones (índices) de las capas cargadas al mapa que son 'capaDibujo':
  var arrayIndicesCapasDibujo = [];
  var idx = arrayTitulosCapasCargadasDespues.indexOf('capaDibujo');
  while (idx != -1) {
    arrayIndicesCapasDibujo.push(idx);
    idx = arrayTitulosCapasCargadasDespues.indexOf('capaDibujo', idx + 1);
  }

  //Recorro el array de capas cargadas al mapa, extrayendo las posiciones donde hay una capa con id 'capaDibujo':
  for (var j = 0; j < arrayIndicesCapasDibujo.length; j++){
    capaDibujoNumi = map.getLayers().item(arrayIndicesCapasDibujo[j]);
    //Se crea un array con todas las features de la capa que estoy recorriendo:
    arrayFeaturesCapaDibujoNumi = capaDibujoNumi.getSource().getFeatures();
    //Dentro de cada capa 'capaDibujo', obtengo cada una de las features, y extraigo la información de interés:
    for (var k = 0; k < arrayFeaturesCapaDibujoNumi.length; k++){
      featureNumk = arrayFeaturesCapaDibujoNumi[k].getGeometry();
      tipoGeometriaFeatureNumk = featureNumk.getType();
      //Formación del objeto de la feature para añadir al Geojson a descargar:
      var featureNumkObjetoCRSGeojsonADescargar = {};
      featureNumkObjetoCRSGeojsonADescargar.type = "Feature";
      var geometryFeatureNumkObjetoCRSGeojsonADescargar = {};
      //Asignar el tipo de geometría:
      geometryFeatureNumkObjetoCRSGeojsonADescargar.type = tipoGeometriaFeatureNumk;

      //Crear el objeto correspondiente, en función del tipo de geometría:
      // Tipo PUNTO:
      if (tipoGeometriaFeatureNumk == 'Point'){
        //Array con las coordenadas de cada punto ([x,y]):
        coordenadasPuntoFeatureNumk3857 = [];
        //Coordenada x:
        coordenadasPuntoFeatureNumk3857.push(featureNumk.flatCoordinates[0]);
        //Coordenada y:
        coordenadasPuntoFeatureNumk3857.push(featureNumk.flatCoordinates[1]);
        //Transformación:
        var coordenadasPuntoFeatureNumk4326= ol.proj.transform(coordenadasPuntoFeatureNumk3857,'EPSG:3857','EPSG:4326');
        //Añadir las coordenadas a la geometría de la feature del objeto GeoJSON a descargar:
        geometryFeatureNumkObjetoCRSGeojsonADescargar.coordinates = coordenadasPuntoFeatureNumk4326;
      // Tipo LÍNEA:
      } else if (tipoGeometriaFeatureNumk == 'LineString'){
        //Variable que guarda el array de arrays de coordenadas (array de puntos):
        var arrayCoordenadasLineString = [];
        //Recorrer las coordenadas de los puntos que forman la geometría de línea (de dos en dos):
        for (var l = 0; l < featureNumk.flatCoordinates.length; l +=2){
        //Array con las coordenadas de cada punto ([x,y]):
        coordenadasPuntoFeatureNumk3857 = [];
        //Coordenada x:
        coordenadasPuntoFeatureNumk3857.push(featureNumk.flatCoordinates[l]);
        //Coordenada y:
        coordenadasPuntoFeatureNumk3857.push(featureNumk.flatCoordinates[l+1]);
        //Transformación:
        var coordenadasPuntoFeatureNumk4326= ol.proj.transform(coordenadasPuntoFeatureNumk3857,'EPSG:3857','EPSG:4326');
        //Añadir las coordenadas a la geometría de la feature del objeto GeoJSON a descargar:
        arrayCoordenadasLineString.push(coordenadasPuntoFeatureNumk4326);
        }
        //Añadir el array de arrays de coordenadas al campo "coordinates" de la geometría:
        geometryFeatureNumkObjetoCRSGeojsonADescargar.coordinates = arrayCoordenadasLineString;
      //Tipo POLÍGONO:
      } else if (tipoGeometriaFeatureNumk == 'Polygon'){
        //Variable que guarda el array de arrays de coordenadas (array de puntos vértice):
        var arrayCoordenadasPolygon = [];
        //Recorrer las coordenadas de los puntos que forman la geometría del polígono (de dos en dos):
        for (var l = 0; l < featureNumk.flatCoordinates.length; l +=2){
          //Array con las coordenadas de cada punto ([x,y]):
          coordenadasPuntoFeatureNumk3857 = [];
          //Coordenada x:
          coordenadasPuntoFeatureNumk3857.push(featureNumk.flatCoordinates[l]);
          //Coordenada y:
          coordenadasPuntoFeatureNumk3857.push(featureNumk.flatCoordinates[l+1]);
          //Transformación:
          var coordenadasPuntoFeatureNumk4326= ol.proj.transform(coordenadasPuntoFeatureNumk3857,'EPSG:3857','EPSG:4326');
          //Añadir las coordenadas a la geometría de la feature del objeto GeoJSON a descargar:
          arrayCoordenadasPolygon.push(coordenadasPuntoFeatureNumk4326);
        }
        //Insertar los polígonos creados en un array global:
        var arrayPolygon = [];
        arrayPolygon.push(arrayCoordenadasPolygon);
        //Añadir el array de arrays de coordenadas al campo "coordinates" de la geometría:
        geometryFeatureNumkObjetoCRSGeojsonADescargar.coordinates = arrayPolygon;
      }
      //En todos los casos (PUNTO, LÍNEA y POLÍGONO):
      //Se añade el campo de geometría a la feature del objeto GeoJSON:
      featureNumkObjetoCRSGeojsonADescargar.geometry = geometryFeatureNumkObjetoCRSGeojsonADescargar;
      //Se añade esa feature a la lista de features del objeto:
      featuresObjetoGeojsonADescargar.push(featureNumkObjetoCRSGeojsonADescargar);
    }
  }

  //Se añade la lista de features al objeto GeoJSON:
  objetoGeojsonADescargar.features = featuresObjetoGeojsonADescargar;
  //Se parsea el objeto:
  objetoGeojsonADescargarStringify = JSON.stringify(objetoGeojsonADescargar);

  //3º) Descarga del archivo:
  //Dar el nombre al archivo:
  var time = new Date().getTime();
  var fechaYHora = new Date(time);
  var ano = (fechaYHora.getFullYear()).toString();
  var mes = (fechaYHora.getMonth() + 1).toString();
  var dia = (fechaYHora.getDate()).toString();
  var hora = (fechaYHora.getHours()).toString();
  var min = (fechaYHora.getMinutes()).toString();
  var seg = (fechaYHora.getSeconds()).toString();
  var filename = "dibujo_io-" + ano + mes + dia + '-' + hora + min + seg;
  //Crear el archivo y descargarlo en el ordenador del usuario:
  var blob = new Blob([objetoGeojsonADescargarStringify], {type: "data:text/json;charset=utf-8"});
  saveAs(blob, filename+".geojson");
}
