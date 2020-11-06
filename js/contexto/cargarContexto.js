//Función CargarContexto(evt)
/*
FUNCIONALIDAD:
  Lee el archivo subido desde el input "Examinar", comprueba que tiene un tamaño no excesivo y que
  su extensión es xml; y entonces lee todo su contenido para aplicarlo al mapa.
*/
function CargarContexto(evt) {
  //Se cierra el menú de contexto:
  CerrarMenuContexto();
  //Archivo subido:
  var files = evt.target.files;
  //A) Comprobar el tamaño del fichero y sólo permitir la carga si es menor de lo indicado:
  if (files[0].size < 9999999){
    //B) Comprobar el tipo de formato del archivo: tiene que ser xml:
    if (files[0].name.indexOf('.xml')!= -1){
      //Creación del lector de archivos:
      var reader = new FileReader();
      reader.readAsBinaryString(files[0]);
      //Ejecución del lector de archivos:
      reader.onload = (function(theFile) {
        return function(e){
          //Parsear el texto en xml:
          var data = $.parseXML(e.target.result);

          //0. CRS (no se utiliza para nada de momento):
          contextoCRS = data.getElementsByTagName('ows:BoundingBox')[0].getAttribute('crs');

          //1. MAPA BASE
          //Se obtiene la primera capa del contexto (mapa base):
          capaBaseContexto = data.getElementsByTagName('ows-context:LayerList')[0].children[0];
          //Se ejecuta la función para cambiar de mapa base:
          CambioMapaBase(capaBaseContexto.getElementsByTagName('ows:Name')[0].innerHTML);

          //2. CAPAS CARGADAS
          //Obtener todas las capas que están en el contexto xml y cargarlas al mapa:
          for (var i=1; i<data.getElementsByTagName('ows-context:LayerList')[0].children.length; i++){
            capaContextoi = data.getElementsByTagName('ows-context:LayerList')[0].children[i];
            //En función del tipo de capa, se añadirá al mapa de un modo u otro:
            //a) SERVICIO WMS:
            if (capaContextoi.getElementsByTagName('ows:Server')[0].getAttribute('service') == 'OGC:WMS'){
              var nameCapaContexto = capaContextoi.getElementsByTagName('ows:Name')[0].innerHTML;
              var opacidadCapaContexto = capaContextoi.getAttribute('opacity');
              CargarCapa('wms', nameCapaContexto, capaContextoi.getElementsByTagName('ows:OnlineResource')[0].getAttribute('xlink:href'), 'contexto','','','','','','',opacidadCapaContexto);
            //b) SERVICIO WMTS:
            } else if (capaContextoi.getElementsByTagName('ows:Server')[0].getAttribute('service') == 'OGC:WMTS'){
              var nameCapaContexto = capaContextoi.getElementsByTagName('ows:Name')[0].innerHTML;
              var opacidadCapaContexto = capaContextoi.getAttribute('opacity');
              CargarCapa('wmts', nameCapaContexto, capaContextoi.getElementsByTagName('ows:OnlineResource')[0].getAttribute('xlink:href'), 'contexto','','','','','','',opacidadCapaContexto);
            //c) CAPA GEOJSON (PROPIO):
            } else if (capaContextoi.getElementsByTagName('ows:Server')[0].getAttribute('service') == 'GEOJSON'){
              var nameCapaContexto = capaContextoi.getElementsByTagName('ows:Name')[0].innerHTML;
              var opacidadCapaContexto = capaContextoi.getAttribute('opacity');
              //Se busca en el array de Temáticas:
                //1º la temática en la que se encuentra el geojson incluido en el contexto:
              var tematicaCapaContextoi =  arrayObjetosTematicas.find(l => l.id === nameCapaContexto.substr(0,3));
              //2º dos casos:
              //A) si la capa pertenece a un grupo dentro de esa temática, buscar el grupo en el que se encuentra:
              if (nameCapaContexto.substr(4,3) != "xxx"){
                var grupoCapaContextoi = tematicaCapaContextoi.contenido.find(l => l.id === nameCapaContexto.substr(0,7));
                //y dentro de ese grupo, la capa que se ha cargado:
                var capaContextoi = grupoCapaContextoi.capas.find(l => l.id === nameCapaContexto);
                CargarCapa('geojson', capaContextoi.id, capaContextoi.ruta, 'contexto','',capaContextoi.titulo,capaContextoi.abstract,capaContextoi.tipo_leyenda,capaContextoi.info_estilo,capaContextoi.ruta_descarga,opacidadCapaContexto);
              //B) si la capa no está agrupada, y directamente forma parte del contenido de la temática:
              } else {
                var capaContextoi = tematicaCapaContextoi.contenido.find(l => l.id === nameCapaContexto);
                CargarCapa('geojson', capaContextoi.id, capaContextoi.ruta, 'contexto','',capaContextoi.titulo,capaContextoi.abstract,capaContextoi.tipo_leyenda,capaContextoi.info_estilo,capaContextoi.ruta_descarga,opacidadCapaContexto);
              }
            }
          }

          //3. EXTENT DEL MAPA:
          //Obtener el Extent del contexto y aplicarlo al mapa:
          contextoExtent = [];
          contextoExtent.push(Number(data.getElementsByTagName('ows:BoundingBox')[0].getAttribute('minx')));
          contextoExtent.push(Number(data.getElementsByTagName('ows:BoundingBox')[0].getAttribute('miny')));
          contextoExtent.push(Number(data.getElementsByTagName('ows:BoundingBox')[0].getAttribute('maxx')));
          contextoExtent.push(Number(data.getElementsByTagName('ows:BoundingBox')[0].getAttribute('maxy')));
          map.getView().fit(contextoExtent,{size:map.getSize(),padding:[0,0,0,0]});
        };
      })(files[0]);
    } else {
      alert(alertFormatoNoValido);
    }
  } else {
    alert(alertArchivoDemasiadoPesado);
  }
}

function ActivarListenerCargarContexto(){
  //Añadir el "listener" al cuadro de selección de archivo a cargar:
  document.getElementById('selectorContexto').addEventListener('change', CargarContexto, true);
  //$("#selectorContexto").on('change',CargarContexto);
}
