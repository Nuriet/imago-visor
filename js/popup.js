//FUNCIÓN AnadirGetFeatureInfoWMSAPopup(evt,layer,fuenteWMS,clasePrimerColapsable)
/*
ENTRADAS:
  evt: evento onclick sobre el mapa.
  layer: capa sobre la que se realiza el evento.
  fuenteWMS: fuente de la capa sobre la que se realiza el evento.
  clasePrimerColapsable: clase a asignar al div creado en la leyenda para cada capa. De esta forma, se controla cuando tiene que estar abierto ese div en el colapsable o no.
FUNCIONALIDAD:
  Realiza la petición GetFeatureInfo al servicio WMS de entrada, en el punto del mapa donde se ha hecho click.
  Siempre se obtiene una respuesta HTML:
    - Si la respuesta HTML tiene contenido, entonces se añade una fila al popup con la información incluida en un iframe.
    - Si no tiene contenido: no se hace nada.
  Esta función se ejecuta tantas veces como capas WMS distintas haya en el punto donde se hace click. Es decir, se Realiza
  una petición GetFeatureInfo por cada capa; y depende del resultado obtenido que se muestre en el popup o no.
*/
function AnadirGetFeatureInfoWMSAPopup(evt,layer,fuenteWMS,clasePrimerColapsable) {
    //Petición con método propio de openlayers:
    var viewResolution = vistaMapa.getResolution();
    var peticionGetFeatureInfo = fuenteWMS.getGetFeatureInfoUrl(
      evt.coordinate, viewResolution, 'EPSG:3857',
      {'INFO_FORMAT': 'text/html'});

    //1º: Envío la petición para leer la respuesta en HTML:
    var respuestaHTML = "";
    fetch(peticionGetFeatureInfo).then(function(response) {
      return response.text();
    }).then(function(response) {
      respuestaHTML = $.parseHTML(response);
      //2º: Si la respuesta (array) tiene una longitud mayor de 5: existe contenido dentro del HTML de respuesta. Si no, no.
      //Sólo en ese caso creo un nuevo elemento y lo añado al popup.
      if (respuestaHTML.length > 5) {
        var acordeonPopup = $("#acordeonPopup");
        var cardNuevaPopup = $("<div>")
          .addClass("card card_popup")
          .attr("id","cardPopup_" + layer.values_.name)
          .html("<div class='card-header' id='popupCapa_" + layer.values_.name + "' onclick=$('#colapsable_" + layer.values_.name + "').collapse('toggle');><h4 class='ml-2 mt-1'>" + layer.values_.titulo_es + "</h4></div>")
          .appendTo(acordeonPopup);

        var colapsableNuevoPopup = $("<div>")
          .addClass(clasePrimerColapsable)
          .attr("id","colapsable_" + layer.values_.name)
          .attr("aria-labelledby", "'popupCapa_" + layer.values_.name + "'")
          .attr("data-parent", "#acordeonPopup")
          .appendTo(cardNuevaPopup);

        var tablaNuevaPopup = $("<iframe>")
          .css({"width":"100%","height":"15.5em"})
          .attr("src",peticionGetFeatureInfo)
          .appendTo(colapsableNuevoPopup);

        overlayPopup.setPosition(evt.coordinate);
          $("#popup").css("display","");
        }
    })
}

//FUNCIÓN AnadirFeatureGeojsonAPopup(evt,feature,layer,clasePrimerColapsable)
/*
ENTRADAS:
  evt: evento onclick sobre el mapa.
  feature: feature sobre la que se hace click.
  layer: capa sobre la que se realiza el evento.
  clasePrimerColapsable: clase a asignar al div creado en la leyenda para cada capa. De esta forma, se controla cuando tiene que estar abierto ese div en el colapsable o no.
FUNCIONALIDAD:
  Obtiene la información correspondiente a la feature de entrada, de la capa de entrada, en el punto del mapa donde se ha hecho click.
  Esta función se ejecuta tantas veces como capas Geojson distintas haya en el punto donde se hace click.
  A diferencia de la operación GetFeatureInfo en los servicios WMS, esta función no se ejecuta si no se ha clickado sobre ninguna feature.
*/
function AnadirFeatureGeojsonAPopup(evt,feature,layer,clasePrimerColapsable) {
  var acordeonPopup = $("#acordeonPopup");
  //Se crea el nuevo elemento y se añade al popup:
  var cardNuevaPopup = $("<div>")
    .attr("id","cardPopup_" + layer.values_.name)
    .addClass("card card_popup")
    .html("<div class='card-header' id='popupCapa_" + layer.values_.name + "' onclick=$('#colapsable_" + layer.values_.name + "').collapse('toggle');><h4 class='ml-2 mt-1'>" + layer.values_.titulo_es + "</h4></div>")
    .appendTo(acordeonPopup);

  var colapsableNuevoPopup = $("<div>")
    .addClass(clasePrimerColapsable)
    .attr("id","colapsable_" + layer.values_.name)
    .attr("aria-labelledby", "'popupCapa_" + layer.values_.name + "'")
    .attr("data-parent", "#acordeonPopup")
    .appendTo(cardNuevaPopup);

  var tablaNuevaPopup = $("<table>")
    .addClass("table table-striped m-0 p-0")
    .appendTo(colapsableNuevoPopup);

  var cuerpoTablaNuevaPopup = $("<tbody>")
    .appendTo(tablaNuevaPopup);

  // Cargar contenido al cuerpo de la tabla recorriendo los campos del geojson. Se distinguen tres casos:
  // A) - Geojson propio: aquellos generados por la uSIG, cargados a partir del menú de temáticas:
  // sólo se incorpora la información de los campos que:
  //  - empiezan por "mostrar_" seguido del id de la capa (que tiene siempre 11 caracteres) y de un "_"; o
  //  - empiezan por "mostrar_entodo_caso_".
  //  y además: que tengan un valor NO NULO.
  var conCamposParaMostrar = false;
  if ((feature.getKeys()) && (layer.values_.origen_geojson == "propio")){
    for (var i=0; i<feature.getKeys().length; i++){
      if (((feature.getKeys()[i].indexOf("mostrar_" + layer.values_.name + "_") != -1) || (feature.getKeys()[i].indexOf("mostrar_entodo_caso_") != -1)) && (feature.getProperties()[feature.getKeys()[i]])){
        //Función para determinar si es un campo numérico, y en ese caso, redondear el valor:
        var isNumeric = function(obj){
          return !Array.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
        }
        var valorCampo = "";
        if (isNumeric(feature.getProperties()[feature.getKeys()[i]]) == true){
          valorCampo = Math.round(feature.getProperties()[feature.getKeys()[i]]*nivelRedondeoPopup)/nivelRedondeoPopup;
        } else {
          valorCampo = feature.getProperties()[feature.getKeys()[i]]
        }
        //Crear y añadir la nueva fila a la tabla del popup:
        var filaICuerpoTablaPopup = $("<tr>")
          .html("<th scope='row'>" + feature.getKeys()[i].substr(20) + "</th><th>" + valorCampo + "</th>")
          .appendTo(cuerpoTablaNuevaPopup);
          conCamposParaMostrar = true;
      }
    }
    //Si no hay ningún campo para mostrar, entonces se muestra un texto informativo:
    if (conCamposParaMostrar == false){
      var filaICuerpoTablaPopup = $("<div>")
        .addClass("row justify-content-center")
        .html("<p class='m-0 p-0' id='noCamposMostrar_" + layer.values_.name + "'>" + noCamposMostrar + "</p>")
        .appendTo(cuerpoTablaNuevaPopup);
    }
  //B) - Geojson o shp agregado por el usuario: se incorporan todos los campos de información de los que disponga.
  } else if ((feature.getKeys()) && (layer.values_.origen_geojson == "usuario")){
    for (var i=0; i<feature.getKeys().length; i++){
      if (feature.getKeys()[i] != "geometry"){
        var filaICuerpoTablaPopup = $("<tr>")
          .html("<th scope='row'>" + feature.getKeys()[i] + "</th><th>" + feature.getProperties()[feature.getKeys()[i]] + "</th>")
          .appendTo(cuerpoTablaNuevaPopup);
          conCamposParaMostrar = true;
      }
    }
    //Si no hay ningún campo para mostrar, entonces se muestra un texto informativo:
    if (conCamposParaMostrar == false){
      var filaICuerpoTablaPopup = $("<div>")
      .addClass("row justify-content-center")
      .html("<p class='m-0 p-0' id='noCamposMostrar_" + layer.values_.name + "'>" + noCamposMostrar + "</p>")
      .appendTo(cuerpoTablaNuevaPopup);
    }
    //C) - KML o GPX agregado por el usuario: se incorporan todos los campos de información de los que disponga.
  } else if ((feature.getKeys()) && ((layer.values_.tipo == "KML") || (layer.values_.tipo == "GPX"))){
      for (var i=0; i<feature.getKeys().length; i++){
        if (feature.getKeys()[i] != "geometry"){
          var filaICuerpoTablaPopup = $("<tr>")
            .html("<th scope='row'>" + feature.getKeys()[i] + "</th><th>" + feature.getProperties()[feature.getKeys()[i]] + "</th>")
            .appendTo(cuerpoTablaNuevaPopup);
            conCamposParaMostrar = true;
        }
      }
      //Si no hay ningún campo para mostrar, entonces se muestra un texto informativo:
      if (conCamposParaMostrar == false){
        var filaICuerpoTablaPopup = $("<div>")
        .addClass("row justify-content-center")
        .html("<p class='m-0 p-0' id='noCamposMostrar_" + layer.values_.name + "'>" + noCamposMostrar + "</p>")
        .appendTo(cuerpoTablaNuevaPopup);
      }
    }
  //Colocar el popup en el lugar del mapa en el que se ha hecho click:
  overlayPopup.setPosition(evt.coordinate);
}

//FUNCIÓN CerrarPopup()
/*
FUNCIONALIDAD:
  Vacía el div del popup y lo oculta.
*/
function CerrarPopup(){
  $("#acordeonPopup").empty();
  $("#popup").css("display","none");
}
