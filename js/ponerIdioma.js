//Función CambiarIdioma(lang)
/*
	ENTRADAS:
		lang: idioma seleccionado: 'es' o 'en'.
	FUNCIONALIDAD:
		Función que se ejecuta al pinchar sobre alguno de los botones de cambio de idioma de la barra superior del visualizador.
		Realiza diferentes funciones:
		- Aplica el cambio de idioma a todos los textos preparados para ello (aquellos incluidos en alguna variable dentro de
		la función "PonerIdioma(lang)").
		- Ejecuta las funciones para recargar los menús de temáticas y de nodos (con el nuevo idioma seleccionado).
		- Modifica el estilo del botón de idioma, cambiando también el texto incluido en él.
*/
function CambiarIdioma(lang){
	PonerIdioma(lang);
	CargarTematicas(lang);
	CargarNodos(lang);
	if (lang == 'es'){
		document.getElementById('botonIdioma').setAttribute("onclick", "javascript: CambiarIdioma('en');");
		document.getElementById('en_es').innerHTML = "EN";
	} else if (lang == 'en'){
		document.getElementById('botonIdioma').setAttribute("onclick", "javascript: CambiarIdioma('es');");
		document.getElementById('en_es').innerHTML = "ES";
	}
}

//Variable que guarda el idioma seleccionado:
var idioma = 'es';

// CONTROL DE LOS TEXTOS MOSTRADOS EN LA PÁGINA EN FUNCIÓN DEL IDIOMA
//Variables para guardar textos:
var visualizador = '';
var imago_icono = '';
var botonAnadir = '';
var botonGestion = '';
var escalaNum = '';
var ejemploServicio = '';
var tabCatalogo = '';
var tabFichero = '';
var tabURLServicio = '';
var placeholderLocalizar = '';
var placeholderCargarURL = '';
var seleccionarArchivo = '';
var seleccionarArchivoContexto = '';
var seleccionarTematicas = '';
var seleccionarTematicasCorto = '';
var menuGestion = '';
var menuGestionCorto = '';
var menuBusqueda = '';
var menuBusquedaCorto = '';
var tituloBusqueda = '';
var tituloLeyenda = '';
var arrastreArchivos = '';
var sphEnZip = '';
var geojson = '';
var txtNingunaCapa = '';

var opcionesCapa = '';
var opacidadCapa = '';
var zoomCapa = '';
var infoCapa = '';
var descargarCapa = '';

var noCamposMostrar = '';

//Alertas:
var alertFormatoNoValido = '';
var alertArchivoDemasiadoPesado = '';
var alertNumCapasCargadasMax = '';
var alertCapaYaCargada = '';
var alertURLNoCorrecta = '';

//Tips:
var botonAbrirMenuNodos = '';
var botonCerrarMenuNodos = '';
var botonCerrarMenulateral = '';
var botonAbrirMenulateral = '';
var botonMoverCapa = '';
var botonDesactivarCapa = '';
var botonActivarCapa = '';
var botonOpcionesCapa = '';
var botonLocalizar = '';
var mensajeCerrar = '';
var cambiarMapaBase = '';
var cerrarMapaBase = '';
var abrirLeyenda = '';
var botonCompartir = '';
var botonGithub = '';
var botonAbrirMenuContexto = '';
var botonCerrarMenuContexto = '';
var botonGuardarContexto = '';
var botonCargarContexto = '';
var botonAbrirMenuMedir = '';
var botonCerrarMenuMedir = '';
var botonMedirDistancia = '';
var botonMedirSuperficie = '';
var botonBorrarMedida = '';
var botonAbrirMenuDibujar = '';
var botonCerrarMenuDibujar = '';
var botonDibujarPoint = '';
var botonDibujarLineString = '';
var botonDibujarPolygon = '';
var botonDibujarAnotacion = '';
var botonDibujarNada = '';
var botonBorrarDibujoFeature = '';
var botonDescargarDibujo = '';
var botonBorrarDibujoCompleto = '';

var tipMedirInicio = '';
var tipMedirPoligono = '';
var tipMedirLinea = '';
var tipDibujarInicio = '';
var tipDibujarPunto = '';
var tipDibujarLinea = '';
var tipDibujarPoligono = '';
var tipDibujarAnotacion = '';
var tipDibujarBorrar = '';
var inputEtiqueta = '';

//Enlaces:
var botonCC_BY_SA = '';

//Función PonerIdioma(lang):
// Asigna el texto correspondiente a cada una de las variables creadas, primero en inglés y después en español.
// Después, seleccionada cada elemento del html para actualizar su texto según la variable que le corresponda.
function PonerIdioma(lang){
	idioma = lang;
	if(idioma == 'en'){
		visualizador = '<big>IMAGO ORBIS</big> · <small>Viewer</small>';
		imago_icono = 'Catalogue';
		botonAnadir = "Add";
		botonGestion = "Manage";
		escalaNum = "Scale";
		ejemploServicio = "Valid example link: http://www.idearqueologia.org/idearq/wms?";
		tabCatalogo = 'Search in catalogue';
		tabFichero = 'File';
		tabURLServicio = 'WMS';
		placeholderLocalizar = 'Zoom in to...';
		placeholderCargarURL = 'Url of the service';
		seleccionarArchivo = 'Select a file...';
		seleccionarArchivoContexto = 'Select an XML file...';
		examinarArchivo = 'Explore';
		seleccionarTematicas = 'Select by topic';
		seleccionarTematicasCorto = 'Topics';
		menuGestion = 'Manage loaded layers';
		menuGestionCorto = 'Layers';
		menuBusqueda = 'Add other maps';
		menuBusquedaCorto = 'Other maps';
		tituloLeyenda = 'Legend';
		arrastreArchivos = 'Drag files here ...';
		sphEnZip = 'shp in .zip';
		geojson = '.geojson';
		ningunaCapa = 'Any layer added. Use the menus below.';

		opcionesCapa = 'Layer options';
		opacidadCapa = 'Opacity';
		zoomCapa = 'Zoom to layer';
		infoCapa = 'Layer info';
		descargarCapa = 'Download';

		noCamposMostrar = 'Without values to show';

		alertFormatoNoValido = 'It is not a valid file format (admitted file formats: geojson, shapefile in zip).';
		alertArchivoDemasiadoPesado = 'File is too large (maximum size: ' + Math.round(tamanoMaximoArchivo/1000) + ' kb).';
		alertNumCapasCargadasMax = 'Maximum number of layers loaded reached. Remove any to be able to upload new ones.';
		alertCapaYaCargada = 'Layer already loaded.';
		alertURLNoCorrecta = 'Not a valid URL.';

		botonAbrirMenuNodos = 'Access to nodes';
		botonCerrarMenuNodos = 'Close';
		botonCerrarMenulateral = 'Close';
		botonAbrirMenulateral = 'Display layers';
		botonMoverCapa = 'Move layer';
		botonDesactivarCapa = 'Disable layer';
		botonActivarCapa = 'Enable layer';
		botonOpcionesCapa = 'Layer options';
		botonLocalizar = 'Search by place name';
		mensajeCerrar = 'Close';
		cambiarMapaBase = 'Change background map';
		cerrarMapaBase = 'Close background map menu';
		abrirLeyenda = 'See legend';
		botonCompartir = 'Share';
		botonGithub = 'Github';
		botonAbrirMenuContexto = 'Load/Save map';
		botonCerrarMenuContexto = 'Close';
		botonGuardarContexto = 'Save map';
		botonCargarContexto = 'Load map';
		botonAbrirMenuMedir = 'Measurement tools';
		botonCerrarMenuMedir = 'Close';
		botonMedirDistancia = 'Measure distance';
		botonMedirSuperficie = 'Measure area';
		botonBorrarMedida = 'Delete all measurements';
		botonAbrirMenuDibujar = 'Drawing tools';
		botonCerrarMenuDibujar = 'Close';
		botonDibujarPoint = 'Draw points';
		botonDibujarLineString = 'Draw lines';
		botonDibujarPolygon = 'Draw polygons';
		botonDibujarAnotacion = 'Add annotations';
		botonDibujarNada = 'Cancel';
		botonBorrarDibujoFeature = 'Delete selection';
		botonDescargarDibujo = 'Download drawing';
		botonBorrarDibujoCompleto = 'Delete complete drawing';

		tipMedirInicio = 'Click to start measuring';
		tipMedirPoligono = 'Click to add a point. Double click to end';
		tipMedirLinea = 'Click to add a line. Double click to end.';
		tipDibujarInicio = 'Click to start drawing';
		tipDibujarPunto = 'Click to add a point.';
		tipDibujarLinea = 'Click to add a point. Double click to finish line.';
		tipDibujarPoligono = 'Click to add a point. Double click to finish polygon.';
		tipDibujarAnotacion = 'Click to add an annotation.';
		tipDibujarBorrar = 'Double click to remove feature.';
		inputEtiqueta = 'Label';

		botonCC_BY_SA = "window.open('https://creativecommons.org/licenses/by-nc-sa/4.0/')";

		//"Examinar"/"Explore" en las barras de carga de archivos:
		$('.txt_seleccionar_archivo_es').addClass('txt_seleccionar_archivo_en');
		$('.txt_seleccionar_archivo_es').removeClass('txt_seleccionar_archivo_es');

	} else {
		visualizador = '<big>IMAGO ORBIS</big> · <small>Visualizador</small>';
		imago_icono = 'Catálogo';
		botonAnadir = "Añadir";
		botonGestion = "Gestionar";
		escalaNum = "Escala";
		ejemploServicio = "Enlace de ejemplo válido: http://www.idearqueologia.org/idearq/wms?";
		tabCatalogo = 'Búsqueda en catálogo';
		tabFichero = 'Archivo';
		tabURLServicio = 'WMS';
		placeholderLocalizar = 'Centrar mapa en...';
		placeholderCargarURL = 'Dirección url del servicio';
		seleccionarArchivo = 'Seleccionar archivo...';
		seleccionarArchivoContexto = 'Seleccionar archivo XML...';
		examinarArchivo = 'Examinar';
		seleccionarTematicas = 'Seleccionar por temática';
		seleccionarTematicasCorto = 'Temáticas';
		menuGestion = 'Gestionar capas cargadas';
		menuGestionCorto = 'Capas';
		menuBusqueda = 'Añadir otros mapas';
		menuBusquedaCorto = 'Otros mapas';
		tituloLeyenda = 'Leyenda';
		arrastreArchivos = 'Arrastre los archivos aquí...';
		sphEnZip = 'shp en .zip';
		geojson = '.geojson';
		ningunaCapa = 'Ninguna capa añadida. Utilice los menús inferiores.';

		opcionesCapa = 'Opciones de capa';
		opacidadCapa = 'Opacidad';
		zoomCapa = 'Zoom a la capa';
		infoCapa = 'Info de la capa';
		descargarCapa = 'Descargar';

		noCamposMostrar = 'Sin datos para mostrar';

		alertFormatoNoValido = 'No es un formato de archivo válido (formatos admitidos: geojson, shapefile en zip).';
		alertArchivoDemasiadoPesado = 'Archivo demasiado grande (tamaño máximo permitido: ' + Math.round(tamanoMaximoArchivo/1000) + ' kb).';
		alertNumCapasCargadasMax = 'Número máximo de capas cargadas alcanzado. Elimine alguna para poder cargar nuevas.';
		alertCapaYaCargada = 'Capa ya cargada.';
		alertURLNoCorrecta = 'No es una url correcta.';

		botonAbrirMenuNodos = 'Acceso a nodos';
		botonCerrarMenuNodos = 'Cerrar';
		botonCerrarMenulateral = 'Cerrar';
		botonAbrirMenulateral = 'Desplegar capas';
		botonMoverCapa = 'Mover capa';
		botonDesactivarCapa = 'Desactivar capa';
		botonActivarCapa = 'Activar capa';
		botonOpcionesCapa = 'Opciones de capa';
		botonLocalizar = 'Buscar topónimo';
		mensajeCerrar = 'Cerrar';
		cambiarMapaBase = 'Cambiar mapa de fondo';
		cerrarMapaBase = 'Cerrar menú de mapa de fondo';
		abrirLeyenda = 'Mostrar leyenda';
		botonCompartir = 'Compartir';
		botonGithub = 'Github';
		botonAbrirMenuContexto = 'Guardar/Cargar mapa';
		botonCerrarMenuContexto = 'Cerrar';
		botonGuardarContexto = 'Guardar mapa';
		botonCargarContexto = 'Cargar mapa';
		botonAbrirMenuMedir = 'Herramientas de medición';
		botonCerrarMenuMedir = 'Cerrar';
		botonMedirDistancia = 'Medir distancia';
		botonMedirSuperficie = 'Medir área';
		botonBorrarMedida = 'Borrar todas las medidas';
		botonAbrirMenuDibujar = 'Herramientas de dibujo';
		botonCerrarMenuDibujar = 'Cerrar';
		botonDibujarPoint = 'Dibujar puntos';
		botonDibujarLineString = 'Dibujar líneas';
		botonDibujarPolygon = 'Dibujar polígonos';
		botonDibujarAnotacion = 'Añadir anotaciones';
		botonDibujarNada = 'Cancelar';
		botonBorrarDibujoFeature = 'Borrar selección';
		botonDescargarDibujo = 'Descargar dibujo';
		botonBorrarDibujoCompleto = 'Borrar dibujo completo';

		tipMedirInicio = 'Click para empezar a medir';
		tipMedirPoligono = 'Click para añadir vértice. Doble click para terminar.';
	  tipMedirLinea = 'Click para añadir línea. Doble click para terminar.';
		tipDibujarInicio = 'Click para empezar a dibujar';
		tipDibujarPunto = 'Click para añadir punto.';
		tipDibujarLinea = 'Click para añadir vértice. Doble click para terminar línea.';
		tipDibujarPoligono = 'Click para añadir vértice. Doble click para terminar polígono.';
		tipDibujarAnotacion = 'Click para añadir anotación.';
		tipDibujarBorrar = 'Doble click para borrar feature.';
		inputEtiqueta = 'Etiqueta';

		botonCC_BY_SA = "window.open('https://creativecommons.org/licenses/by-nc-sa/3.0/es/')";

		//"Examinar"/"Explore" en las barras de carga de archivos:
		$('.txt_seleccionar_archivo_en').addClass('txt_seleccionar_archivo_es');
		$('.txt_seleccionar_archivo_en').removeClass('txt_seleccionar_archivo_en');
	}

	//Aquí se cambia el contenido de los diferentes textos:
	$('#txtVisualizador').html(visualizador);
	$('#txtImagoIcono').html(imago_icono);
	$('#txtBotonAnadir').html(botonAnadir);
	$('#txtBotonGestion').html(botonGestion);
	$('#txtEscalaNum').html(escalaNum);
	$('#txtEjemploServicio').html(ejemploServicio);
	$('#txtTabCatalogo').html(tabCatalogo);
	$('#txtTabFichero').html(tabFichero);
	$('#txtTabURLServicio').html(tabURLServicio);
	$('#localizar').attr("placeholder",placeholderLocalizar);
	$('#cargarURL').attr("placeholder",placeholderCargarURL);
	$('#txtSeleccionarArchivo').html(seleccionarArchivo);
	$('#txtSeleccionarArchivoContexto').html(seleccionarArchivoContexto);
	$('#txtSeleccionarTematicas').html(seleccionarTematicas);
	$('#txtSeleccionarTematicasCorto').html(seleccionarTematicasCorto);
	$('#txtMenuGestion').html(menuGestion);
	$('#txtMenuGestionCorto').html(menuGestionCorto);
	$('#txtMenuBusqueda').html(menuBusqueda);
	$('#txtMenuBusquedaCorto').html(menuBusquedaCorto);
	$('#txtTituloLeyenda').html(tituloLeyenda);
	$('#txtArrastreArchivos').html(arrastreArchivos);
	$('#txtSphEnZip').html(sphEnZip);
	$('#txtGeojson').html(geojson);
	$('#txtNingunaCapa').html(ningunaCapa);

	$("[id*=cruz_cerrar_]").html("<div class='row m-0 p-0 justify-content-between'><div class='col-auto m-0 p-0'><p class='m-0 p-0'>" + opcionesCapa + "</p></div><div class='col-auto m-0 p-0' style='cursor:pointer;' title=" + mensajeCerrar + "><i class='fas fa-times m-0 p-0 mr-2'></i></div></div>");
	$("[id*=control_opac_]").html(opacidadCapa);
	$("[id*=control_zoom_]").html(zoomCapa);
	$("[id*=info_capa_]").html(infoCapa);
	$("[id*=descargar_]").html(descargarCapa);

	$("[id*=noCamposMostrar_]").html(noCamposMostrar);

	$('#abrirMenuNodos').attr('title',botonAbrirMenuNodos);
	$('#cerrarMenuNodos').attr('title',botonCerrarMenuNodos);
	$('#cerrarMenulateral').attr('title',botonCerrarMenulateral);
	$('#abrirMenulateral').attr('title',botonAbrirMenulateral);
	$('.boton_mover_capa').attr('title',botonMoverCapa);
	$('.boton_desactivar_capa').attr('title',botonDesactivarCapa);
	$('.boton_activar_capa').attr('title',botonActivarCapa);
	$('.boton_opciones_capa').attr('title',botonOpcionesCapa);

	$('#btnLocalizar').attr('title',botonLocalizar);
	$('#cruzTituloLeyenda').attr('title',mensajeCerrar);
	$('#btnAbrirMapaBase').attr('title',cambiarMapaBase);
	$('#btnCerrarMapaBase').attr('title',cerrarMapaBase);
	$('#btnAbrirLeyenda').attr('title',abrirLeyenda);
	$('#btnCompartir').attr('title',botonCompartir);
	$('#btnGithub').attr('title',botonGithub);
	$('#btnAbrirMenuContexto').attr('title',botonAbrirMenuContexto);
	$('#btnCerrarMenuContexto').attr('title',botonCerrarMenuContexto);
	$('#btnGuardarContexto').attr('title',botonGuardarContexto);
	$('#btnCargarContexto').attr('title',botonCargarContexto);
	$('#btnAbrirMenuMedir').attr('title',botonAbrirMenuMedir);
	$('#btnCerrarMenuMedir').attr('title',botonCerrarMenuMedir);
	$('#btnMedirDistancia').attr('title',botonMedirDistancia);
	$('#btnMedirSuperficie').attr('title',botonMedirSuperficie);
	$('#btnBorrarMedida').attr('title',botonBorrarMedida);
	$('#btnAbrirMenuDibujar').attr('title',botonAbrirMenuDibujar);
	$('#btnCerrarMenuDibujar').attr('title',botonCerrarMenuDibujar);
	$('#btnDibujarPoint').attr('title',botonDibujarPoint);
	$('#btnDibujarLineString').attr('title',botonDibujarLineString);
	$('#btnDibujarPolygon').attr('title',botonDibujarPolygon);
	$('#btnDibujarAnotacion').attr('title',botonDibujarAnotacion);
	$('#btnDibujarNada').attr('title',botonDibujarNada);
	$('#btnBorrarDibujoFeature').attr('title',botonBorrarDibujoFeature);
	$('#btnDescargarDibujo').attr('title',botonDescargarDibujo);
	$('#btnBorrarDibujoCompleto').attr('title',botonBorrarDibujoCompleto);

	$('#btnCC_BY_SA').attr('onclick',botonCC_BY_SA);
}
