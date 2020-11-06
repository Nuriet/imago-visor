//Variables necesarias para el funcionamiento de la función siguiente:
var featuresCargadas = {};
var fuenteVector = {};

//FUNCIÓN AnadirGeojsonPropio(idEntrada,rutaEntrada,tituloEntrada,abstractEntrada,tipoLeyenda,infoEstilo,rutaDescarga,opacidadEntrada,hacerZoom,queryableEntrada)
/*
ENTRADAS: son todo propiedades del objeto que se ha utilizado para crear el cuadrado correspondiente a la capa en el menú lateral de temáticas (archivo arrayTematicas.js):
  idEntrada: el id de la capa. Identificador único construido cumpliendo las reglas establecidas.
  rutaEntrada: la ruta al objeto GEOJSON concreto.
  tituloEntrada: el título a disponer en el menú de gestión de capas, en la leyenda, en el popup...
  abstractEntrada: el resumen que aparecerá al hacer click en el botón "Info de la capa" del menú de opciones de capa.
  tipoLeyenda: "imagen" si procede de un archivo .jpg o "vectorial", si se tiene que crear dinámicamente con esta función.
  infoEstilo: campo que contiene información para generar la representación de la capa y, por tanto, la leyenda; dinámicamente en esta función.
  rutaDescarga: ruta de descarga de los datos de la capa. Si no tiene, estará vacío y no se creará la opción de descargar en el menú de gestión de capas.
  opacidadEntrada: opacidad (en tanto por uno), con la que se tiene que dibujar la capa.
  hacerZoom: variable que indica si hay que hacer zoom a la capa tras cargarla ('true') o no ('false').
  queryableEntrada: variable que indica si la capa permite las consultas (aparecen popups con información) o no.

FUNCIONAMIENTO:
  1º Se carga el geojson que se especifica en la variable de entrada "rutaEntrada", y se crea la fuente de la capa vectorial con ello.
  2º Se crean los estilos correspondientes a los datos cargados; distinguiéndose aquí dos casos (en función del valor de la variable de entrada "tipoLeyenda"):
      - 1)	El formato de la capa (rellenos, líneas) se especifica dentro de esta función ("CAPAS COMPLEJAS"); la leyenda de la capa es una imagen .JPG:
              Variable "estiloDefinidoAqui".
      - 2)	El formato de la capa se especifica en el propio objeto de creación del cuadrado ("CAPAS SIMPLES"), dentro del array de capas; y entonces la leyenda es vectorial y se crea dinámicamente:
              Variable "estiloDefinidoEnArrayTematicas".
  3º Se asigna uno de los estilos creados en el paso anterior a cada feature a dibujar, en función del valor del campo concreto del Geojson que en cada caso se utilice para la representación.
              Función "FuncionEstilo()".
  4º Se crea la capa vectorial a cargar al mapa, distinguiendo entre los dos casos mencionados.
  5º Tras ajustar la opacidad, se añade la capa creada al mapa, y se llama a las funciones correspondientes para:
        - Añadir la capa a la leyenda:
              Función "AñadirALeyenda(capaVectorialEntrada,'geojson_propio)"
        - Añadir la capa al menú de gestión de capas:
              Función "AnadirAGestionCapas(capaVectorialEntrada,'geojson')"
        - Hacer zoom al extent de la nueva capa vectorial cargada (si la variable hacerZoom está con valor "true").
*/

function AnadirGeojsonPropio(idEntrada,rutaEntrada,tituloEntrada,abstractEntrada,tipoLeyenda,infoEstilo,rutaDescarga,opacidadEntrada,hacerZoom,queryableEntrada) {
  //1º CARGA DE DATOS Y CREACIÓN DE LA FUENTE VECTORIAL
  featuresCargadas = {};
  fuenteVector = {};
  jQuery.getJSON(rutaEntrada, function(data) {
    featuresCargadas = new ol.format.GeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }).readFeatures(data);
    fuenteVector = new ol.source.Vector({
      features: featuresCargadas
    });

    //2º CREACIÓN DEL ESTILO DE REPRESENTACIÓN PARA LOS DATOS CARGADOS:
    // CASO 1) CREACIÓN DE ESTILOS EN FUNCIÓN DE LOS DATOS CONCRETOS A CARGAR (a partir del valor de la variable de entrada idEntrada):
    var estiloDefinidoAqui = {
      'personalizado': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#333333',
          width: 0.5
        })
      }),
      'extersial_erosion_1': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#267300'
        })
      }),
      'extersial_erosion_2': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#38A800'
        })
      }),
      'extersial_erosion_3': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#98E600'
        })
      }),
      'extersial_erosion_4': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFFF00'
        })
      }),
      'extersial_erosion_5': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFA600'
        })
      }),
      'extersial_erosion_6': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#E64C00'
        })
      }),
      'extersial_erosion_7': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#A80000'
        })
      }),
      'extersial_habitats_2': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#8afbff'
        })
      }),
      'extersial_habitats_3': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#b4d79e'
        })
      }),
      'extersial_habitats_4': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#38a800'
        })
      }),
      'extersial_habitats_5': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#dbc5fc'
        })
      }),
      'extersial_habitats_6': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#ffd37f'
        })
      }),
      'extersial_habitats_7': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#fcd9cf'
        })
      }),
      'extersial_habitats_8': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#c8d200'
        })
      }),
      'extersial_habitats_9': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e8beff'
        })
      }),
      'extersial_habitats_10': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#00a884'
        })
      }),
      'extersial_habitats_11': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#a8a800'
        })
      }),
      'extersial_habitats_12': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#9ebbd7'
        })
      }),
      'extersial_habitats_13': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#444f89'
        })
      }),
      'extersial_habitats_14': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e64c00'
        })
      }),
      'extersial_habitats_15': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#449675'
        })
      }),
      'extersial_habitats_16': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#4f7d30'
        })
      }),
      'extersial_habitats_17': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#bee8ff'
        })
      }),
      'extersial_habitats_18': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#4c0073'
        })
      }),
      'extersial_habitats_19': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#895a44'
        })
      }),
      'extersial_habitats_20': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#bf2e2b'
        })
      }),
      'extersial_habitats_21': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#2e52bf'
        })
      }),
      'extersial_habitats_22': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#4a33ab'
        })
      }),
      'extersial_habitats_23': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#c25738'
        })
      }),
      'extersial_habitats_24': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#91ff5c'
        })
      }),
      'extersial_habitats_25': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#524db5'
        })
      }),
      'extersial_habitats_26': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#df73ff'
        })
      }),
      'extersial_habitats_27': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#1cb578'
        })
      }),
      'extersial_habitats_28': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#8ade1c'
        })
      }),
      'extersial_habitats_29': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#e6e600'
        })
      }),
      'extersial_habitats_30': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#24e30f'
        })
      }),
      'extersial_habitats_31': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#75ccff'
        })
      }),
      'extersial_habitats_32': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#c7f0ff'
        })
      }),
      'extersial_habitats_33': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#4fadff'
        })
      }),
      'extersial_habitats_34': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#00c5ff'
        })
      }),
      'extersial_habitats_35': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#879659'
        })
      }),
      'extersial_habitats_36': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#728944'
        })
      }),
      'extersial_habitats_37': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#a87000'
        })
      }),
      'extersial_habitats_38': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#856bb5'
        })
      }),
      'extersial_habitats_39': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#4414a3'
        })
      }),
      'extersial_habitats_40': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#58e600'
        })
      }),
      'extersial_tipo_parc_1': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFE9AF'
        })
      }),
      'extersial_tipo_parc_2': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFD37F'
        })
      }),
      'extersial_tipo_parc_3': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFAA00'
        })
      }),
      'extersial_tipo_parc_4': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#E69800'
        })
      }),
      'extersial_tipo_parc_5': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#A87000'
        })
      }),
      'extersial_tipo_parc_6': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#734C00'
        })
      }),
      'extersial_tipo_parc_7': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#E9FFBE'
        })
      }),
      'extersial_tipo_parc_8': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#D1FF73'
        })
      }),
      'extersial_tipo_parc_9': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#AAFF00'
        })
      }),
      'extersial_tipo_parc_10': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#98E600'
        })
      }),
      'extersial_tipo_parc_11': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#70A800'
        })
      }),
      'extersial_tipo_parc_12': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#4C7300'
        })
      }),
      'jae_educa_cie_nat_sal_1_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(237,248,233,1)'
        })
      }),
      'jae_educa_cie_nat_sal_1_3': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(186,228,179,1)'
        })
      }),
      'jae_educa_cie_nat_sal_3_12': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(116,196,118,1)'
        })
      }),
      'jae_educa_cie_nat_sal_12_19': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(49,163,84,1)'
        })
      }),
      'jae_educa_cie_nat_sal_19_54': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(0,109,44,1)'
        })
      }),
      'jae_educa_len_viv_2_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(222,235,247,1)'
        })
      }),
      'jae_educa_len_viv_2_4': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(158,202,225,1)'
        })
      }),
      'jae_educa_len_viv_4_17': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(49,130,189,1)'
        })
      }),
      'jae_educa_art_ofi_2_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(254,224,210,1)'
        })
      }),
      'jae_educa_art_ofi_2_6': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(222,45,38,1)'
        })
      }),
      'jae_educa_hum_ccss_1_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(254,235,226,1)'
        })
      }),
      'jae_educa_hum_ccss_1_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(251,180,185,1)'
        })
      }),
      'jae_educa_hum_ccss_2_25': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(247,104,161,1)'
        })
      }),
      'jae_educa_hum_ccss_25_75': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(197,27,138,1)'
        })
      }),
      'jae_educa_hum_ccss_75_116': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(122,1,119,1)'
        })
      }),
      'jae_educa_len_cla_1_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(240,240,240,1)'
        })
      }),
      'jae_educa_len_cla_1_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(189,189,189,1)'
        })
      }),
      'jae_educa_len_cla_5_21': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(99,99,99,1)'
        })
      }),
      'jae_educa_cie_pur_1_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(254,237,222,1)'
        })
      }),
      'jae_educa_cie_pur_2_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(253,190,133,1)'
        })
      }),
      'jae_educa_cie_pur_5_19': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(253,141,60,1)'
        })
      }),
      'jae_educa_cie_pur_19_24': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f8f8f8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: 'rgba(217,71,1,1)'
        })
      }),
      'car_mad_tra_tranvia': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#ff0000',
          width: 1
        })
      }),
      'car_mad_pto_1': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/town-hall-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_2': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/bank-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_3': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/toilet-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_4': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/home-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_5': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/prison-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_6': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/cemetery-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_7': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/telephone-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_8': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/post-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_9': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/museum-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_10': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/college-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_11': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/entrance-alt-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_12': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/hospital-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_13': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/religious-christian-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_14': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/law-scales-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_15': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/waterfall-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_16': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/slaughterhouse-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_17': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/convenience-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_18': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/picnic-site-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_19': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/militar-station-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_20': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/theatre-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_21': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/embassy-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_22': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/place-of-worship-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_23': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/lodging-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_24': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/library-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_25': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/ranger-station-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_26': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/doctor-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_27': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/fire-station-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_28': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/commercial-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_29': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/monument-esculpture-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_30': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/monument-font15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_31': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/landmark-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_32': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/monument-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_33': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/rail-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_34': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/rail-light-15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_35': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/bridge-hierr15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_36': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/bridge-mamp15.svg',
          scale: 1
        })
      }),
      'car_mad_pto_37': new ol.style.Style({
        image: new ol.style.Icon({
          src: './img/icons/park-15.svg',
          scale: 1
        })
      }),


      'car_mad_tra_vias_pub': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#545454',
          width: 0.75
        })
      }),
      'car_mad_tra_carretera': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#282828',
          width: 2,
        })
      }),
      'car_mad_tra_ferrocarril': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#000000',
          lineCap: 'square',
          width: 4
        })
      }),
      'car_mad_bar_00': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgb(252,91,3,0.8)',
          width: 3,
          lineDash: [10,10,5,10]
        }),
        fill: new ol.style.Fill({
          color: 'rgb(252,91,3,0)',
          opacity: 0
        })
      }),
      'car_mad_dis_00': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#FC5B03',
          width: 3
        }),
        fill: new ol.style.Fill({
          color: 'rgb(252,91,3,0.1)',
          opacity: 0.1
        })
      }),
      'car_mad_vsu_00': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#A305ED',
          width: 2,
          lineDash: [5,5,2,5]
        })
      }),
      'evonatur_usos_111': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#E6004D'
        })
      }),
      'evonatur_usos_112': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#E10000'
        })
      }),
      'evonatur_usos_121': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#B333E6'
        })
      }),
      'evonatur_usos_142': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFE6FF'
        })
      }),
      'evonatur_usos_222': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#F2A600'
        })
      }),
      'evonatur_usos_231': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#F2F24D'
        })
      }),
      'evonatur_usos_241': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFE6A6'
        })
      }),
      'evonatur_usos_242': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFFF00'
        })
      }),
      'evonatur_usos_243': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#FFCC4D'
        })
      }),
      'evonatur_usos_244': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#F2CCA5'
        })
      }),
      'evonatur_usos_311': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#80FF00'
        })
      }),
      'evonatur_usos_312': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#00A600'
        })
      }),
      'evonatur_usos_321': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#CCE64D'
        })
      }),
      'evonatur_usos_322': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#A5FE7F'
        })
      }),
      'evonatur_usos_323': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#A5E54C'
        })
      }),
      'evonatur_usos_324': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#A6E600'
        })
      }),
      'evonatur_usos_332': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#CCCCCC'
        })
      }),
      'evonatur_usos_333': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#BFFEB2'
        })
      }),
      'evonatur_usos_334': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#000000'
        })
      }),
      'evonatur_usos_511': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#00CCE6'
        })
      }),
      'evonatur_usos_512': new ol.style.Style({
        fill: new ol.style.Fill({
          color: '#A5E6E6'
        })
      }),
      // 'fosas_exum': new ol.style.Style({
      //   image: new ol.style.Icon({
      //     src: './img/icons/exhumadaTotalParcial.png',
      //     scale: 1
      //   })
      // }),
      // 'fosas_noInterv': new ol.style.Style({
      //   image: new ol.style.Icon({
      //     src: './img/icons/noIntervenida.png',
      //     scale: 1
      //   })
      // }),
      // 'fosas_valle': new ol.style.Style({
      //   image: new ol.style.Icon({
      //     src: './img/icons/valle.png',
      //     scale: 1.5
      //   })
      // }),
      'ebi_cmss': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: '#F5F57A'
            })
        })
      }),
      'ebi_resi': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: '#BFFEB2'
            })
        })
      }),
      'ebi_inss': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: '#A6E600'
            })
        })
      }),
      'ebi_cdia': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: '#0084A8'
            })
        })
      }),
      'ebi_salu': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: '#4c0073'
            })
        })
      }),
      'ebi_hosp': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: '#A5E54C'
            })
        })
      }),
      'ebi_densidad_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#FFEBCC'
        })
      }),
      'ebi_densidad_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#FFCB96'
        })
      }),
      'ebi_densidad_3': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#FFAD66'
        })
      }),
      'ebi_densidad_4': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#F79239'
        })
      }),
      'ebi_densidad_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#ED7700'
        })
      }),
      'ebi_may_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#FFFF80'
        })
      }),
      'ebi_may_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#FCD649'
        })
      }),
      'ebi_may_3': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#F2AA00'
        })
      }),
      'ebi_may_4': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#EB742F'
        })
      }),
      'ebi_may_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.5
        }),
        fill: new ol.style.Fill({
          color: '#DE3B2C'
        })
      }),
      'ebi_ratio100_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#E5D5F2'
        })
      }),
      'ebi_ratio100_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#BFA3CF'
        })
      }),
      'ebi_ratio100_3': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#9D78AD'
        })
      }),
      'ebi_ratio100_4': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#7B4F8C'
        })
      }),
      'ebi_ratio100_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#5D2C70'
        })
      }),
      'ebi_ratio95_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#DFB8E6'
        })
      }),
      'ebi_ratio95_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#C78DEB'
        })
      }),
      'ebi_ratio95_3': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#AC66ED'
        })
      }),
      'ebi_ratio95_4': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#913EF0'
        })
      }),
      'ebi_ratio95_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#700CF2'
        })
      }),
      'ebi_ratio90_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#FFCCFF'
        })
      }),
      'ebi_ratio90_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#F2A0F1'
        })
      }),
      'ebi_ratio90_3': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#E675E4'
        })
      }),
      'ebi_ratio90_4': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#D647D4'
        })
      }),
      'ebi_ratio90_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#C700C7'
        })
      }),
      'ebi_lon_ult_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#709959'
        })
      }),
      'ebi_lon_ult_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#D2DB8F'
        })
      }),
      'ebi_lon_ult_3': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#F2E096'
        })
      }),
      'ebi_lon_ult_4': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#E6BA85'
        })
      }),
      'ebi_lon_ult_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#C28C7C'
        })
      }),
      'ebi_ice_1': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#70A800'
        })
      }),
      'ebi_ice_2': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#C7D455'
        })
      }),
      'ebi_ice_3': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#F2E89D'
        })
      }),
      'ebi_ice_4': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#F2D58D'
        })
      }),
      'ebi_ice_5': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#F5BF53'
        })
      }),
      'ebi_ice_6': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#F8F8F8',
          width: 0.1
        }),
        fill: new ol.style.Fill({
          color: '#FCA903'
        })
      })
    }

    // CASO 2) CREACIÓN DE ESTILO PARA LAS CAPAS "SENCILLAS", CON EL ESTILO DEFINIDO EN LA VARIABLE DE ENTRADA infoEstilo:
    if (String(infoEstilo).indexOf(",") != -1){
      var arrayEstilo = [];
      var colorRellenoI = '';
      var colorBordeI = '';

      arrayEstilo = String(infoEstilo).split(",");
      colorRellenoI = arrayEstilo[1];
      colorBordeI = arrayEstilo[2];

      var image = new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({
          color: colorRellenoI
        }),
        stroke: new ol.style.Stroke({
          color: arrayEstilo[2],
          width: 0.5
        })
      });

      var estiloDefinidoEnArrayTematicas = {
        'Point': new ol.style.Style({
          image: image
        }),
        'LineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: colorBordeI,
            width: 0.5
          })
        }),
        'MultiLineString': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: colorBordeI,
            width: 0.5
          })
        }),
        'MultiPoint': new ol.style.Style({
          image: image
        }),
        'MultiPolygon': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: colorBordeI,
            width: 0.5
          }),
          fill: new ol.style.Fill({
            color: colorRellenoI
          })
        }),
        'Polygon': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: colorBordeI,
            width: 0.5
          }),
          fill: new ol.style.Fill({
            color: colorRellenoI
          })
        }),
        'GeometryCollection': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: colorBordeI,
            width: 0.5
          }),
          fill: new ol.style.Fill({
            color: colorRellenoI
          }),
          image: new ol.style.Circle({
            radius: 4,
            fill: null,
            stroke: new ol.style.Stroke({
              color: colorBordeI
            })
          })
        }),
        'Circle': new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: colorBordeI,
            width: 0.5
          }),
          fill: new ol.style.Fill({
            color: colorRellenoI
          })
        })
      };
    }

    // 3º ASIGNAR EL ESTILO CORRESPONDIENTE A CADA VALOR O RANGO DE VALORES DEL CAMPO CORRESPONDIENTE DE CADA GEOJSON:
      //Distinguiendo entre los dos casos:
      // - CAPAS SENCILLAS: en las que el estilo se define en el propio objeto del arrayTematicas (arrayTematicas.js)
      //     (en este caso el campo infoEstilo existirá y será un array, con los elementos separados por comas)
      // - CAPAS COMPLEJAS: en las que el estilo se ha definido en este mismo archivo
      //     (en este caso el campo infoEstilo no existe, y por tanto, no tiene comas en su contenido)
    var FuncionEstilo = function(feature) {
      if (String(infoEstilo).indexOf(",") != -1){
        return estiloDefinidoEnArrayTematicas[arrayEstilo[0]];
      } else if (String(infoEstilo).indexOf(",") == -1){
        if (idEntrada == "med_xxx_ero"){
          return estiloDefinidoAqui["extersial_erosion_" + feature.values_.erosion];
        } else if (idEntrada == "med_xxx_hab"){
          return estiloDefinidoAqui["extersial_habitats_" + feature.values_.num_habitat];
        } else if (idEntrada == "med_xxx_tip"){
          return estiloDefinidoAqui["extersial_tipo_parc_" + feature.values_.Tipologia];
        } else if (idEntrada == "hic_xxx_cns"){
          if (feature.values_.mostrar_entodo_caso_Viajes == 1){
            return estiloDefinidoAqui["jae_educa_cie_nat_sal_1_1"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 1) && (feature.values_.mostrar_entodo_caso_Viajes <= 3)){
            return estiloDefinidoAqui["jae_educa_cie_nat_sal_1_3"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 3) && (feature.values_.mostrar_entodo_caso_Viajes <= 12)){
            return estiloDefinidoAqui["jae_educa_cie_nat_sal_3_12"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 12) && (feature.values_.mostrar_entodo_caso_Viajes <= 19)){
            return estiloDefinidoAqui["jae_educa_cie_nat_sal_12_19"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 19) && (feature.values_.mostrar_entodo_caso_Viajes <= 54)){
            return estiloDefinidoAqui["jae_educa_cie_nat_sal_19_54"];
          }
        } else if (idEntrada == "hic_xxx_len"){
          if (feature.values_.mostrar_entodo_caso_Viajes == 2){
            return estiloDefinidoAqui["jae_educa_len_viv_2_2"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 2) && (feature.values_.mostrar_entodo_caso_Viajes <= 4)){
            return estiloDefinidoAqui["jae_educa_len_viv_2_4"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 4) && (feature.values_.mostrar_entodo_caso_Viajes <= 17)){
            return estiloDefinidoAqui["jae_educa_len_viv_4_17"];
          }
        } else if (idEntrada == "hic_xxx_art"){
          if (feature.values_.mostrar_entodo_caso_Viajes == 2){
            return estiloDefinidoAqui["jae_educa_art_ofi_2_2"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 2) && (feature.values_.mostrar_entodo_caso_Viajes <= 6)){
            return estiloDefinidoAqui["jae_educa_art_ofi_2_6"];
          }
        } else if (idEntrada == "hic_xxx_hum"){
          if (feature.values_.mostrar_entodo_caso_Viajes == 1){
            return estiloDefinidoAqui["jae_educa_hum_ccss_1_1"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 1) && (feature.values_.mostrar_entodo_caso_Viajes <= 2)){
            return estiloDefinidoAqui["jae_educa_hum_ccss_1_2"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 2) && (feature.values_.mostrar_entodo_caso_Viajes <= 25)){
            return estiloDefinidoAqui["jae_educa_hum_ccss_2_25"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 25) && (feature.values_.mostrar_entodo_caso_Viajes <= 75)){
            return estiloDefinidoAqui["jae_educa_hum_ccss_25_75"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 75) && (feature.values_.mostrar_entodo_caso_Viajes <= 116)){
            return estiloDefinidoAqui["jae_educa_hum_ccss_75_116"];
          }
        } else if (idEntrada == "hic_xxx_cla"){
          if (feature.values_.mostrar_entodo_caso_Viajes == 1){
            return estiloDefinidoAqui["jae_educa_len_cla_1_1"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 1) && (feature.values_.mostrar_entodo_caso_Viajes <= 5)){
            return estiloDefinidoAqui["jae_educa_len_cla_1_5"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 5) && (feature.values_.mostrar_entodo_caso_Viajes <= 21)){
            return estiloDefinidoAqui["jae_educa_len_cla_5_21"];
          }
        } else if (idEntrada == "hic_xxx_cie"){
          if ((feature.values_.mostrar_entodo_caso_Viajes > 1) && (feature.values_.mostrar_entodo_caso_Viajes <= 2)){
            return estiloDefinidoAqui["jae_educa_cie_pur_1_2"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 2) && (feature.values_.mostrar_entodo_caso_Viajes <= 5)){
            return estiloDefinidoAqui["jae_educa_cie_pur_2_5"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 5) && (feature.values_.mostrar_entodo_caso_Viajes <= 19)){
            return estiloDefinidoAqui["jae_educa_cie_pur_5_19"];
          } else if ((feature.values_.mostrar_entodo_caso_Viajes > 19) && (feature.values_.mostrar_entodo_caso_Viajes <= 24)){
            return estiloDefinidoAqui["jae_educa_cie_pur_19_24"];
          }
        } else if (idEntrada == "car_mad_pto"){
          return estiloDefinidoAqui["car_mad_pto_" + feature.values_.cod];
        } else if (idEntrada == "car_mad_tra"){
          if (feature.values_.Capa == "Tranvia"){
            return estiloDefinidoAqui["car_mad_tra_tranvia"];
          } else if (feature.values_.Capa == "Vias_publicas"){
            return estiloDefinidoAqui["car_mad_tra_vias_pub"];
          } else if (feature.values_.Capa == "Carretera"){
            return estiloDefinidoAqui["car_mad_tra_carretera"];
          } else if (feature.values_.Capa == "Ferrocarril"){
            return estiloDefinidoAqui["car_mad_tra_ferrocarril"];
          }
        } else if (idEntrada == "car_mad_c17"){
          return estiloDefinidoAqui["car_mad_cal_17"];
        } else if (idEntrada == "car_mad_vsu"){
          return estiloDefinidoAqui["car_mad_vsu_00"];
        } else if (idEntrada == "car_mad_dac"){
          return estiloDefinidoAqui["car_mad_dis_ac"];
        } else if (idEntrada == "car_mad_d55"){
          return estiloDefinidoAqui["car_mad_dis_55"];
        } else if (idEntrada == "car_mad_equ"){
          return estiloDefinidoAqui["car_mad_equ_" + feature.values_.cod];
        } else if (idEntrada == "car_mad_fer"){
          return estiloDefinidoAqui["car_mad_fer_" + feature.values_.cod];
        } else if (idEntrada == "car_mad_orn"){
          return estiloDefinidoAqui["car_mad_orn_" + feature.values_.cod];
        } else if (idEntrada == "car_mad_par"){
          return estiloDefinidoAqui["car_mad_par"];
        } else if (idEntrada == "car_mad_pue"){
          return estiloDefinidoAqui["car_mad_pue_" + feature.values_.cod];
        } else if (idEntrada == "car_mad_db0"){
          if (feature.values_.cod == 2){
            return estiloDefinidoAqui["car_mad_bar_00"];
          } else if (feature.values_.cod == 1){
            return estiloDefinidoAqui["car_mad_dis_00"];
          }
        } else if (idEntrada == "ant_xxx_o90"){
          if (feature.values_.CODE_90 == 111){
            return estiloDefinidoAqui["evonatur_usos_111"];
          } else if (feature.values_.CODE_90 == 222) {
            return estiloDefinidoAqui["evonatur_usos_222"];
          } else if (feature.values_.CODE_90 == 231) {
            return estiloDefinidoAqui["evonatur_usos_231"];
          } else if (feature.values_.CODE_90 == 242) {
            return estiloDefinidoAqui["evonatur_usos_242"];
          } else if (feature.values_.CODE_90 == 243){
            return estiloDefinidoAqui["evonatur_usos_243"];
          } else if (feature.values_.CODE_90 == 244){
            return estiloDefinidoAqui["evonatur_usos_244"];
          } else if (feature.values_.CODE_90 == 311){
            return estiloDefinidoAqui["evonatur_usos_311"];
          } else if (feature.values_.CODE_90 == 312){
            return estiloDefinidoAqui["evonatur_usos_312"];
          } else if (feature.values_.CODE_90 == 321) {
            return estiloDefinidoAqui["evonatur_usos_321"];
          } else if (feature.values_.CODE_90 == 323){
            return estiloDefinidoAqui["evonatur_usos_323"];
          } else if (feature.values_.CODE_90 == 324){
            return estiloDefinidoAqui["evonatur_usos_324"];
          } else if (feature.values_.CODE_90 == 332){
            return estiloDefinidoAqui["evonatur_usos_332"];
          } else if (feature.values_.CODE_90 == 333){
            return estiloDefinidoAqui["evonatur_usos_333"];
          } else if (feature.values_.CODE_90 == 512){
            return estiloDefinidoAqui["evonatur_usos_512"];
          }
        } else if (idEntrada == "ant_xxx_o00"){
          if (feature.values_.CODE_00 == 111){
            return estiloDefinidoAqui["evonatur_usos_111"];
          } else if (feature.values_.CODE_00 == 222) {
            return estiloDefinidoAqui["evonatur_usos_222"];
          } else if (feature.values_.CODE_00 == 231) {
            return estiloDefinidoAqui["evonatur_usos_231"];
          } else if (feature.values_.CODE_00 == 242) {
            return estiloDefinidoAqui["evonatur_usos_242"];
          } else if (feature.values_.CODE_00 == 243){
            return estiloDefinidoAqui["evonatur_usos_243"];
          } else if (feature.values_.CODE_00 == 244){
            return estiloDefinidoAqui["evonatur_usos_244"];
          } else if (feature.values_.CODE_00 == 311){
            return estiloDefinidoAqui["evonatur_usos_311"];
          } else if (feature.values_.CODE_00 == 312){
            return estiloDefinidoAqui["evonatur_usos_312"];
          } else if (feature.values_.CODE_00 == 321) {
            return estiloDefinidoAqui["evonatur_usos_321"];
          } else if (feature.values_.CODE_00 == 323){
            return estiloDefinidoAqui["evonatur_usos_323"];
          } else if (feature.values_.CODE_00 == 324){
            return estiloDefinidoAqui["evonatur_usos_324"];
          } else if (feature.values_.CODE_00 == 332){
            return estiloDefinidoAqui["evonatur_usos_332"];
          } else if (feature.values_.CODE_00 == 333){
            return estiloDefinidoAqui["evonatur_usos_333"];
          } else if (feature.values_.CODE_00 == 512){
            return estiloDefinidoAqui["evonatur_usos_512"];
          }
         } else if (idEntrada == "ant_xxx_o06"){
           if (feature.values_.mostrar_ant_xxx_o06_Código == 111){
             return estiloDefinidoAqui["evonatur_usos_111"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 112) {
             return estiloDefinidoAqui["evonatur_usos_112"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 121) {
             return estiloDefinidoAqui["evonatur_usos_121"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 222) {
             return estiloDefinidoAqui["evonatur_usos_222"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 231) {
             return estiloDefinidoAqui["evonatur_usos_231"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 242) {
             return estiloDefinidoAqui["evonatur_usos_242"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 243){
             return estiloDefinidoAqui["evonatur_usos_243"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 244){
             return estiloDefinidoAqui["evonatur_usos_244"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 311){
             return estiloDefinidoAqui["evonatur_usos_311"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 312){
             return estiloDefinidoAqui["evonatur_usos_312"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 321) {
             return estiloDefinidoAqui["evonatur_usos_321"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 323){
             return estiloDefinidoAqui["evonatur_usos_323"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 324){
             return estiloDefinidoAqui["evonatur_usos_324"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 332){
             return estiloDefinidoAqui["evonatur_usos_332"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 333){
             return estiloDefinidoAqui["evonatur_usos_333"];
           } else if (feature.values_.mostrar_ant_xxx_o06_Código == 512){
             return estiloDefinidoAqui["evonatur_usos_512"];
           }
         } else if (idEntrada == "ant_xxx_o12"){
            if (feature.values_.CODE_12 == 111){
              return estiloDefinidoAqui["evonatur_usos_111"];
            } else if (feature.values_.CODE_12 == 112) {
              return estiloDefinidoAqui["evonatur_usos_112"];
            } else if (feature.values_.CODE_12 == 142) {
              return estiloDefinidoAqui["evonatur_usos_142"];
            } else if (feature.values_.CODE_12 == 222) {
              return estiloDefinidoAqui["evonatur_usos_222"];
            } else if (feature.values_.CODE_12 == 231) {
              return estiloDefinidoAqui["evonatur_usos_231"];
            } else if (feature.values_.CODE_12 == 241) {
              return estiloDefinidoAqui["evonatur_usos_241"];
            } else if (feature.values_.CODE_12 == 242) {
              return estiloDefinidoAqui["evonatur_usos_242"];
            } else if (feature.values_.CODE_12 == 243){
              return estiloDefinidoAqui["evonatur_usos_243"];
            } else if (feature.values_.CODE_12 == 244){
              return estiloDefinidoAqui["evonatur_usos_244"];
            } else if (feature.values_.CODE_12 == 311){
              return estiloDefinidoAqui["evonatur_usos_311"];
            } else if (feature.values_.CODE_12 == 312){
              return estiloDefinidoAqui["evonatur_usos_312"];
            } else if (feature.values_.CODE_12 == 321) {
              return estiloDefinidoAqui["evonatur_usos_321"];
            } else if (feature.values_.CODE_12 == 322) {
              return estiloDefinidoAqui["evonatur_usos_322"];
            } else if (feature.values_.CODE_12 == 323){
              return estiloDefinidoAqui["evonatur_usos_323"];
            } else if (feature.values_.CODE_12 == 324){
              return estiloDefinidoAqui["evonatur_usos_324"];
            } else if (feature.values_.CODE_12 == 332){
              return estiloDefinidoAqui["evonatur_usos_332"];
            } else if (feature.values_.CODE_12 == 333){
              return estiloDefinidoAqui["evonatur_usos_333"];
            } else if (feature.values_.CODE_12 == 334) {
              return estiloDefinidoAqui["evonatur_usos_334"];
            } else if (feature.values_.CODE_12 == 512){
              return estiloDefinidoAqui["evonatur_usos_512"];
            }
          }
          // else if (idEntrada == "ant_his_fos") {
          //     if (feature.values_.tipo == 3){
          //     return estiloDefinidoAqui["fosas_valle"];
          //   } else if (feature.values_.tipo == 1){
          //     return estiloDefinidoAqui["fosas_exum"];
          //   } else if (feature.values_.tipo == 2){
          //     return estiloDefinidoAqui["fosas_noInterv"];
          //   }
          // }
          else if (idEntrada == "pob_xxx_css"){
            return estiloDefinidoAqui["ebi_cmss"];
          } else if (idEntrada == "pob_xxx_res"){
            return estiloDefinidoAqui["ebi_resi"];
          } else if (idEntrada == "pob_xxx_ins"){
            return estiloDefinidoAqui["ebi_inss"];
          } else if (idEntrada == "pob_xxx_dia"){
            return estiloDefinidoAqui["ebi_cdia"];
          } else if (idEntrada == "pob_xxx_sal"){
            return estiloDefinidoAqui["ebi_salu"];
          } else if (idEntrada == "pob_xxx_hos"){
            return estiloDefinidoAqui["ebi_hosp"];
          } else if (idEntrada == "pob_xxx_den"){
          if (feature.values_.mostrar_pob_xxx_den_Valor <= 36){
            return estiloDefinidoAqui["ebi_densidad_1"];
          } else if ((feature.values_.mostrar_pob_xxx_den_Valor > 36) && (feature.values_.mostrar_pob_xxx_den_Valor <= 90)){
            return estiloDefinidoAqui["ebi_densidad_2"];
          } else if ((feature.values_.mostrar_pob_xxx_den_Valor > 90) && (feature.values_.mostrar_pob_xxx_den_Valor <= 167)){
            return estiloDefinidoAqui["ebi_densidad_3"];
          } else if ((feature.values_.mostrar_pob_xxx_den_Valor > 167) && (feature.values_.mostrar_pob_xxx_den_Valor <= 375)){
            return estiloDefinidoAqui["ebi_densidad_4"];
          } else if (feature.values_.mostrar_pob_xxx_den_Valor > 375){
            return estiloDefinidoAqui["ebi_densidad_5"];
          }
        } else if (idEntrada == "pob_xxx_p00"){
          if (feature.values_.mostrar_pob_xxx_p00_Valor <= 52){
            return estiloDefinidoAqui["ebi_may_1"];
          } else if ((feature.values_.mostrar_pob_xxx_p00_Valor > 52) && (feature.values_.mostrar_pob_xxx_p00_Valor <= 118)){
            return estiloDefinidoAqui["ebi_may_2"];
          } else if ((feature.values_.mostrar_pob_xxx_p00_Valor > 118) && (feature.values_.mostrar_pob_xxx_p00_Valor <= 241)){
            return estiloDefinidoAqui["ebi_may_3"];
          } else if ((feature.values_.mostrar_pob_xxx_p00_Valor > 241) && (feature.values_.mostrar_pob_xxx_p00_Valor <= 483)){
            return estiloDefinidoAqui["ebi_may_4"];
          } else if (feature.values_.mostrar_pob_xxx_p00_Valor > 483){
            return estiloDefinidoAqui["ebi_may_5"];
          }
        } else if (idEntrada == "pob_xxx_p85"){
          if (feature.values_.mostrar_pob_xxx_p85_Valor <= 10500){
            return estiloDefinidoAqui["ebi_may_1"];
          } else if ((feature.values_.mostrar_pob_xxx_p85_Valor > 10500) && (feature.values_.mostrar_pob_xxx_p85_Valor <= 21593)){
            return estiloDefinidoAqui["ebi_may_2"];
          } else if ((feature.values_.mostrar_pob_xxx_p85_Valor > 21593) && (feature.values_.mostrar_pob_xxx_p85_Valor <= 35008)){
            return estiloDefinidoAqui["ebi_may_3"];
          } else if ((feature.values_.mostrar_pob_xxx_p85_Valor > 35008) && (feature.values_.mostrar_pob_xxx_p85_Valor <= 54934)){
            return estiloDefinidoAqui["ebi_may_4"];
          } else if (feature.values_.mostrar_pob_xxx_p85_Valor > 54934){
            return estiloDefinidoAqui["ebi_may_5"];
          }
        } else if (idEntrada == "pob_xxx_p65"){
          if (feature.values_.mostrar_pob_xxx_p65_Valor <= 60014){
            return estiloDefinidoAqui["ebi_may_1"];
          } else if ((feature.values_.mostrar_pob_xxx_p65_Valor > 60014) && (feature.values_.mostrar_pob_xxx_p65_Valor <= 124172)){
            return estiloDefinidoAqui["ebi_may_2"];
          } else if ((feature.values_.mostrar_pob_xxx_p65_Valor > 124172) && (feature.values_.mostrar_pob_xxx_p65_Valor <= 208420)){
            return estiloDefinidoAqui["ebi_may_3"];
          } else if ((feature.values_.mostrar_pob_xxx_p65_Valor > 208420) && (feature.values_.mostrar_pob_xxx_p65_Valor <= 427779)){
            return estiloDefinidoAqui["ebi_may_4"];
          } else if (feature.values_.mostrar_pob_xxx_p65_Valor > 427779){
            return estiloDefinidoAqui["ebi_may_5"];
          }
        } else if (idEntrada == "pob_xxx_r00"){
          if (feature.values_.mostrar_pob_xxx_r00_Valor <= 1){
            return estiloDefinidoAqui["ebi_ratio100_1"];
          } else if ((feature.values_.mostrar_pob_xxx_r00_Valor > 1) && (feature.values_.mostrar_pob_xxx_r00_Valor <= 5)){
            return estiloDefinidoAqui["ebi_ratio100_2"];
          } else if ((feature.values_.mostrar_pob_xxx_r00_Valor > 5) && (feature.values_.mostrar_pob_xxx_r00_Valor <= 14)){
            return estiloDefinidoAqui["ebi_ratio100_3"];
          } else if ((feature.values_.mostrar_pob_xxx_r00_Valor > 14) && (feature.values_.mostrar_pob_xxx_r00_Valor <= 50)){
            return estiloDefinidoAqui["ebi_ratio100_4"];
          } else if (feature.values_.mostrar_pob_xxx_r00_Valor > 50){
            return estiloDefinidoAqui["ebi_ratio100_5"];
          }
        } else if (idEntrada == "pob_xxx_r95"){
          if (feature.values_.mostrar_pob_xxx_r95_Valor <= 2.4){
            return estiloDefinidoAqui["ebi_ratio95_1"];
          } else if ((feature.values_.mostrar_pob_xxx_r95_Valor > 2.4) && (feature.values_.mostrar_pob_xxx_r95_Valor <= 7)){
            return estiloDefinidoAqui["ebi_ratio95_2"];
          } else if ((feature.values_.mostrar_pob_xxx_r95_Valor > 7) && (feature.values_.mostrar_pob_xxx_r95_Valor <= 17.4)){
            return estiloDefinidoAqui["ebi_ratio95_3"];
          } else if ((feature.values_.mostrar_pob_xxx_r95_Valor > 17.4) && (feature.values_.mostrar_pob_xxx_r95_Valor <= 60)){
            return estiloDefinidoAqui["ebi_ratio95_4"];
          } else if (feature.values_.mostrar_pob_xxx_r95_Valor > 60){
            return estiloDefinidoAqui["ebi_ratio95_5"];
          }
        } else if (idEntrada == "pob_xxx_r90"){
          if (feature.values_.mostrar_pob_xxx_r90_Valor <= 5.7){
            return estiloDefinidoAqui["ebi_ratio90_1"];
          } else if ((feature.values_.mostrar_pob_xxx_r90_Valor > 5.7) && (feature.values_.mostrar_pob_xxx_r90_Valor <= 11)){
            return estiloDefinidoAqui["ebi_ratio90_2"];
          } else if ((feature.values_.mostrar_pob_xxx_r90_Valor > 11) && (feature.values_.mostrar_pob_xxx_r90_Valor <= 19.2)){
            return estiloDefinidoAqui["ebi_ratio90_3"];
          } else if ((feature.values_.mostrar_pob_xxx_r90_Valor > 19.2) && (feature.values_.mostrar_pob_xxx_r90_Valor <= 40.9)){
            return estiloDefinidoAqui["ebi_ratio90_4"];
          } else if (feature.values_.mostrar_pob_xxx_r90_Valor > 40.9){
            return estiloDefinidoAqui["ebi_ratio90_5"];
          }
        } else if (idEntrada == "pob_xxx_lon"){
          if ((feature.values_.mostrar_pob_xxx_lon_Valor > 0) && (feature.values_.mostrar_pob_xxx_lon_Valor <= 12)){
            return estiloDefinidoAqui["ebi_lon_ult_1"];
          } else if ((feature.values_.mostrar_pob_xxx_lon_Valor > 12) && (feature.values_.mostrar_pob_xxx_lon_Valor <= 16.9)){
            return estiloDefinidoAqui["ebi_lon_ult_2"];
          } else if ((feature.values_.mostrar_pob_xxx_lon_Valor > 16.9) && (feature.values_.mostrar_pob_xxx_lon_Valor <= 22.5)){
            return estiloDefinidoAqui["ebi_lon_ult_3"];
          } else if ((feature.values_.mostrar_pob_xxx_lon_Valor > 22.5) && (feature.values_.mostrar_pob_xxx_lon_Valor <= 31.4)){
            return estiloDefinidoAqui["ebi_lon_ult_4"];
          } else if (feature.values_.mostrar_pob_xxx_lon_Valor > 31.4){
            return estiloDefinidoAqui["ebi_lon_ult_5"];
          }
        } else if (idEntrada == "pob_xxx_ult"){
          if ((feature.values_.mostrar_pob_xxx_ult_Valor > 0) && (feature.values_.mostrar_pob_xxx_ult_Valor <= 1.4)){
            return estiloDefinidoAqui["ebi_lon_ult_1"];
          } else if ((feature.values_.mostrar_pob_xxx_ult_Valor > 1.4) && (feature.values_.mostrar_pob_xxx_ult_Valor <= 2.8)){
            return estiloDefinidoAqui["ebi_lon_ult_2"];
          } else if ((feature.values_.mostrar_pob_xxx_ult_Valor > 2.8) && (feature.values_.mostrar_pob_xxx_ult_Valor <= 5.4)){
            return estiloDefinidoAqui["ebi_lon_ult_3"];
          } else if ((feature.values_.mostrar_pob_xxx_ult_Valor > 5.4) && (feature.values_.mostrar_pob_xxx_ult_Valor <= 10.9)){
            return estiloDefinidoAqui["ebi_lon_ult_4"];
          } else if (feature.values_.mostrar_pob_xxx_ult_Valor > 10.9){
            return estiloDefinidoAqui["ebi_lon_ult_5"];
          }
        } else if (idEntrada == "pob_xxx_ice"){
          if ((feature.values_.mostrar_pob_xxx_ice_Valor > 34) && (feature.values_.mostrar_pob_xxx_ice_Valor <= 42)){
            return estiloDefinidoAqui["ebi_ice_1"];
          } else if ((feature.values_.mostrar_pob_xxx_ice_Valor > 42) && (feature.values_.mostrar_pob_xxx_ice_Valor <= 45)){
            return estiloDefinidoAqui["ebi_ice_2"];
          } else if ((feature.values_.mostrar_pob_xxx_ice_Valor > 45) && (feature.values_.mostrar_pob_xxx_ice_Valor <= 48)){
            return estiloDefinidoAqui["ebi_ice_3"];
          } else if ((feature.values_.mostrar_pob_xxx_ice_Valor > 48) && (feature.values_.mostrar_pob_xxx_ice_Valor <= 52)){
            return estiloDefinidoAqui["ebi_ice_4"];
          } else if ((feature.values_.mostrar_pob_xxx_ice_Valor > 52) && (feature.values_.mostrar_pob_xxx_ice_Valor <= 59)){
            return estiloDefinidoAqui["ebi_ice_5"];
          } else if (feature.values_.mostrar_pob_xxx_ice_Valor > 59){
            return estiloDefinidoAqui["ebi_ice_6"];
          }
        }
      }
    }

  //4º CREACIÓN DE LA CAPA VECTORIAL A DIBUJAR, distinguiendo dos casos:
    // - CAPAS SENCILLAS: en las que el estilo se define en el propio objeto del arrayTematicas (arrayTematicas.js)
    //     (en este caso el campo infoEstilo existirá y será un array, con los elementos separados por comas)
    // - CAPAS COMPLEJAS: en las que el estilo se ha definido en este mismo archivos
    //     (en este caso el campo infoEstilo no existe, y por tanto, no tiene comas en su contenido)

    //Extent ampliado: a utilizar más abajo, como propiedad de la capa vectorial. Es igual al extent de la fuente vectorial, pero expandido un 10% hacia arriba, abajo, derecha e izquierda. Esto es para que no aparezcan features cortadas en los extremos.
    extentAmpliado = [fuenteVector.getExtent()[0]-(fuenteVector.getExtent()[2]-fuenteVector.getExtent()[0])*0.1,fuenteVector.getExtent()[1]-(fuenteVector.getExtent()[3]-fuenteVector.getExtent()[1])*0.1,fuenteVector.getExtent()[2]+(fuenteVector.getExtent()[2]-fuenteVector.getExtent()[0])*0.1,fuenteVector.getExtent()[3]+(fuenteVector.getExtent()[3]-fuenteVector.getExtent()[1])*0.1];

    if (String(infoEstilo).indexOf(",") != -1){
      var capaVectorialEntrada = new ol.layer.Vector({
          name: idEntrada,
          titulo_es: tituloEntrada,
          tipo: "GEOJSON",
    			extent: extentAmpliado,
    			abstract: abstractEntrada,
          source: fuenteVector,
          style: FuncionEstilo,
          tipo_leyenda: tipoLeyenda,
          tipo_feature: arrayEstilo[0],
          color_borde: colorBordeI,
          color_relleno: colorRellenoI,
          origen_geojson: "propio",
          ruta_descarga: rutaDescarga,
          queryable: queryableEntrada
      });
    } else if (String(infoEstilo).indexOf(",") == -1){
      var capaVectorialEntrada = new ol.layer.Vector({
          name: idEntrada,
          titulo_es: tituloEntrada,
          tipo: "GEOJSON",
  			  extent: extentAmpliado,
          abstract: abstractEntrada,
          source: fuenteVector,
          style: FuncionEstilo,
          tipo_leyenda: tipoLeyenda,
          leyenda_imagen: './img/leyenda/' + idEntrada + '.jpg',
          origen_geojson: "propio",
          ruta_descarga: rutaDescarga,
          queryable: queryableEntrada
      });
   }

   //5º ACCIONES PARA CARGAR LA CAPA CORRECTAMENTE AL MAPA:
   //Ajustar la opacidad:
   capaVectorialEntrada.setOpacity(opacidadEntrada);
   //Añadir la capa al mapa:
   map.addLayer(capaVectorialEntrada);
   //Añadir la capa a la leyenda, y hacerla visible (si estaba invisible):
   AñadirALeyenda(capaVectorialEntrada,'geojson_propio');
   AbrirLeyenda();
   //Añadir la capa al menú de gestión de capas:
   AnadirAGestionCapas(capaVectorialEntrada,'geojson');

   //Hacer zoom a la capa cargada, si la variable hacerZoom lo indica:
   if (hacerZoom == true){
     var anchoSidebar = document.getElementById('sidebar').offsetWidth + 15;
     map.getView().fit(fuenteVector.getExtent(),{size:map.getSize(),padding:[15,15,15,anchoSidebar]});
   }
   });
}
