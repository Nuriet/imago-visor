// --- FUNCIONAMIENTO DE LA PETICIÓN GETRECORDS AL CATÁLOGO --- //

//Variable "cswConfig", que carga todos los esquemas necesarios y se utiliza después para crear la variable "csw".
//REQUERIMIENTOS: disponer de los archivos existentes en las carpetas "src" y "node_modules"
var cswConfig = [
  [
    OWS_1_0_0,
    DC_1_1,
    DCT,
    XLink_1_0,
    SMIL_2_0,
    SMIL_2_0_Language,
    GML_3_1_1,
    Filter_1_1_0,
    CSW_2_0_2,
 // GML_3_2_0,
    GML_3_2_1,
    ISO19139_GCO_20070417,
    ISO19139_GMD_20070417,
    ISO19139_GMX_20070417,
    ISO19139_GSS_20070417,
    ISO19139_GTS_20070417,
    ISO19139_GSR_20070417,
 // ISO19139_2_GMI_1_0
  ],
  {
    namespacePrefixes: {
		    "http://www.opengis.net/cat/csw/2.0.2": "csw",
        "http://www.opengis.net/ogc": 'ogc',
   //   "http://www.opengis.net/gml": "gml",
   //   "http://purl.org/dc/elements/1.1/":"dc",
   //   "http://purl.org/dc/terms/":"dct",
   //   "http://www.isotc211.org/2005/gmd" : "gmd",
   //   "http://www.isotc211.org/2005/gco" : "gco",
   //   "http://www.isotc211.org/2005/gmi" : "gmi"
    },
  mappingStyle : 'simplified'
  }
];

//Función para obtener un xml a partir de una url; necesaria después:
function getXML(url){
    return Ows4js.Util.httpGet(url).responseXML;
}

//CREACIÓN DE LA VARIABLE "csw", CON EL CATÁLOGO A CONSULTAR
var csw = new Ows4js.Csw('http://161.111.72.7:8080/geonetwork/srv/spa/csw?SERVICE=CSW&VERSION=2.0.2', cswConfig);

//FUNCIÓN GetRecords() PARA REALIZAR LA PETICIÓN
/*
REQUERIMIENTOS:
	- Haber cargado anteriormente la variable csw, con la variable cswConfig y todos los archivos necesarios para ello.
FUNCIONALIDAD:
	Esta función realiza la operación getrecords sobre el servicio csw indicado anteriormente en la variable csw (el servicio
		completo o algún servicio virtual), filtrando el resultado, ofreciendo los metadatos de los servicios y de los datasets existentes.
	Por último, con el número de resultados, el filtro y el esquema de salida, se ejecuta la petición, con una función anidada, a
		partir del método "csw.GetRecords".
*/

function GetRecords(){
  //Filtro (actualmente sin aplicar ningún criterio):
  var filter = new Ows4js.Filter().PropertyName(['ogc:type']).isLike('');

  //Esquema de salida:
	//var output_schema = "http://www.opengis.net/cat/csw/2.0.2";
	var output_schema = "http://www.isotc211.org/2005/gmd";

  //PETICIÓN csw.GetRecords(inicio,final,filtro,esquema_de_salida) AL CATÁLOGO:
  /*
  ENTRADAS:
   - inicio: posición del primer elemento del que se quieren obtener metadatos. Salvo excepciones, será siempre 1.
   - final: posición del último elemento del que se quieren obtener metadatos. Limita el número máximo de elementos a leer.
   - filtro: conforme a Ows4js, filtro que se aplicará a la búsqueda de metadatos en el catálogo.
   - esquema de salida: por defecto: http://www.isotc211.org/2005/gmd.
  */
	csw.GetRecords(1,100,filter,output_schema).then(function(result){
		//Convertir a JSON la respuesta en xml, utilizando la función xmlToJSON, albergada en el archivo xmltojson.js
		var result_json = xmlToJSON.parseXML(result);
    // FUNCIÓN CrearArrayBusquedaCatalogo(result)
    /*
    FUNCIONALIDAD:
      Extrae, a partir del resultado en JSON de la petición GetRecords, los campos necesarios según el caso del que se trate:
       - Servicio.
       - Dataset.
       - Series (no implementado).
    ENTRADAS:
      - result: JSON con el resultado obtenido de la petición GetRecords al catálogo.
    SALIDAS:
      - arrayResultadoCatalogo: ARRAY con un objeto por cada registro del catálogo, con la información de interés extraída.
    */
      function CrearArrayBusquedaCatalogo(result){
      	//OBTENER LA INFORMACIÓN DEL CAMPO A BUSCAR:
      	var elementos = result.GetRecordsResponse[0].SearchResults[0].MD_Metadata; //Creo el array "elementos", que contiene los registros encontrados por la petición.
        var numElementos = result.GetRecordsResponse[0].SearchResults[0].MD_Metadata.length; //Creo la variable "num_elementos" obteniendo el numero de registros devueltos por la petición.
      	var arrayResultadoCatalogo = []; //Creo el array que contendrá los resultados de la búsqueda.

      	//BUCLE para extraer la información de interés de cada objeto de metadatos:
      	for (var i=0; i<numElementos; i++) {
          //1º Tipo de elemento: DATASET, SERVICE o SERIES (los tres admitidos por INSPIRE):
          var tipoElementoi = "";
          if (elementos[i].hierarchyLevel){
            tipoElementoi = elementos[i].hierarchyLevel[0].MD_ScopeCode[0]._attr.codeListValue._value;
          } else if (elementos[i].dataQualityInfo) {
            tipoElementoi = elementos[i].dataQualityInfo[0].DQ_DataQuality[0].scope[0].DQ_Scope[0].level[0].MD_ScopeCode[0]._attr.codeListValue._value;
          }

          //2º Definición vacía de los campos de interés a extraer:
          var tituloElementoI = "";
          var urlElementoIOriginal = "";
          var urlElementoIDefinitiva = "";
          var keywordsElementoI = [];
          var capaElementoI = "";

          //3º Extracción de información para completar las variables anteriores:
          //3º.1) Si se tiene un SERVICIO:
          if (tipoElementoi == "service"){
            //Añadir el campo "titulo" al elemento:
            if (elementos[i].identificationInfo[0].SV_ServiceIdentification[0].citation[0].CI_Citation[0].title[0].CharacterString[0]._text){
              tituloElementoI = elementos[i].identificationInfo[0].SV_ServiceIdentification[0].citation[0].CI_Citation[0].title[0].CharacterString[0]._text; //Entra en el array del campo a buscar en cada registro.
            } else {
              tituloElementoI = "Sin título";
            }

            //Añadir el array de keywords de cada elemento:
            if (elementos[i].identificationInfo[0].SV_ServiceIdentification[0].descriptiveKeywords){
              var numKeywordsElementoI = elementos[i].identificationInfo[0].SV_ServiceIdentification[0].descriptiveKeywords[0].MD_Keywords[0].keyword.length //Número de keywords del elemento i
              for (var j=0; j<numKeywordsElementoI; j++){
                var keywordJElementoI = elementos[i].identificationInfo[0].SV_ServiceIdentification[0].descriptiveKeywords[0].MD_Keywords[0].keyword[j].CharacterString[0]._text; //Entra en el array del campo a buscar en cada registro.
        		    if (typeof(keywordJElementoI) != "undefined") { //Primero comprueba si, dentro del registro i, existe el campo a buscar.
        			    keywordsElementoI.push(keywordJElementoI);
        		    }
              }
            } else {
              keywordsElementoI = [];
            }

            //Añadir la url del servicio:
            if (elementos[i].distributionInfo){
              urlElementoIOriginal = elementos[i].distributionInfo[0].MD_Distribution[0].transferOptions[0].MD_DigitalTransferOptions[0].onLine[0].CI_OnlineResource[0].linkage[0].URL[0]._text;
            } else {
              urlElementoIOriginal = "";
            }

            //Acortarla hasta donde se encuentre el '?':
            if (urlElementoIOriginal){
              urlElementoIDefinitiva = urlElementoIOriginal.substring(0,urlElementoIOriginal.indexOf('?')) + '?';
            } else {
              urlElementoIDefinitiva = "";
            }

            //Dejar vacío el campo "capa":
            capaElementoI = "";

          //3º.2) Si se tiene un DATASET:
          } else if (tipoElementoi == "dataset"){
            //Añadir el campo "titulo" al elemento:
            if (elementos[i].identificationInfo[0].MD_DataIdentification[0].citation[0].CI_Citation[0].title[0].CharacterString[0]._text){
              tituloElementoI = elementos[i].identificationInfo[0].MD_DataIdentification[0].citation[0].CI_Citation[0].title[0].CharacterString[0]._text; //Entra en el array del campo a buscar en cada registro.
            } else {
              tituloElementoI = "Sin título";
            }

            //Añadir el array de keywords de cada elemento:
            if (elementos[i].identificationInfo[0].MD_DataIdentification[0].descriptiveKeywords){
              var numKeywordsElementoI = elementos[i].identificationInfo[0].MD_DataIdentification[0].descriptiveKeywords[0].MD_Keywords[0].keyword.length //Número de keywords del elemento i
              for (var j=0; j<numKeywordsElementoI; j++){
                var keywordJElementoI = elementos[i].identificationInfo[0].MD_DataIdentification[0].descriptiveKeywords[0].MD_Keywords[0].keyword[j].CharacterString[0]._text; //Entra en el array del campo a buscar en cada registro.
        		    if (typeof(keywordJElementoI) != "undefined") { //Primero comprueba si, dentro del registro i, existe el campo a buscar.
        			    keywordsElementoI.push(keywordJElementoI);
        		    }
              }
            } else {
              keywordsElementoI = [];
            }

            //Añadir la url del servicio al que pertenece el dataset:
            if (elementos[i].distributionInfo[0].MD_Distribution[0].transferOptions[0].MD_DigitalTransferOptions){
              if (elementos[i].distributionInfo[0].MD_Distribution[0].transferOptions[0].MD_DigitalTransferOptions[0].onLine){
                urlElementoIOriginal = elementos[i].distributionInfo[0].MD_Distribution[0].transferOptions[0].MD_DigitalTransferOptions[0].onLine[0].CI_OnlineResource[0].linkage[0].URL[0]._text;
              }
            } else {
              urlElementoIOriginal = "";
            }

            //Acortarla hasta donde se encuentre el '?':
            if (urlElementoIOriginal){
              urlElementoIDefinitiva = urlElementoIOriginal.substring(0,urlElementoIOriginal.indexOf('?')) + '?';
            } else {
              urlElementoIDefinitiva = "";
            }

            //Añadir el id de la capa concreta (dentro del servicio):
            if (elementos[i].identificationInfo[0].MD_DataIdentification[0].citation[0].CI_Citation[0].identifier[0].RS_Identifier[0].code[0].CharacterString[0]._text){
              capaElementoI = elementos[i].identificationInfo[0].MD_DataIdentification[0].citation[0].CI_Citation[0].identifier[0].RS_Identifier[0].code[0].CharacterString[0]._text;
            } else {
              capaElementoI = "";
            }

          //3º.3) Si se tiene un SERIES:
        } else if (tipoElementoi == "series"){
          //CASO DE HARVESTING: NO CONTEMPLADO
          }

        //4º Se añade la información extraída en el paso 3 al objeto creado para la info de cada elemento:
      	var elementoCatalogoI = {}; //Objeto vacío de cada nuevo elemento a añadir al array final.
        if (typeof(tipoElementoi) != "undefined") { //Primero comprueba si, dentro del registro i, existe el campo a buscar.
      		elementoCatalogoI.tipo = tipoElementoi;
      	}
        if (typeof(tituloElementoI) != "undefined") { //Primero comprueba si, dentro del registro i, existe el campo a buscar.
      		elementoCatalogoI.text = tituloElementoI;
      	}
        if (typeof(keywordsElementoI) != "undefined") { //Primero comprueba si, dentro del registro i, existe el campo a buscar.
      		elementoCatalogoI.keywords = keywordsElementoI;
      	}
        if (typeof(urlElementoIDefinitiva) != "undefined") { //Primero comprueba si, dentro del registro i, existe el campo a buscar.
      		elementoCatalogoI.url = urlElementoIDefinitiva;
      	}
        if (typeof(capaElementoI) != "undefined") { //Primero comprueba si, dentro del registro i, existe el campo a buscar.
      		elementoCatalogoI.capa = capaElementoI;
      	}

      	//5º Añadir el identificador único de cada elemento:
      	var idElementoI = elementos[i].fileIdentifier[0].CharacterString[0]._text;
      	if (typeof(idElementoI) != "undefined") { //Primero comprueba si, dentro del registro i, existe el campo a buscar.
      		elementoCatalogoI.id = idElementoI;
      	}

        //Añado el objeto creado para el elemento i al array de resultados:
      	arrayResultadoCatalogo.push(elementoCatalogoI);
    	}
      return arrayResultadoCatalogo;
    };

    //FUNCIÓN stripDiacritics(text):
    /*
    FUNCIONALIDAD:
      Elimina caractéres extraños para permitir la búsqueda con la FuncionEmparejadora() de más abajo.
      Se adaptó al idioma español.
    */
    function stripDiacritics(text) {
      var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
      var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
      for (var i=0; i<acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
      }
      return text;
    }

    //FUNCIÓN FuncionEmparejadora(params, data):
    /*
    FUNCIONALIDAD:
      Permite filtrar el resultado al escribir búsquedas en la barra del catálogo.
      En un inicio, sólo buscaba coincidencias entre lo escrito y el título del registro.
      Posteriormente se añadió la funcionalidad de buscar coincidencias también con todas las keywords existentes en cada registro.
    */
    function FuncionEmparejadora(params, data) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return data;
      }
      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);
        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];
          var matches = matcher(params, child);
          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }
        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }
        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // PARTE MODIFICADA PARA BUSCAR TAMBIÉN EN LAS PALABRAS CLAVE de cada REGISTRO:
      if (data.keywords != undefined){
        var originalPalabrasClave = data.keywords;
        var originalPalabrasClaveLon = originalPalabrasClave.length;
        for (var i=0; i<originalPalabrasClaveLon; i++){
          originalPalabrasClaveI = stripDiacritics(originalPalabrasClave[i]).toUpperCase();
          if (originalPalabrasClaveI.indexOf(term) > -1) {
            return data;
          }
        }
      }
      return null;
    }

    //CREACIÓN DE LA BARRA DE BÚSQUEDA EN TODO EL CATÁLOGO
    /*
    REQUERIMIENTOS:
      - Llamar a los archivos js y css de Select2 (se hace en el index.html).
    FUNCIONALIDAD:
      Utiliza el array creado con la función CrearArrayBusquedaCatalogo(result_json) (arriba) como datos;
      y también la FuncionEmparejadora para configurar las búsquedas.
    */
    $("#selCatalogo").select2({
      data: CrearArrayBusquedaCatalogo(result_json),
      placeholder: 'Seleccione un registro',
      allowClear: true,
      theme: "bootstrap",
      width: '100%',
      matcher: FuncionEmparejadora,
      closeOnSelect: true,
      dropdownParent: $('#espBusquedaCatalogo')
    })

    //Cada vez que se inicia una nueva búsqueda, se borra el resultado que apareció si anteriormente se seleccionó un servicio:
    $('#selCatalogo').on('select2:open',function(){
      $("[id*=lista_capas_a_cargar_busqueda_catalogo]").remove();
    });

    //Al seleccionar un resultado: diferente funcionalidad según el tipo de metadato:
    // - Si es un servicio: se ejecuta la función "ConsultarCapasWMS(...)" para realizar una petición GetCapabilities y obtener las capas contenidas en el servicio.
    // - Si es un dataset: se ejecuta la función "CargarCapa(...)" para añadir al mapa el dataset seleccionado.
    $('#selCatalogo').on('select2:select',function(){
      if ($("#selCatalogo").select2('data')[0].tipo == "service"){
        servicioWMSACargar = $("#selCatalogo").select2('data')[0];
        ConsultarCapasWMS(servicioWMSACargar.url);
      } else if ($("#selCatalogo").select2('data')[0].tipo == "dataset"){
        capaWMSACargar = $("#selCatalogo").select2('data')[0];
        CargarCapa('wms',capaWMSACargar.capa,capaWMSACargar.url,'menuBusqueda','','','','','','',1,'');
      }
    });
  });
};

//FUNCIÓN ConsultarCapasWMS(urlEntrada)
/*
ENTRADAS:
  urlEntrada: url del servicio WMS del cual se quieren conocer las capas (hasta la ?).
FUNCIONALIDAD:
  Hace una petición GetCapabilities al servicio indicado, para obtener información de las capas que contiene
SALIDA:
	arrayCapasServicioWMS: array de objetos con la información de las capas.
*/
function ConsultarCapasWMS(urlEntrada) {
  //Hacer petición getCapabilities:
  var parser = new ol.format.WMSCapabilities();
  // La url de entrada se debe recortar a partir del caracter 7º, para quitar "http://":
  var urlEntradaParaCapabilities = urlEntrada.slice(7);
  //Se añaden los parámetros de la petición:
  var url_capabilities = urlEntrada + 'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';
  //Se realiza la petición:
  $.ajax({
    url: url_capabilities
  }).done(function(text) {
		// CASO 1. ÉXITO EN LA RESPUESTA AL GETCAPABILITIES: crea la capa con extent:
    var result = parser.read(text);
		arrayCapasServicioWMS = [];
		for (var i=0; i<result.Capability.Layer.Layer.length; i++) {
			var Capai = {};
			Capai.id = result.Capability.Layer.Layer[i].Name;
			Capai.nombre = result.Capability.Layer.Layer[i].Title;
			Capai.servicio = urlEntrada;
			arrayCapasServicioWMS.push(Capai);
		}
    //Crear la lista con las capas contenidas en dicho servicio WMS:
    var listaCapasACargar = $("<ul>").addClass("list-group m-0 p-0").attr("id","lista_capas_a_cargar_busqueda_catalogo").css({'position':'relative','z-index':'20000','width':'100%'}).appendTo("#espBusquedaCatalogo");
    //Crear un elemento en la lista por cada capa encontrada, añadiendo la funcionalidad de que al hacer click sobre estos elementos,
    //se ejecuta la función "CargarCapa(...)" para añadir esa capa al mapa:
    for (var i=0; i<arrayCapasServicioWMS.length; i++){
      var capaServicioWMSi = document.createElement("a");
      capaServicioWMSi.innerHTML = '<li>' + arrayCapasServicioWMS[i].nombre + '</li>';
      capaServicioWMSi.setAttribute("href","javascript:CargarCapa('wms','" + arrayCapasServicioWMS[i].id + "','" + arrayCapasServicioWMS[i].servicio + "','menuBusqueda','','','','','','',1,'');");
      capaServicioWMSi.setAttribute("class","list-group-item lista_capas_catalogo m-0 p-2");
      capaServicioWMSi.setAttribute("style","list-style:none;");
      document.getElementById("lista_capas_a_cargar_busqueda_catalogo").appendChild(capaServicioWMSi);
    }
	})
}
