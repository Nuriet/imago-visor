//Función CrearMenuGestionCapas()
/*
FUNCIONALIDAD:
  Crea la tabla ordenable de capas en el div creado en el html para ello; y carga el mensaje inicial de 0 capas cargadas.
  Se ejecuta con el onload del body.
*/
function CrearMenuGestionCapas(){
  var divTablaGestion = document.getElementById('tablaGestion');
  var tablaGestion = Sortable.create(divTablaGestion,{
    //Al arrastrar y soltar en una posición nueva una capa:
    onUpdate: function (evt){
      //1º REORDENAR LAS CAPAS CARGADAS AL MAPA:
      //Array de las capas cargadas en el orden que han quedado tras arrastrar y soltar:
      arrayLiCapas = evt.from.getElementsByClassName("capa_gestion");
      //Array con los id de las capas cargadas en el orden en que han quedado tras arrastrar y soltar:
      arrayLiCapasId = [];
      for (var i=0; i<arrayLiCapas.length; i++){
        arrayLiCapasId.push(arrayLiCapas[i].id);
      }
      //Posición de la capa que acaba de ser soltada:
      posicionCapaSoltada = arrayLiCapasId.indexOf(evt.item.id)

      //Crear un array con las capas cargadas al mapa (TODAS) (se obtiene el orden en el que estaban cargadas anteriormente a arrastrar y soltar):
      var arrayTitulosCapasCargadasDespues = [];
      for (var i=0; i<arrayCapasCargadasYa.length; i++){
        var tituloCapaCargadaYai = arrayCapasCargadasYa[i].get('name');
        arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
      }
      //Obtener la capa que ha sido arrastrada y soltada; eliminarla de su posición en la colección de capas cargadas al mapa; y añadirla en la nueva posición:
      capaSoltada = map.getLayers().item(arrayTitulosCapasCargadasDespues.indexOf(evt.item.id.substr(8)));
      map.getLayers().removeAt(arrayTitulosCapasCargadasDespues.indexOf(evt.item.id.substr(8)));
      map.getLayers().insertAt(arrayTitulosCapasCargadasDespues.length - posicionCapaSoltada - 1,capaSoltada);

      //2º REORDENAR LA DISPOSICIÓN DE LAS FILAS DE LA LEYENDA:
      // Se ha configurado para que la fila que se arrastra y suelta se coloque en la leyenda en primer lugar,
      // independientemente de la posición en la que se haya soltado.
      //Obtener el nombre y la propia fila de la leyenda a mover:
      var nombreFilaLeyendaAMover = "#leyenda_" + evt.item.id.substr(8);
      filaLeyendaCapaSoltada = $(nombreFilaLeyendaAMover)

      //Eliminar la fila de la leyenda y colocarla en primer lugar
      filaLeyendaCapaSoltada.remove();
      filaLeyendaCapaSoltada.prependTo($('#contenidoLeyenda'));

      //Cerrar el popup (si estuviera abierto):
      CerrarPopup();
      //Cerrar el menú de opciones y de información (si estuviera abierto alguno):
      CerrarOpcionesEInfo();
    }
  });

  //Limitar el tamaño máximo del menú de gestión de capas; para que no se salga de la pantalla el conjunto de menú lateral:
  alturaMaximaColapsable = alturaSidebar - 212;
  divTablaGestion.setAttribute("style","max-height:" + alturaMaximaColapsable + "px;display:flex;");

  //Se ejecuta la función para cargar un mensaje informativo:
  MensajeMenuGestionCapas();
}

//Función MensajeMenuGestionCapas()
/*
FUNCIONALIDAD:
  Añade una fila al menú de capas cargadas con un mensaje informativo cuando no hay ninguna capa cargada.
  Se ejecuta con el onload del body a través de la función CrearMenuGestionCapas(); y cada vez que el visualizador se queda sin capas cargadas (sin contar la capa base).
  Además, ejecuta la función de cargar idioma de nuevo; para colocar el texto en el idioma correspondiente.
*/
function MensajeMenuGestionCapas(){
  //Se crea una fila con mensaje para cuando se abre el menú y no hay ninguna capa cargada:
  var nuevaCapa = $("<li>").attr("id","gestion_vacio")
    .addClass("list-group-item container w-100 m-0 p-1");
  var filaCerrar = $("<div>").addClass("row align-items-center justify-content-end w-100 m-0 p-0");
  $("<div>").addClass("col-md-12 small text-center m-0 p-0")
    .attr("id","txtNingunaCapa")
    .appendTo(filaCerrar);
  filaCerrar.appendTo(nuevaCapa);
  nuevaCapa.appendTo($("#tablaGestion"));
  PonerIdioma(idioma);
}

//Función AnadirAGestionCapas(capa,tipo)
/*
ENTRADAS:
  capa: objeto de openlayers con la información de la capa recién cargada (información por defecto + información añadida en el código).
  tipo: "wms", "wmts" o "geojson" (actualmente no se utiliza la distinción, pero podría ser útil en el futuro).
FUNCIONALIDAD:
  Añade una fila al menú de capas cargadas con la nueva capa cargada y toda la funcionalidad asociada.
*/
function AnadirAGestionCapas(capa,tipo){
  //Eliminar la fila con texto informativo:
  $("[id*=gestion_vacio]").remove();

  /* ELEMENTO DE LA LISTA DE CAPAS */
  //Crear el div de la nueva capa como un elemento nuevo de la lista:
  var nuevaCapa = $("<li>").attr("id","gestion_" + capa.values_.name)
    .addClass("list-group-item capa_gestion resaltar container w-100 m-0 p-1");

  //Fila superior con el botón de cerrar:
  var filaCerrar = $("<div>").addClass("row align-items-center justify-content-end w-100 m-0 p-0");
  $("<div>").addClass("col-md-1 small text-right mx-1 p-0")
    .html('<i class="fas fa-times m-0"></i>')
    .css("cursor","pointer")
    .on('click', EliminarCapa)
    .appendTo(filaCerrar);
  filaCerrar.appendTo(nuevaCapa);

  //Fila inferior con iconos y título de la capa:
  var filaContenido = $("<div>").addClass("row align-items-center justify-content-center m-0 mb-3 p-0");

  //Icono de movimiento:
  $("<div>").addClass("col-md-1 m-0 p-0 boton_mover_capa")
    .html('<i class="fas fa-align-justify m-0"></i>')
    .attr('title',botonMoverCapa)
    .css("cursor","n-resize")
    .appendTo(filaContenido);

  //Título:
  $("<div>").addClass("col-md-9 m-0 p-0")
    .html('<span class="m-0">' + capa.values_.titulo_es + '</span>')
    .css("cursor","default")
    .appendTo(filaContenido);

  //Icono de check:
  $("<div>").addClass("col-md-1 m-0 p-0 boton_desactivar_capa")
    .html('<i class="fas fa-check-square m-0"></i>')
    .css("cursor","pointer")
    .attr('title',botonDesactivarCapa)
    .attr("id","check_activar_" + capa.values_.name)
    .on("click",DesactivarCapa)
    .appendTo(filaContenido);

  //Icono de opciones:
  $("<div>").addClass("col-md-1 m-0 p-0 boton_opciones_capa")
    .html('<i class="fas fa-ellipsis-h m-0"></i>')
    .css("cursor","pointer")
    .attr('title',botonOpcionesCapa)
    .attr("id","btn_opciones_" + capa.values_.name)
    .on("click",MostrarOpciones)
    .appendTo(filaContenido);

  filaContenido.appendTo(nuevaCapa);

  /* MENÚ DE CONTROLES DE CAPA */
  // (menú que aparece al hacer click en "opciones de capa")
  var anchoSidebar = document.getElementById('sidebar').offsetWidth + 6;
  var tablaControles = $("<ul>")
    .addClass("tabla_controles list-group")
    .attr("id","tabla_control_" + capa.values_.name)
    .css({'position':'fixed','z-index':'3','left':anchoSidebar + 'px','display':'none','width':'12em'})
    .appendTo(nuevaCapa);

  //Fila con el control para cerrar el menú:
  var cruzTituloTablaControles = $("<li>").addClass("list-group-item encabezado_lista_controles m-0 p-0")
    .html("<div class='row m-0 p-0 justify-content-between'><div class='col-auto m-0 p-0'><p class='m-0 p-0'>" + opcionesCapa + "</p></div><div class='col-auto m-0 p-0' style='cursor:pointer;' title=" + mensajeCerrar + "><i class='fas fa-times m-0 p-0 mr-2'></i></div></div>")
    .attr('id','cruz_cerrar_' + capa.values_.name)
    .on('click', OcultarOpciones)
    .appendTo(tablaControles);

  //PRIMER ELEMENTO: CONTROL DE OPACIDAD:
  var controlOpacidad = $("<li>")
    .addClass("list-group-item d-inline-flex")
    .appendTo(tablaControles);

  var textoOpacidad = $("<p class='m-0 p-0'>")
    .attr('id','control_opac_' + capa.values_.name)
    .html(opacidadCapa)
    .appendTo(controlOpacidad);

  //Barra horizontal para cambiar la opacidad de la capa:
  var opacity = $("<input>")
    .attr('id','barra_opacidad' + capa.values_.name)
    .attr('data-slider-id','slider' + capa.values_.name)
    .attr('type','text')
    .attr('data-slider-min','0')
    .attr('data-slider-max','1')
    .attr('data-slider-step','0.05')
    .attr('data-slider-value','1')
    .appendTo(controlOpacidad);

  //Generar el slider:
  opacity.slider();

  //Eventos para cambiar la opacidad:
  opacity.on("slide", function(slideEvt) {
    //Array para controlar las capas añadidas al menú de gestión de capas:
    arrayTitulosCapasCargadasDespues = [];
    for (var i=0; i<arrayCapasCargadasYa.length; i++){
      var tituloCapaCargadaYai = arrayCapasCargadasYa[i].get('name');
      arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
    }
    map.getLayers().getArray()[arrayTitulosCapasCargadasDespues.indexOf($(this)[0].id.substr(14))].setOpacity(slideEvt.value);
  });

  opacity.on("slideStop", function(slideEvt) {
    //Array para controlar las capas añadidas al menú de gestión de capas:
    arrayTitulosCapasCargadasDespues = [];
    for (var i=0; i<arrayCapasCargadasYa.length; i++){
      var tituloCapaCargadaYai = arrayCapasCargadasYa[i].get('name');
      arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
    }
    //Cambios en el caso de estar la capa desactivada anteriormente:
    //1º Cambiar el icono del check y el evento:
    var idCheckActivar = "#check_activar_" + capa.values_.name;
    $(idCheckActivar).html('<i class="fas fa-check-square m-0"></i>').unbind('click').on("click",DesactivarCapa);
    map.getLayers().getArray()[arrayTitulosCapasCargadasDespues.indexOf($(this)[0].id.substr(14))].setOpacity(slideEvt.value);

    //2º Subir la opacidad de la leyenda de la capa correspondiente:
    var nombreFilaLeyendaABorrar = "#leyenda_" + capa.values_.name;
    $(nombreFilaLeyendaABorrar).css('opacity','1');
  });

  //SEGUNDO ELEMENTO: CONTROL DE ZOOM A LA CAPA:
  var controlZoom = $("<li>")
    .addClass("list-group-item accion")
    .attr('id','control_zoom_' + capa.values_.name)
    .html(zoomCapa)
    .on('click',ZoomExtent)
    .appendTo(tablaControles);

  //TERCER ELEMENTO: INFORMACIÓN DE LA CAPA:
  //Variables y funciones para controlar la aparición y desaparición del div INFORMACIÓN DE LA CAPA:
  var controlInfoCapa = $("<li>")
    .addClass("list-group-item accion")
    .html(infoCapa)
    .attr('id','info_capa_' + capa.values_.name)
    .on('click',AparecerInfo)
    .appendTo(tablaControles);

  var divInfoCapa = $("<ul>")
    .addClass("list-group div_info_capa")
    .attr("id","div_info_capa_" + capa.values_.name)
    .css({'position':'fixed','z-index':'3','left':anchoSidebar + 'px','display':'none','width':'30%'})
    .appendTo(nuevaCapa);

  var cruzInfoCapa = $("<li>").addClass("list-group-item encabezado_info_capa m-0 p-0")
    .html("<div class='row m-0 p-0 justify-content-between'><div class='col-auto m-0 p-0'><p class='m-0 mx-3 p-0'>Info de capa </p></div><div class='col-auto m-0 p-0' style='cursor:pointer;' title=" + mensajeCerrar + "><i class='fas fa-times m-0 p-0 mr-2'></i></div></div>")
    .attr('id','cruz_info_capa' + capa.values_.name)
    .on('click', CerrarInfo)
    .appendTo(divInfoCapa);

  var contenidoInfoCapa = $("<li>")
    .addClass("list-group-item div_contenido_info_capa")
    .html('<p class="m-0 p-0">' + capa.values_.abstract + '</p>')
    .css({'border-radius':'0 !important'})
    .appendTo(divInfoCapa);

  //CUARTO ELEMENTO: DESCARGAR DATOS DE LA CAPA:
  //Sólo se crea esta cuarta opción en la tabla para los archivos Geojson propios, si se ha incluido la ruta de descarga en el campo "ruta_descarga" de las propiedades de la capa.
  if (capa.values_.ruta_descarga){
    var controlDescargar = $("<li>")
    .addClass("list-group-item accion")
    .html('<a target="_blank" href="' + capa.values_.ruta_descarga + '">' + descargarCapa + '</a>')
    .attr('id','descargar_' + capa.values_.name)
    .attr('ruta_descarga',capa.values_.ruta_descarga)
    .appendTo(tablaControles);
  }

  nuevaCapa.prependTo($("#tablaGestion"));
  //Bajar la posición de la tabla de opciones:
  var altoNuevaCapa = document.getElementById('gestion_' + capa.values_.name).offsetHeight;
}

//Función ZoomExtent()
/*
FUNCIONALIDAD:
  Establece la vista del mapa de forma que se adopta al extent de la capa correspondiente.
*/
function ZoomExtent() {
  //Crear un array con las capas cargadas (TODAS):
  var arrayTitulosCapasCargadasDespues = [];
  for (var i=0; i<arrayCapasCargadasYa.length; i++){
    var tituloCapaCargadaYai = arrayCapasCargadasYa[i].get('name');
    arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
  }
  //Cambia el extent del mapa al de la capa en la que se está seleccionando:
 	var anchoSidebar = document.getElementById('sidebar').offsetWidth + 6;
  map.getView().fit(map.getLayers().getArray()[arrayTitulosCapasCargadasDespues.indexOf($(this).closest('li')[0].id.substr(13))].getExtent(), {size:map.getSize(),padding:[10,10,10,anchoSidebar]});
};

//Funciones para hacer aparecer y desaparecer el texto de información de capa:
function AparecerInfo(){
  $('#div_info_capa_' + $(this)[0].id.substr(10)).css('display','');
  $("#tabla_control_" + $(this)[0].id.substr(10)).css('display','none');
}
function CerrarInfo(){
  $("#div_info_capa_" + $(this)[0].id.substr(14)).css('display','none');
}

//Función EliminarCapa()
/*
FUNCIONALIDAD:
  Realiza todos los cambios necesarios al eliminar una capa:
    1º Eliminar la capa del mapa.
    2º Eliminar la fila del propio menú de gestión de capas.
    3º Eliminar la capa de la leyenda.
  Y detecta si quedan capas cargadas o si se está eliminando la última, para entonces:
    1º Ocultar la leyenda vacía.
    2º Cambiar al menú de temáticas en la barra lateral.
    3º Escribir de nuevo el mensaje informativo de 0 capas cargadas en el menú de gestión de capas.
*/
function EliminarCapa(){
  //1º ELIMINAR LA CAPA CORRESPONDIENTE DEL MAPA:
  //Crear un array con las capas cargadas (TODAS):
  var arrayTitulosCapasCargadasDespues = [];
  for (var i=0; i<arrayCapasCargadasYa.length; i++){
    var tituloCapaCargadaYai = arrayCapasCargadasYa[i].get('name');
    arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
  }
  //Eliminar del mapa la capa que tiene como título el nombre añadido a "gestion_" (en el id del elemento li correspondiente):
  map.getLayers().removeAt(arrayTitulosCapasCargadasDespues.indexOf($(this).closest('li')[0].id.substr(8)));

  //2º ELIMINAR EL PROPIO ELEMENTO LI DEL MENÚ DE GESTIÓN DE CAPAS:
  $(this).closest('li').remove();

  //3º ELIMINAR DE LA LEYENDA LA FILA CORRESPONDIENTE:
  var nombreFilaLeyendaABorrar = "#leyenda_" + $(this).closest('li')[0].id.substr(8);
  $(nombreFilaLeyendaABorrar).remove();

  //4º CERRAR EL POPUP:
  CerrarPopup();

  //CONTROL PARA EL CASO EN EL QUE LA CAPA QUE SE ELIMINA ERA LA ÚLTIMA Y ÚNICA VISIBLE:
  //Número de capas cargadas:
  var numeroMapasTotalCargados = arrayTitulosCapasCargadasDespues.length;
  //Si el número de capas cargadas es igual a 2 (mapa base + una capa (la única añadida al mapa)):
  // 1º Se oculta la leyenda vacía.
  // 2º Se muestra el menú de temáticas en la barra lateral.
  // 3º Se escribe el mensaje informativo para el caso de que se abra el menú de gestión de capas:
  // 4º Se hace desaparecer el popup:
  if (numeroMapasTotalCargados == 2){
    $("#leyendaCapas").css({'display':'none'});
    $("#divBotonLeyenda").css({'display':'none'});

    $("#colapsableTematicas").attr('class', 'collapse show');
    $("#colapsableGestion").attr('class', 'collapse');
    cambiarIconoBoton('ultima_capa_eliminada');

    MensajeMenuGestionCapas();

    CerrarPopup();
  }
};

//Función DesactivarCapa()
/*
FUNCIONALIDAD:
  Realiza todos los cambios necesarios al desactivar una capa:
    1º Cambia el iciono del check y el evento en ese botón.
    2º Baja la opacidad de la capa a 0.
    3º Baja la opacidad de la fila de la leyenda que corresponda a dicha capa.
    4º Cierra el popup (en el caso de que estuviera abierto alguno).
    5º Deshabilita las funcionalidades del menú de opciones de cada capa.
*/
function DesactivarCapa(){
  //1º CAMBIAR EL ICONO DEL CHECK, LOS TIPS Y EL EVENTO:
  var idCheckActivar = "#check_activar_" + $(this).closest('li')[0].id.substr(8);
  $(idCheckActivar).removeClass('boton_desactivar_capa');
  $(idCheckActivar).addClass('boton_activar_capa');
  $(idCheckActivar).removeAttr('title');
  $(idCheckActivar).attr('title',botonActivarCapa);
  $(idCheckActivar).html('<i class="far fa-square m-0"></i>').unbind('click').on("click",ActivarCapa);

  //2º BAJAR LA OPACIDAD DE LA CAPA CORRESPONDIENTE A 0:
  //Crear un array con las capas cargadas (TODAS):
  var arrayTitulosCapasCargadasDespues = [];
  for (var i=0; i<arrayCapasCargadasYa.length; i++){
    var tituloCapaCargadaYai = arrayCapasCargadasYa[i].get('name');
    arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
  }
  //Bajar la opacidad a 0 de la capa que tiene como título el nombre añadido a "gestion_" (en el id del elemento li correspondiente):
  map.getLayers().getArray()[arrayTitulosCapasCargadasDespues.indexOf($(this).closest('li')[0].id.substr(8))].setOpacity(0);

  //3º BAJAR LA OPACIDAD DE LA LEYENDA DE LA CAPA CORRESPONDIENTE:
  var nombreFilaLeyendaABorrar = "#leyenda_" + $(this).closest('li')[0].id.substr(8);
  $(nombreFilaLeyendaABorrar).css('opacity','0.3');

  //4º CERRAR EL POPUP:
  CerrarPopup();

  //5º CAMBIAR EL ESTILO DE LA TABLA DE OPCIONES Y DESHABILITAR SUS FUNCIONALIDADES:
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).removeClass('tabla_controles');
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).addClass('tabla_controles_opaco');
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).removeClass('tabla_controles');
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).addClass('tabla_controles_opaco');

  $("#barra_opacidad" + $(this).closest('li')[0].id.substr(8)).slider("disable");
  $("#control_zoom_" + $(this).closest('li')[0].id.substr(8)).unbind('click');
  $("#info_capa_" + $(this).closest('li')[0].id.substr(8)).unbind('click');
  $("#descargar_" + $(this).closest('li')[0].id.substr(8)).html('<p class="m-0 p-0">' + descargarCapa + '</p>');

  //6º CERRAR EL MENÚ DE OPCIONES O DE INFORMACIÓN DE CAPA (SI ESTUVIERA ABIERTO):
  CerrarOpcionesEInfo();

  //CONTROL PARA EL CASO DE QUE AL DESACTIVAR LA ÚLTIMA CAPA YA NO HAYA NINGUNA ACTIVA:
  // Se considera desactivada cuando tiene una opacidad inferior a 0.05. Se empieza a contar desde el 1, para no tener en cuenta la capa base:
  // Funcionamiento del bucle:
  //  - si se encuentra alguna capa cargada con opacidad mayor de 0.05: no se hace nada;
  //  - si no se encuentra ninguna capa cargada con opacidad mayor de 0.05: se cierra el popup.
  for (var i=1; i<map.getLayers().getArray().length; i++){
    if (map.getLayers().getArray()[i].getOpacity() > 0.05){
      break;
    } else {
      CerrarPopup();
    }
  }
}

//Función ActivarCapa()
/*
FUNCIONALIDAD:
  Realiza todos los cambios necesarios al activar una capa que había sido anteriormente desactivada:
    1º Cambia el iciono del check y el evento en ese botón.
    2º Sube la opacidad al valor que tenía antes de desactivarse.
    3º Sube la opacidad de la fila de la leyenda que corresponda a dicha capa.
    4º Cierra el popup (en el caso de que estuviera abierto alguno).
    5º Habilita las funcionalidades del menú de opciones de cada capa.
*/
function ActivarCapa(){
  //1º CAMBIAR EL ICONO DEL CHECK, LOS TIPS Y EL EVENTO:
  var idCheckActivar = "#check_activar_" + $(this).closest('li')[0].id.substr(8);
  $(idCheckActivar).removeClass('boton_activar_capa');
  $(idCheckActivar).addClass('boton_desactivar_capa');
  $(idCheckActivar).removeAttr('title');
  $(idCheckActivar).attr('title',botonDesactivarCapa);
  $(idCheckActivar).html('<i class="fas fa-check-square m-0"></i>').unbind('click').on("click",DesactivarCapa);

  //2º SUBIR LA OPACIDAD DE LA CAPA CORRESPONDIENTE AL VALOR QUE TENÍA ANTES DE DESACTIVARSE
  //Crear un array con las capas cargadas (TODAS):
  var arrayTitulosCapasCargadasDespues = [];
  for (var i=0; i<arrayCapasCargadasYa.length; i++){
    var tituloCapaCargadaYai = arrayCapasCargadasYa[i].get('name');
    arrayTitulosCapasCargadasDespues.push(tituloCapaCargadaYai);
  }
  //Subir la opacidad de la capa que tiene como título el nombre añadido a "gestion_" (en el id del elemento li correspondiente) al valor anterior.
  //Este valor anterior se obtiene a partir del valor del slider de opacidad:
  map.getLayers().getArray()[arrayTitulosCapasCargadasDespues.indexOf($(this).closest('li')[0].id.substr(8))].setOpacity(Number($('#slider' + $(this).closest('li')[0].id.substr(8))[0].textContent));

  //3º SUBIR LA OPACIDAD DE LA LEYENDA DE LA CAPA CORRESPONDIENTE:
  var nombreFilaLeyendaABorrar = "#leyenda_" + $(this).closest('li')[0].id.substr(8);
  $(nombreFilaLeyendaABorrar).css('opacity','1');

  //4º Cerrar el popup que pueda estar abierto:
  CerrarPopup();

  //5º CAMBIAR EL ESTILO DE LA TABLA DE OPCIONES Y HABILITAR SUS FUNCIONALIDADES:
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).removeClass('tabla_controles_opaco');
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).addClass('tabla_controles');
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).removeClass('tabla_controles_opaco');
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).addClass('tabla_controles');

  $("#barra_opacidad" + $(this).closest('li')[0].id.substr(8)).slider("enable");
  $("#control_zoom_" + $(this).closest('li')[0].id.substr(8)).on('click',ZoomExtent);
  $("#info_capa_" + $(this).closest('li')[0].id.substr(8)).on('click',AparecerInfo);

  var rutaDescarga = $("#descargar_" + $(this).closest('li')[0].id.substr(8)).attr('ruta_descarga');
  $("#descargar_" + $(this).closest('li')[0].id.substr(8)).html('<a target="_blank" href="' + rutaDescarga + '">' + descargarCapa + '</a>');
}

//Funciones MostrarOpciones() y OcultarOpciones():
/*
FUNCIONALIDAD:
  Hacen aparecer y desaparecer el menú de opciones de cada capa, respectivamente.
*/
function MostrarOpciones(){
  $("[id*=div_info_capa_]").css({'display': 'none'});
  $("[id*=tabla_control_]").css({'display': 'none'});
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).css('display','');
  //Asignar a la tabla de opciones una posición vertical con respecto a la posición de la capa a la que pertenece:
  $("#tabla_control_" + $(this).closest('li')[0].id.substr(8)).css('top',$("#gestion_" + $(this).closest('li')[0].id.substr(8)).position().top + $("#gestion_" + $(this).closest('li')[0].id.substr(8)).outerHeight());
}
function OcultarOpciones() {
  $("#tabla_control_" + $(this)[0].id.substr(12)).css('display','none');
}

//Función CerrarOpcionesEInfo():
/*
FUNCIONALIDAD:
  Cierra todos los divs de información de capa y todas las tablas de opciones de capa que pudieran estar abiertas.
*/
function CerrarOpcionesEInfo(){
  $("[id*=div_info_capa_]").css({'display': 'none'});
  $("[id*=tabla_control_]").css({'display': 'none'});
}
