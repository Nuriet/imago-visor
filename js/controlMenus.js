//Variables globales necesarias (cuyo valor se actualiza en la función siguiente):
var alturaSidebar = 0;
var anchoSidebar = 0;

//FUNCIÓN IniciarBarraLateral()
/*
FUNCIONALIDAD:
  Se ejecuta al cargar la página; y dispone todos los elementos de la barra lateral en la situación inicial:
  1.) Dependiendo de la resolución de la pantalla, coloca 1 o 2 cuadrados de temáticas por fila.
  2.) Establece el ancho y el alto de la barra lateral al cargar la página (ajustándose a la pantalla del dispositivo) y la hace visible.
  3.) Mueve la escala y el control de posición a la derecha.
*/
function IniciarBarraLateral(){
  //1. NÚMERO DE TEMÁTICAS POR FILA
  //El valor de 576 (px) se corresponde con el paso entre tamaño xs y sm de Bootstrap.
  //En el index, los textos están preparados para cambiar de contenido en ese punto de cambio del ancho de pantalla.
  //De esta forma, los textos largos aparecerán cuando haya 2 temáticas por fila; y los textos cortos cuando haya sólo 1.
  var numeroTematicasPorFila = 2;
  if ($("body").width() >= 576){
    numeroTematicasPorFila = 2;
  } else {
    numeroTematicasPorFila = 1;
  }

  //2. ASIGNAR LAS DIMENSIONES DE LA BARRA LATERAL IZQUIERDA
  //Se calculan altura y ancho, a partir del número de temáticas por fila definido arriba y de la dimensión del cuadrado de cada temática (definido en configuracionBasica.js):
  anchoSidebar = dimensionTematicai*numeroTematicasPorFila + 36 + "px";
  alturaSidebar = $("body").height() - $("header").height() - $("footer").height();
  var anchoContenedorSidebar = dimensionTematicai*numeroTematicasPorFila + 36 + 26 + "px";
  //Y se asignan:
  document.getElementById("sidebar").style.width = anchoSidebar;
  document.getElementById("contenedorSidebar").style.width = anchoContenedorSidebar;
  document.getElementById("sidebar").style.height = alturaSidebar + 'px';
  //Coloca el tirador al borde de la barra lateral:
  $("#abrirCerrarMenuLateral").css({left: anchoSidebar});

  //3. POSICIÓN DE LOS CONTROLES DE ESCALA Y MOUSE SITUADOS SOBRE EL MAPA
  //Que depende del ancho que ocupe la barra lateral:
  var posicionEscalaMouse = dimensionTematicai*numeroTematicasPorFila + 36 + 6 + "px";
  $(".posicion_escala").css({left: posicionEscalaMouse});
  $(".posicion_mouse").css({left: posicionEscalaMouse});
}

//FUNCIÓN MostrarMenuLat()
/*
FUNCIONALIDAD:
  Desplaza el menú lateral a la derecha hasta hacerlo visible; y actualiza el tirador para poder cerrar de nuevo.
*/
function MostrarMenuLat() {
  $("#contenedorSidebar").animate({left:'+=' + anchoSidebar});
  $(".posicion_escala").animate({left:'+=' + anchoSidebar});
  $(".posicion_mouse").animate({left:'+=' + anchoSidebar});
  $("#abrirCerrarMenuLateral").html('<a class="nav-link p-2 m-0" id="cerrarMenulateral" title="' + botonCerrarMenulateral + '" href="#" onclick="OcultarMenuLat();"><i class="fas fa-caret-left" style="vertical-align:middle;"></i></a>');
}

//FUNCIÓN OcultarMenuLat()
/*
FUNCIONALIDAD:
  Desplaza el menú lateral a la izquierda hasta hacerlo no visible; y actualiza el tirador para poder abrir de nuevo.
*/
function OcultarMenuLat() {
  //Primero comprueba que la barra lateral no está oculta:
  if ($("#contenedorSidebar").position().left == 0){
    $("#contenedorSidebar").animate({left:'-=' + anchoSidebar});
    $(".posicion_escala").animate({left:'-=' + anchoSidebar});
    $(".posicion_mouse").animate({left:'-=' + anchoSidebar});
    $("#abrirCerrarMenuLateral").html('<a class="nav-link p-2 m-0" id="abrirMenulateral" title="' + botonAbrirMenulateral + '" href="#" onclick="MostrarMenuLat();OcultarMenuNodos();"><i class="fas fa-caret-right" style="vertical-align:middle;"></i></a>');
    //Cerrar el menú de opciones de capa o de información de capa (si está abierto):
    CerrarOpcionesEInfo();
  }
}

//FUNCIÓN MostrarMenuNodos()
/*
FUNCIONALIDAD:
  Despliega el menú superior de nodos.
*/
function MostrarMenuNodos() {
    document.getElementById("menuNodos").style.height = "8.3em";
    document.getElementById("abrirMenuNodos").style.display = "none";
    document.getElementById("cerrarMenuNodos").style.display = "inline";
}

//FUNCIÓN OcultarMenuNodos()
/*
FUNCIONALIDAD:
  Oculta el menú superior de nodos.
*/
function OcultarMenuNodos() {
    document.getElementById("menuNodos").style.height = "0";
    document.getElementById("abrirMenuNodos").style.display = "inline";
    document.getElementById("cerrarMenuNodos").style.display = "none";
}
