//FUNCIÓN AnadirWMS(urlEntrada,capaEntrada,opacidadEntrada,hacerZoom)
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
	Al final se añade la funcionalidad getFeatureInfo para mostrar información.
*/
function AnadirWMS(urlEntrada,capaEntrada,opacidadEntrada,hacerZoom) {
	//Variables necesarias:
	var extent3857 = [];
	var abstract = '';
	var tituloEs = '';
	var queryable = false;
	var peticionLeyenda = '';
	var version = '';

	//Hacer petición getCapabilities:
	var parser = new ol.format.WMSCapabilities();
	//Se añaden los parámetros de la petición:
	var url_capabilities = urlEntrada + 'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';
	//Se realiza la petición:
	$.ajax({
    url: url_capabilities
  }).done(function(text) {
		// CASO 1. ÉXITO EN LA RESPUESTA AL GETCAPABILITIES: crea la capa con extent:
    var result = parser.read(text);

		//ALGORITMO PARA BUSCAR LA INFORMACIÓN PARA EXTENT Y ABSTRACT dentro del resultado del GetCapabilities (cuando este sí se ha obtenido):
			//Teniendo en cuenta que puede haber muchos casos de n capas dentro de diferentes niveles: 1, 2, 3...
			//Aquí se entra hasta el segundo nivel de capas, y si no... se asignan los parámetros generales del GetCapabilities.
		if (result.Capability.Layer.Layer.find(l => l.Name === capaEntrada)) {
			//Caso 11: las capas se encuentran en un primer nivel.
			extent3857 = ol.proj.transformExtent(result.Capability.Layer.Layer.find(l => l.Name === capaEntrada).EX_GeographicBoundingBox, 'EPSG:4326', 'EPSG:3857');
			abstract = result.Capability.Layer.Layer.find(l => l.Name === capaEntrada).Abstract;
			tituloEs = result.Capability.Layer.Layer.find(l => l.Name === capaEntrada).Title;
			queryable = result.Capability.Layer.Layer.find(l => l.Name === capaEntrada).queryable;
			peticionLeyenda = result.Capability.Layer.Layer.find(l => l.Name === capaEntrada).Style[0].LegendURL[0].OnlineResource;
			version = result.version;
			//console.log(result);
		} else {
			//Caso 12: Las capas no se encuentran en un primer nivel: habrá que buscar en el segundo nivel:
			for (var i=0; i<result.Capability.Layer.Layer.length; i++) {
				if (result.Capability.Layer.Layer[i].Layer.find(l => l.Name === capaEntrada)) {
					//Caso 121: Las capas se encuentran en un segundo nivel, dentro de la capa i del primer nivel:
					extent3857 = ol.proj.transformExtent(result.Capability.Layer.Layer[i].Layer.find(l => l.Name === capaEntrada).EX_GeographicBoundingBox, 'EPSG:4326', 'EPSG:3857');
					abstract = result.Capability.Layer.Layer[i].Layer.find(l => l.Name === capaEntrada).Abstract;
					tituloEs = result.Capability.Layer.Layer[i].Layer.find(l => l.Name === capaEntrada).Title;
					queryable = result.Capability.Layer.Layer[i].Layer.find(l => l.Name === capaEntrada).queryable;
					peticionLeyenda = result.Capability.Layer.Layer[i].Layer.find(l => l.Name === capaEntrada).Style[0].LegendURL[0].OnlineResource;
					version = result.version;
					break;

				} else {
					//Caso 122: Las capas tampoco se encuentran en un segundo nivel.
					if (result.Capability.Layer.EX_GeographicBoundingBox && result.Capability.Layer.Title){
						//Caso 1221: El servicio (sin entrar en ninguna capa ni subcapa) tiene definidos un extent y un abstract: se asigna este:
						extent3857 = ol.proj.transformExtent(result.Capability.Layer.EX_GeographicBoundingBox, 'EPSG:4326', 'EPSG:3857');
						abstract = result.Capability.Layer.Abstract;
						tituloEs = result.Capability.Layer.Title;
						queryable = result.Capability.Layer.queryable;
						peticionLeyenda = "Sin leyenda";
						version = result.version;

					} else {
						//Caso 1222: El servicio (sin entrar en ninguna capa ni subcapa) no tiene definidos un extent y un abstract: se asigna el extent de todo el mapa, y un abstract vacío:
						extent3857 = [-20026376.39, -20048966.10, 20026376.39, 20048966.10];
						abstract = "Sin descripción";
						tituloEs = "Sin título";
						queryable = false;
						peticionLeyenda = "Sin leyenda";
						version = "";
						//console.log(result);
					}
				}
			}
		}

		//Corrección de la petición url para obtener la imagen de la leyenda:
		//Para aquellos casos en los que no está bien escrito el nombre de la capa.
		if (peticionLeyenda.indexOf('layer=') != -1){
			var peticionLeyendaRecortada = peticionLeyenda.slice(0, peticionLeyenda.indexOf('layer='));
			var peticionLeyenda = peticionLeyenda.slice(0, peticionLeyenda.indexOf('layer=')) + 'layer=' + capaEntrada;
		}

		//Se crea la fuente y la capa:
		CrearFuenteYCapa(extent3857,abstract,tituloEs,peticionLeyenda,version,queryable);

	}).catch(function(error) {
		// CASO DE ERROR EN LA RESPUESTA AL GETCAPABILITIES: crear la capa sin extent:
    CrearFuenteYCapa([-20026376.39, -20048966.10, 20026376.39, 20048966.10],"Sin descripción","Sin título","Sin leyenda","","undefined");
		alert("Capa sin extent definido");
	});

	//Función para crear la fuente de la capa y la propia capa; y añadirla al mapa:
	function CrearFuenteYCapa(extentEntrada,abstractEntrada,tituloEsEntrada,peticionLeyendaEntrada,versionEntrada,queryableEntrada){
		//Crear la fuente wms del servicio y de la capa introducidos:
		var fuenteWMSEntrada = new ol.source.TileWMS({
			url: urlEntrada,
			params: {LAYERS: capaEntrada, FORMAT: 'image/png'}
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
		var capaWMSEntrada = new ol.layer.Tile({
			name: nombreCapaFinal,
			titulo_es: tituloEsEntrada,
			tipo: 'OGC:WMS',
			version: versionEntrada,
			source: fuenteWMSEntrada,
			extent: extentEntrada,
			abstract: abstractEntrada,
			leyenda: peticionLeyendaEntrada,
			queryable: queryableEntrada
		});

		//Ajustar la opacidad:
		capaWMSEntrada.setOpacity(opacidadEntrada);
		//Añadir la capa al mapa:
		map.addLayer(capaWMSEntrada);
		//Añadir la capa a la leyenda, y hacerla visible (si estaba invisible):
		AñadirALeyenda(capaWMSEntrada,'wms');
		AbrirLeyenda();
		//Añadir la capa al menú de gestión de capas:
		AnadirAGestionCapas(capaWMSEntrada,'wms');

		//Hacer zoom a la capa cargada, si la variable hacerZoom lo indica:
		if (hacerZoom == true){
			var anchoSidebar = document.getElementById('sidebar').offsetWidth + 15;
			map.getView().fit(extentEntrada,{size:map.getSize(),padding:[15,15,15,anchoSidebar]});
		}

		//Añadir en el evento onclick, SÓLO para las capas en WMS, la funcionalidad del popup con el GETFEATUREINFO:
		map.on('singleclick', function(evt) {
			//Array para controlar qué capas están cargadas en cada momento:
			var arrayTitulosCapasCargadasYa = [];
			for (var i=0; i<arrayCapasCargadasYa.length; i++){
				arrayTitulosCapasCargadasYa.push(arrayCapasCargadasYa[i].values_.name);
			}

			//5 condiciones:
			// - la capa WMS está cargada en ese momento (es decir, que no se ha eliminado después de cargarse),
			// - que no se haya añadido ya información de esa misma capa,
			// - que la capa sea visible (que tenga una opacidad superior al 0.05),
			// - 2: que el modo medición esté desactivado; y el modo dibujo también.
			if ((arrayTitulosCapasCargadasYa.indexOf(nombreCapaFinal) != -1) && (arrayCapasYaAnadidasAPopup.indexOf(nombreCapaFinal) == -1) && (capaWMSEntrada.getOpacity() > 0.05) && (medicionHabilitada == false) && (dibujoHabilitado == false)){
				//Dos casos diferentes:
				// -A) ya existe la estructura del popup porque esta no es la primera capa que se añade al mapa,
				if (arrayCapasYaAnadidasAPopup.length != 0){
					AnadirGetFeatureInfoWMSAPopup(evt,capaWMSEntrada,fuenteWMSEntrada,"collapse colapsable_popup")
					//Añadir el título de la capa utilizada para controlar que no se vuelve a cargar:
					arrayCapasYaAnadidasAPopup.push(nombreCapaFinal);

				// -B) no existe la estructura del popup porque se trata de la primera capa cargada al mapa:
				} else if (arrayCapasYaAnadidasAPopup.length == 0){
					var pixel = evt.pixel;
					//Vaciar el contenido del popup anterior, y hacerlo desaparecer:
					CerrarPopup();
					//Array para controlar si ya se ha generado el evento en una capa para no repetirla con diferentes DATOS
					arrayCapasYaAnadidasAPopup = [];
					AnadirGetFeatureInfoWMSAPopup(evt,capaWMSEntrada,fuenteWMSEntrada,"collapse show colapsable_popup")
					//Añadir el título de la capa utilizada para controlar que no se vuelve a cargar:
					arrayCapasYaAnadidasAPopup.push(nombreCapaFinal);
				}
			}
		});
	}
}
