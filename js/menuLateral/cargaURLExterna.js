//FUNCIÓN CargarURLServicio(urlEntrada)
/*
ENTRADAS:
  urlEntrada: url del servicio WMS del cual se quieren conocer las capas (hasta la ?).
FUNCIONALIDAD:
  Hace una petición GetCapabilities al servicio indicado, para obtener información de las capas que contiene.
	Después, crea una lista con esas capas, y añade la funcionalidad de cargar cada una de ellas al hacer click sobre el elemento correspondiente de la lista.
SALIDA:
	arrayCapasServicioWMS: array de objetos con la información de las capas.
*/
function CargarURLServicio(urlEntrada) {
	//Hacer petición getCapabilities:
	var parser = new ol.format.WMSCapabilities();
	//Es necesario introducir la url hasta la "?" incluida.
	//Si se ha introducido la dirección más larga de lo necesario (hasta la ?); entonces se recorta:
  if (urlEntrada.indexOf('?') != -1){
		urlDefinitiva = urlEntrada.substring(0,urlEntrada.indexOf('?')) + '?';
		//Se añaden los parámetros de la petición:
		var url_capabilities =  urlDefinitiva + 'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';
		//Se realiza la petición:
		$.ajax({
				url: url_capabilities
		}).done(function(text) {
  		// CASO 1. ÉXITO EN LA RESPUESTA AL GETCAPABILITIES: crea un array con las capas WMS del servicio consultado:
      var result = parser.read(text);

  		arrayCapasServicioWMS = [];

  		for (var i=0; i<result.Capability.Layer.Layer.length; i++) {
  			var Capai = {};
  			Capai.id = result.Capability.Layer.Layer[i].Name;
  			Capai.nombre = result.Capability.Layer.Layer[i].Title;
  			Capai.servicio = urlDefinitiva;
  			arrayCapasServicioWMS.push(Capai);
  		}
			//console.log(result);
			//Vaciar el div antes de cargar el listado de capas WMS disponibles:
  		$("[id*=lista_capas_a_cargar_URL_externa]").remove();
      $("[id*=textoEjemploServicio]").remove();
			//Crear el listado de capas, con la funcionalidad de cargar la capa WMS al hacer click sobre el respectivo elemento de la lista.
			//Para ello, se recorre el array creado anteriormente, extrayendo la información necesaria de cada capa:
			var listaCapasACargar = $("<ul>").addClass("list-group m-0 p-0").attr("id","lista_capas_a_cargar_URL_externa").css({'position':'relative','z-index':'20000','width':'100%'}).appendTo("#espBusquedaURLExterna");
      for (var i=0; i<arrayCapasServicioWMS.length; i++){
        var capaServicioWMSi = document.createElement("a");
        capaServicioWMSi.innerHTML = '<li>' + arrayCapasServicioWMS[i].nombre + '</li>';
				//Primero se intenta cargar la capa por el campo id (Name); y si no lo tiene, por el campo nombre (Title):
				if (arrayCapasServicioWMS[i].id){
        	capaServicioWMSi.setAttribute("href","javascript:CargarCapa('wms','" + arrayCapasServicioWMS[i].id + "','" + arrayCapasServicioWMS[i].servicio + "','menuBusqueda','','','','','','',1);");
				} else if (arrayCapasServicioWMS[i].nombre){
					capaServicioWMSi.setAttribute("href","javascript:CargarCapa('wms','" + arrayCapasServicioWMS[i].nombre + "','" + arrayCapasServicioWMS[i].servicio + "','menuBusqueda','','','','','','',1);");
				} else {
					alert("No es posible cargar esta capa");
				}
				capaServicioWMSi.setAttribute("class","list-group-item lista_capas_catalogo m-0 p-2");
        capaServicioWMSi.setAttribute("style","list-style:none;");
				//Se añade la capa a la lista:
        document.getElementById("lista_capas_a_cargar_URL_externa").appendChild(capaServicioWMSi);
      }
  	})
  } else {
    alert(alertURLNoCorrecta);
  }
}

//Al iniciar una nueva búsqueda, se borra el resultado de la anterior o los ejemplos mostrados al inicio:
function VaciarListaCapas() {
	$("[id*=lista_capas_a_cargar_URL_externa]").remove();
  document.getElementById("txtEjemploServicio").style.display = "none";
}
