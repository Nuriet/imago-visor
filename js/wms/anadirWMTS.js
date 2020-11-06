//FUNCIÓN AnadirWMTS(urlEntrada,capaEntrada,opacidadEntrada,hacerZoom)
/*
ENTRADAS:
  urlEntrada: url del servicio WMS que se quiere cargar (hasta la ?).
  capaEntrada: capa perteneciente al servicio anterior que se quiere cargar (tal y como está en el campo Name).
	opacidadEntrada: la opacidad con la que tiene que cargarse la capa.
	hacerZoom: con valor "true": tras cargar la capa se hace zoom a la misma. Con valor "false" no.
FUNCIONALIDAD:
  Hace una petición GetCapabilities al servicio indicado, para extraer el extent de la capa. Aquí se distinguen dos casos:
		- Éxito en la respuesta del getCapabilities: entonces se calcula el extent y se asigna el abstract.
		- Error en la respuesta del getCapabilities: entonces se asigna como extent todo el mundo y como abstract un texto genérico.
	Después, con esta información, se crea la vista y el mapa.
*/
function AnadirWMTS(urlEntrada,capaEntrada,opacidadEntrada,hacerZoom) {
	var extent3857 = [];
	var abstract = '';
	var tituloEs = '';
	var peticionLeyenda = '';
	var version = '';

	//Hacer petición getCapabilities:
	var parser = new ol.format.WMTSCapabilities();
	//La url de entrada se debe recortar a partir del caracter 7º, para quitar "http://":
	var urlEntradaParaCapabilities = urlEntrada.slice(7);
	//Se añaden los parámetros de la petición:
	var url_capabilities = urlEntrada + 'SERVICE=WMTS&REQUEST=GetCapabilities';
	//Se realiza la petición:
	$.ajax({
      url: url_capabilities
  }).done(function(text) {
		// CASO 1. ÉXITO EN LA RESPUESTA AL GETCAPABILITIES: crea la capa con extent:
    var result = parser.read(text);

		//ALGORITMO PARA BUSCAR LA INFORMACIÓN PARA EXTENT Y ABSTRACT dentro del resultado del GetCapabilities (cuando este sí se ha obtenido):
			//Teniendo en cuenta que puede haber muchos casos de n capas dentro de diferentes niveles: 1, 2, 3...
			//Aquí se entra hasta el segundo nivel de capas, y si no... se asignan los parámetros generales del GetCapabilities.
		if (result.Contents.Layer.find(l => l.Identifier === capaEntrada)) {
			//Caso 11: las capas se encuentran en un primer nivel.
			extent3857 = ol.proj.transformExtent(result.Contents.Layer.find(l => l.Identifier === capaEntrada).WGS84BoundingBox, 'EPSG:4326', 'EPSG:3857');
			abstract = result.Contents.Layer.find(l => l.Identifier === capaEntrada).Abstract;
			tituloEs = result.Contents.Layer.find(l => l.Identifier === capaEntrada).Title;
			peticionLeyenda = "";
			version = result.version;
		} else {
			//Caso 1222: El servicio (sin entrar en ninguna capa ni subcapa) no tiene definidos un extent y un abstract: se asigna el extent de todo el mapa, y un abstract vacío:
			extent3857 = [-20026376.39, -20048966.10, 20026376.39, 20048966.10];
			abstract = "Sin descripción";
			tituloEs = "Sin título";
			peticionLeyenda = "Sin leyenda";
			version = result.version;
		}

		//Se crea la fuente y la capa:
		CrearFuenteYCapa(extent3857,abstract,tituloEs,peticionLeyenda,version);

	}).catch(function(error) {
		// CASO DE ERROR EN LA RESPUESTA AL GETCAPABILITIES: crear la capa sin extent:
    CrearFuenteYCapa([-20026376.39, -20048966.10, 20026376.39, 20048966.10],"Sin descripción","Sin título","Sin leyenda");
		alert("Capa sin extent definido");
	});

	//Función para crear la fuente de la capa y la propia capa; y añadirla al mapa:
	function CrearFuenteYCapa(extentEntrada,abstractEntrada,tituloEsEntrada,peticionLeyendaEntrada,versionEntrada){
		//Variables necesarias para cargar el WMTS:
		var projection = ol.proj.get('EPSG:3857');
	  var projectionExtent = projection.getExtent();
	  var size = ol.extent.getWidth(projectionExtent) / 256;
	  var resolutions = new Array(24);
	  var matrixIds = new Array(24);
	  for (var z = 0; z < 24; ++z) {
			//Generar los arrays de resoluciones e id de matrices para el WMTS a cargar:
	    resolutions[z] = size / Math.pow(2, z);
	    matrixIds[z] = z;
	  }

		//Crear la fuente wms del servicio y de la capa introducidos:
		var fuenteWMTSEntrada = new ol.source.WMTS({
			url: urlEntrada,
			layer: capaEntrada,
      matrixSet: 'EPSG:3857',
      format: 'image/png',
      projection: projection,
      tileGrid: new ol.tilegrid.WMTS({
      	origin: ol.extent.getTopLeft(projectionExtent),
      	resolutions: resolutions,
      	matrixIds: matrixIds
    	}),
      style: 'default',
      wrapX: true
		})

		//Comprueba si existe un punto (".") en el nombre de la capa a cargar, y si es así, lo elimina:
		// Nota: sólo elimina uno. Si hubiera más de uno, la capa no dispondría de toda su funcionalidad en el visor.
		nombreCapaFinal = capaEntrada;
		if (capaEntrada.indexOf('.') != -1){
			var nombreCapaAntesdePunto = capaEntrada.slice(0, capaEntrada.indexOf('.'));
			var nombreCapaDespuesdePunto = capaEntrada.slice(capaEntrada.indexOf('.')+1);
			var nombreCapaFinal = nombreCapaAntesdePunto + nombreCapaDespuesdePunto;
		}

		//Crear la capa:
		var capaWMTSEntrada = new ol.layer.Tile({
			name: nombreCapaFinal,
			titulo_es: tituloEsEntrada,
			tipo: 'OGC:WMTS',
			version: versionEntrada,
			source: fuenteWMTSEntrada,
			extent: extentEntrada,
			abstract: abstractEntrada,
			leyenda: peticionLeyendaEntrada
		});

		//Ajustar la opacidad:
		capaWMTSEntrada.setOpacity(opacidadEntrada);
		//Añadir la capa al mapa:
		map.addLayer(capaWMTSEntrada);
		//Añadir la capa al menú de gestión de capas:
		AnadirAGestionCapas(capaWMTSEntrada,'wmts');

		//Hacer zoom a la capa cargada, si la variable hacerZoom lo indica:
		if (hacerZoom == true){
			var anchoSidebar = document.getElementById('sidebar').offsetWidth + 15;
			map.getView().fit(extentEntrada,{size:map.getSize(),padding:[15,15,15,anchoSidebar]});
		}
	}
}
