//Función CrearLeyendaVacia()
/*
FUNCIONALIDAD:
  Función a ejecutar con el 'onload' del 'body', que crea la estructura básica de la leyenda (es una tabla),
  y la deja oculta y preparada para añadir filas con contenido al cargar capas al mapa.
*/
function CrearLeyendaVacia() {
  var divLeyenda = $("#leyendaCapas");
  var tablaLeyenda = $("<table>").addClass("tabla_leyenda table").attr("id","tabla_leyenda").appendTo(divLeyenda);
  var tituloLeyenda = $("<thead>").addClass("d-flex justify-content-between").css({'cursor':'pointer'}).appendTo(tablaLeyenda);
  var textoTituloLeyenda = $("<h4>").attr("id","txtTituloLeyenda").addClass("ml-2 mt-1").appendTo(tituloLeyenda);
  var cruzTituloLeyenda = $("<i>").addClass("fas fa-times mr-2 mt-1")
      .attr('id','cruzTituloLeyenda')
      .attr('title', mensajeCerrar)
      .css({'cursor':'pointer'})
      .on('click', CerrarLeyenda)
      .appendTo(tituloLeyenda);
  var cuerpoLeyenda = $("<tbody>").appendTo(tablaLeyenda);
  var contenidoLeyenda = $("<div>").attr("id","contenidoLeyenda").addClass("ml-1").appendTo(cuerpoLeyenda);
}

//Funciones CerrarLeyenda() y AbrirLeyenda()
/*
FUNCIONALIDAD:
  Estas funciones hacen desaparecer y aparecer, respectivamente, la leyenda.
  Al cerrar la leyenda, aparece el icono para volverla abrir; y viceversa.
*/
function CerrarLeyenda(){
  $("#leyendaCapas").css({'display':'none'});
  $("#divBotonLeyenda").css({'display':'flex'});
}
function AbrirLeyenda(){
  $("#leyendaCapas").css({'display':'flex'});
  $("#divBotonLeyenda").css({'display':'none'});
}

//Función AñadirALeyenda(capaCargada,tipoOrigen)
/*
ENTRADAS:
  capaCargada: objeto de la capa que se acaba de añadir al mapa, con toda la información asociada.
    Entre esa información, destaca el campo "tipo_leyenda"; que puede ser:
      - vectorial: entonces la leyenda se construye vectorialmente dentro de esta función.
      - imagen: entonces la leyenda es una imagen ya editada y guardada.
  tipoOrigen: variable que indica el origen de los datos:
    - wms
    - geojson_externo
    - geojson_propio
    - gpx
FUNCIONALIDAD:
  Añade una fila nueva a la leyenda, con el contenido correspondiente a la capa que se acaba de cargar.
  Dependiendo del tipo de origen de la capa, el proceso seguido para crear esta fila de la leyenda es diferente.
  Esta función se ejecuta al terminar de cargar una capa, ya provenga de un WMS, de un Geojson, etc.
*/
function AñadirALeyenda(capaCargada,tipoOrigen){
  //Si la leyenda está oculta, mostrarla:
  if ($("#divBotonLeyenda").css("display") == 'none'){
    $("#leyendaCapas").css({'display':'flex'});
  }

  //Crear la fila de la leyenda para la nueva capa, y ponerle de título el campo "titulo_es" de la capa:
  var leyendaCapai = $("<tr>").addClass("m-1 p-1")
    .attr("id","leyenda_" + capaCargada.values_.name)
    .html(capaCargada.values_.titulo_es);
  $("<br>").appendTo(leyendaCapai);

  //En función del tipo de capa cargada, el contenido de la fila de leyenda a crear será diferente:
  //A) WMS: la imagen ofrecida por la petición de leyenda:
  if (tipoOrigen == 'wms'){
    var imagenLeyenda = $("<img>").addClass("m-1 p-1").attr("src",capaCargada.values_.leyenda).css({'max-width':'256px'}).appendTo(leyendaCapai);
    leyendaCapai.prependTo(contenidoLeyenda);
  //B) Resto de tipos (geojson externo, geojson propio o gpx) con leyenda a generar vectorialmente:
  } else if ((tipoOrigen == 'geojson_externo') || (tipoOrigen == 'gpx') || ((tipoOrigen == 'geojson_propio') && (capaCargada.values_.tipo_leyenda == 'vectorial'))) {
    //Dependiendo del tipo de geometría que se tenga:
    if ((capaCargada.values_.tipo_feature == 'Polygon') || (capaCargada.values_.tipo_feature == 'MultiPolygon') || (capaCargada.values_.tipo_feature == 'GeometryCollection')){
      $("<canvas>").attr("id","pol_ley_" + capaCargada.values_.name).css({'height':'auto','width':'30px'}).appendTo(leyendaCapai);
      leyendaCapai.prependTo(contenidoLeyenda);
      var canvas_i = document.getElementById("pol_ley_" + capaCargada.values_.name);
      var icono_i = canvas_i.getContext("2d");
      icono_i.fillStyle = capaCargada.values_.color_relleno;
      icono_i.rect(0,0,300,150);
      icono_i.fill();
      icono_i.strokeStyle = capaCargada.values_.color_borde;
      icono_i.lineWidth = 16;
      icono_i.rect(0,0,300,150);
      icono_i.stroke();
    } else if ((capaCargada.values_.tipo_feature == 'LineString') || (capaCargada.values_.tipo_feature == 'MultiLineString')){
      $("<canvas>").attr("id","pol_ley_" + capaCargada.values_.name).css({'height':'1px','width':'30px','border':'solid 1px' + capaCargada.values_.color_relleno}).appendTo(leyendaCapai);
      leyendaCapai.prependTo(contenidoLeyenda);
    } else if ((capaCargada.values_.tipo_feature == 'Point') || (capaCargada.values_.tipo_feature == 'MultiPoint') || (capaCargada.values_.tipo_feature == 'Circle')){
      $("<canvas>").attr("id","pol_ley_" + capaCargada.values_.name).css({'height':'16px','width':'30px'}).appendTo(leyendaCapai);
      leyendaCapai.prependTo(contenidoLeyenda);
      var canvas_i = document.getElementById("pol_ley_" + capaCargada.values_.name);
      var icono_i = canvas_i.getContext("2d");
      //Relleno:
      icono_i.fillStyle = capaCargada.values_.color_relleno;
      icono_i.arc(150,75,45,0,2*Math.PI,true);
      icono_i.fill();
      //Línea:
      icono_i.strokeStyle = capaCargada.values_.color_borde;
      icono_i.lineWidth = 10;
      icono_i.arc(150,75,45,0,2*Math.PI,true);
      icono_i.stroke();
    }
  //C) Resto de tipos (geojson externo, geojson propio o gpx) con leyenda a cargar desde una imagen ya creada:
  } else if ((tipoOrigen == 'geojson_propio') && (capaCargada.values_.tipo_leyenda == 'imagen')) {
    var imagenLeyenda = $("<img>").attr("src",capaCargada.values_.leyenda_imagen).css({'max-width':'256px'}).appendTo(leyendaCapai);
    leyendaCapai.prependTo(contenidoLeyenda);
  }

  //Hacer la leyenda flotante:
  dragElement(document.getElementById("leyendaCapas"));
  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
};
