//Funciones AbrirMenuMedir() y CerrarMenuMedir()
/*
FUNCIONALIDAD:
  Estas funciones hacen aparecer y desaparecer, respectivamente, el menú de botones de las herramientas de medir.
*/
function AbrirMenuMedir(){
  $("#menuMedir").css({'display':'flex'});
  $("#btnCerrarMenuMedir").css({'display':'flex'});
  $("#btnAbrirMenuMedir").css({'display':'none'});
}
function CerrarMenuMedir(){
  $("#menuMedir").css({'display':'none'});
  $("#btnCerrarMenuMedir").css({'display':'none'});
  $("#btnAbrirMenuMedir").css({'display':'flex'});
}

//Función HabilitarMedicion(tipoMedicion)
/*
FUNCIONALIDAD:
  Utiliza la variable global "medicionHabilitada" para indicar si se está calculando una medida o no.
  En función del botón sobre el que se pulse, el atributo de entrada indicará si se tiene que medir una distancia o un área.
  En cada caso, uno de los botones cambiará su estilo para estar coloreado.
  En todo caso, se añade en el evento "singleclick" la ejecución de la función CrearMedicion(tipoMedicion) (que se crea más abajo en este archivo).
ENTRADAS:
  tipoMedicion: "area" o "distancia". Dependiendo del botón sobre el que se haya hecho click dentro del menú de medición.
*/
var medicionHabilitada = false;
function HabilitarMedicion(tipoMedicion){
  //Esta primera condición sirve para evitar que se seleccione varias veces la opción de medir (tanto distancia como área):
  if (medicionHabilitada == false){
    if (tipoMedicion == 'distancia'){
      $('#btnMedirDistancia').addClass('div_opcion_menu_medir_activo');
    } else if (tipoMedicion == 'area'){
      $('#btnMedirSuperficie').addClass('div_opcion_menu_medir_activo');
    }
    medicionHabilitada = true;
    map.on('singleclick', CrearMedicion(tipoMedicion));
  }
}

//Función BorrarMedicion()
/*
FUNCIONALIDAD:
  Elimina todas las medidas de áreas y distancias realizadas, así como los tips creados para mostrar el resultado de dichas medidas.
*/
function BorrarMedicion(){
  //1º ELIMINAR TODAS LAS CAPAS DE MEDICIÓN:
  //Crear un array con los nombres de las capas cargadas (TODAS):
  var arrayTitulosCapasCargadasDespues = [];
  arrayCapasCargadasYaYCapaMedicion = map.getLayers().getArray();
  for (var i=0; i<arrayCapasCargadasYaYCapaMedicion.length; i++){
    var tituloCapaCargadaYai = arrayCapasCargadasYaYCapaMedicion[i].get('name');
    arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
  }
  //Obtener el número de capas "capaMedicion" que se han añadido al mapa:
  var numeroCapasMedicion = 0;
  for (var i = 0; i < arrayTitulosCapasCargadasDespues.length; i++){
    if (arrayTitulosCapasCargadasDespues[i] == 'capaMedicion'){
      numeroCapasMedicion += 1;
    }
  }
  //Eliminar las capas que se llaman "capaMedicion" del mapa:
  for (var j = 0; j < numeroCapasMedicion; j++){
    //Eliminar del mapa la capa que tiene como título el nombre 'capaMedicion':
    if (arrayTitulosCapasCargadasDespues.indexOf('capaMedicion') != -1){
      map.getLayers().removeAt(arrayTitulosCapasCargadasDespues.indexOf('capaMedicion'));
    }
  }

  //2º ELIMINAR TODOS LOS TOOLTIPS GENERADOS:
  $('.tooltip_medir_dibujar').css('display','none');
}

//Función CrearMedicion(tipoMedicion)
/*
FUNCIONALIDAD:
  Esta función se ejecuta en el evento onclick sobre el mapa cuando se ha pinchado en algún botón, a través de la función
  "HabilitarMedicion(tipoMedicion)" creada arriba.
  Crea la capa vectorial que servirá para guardar el resultado de la medición, la funcionalidad de dibujar sobre el mapa,
  los diferentes tooltips necesarios (tanto temporales como definitivos).
  Una vez dibujada una LineString o un Polygon, elimina los eventos que permiten la medida de distancias.
ENTRADAS:
  tipoMedicion: "area" o "distancia". Dependiendo del botón sobre el que se haya hecho click dentro del menú de medición.
*/
var capaMedicion = {};
function CrearMedicion(tipoMedicion){
  //Se crea la fuente:
  var fuenteCapaMedicion = new ol.source.Vector();
  //Se configura la capa vectorial RESULTADO DE LA MEDICIÓN (creada como variable global):
  capaMedicion = new ol.layer.Vector({
    source: fuenteCapaMedicion,
    name: 'capaMedicion',
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

  //Variables vacías necesarias:
  var sketch;
  var helpTooltipElement;
  var helpTooltip;
  var measureTooltipElement;
  var measureTooltip;

  //Función a aplicar con el movimiento del ratón:
  var pointerMoveHandler = function(evt) {
    if (evt.dragging) {
      return;
    }
    var helpMsg = tipMedirInicio;
    if (sketch) {
      var geom = (sketch.getGeometry());
      if (geom instanceof ol.geom.Polygon) {
        helpMsg = tipMedirPoligono;
      } else if (geom instanceof ol.geom.LineString) {
        helpMsg = tipMedirLinea;
      }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);
    helpTooltipElement.classList.remove('hidden');
  };
  map.on('pointermove', pointerMoveHandler);

  //Variable que guarda la funcionalidad de dibujar (global):
  var draw;

  //Funciones para crear los formatos de las mediciones:
  var formatLength = function(line) {
    var length = ol.sphere.getLength(line);
    var output;
    if (length > 1000) {
      output = (Math.round(length / 1000 * 1) / 1) + ' ' + 'km';
    } else {
      output = (Math.round(length * 1) / 1) + ' ' + 'm';
    }
    return output;
  };

  var formatArea = function(polygon) {
    var area = ol.sphere.getArea(polygon);
    var output;
    if (area > 1000000) {
      output = (Math.round(area / 1000000 * 1) / 1) + ' ' + 'km<sup>2</sup>';
    } else {
      output = (Math.round(area * 1) / 1) + ' ' + 'm<sup>2</sup>';
    }
    return output;
  };

  //Función que añade la interacción de medir al mapa, en el evento onclick; distinguiendo entre los casos de distancia o área:
  function addInteraction() {
    var type = (tipoMedicion == 'area' ? 'Polygon' : 'LineString');
    draw = new ol.interaction.Draw({
      source: fuenteCapaMedicion,
      type: type,
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

    //Añadir la interacción de dibujar al mapa:
    map.addInteraction(draw);

    //Ejecutar las funciones que crean los Tooltips de ayuda:
    createMeasureTooltip();
    createHelpTooltip();

    var listener;
    //Evento de inicio de dibujo:
    draw.on('drawstart',
      function(evt) {
        sketch = evt.feature;
        var tooltipCoord = evt.coordinate;
        listener = sketch.getGeometry().on('change', function(evt) {
          var geom = evt.target;
          var output;
          if (geom instanceof ol.geom.Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof ol.geom.LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
    }, this);

    //Evento de finalización de dibujo:
    draw.on('drawend',
      function() {
        measureTooltipElement.className = 'tooltip_medir_dibujar tooltip_medir_dibujar-static';
        measureTooltip.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement = null;
        createMeasureTooltip();
        ol.Observable.unByKey(listener);

        //Salir de la funcionalidad 'medir':
        map.removeInteraction(draw);
        map.removeOverlay(helpTooltip);
        medicionHabilitada = false;
        map.addLayer(capaMedicion);
        $('.div_opcion_menu_medir_activo').removeClass('div_opcion_menu_medir_activo');
    }, this);
  }

  //Función para crear el tooltip de ayuda:
  function createHelpTooltip() {
    if (helpTooltipElement) {
      helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip_medir_dibujar hidden';
    helpTooltip = new ol.Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
  }

  //Función para crear el tooltip con el dato de la medición obtenida:
  function createMeasureTooltip() {
    if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip_medir_dibujar tooltip_medir_dibujar-measure';
    measureTooltip = new ol.Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
  }

  //Ejecutar la función que añade la interacción de medir:
  addInteraction();
}
