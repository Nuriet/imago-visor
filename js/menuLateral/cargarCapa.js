//Variables globales necesarias:
var arrayCapasCargadasYa = [];
var arrayTitulosCapasCargadasAntes = [];

//FUNCIÓN CargarCapa(tipo,idCapa,ruta,origen,data,titulo,abstract,tipoLeyenda,infoLeyenda,rutaDescarga,opacidadCapa,queryableCapa)
/*
ENTRADAS:
  tipo: tipo de recurso que es la capa que se va a añadir al mapa: wms, geojson, etc.
  idCapa: el id de la capa que se va a añadir al mapa.
  ruta: ruta origen de la capa a cargar.
  origen: parte del visualizador desde la cual se ha indicado la carga de la capa: menuCarga (si es desde el menú de temáticas) o menuBusqueda (si es desde el menú de "Añadir otros mapas").
  data: variable que guarda el archivo subido por el usuario. Por tanto, sólo utilizado en los casos de archivos subidos por el usuario.
  titulo: título a mostrar para la capa cargada (en el menú de gestión de capas, en la leyenda, etc.). Este campo solo se utiliza para capas procedentes de archivos (geojson (tanto externo como propio), kml, kmz o gpx).
  abstract: resumen del contenido de la capa cargada. Sólo se utiliza para los geojson propios, en los cuales se puede introducir un resumen (archivo arrayTematicas.js).
  tipoLeyenda: únicamente en los archivos geojson propios, y que puede ser:
    - vectorial: entonces la leyenda se construye vectorialmente dentro de esta función.
    - imagen: entonces la leyenda es una imagen ya editada y guardada.
  infoLeyenda: únicamente en los archivos geojson propios con leyenda de tipo vectorial. Ofrece la información para dibujar la capa (y su leyenda): tipo de geometría, color de fondo y color de borde.
  rutaDescarga: únicamente en los archivos geojson propios. Si existe ese campo en el arrayObjetosTematicas (arrayTematicas.js) para la descarga; entonces aquí aparecerá la url a la misma.
  opacidadCapa: opacidad con la que tiene que ser cargada la capa.
  queryableCapa: campo únicamente útil a la hora de generar el contexto en xml. Con valor "true" si la capa permite las consultas, y "false" en caso contrario.
FUNCIONALIDAD:
  Detecta el tipo de recurso del que se trata, y en función de eso ejecuta una función de carga u otra.
  Además modifica la disposición del menú lateral izquierdo.
*/
function CargarCapa(tipo,idCapa,ruta,origen,data,titulo,abstract,tipoLeyenda,infoLeyenda,rutaDescarga,opacidadCapa,queryableCapa){
  // 1º EJECUTAR LA FUNCIÓN DE CARGA DE CAPA CORRESPONDIENTE (SEGÚN EL FORMATO Y ORIGEN DE LA CAPA):
  //Obtener el conjunto de capas ya cargadas, y crear un array con sus títulos:
  arrayCapasCargadasYa = map.getLayers().getArray();
  arrayTitulosCapasCargadasAntes = [];

  //Comprobar que no se rebasa el número máximo de capas cargadas:
  //En caso de que se rebase:
  if (arrayCapasCargadasYa.length > numMaxCapasCargadas){
    alert(alertNumCapasCargadasMax);
    $("#colapsableGestion").attr('class', 'collapse show');
    $("#colapsableTematicas").attr('class', 'collapse');
    $("#colapsableBusqueda").attr('class', 'collapse');
    cambiarIconoBoton('capa_cargada');
  } else {
    //En caso de que no se rebase; cargar la capa nueva:
    for (var i=0; i<arrayCapasCargadasYa.length; i++){
      var tituloCapaCargadaYai = arrayCapasCargadasYa[i].get('name');
      arrayTitulosCapasCargadasAntes.push(tituloCapaCargadaYai);
    }
    //Detectar que tipo de dato vamos a añadir y comprobar que no se ha cargado anteriormente:
    //Además, si la capa se carga por primera vez (origen "menuCarga" o "menuBusqueda"): se pasa una variable "true" para que se haga zoom a la capa. En otro caso, "false".
    if ((tipo == "wms") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) === -1) && (origen == "menuCarga" || origen == "menuBusqueda")) {
      AnadirWMS(ruta,idCapa,opacidadCapa,true);
    } else if ((tipo == "wms") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) === -1) && (origen == "contexto")) {
      AnadirWMS(ruta,idCapa,opacidadCapa,false);
    } else if ((tipo == "wms") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) != -1)) {
      alert(alertCapaYaCargada);
    } else if ((tipo == "wmts") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) === -1) && (origen == "menuCarga" || origen == "menuBusqueda")) {
      AnadirWMTS(ruta,idCapa,opacidadCapa,true);
    } else if ((tipo == "wmts") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) === -1) && (origen == "contexto")) {
      AnadirWMTS(ruta,idCapa,opacidadCapa,false);
    } else if ((tipo == "wmts") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) != -1)) {
      alert(alertCapaYaCargada);
    } else if ((tipo == "geojson") && (arrayTitulosCapasCargadasAntes.indexOf(titulo) === -1) && (origen == "menuBusqueda")) {
      AnadirGeojsonExterno(data,titulo,opacidadCapa);
    } else if ((tipo == "geojson") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) === -1) && (origen == "menuCarga")) {
      AnadirGeojsonPropio(idCapa,ruta,titulo,abstract,tipoLeyenda,infoLeyenda,rutaDescarga,opacidadCapa,true,queryableCapa);
    } else if ((tipo == "geojson") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) === -1) && (origen == "contexto")) {
      AnadirGeojsonPropio(idCapa,ruta,titulo,abstract,tipoLeyenda,infoLeyenda,rutaDescarga,opacidadCapa,false,queryableCapa);
    } else if ((tipo == "geojson") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) != -1) && (origen == "menuCarga")) {
      alert(alertCapaYaCargada);
    } else if ((tipo == "kml") && (arrayTitulosCapasCargadasAntes.indexOf(titulo) === -1)) {
      AnadirKML(data,titulo);
    } else if ((tipo == "kml") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) != -1)) {
      alert(alertCapaYaCargada);
    } else if ((tipo == "gpx") && (arrayTitulosCapasCargadasAntes.indexOf(titulo) === -1)) {
      AnadirGPX(data,titulo);
    } else if ((tipo == "gpx") && (arrayTitulosCapasCargadasAntes.indexOf(idCapa) != -1)) {
      alert(alertCapaYaCargada);
    }

    // 2º MODIFICAR LA DISPOSICIÓN DE LOS ELEMENTOS DE LA BARRA LATERAL (SEGÚN EL ORIGEN DE LA CAPA):
    if (origen == "menuCarga"){
      CerrarSubmenus();
      $("#colapsableTematicas").attr('class', 'collapse');
      $("#colapsableGestion").attr('class', 'collapse show');
      cambiarIconoBoton('capa_cargada');
    } else if (origen == "menuBusqueda"){
      $("#colapsableBusqueda").attr('class', 'collapse');
      $("#colapsableGestion").attr('class', 'collapse show');
      cambiarIconoBoton('capa_cargada');
    } else if (origen == "contexto"){
      $("#colapsableTematicas").attr('class', 'collapse');
      $("#colapsableBusqueda").attr('class', 'collapse');
      $("#colapsableGestion").attr('class', 'collapse show');
      cambiarIconoBoton('capa_cargada');
    }
  }

  //Al cargar una capa nueva: vaciar y cerrar el popup que pudiera existir:
  CerrarPopup();
}

//FUNCIÓN CerrarSubmenus()
/*
FUNCIONALIDAD:
  - Cierra cualquier submenú que estuviera abierto.
  - Elimina el evento onclick fuera de los submenús para eliminarlos, ya que estos ya se han eliminado.
*/
function CerrarSubmenus(){
  //Cerrar cualquier submenú abierto:
  $("[id*=submenutematica]").hide();
  //Eliminar el control de click fuera del submenú para cerrarlo; porque ya se ha cerrado:
  $("html").unbind('click');
  //Recargar el menú de temáticas:
  CargarTematicas(idioma);
}
