/* Control de mapa base */
//Funciones AbrirMenuMapaBase() y CerrarMenuMapaBase()
/*
FUNCIONALIDAD:
  Estas funciones hacen aparecer y desaparecer, respectivamente, el menú de botones de cambio de mapa base.
*/
function AbrirMenuMapaBase(){
  $("#menuMapaBase").css({'display':'flex'});
  $("#menuMapaBase").on('click',CerrarMenuMapaBase);
  $("#btnCerrarMapaBase").css({'display':'flex'});
  $("#btnAbrirMapaBase").css({'display':'none'});
}
function CerrarMenuMapaBase(){
  $("#menuMapaBase").css({'display':'none'});
  $("#btnCerrarMapaBase").css({'display':'none'});
  $("#btnAbrirMapaBase").css({'display':'flex'});
}

//Función CambioMapaBase(capa)
/*
ENTRADAS:
  - capa: identificador único de la capa base que se quiere cargar.
FUNCIONALIDAD:
  Esta función:
  - crea la capa base necesaria (según la que se haya seleccionado en el botón del menú de capas base),
  - la añade al mapa reemplazando al mapa base anteriormente cargado,
  - cambia el color de fondo del mapa,
  - establece el nivel de zoom máximo del mapa acorde con cada mapa base.

  La configuración inicial de las capas de teselas vectoriales de la USIG se encuentra en el archivo map.js,
  dentro de la función CrearMapa(); ya que el primer mapa en aparecer es el 'vector_tiles_usig_light'.
  Dentro de la función CambioMapaBase(capa) sólamente se cambia el estilo para pasar del mapa base 'light' al 'dark' y viceversa.
  El resto de capas base sí se crean y configuran de manera completa dentro de esta función.
*/
function CambioMapaBase(capa){
  if (capa == 'vector_tiles_usig_light') {
    //Asignar el color de fondo:
    $("#map").css({'background':'#f7f6f6'});
    //Asignar el estilo a partir del archivo JSON:
    var style = 'js/estilosVT/light.json';
    fetch(style).then(function(response) {
      response.json().then(function(glStyle) {
        olms.applyStyle(capaBaseVTusig, glStyle, 'openmaptiles').then(function() {
          capaBaseVTusig.set('name','vector_tiles_usig_light');
          capaBaseVTusig.set('titulo_es','Vector Tiles uSIG light');
          capaBaseVTusig.setOpacity(0.8);
          map.getLayers().removeAt(0);
          map.getLayers().insertAt(0,capaBaseVTusig);
          map.getView().setMaxZoom(20);
        });
      });
    });
  } else if (capa == 'vector_tiles_usig_dark') {
    $("#map").css({'background':'#2A2A2A'});
    var style = 'js/estilosVT/dark.json';
    fetch(style).then(function(response) {
      response.json().then(function(glStyle) {
        olms.applyStyle(capaBaseVTusig, glStyle, 'openmaptiles').then(function() {
          capaBaseVTusig.set('name','vector_tiles_usig_dark');
          capaBaseVTusig.set('titulo_es','Vector Tiles uSIG dark');
          capaBaseVTusig.setOpacity(1);
          map.getLayers().removeAt(0);
          map.getLayers().insertAt(0,capaBaseVTusig);
          map.getView().setMaxZoom(20);
        });
      });
    });
  }
//Mapa base con batimetría de uSIG
   else if (capa == 'vector_tiles_usig_oceanbasemap') {
    $("#map").css({'background':'transparent'});
      var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 24});
      var sea = new ol.layer.VectorTile({
        source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        queryable : false,
        overlaps:true,
        tileGrid: tilegrid,
        tilePixelRatio: 8,
        url: 'http://usig-teselas.cchs.csic.es/data/elem_marinos/{z}/{x}/{y}.pbf?'
        }),
        zIndex:-20,
        declutter:true,
        preload:Infinity,
        //rendermode: 'vector',
        updateWhileInteracting:true,
        updateWhileAnimating:true,
        useInterimTilesOnError:true,
      });

      var ground_text = new ol.layer.VectorTile({
        source: capaBaseVTusig.getSource(),
        zIndex:-5,
        declutter:true,
        queryable : false,
        // rendermode: 'vector',
        preload:Infinity,
        updateWhileInteracting:true,
        updateWhileAnimating:true,
        useInterimTilesOnError:true,
      });

      var styleground = 'js/estilosVT/ground.json'
      fetch(styleground).then(function(response) {
        response.json().then(function(glStyle) {
          olms.applyBackground(map, glStyle);
          olms.applyStyle(capaBaseVTusig, glStyle, 'openmaptiles').then(function() {
          	capaBaseVTusig.setOpacity(1);
            capaBaseVTusig.setZIndex(-25);
          });
        });
      });
      var stylesea = 'js/estilosVT/sea.json'
      fetch(stylesea).then(function(response) {
        response.json().then(function(glStyle) {
          olms.applyStyle(sea, glStyle, 'elementos_marinos').then(function() {
          	sea.setOpacity(1);
          });
        });
      });

      var stylegroundtext = 'js/estilosVT/ground-text.json'
      fetch(stylegroundtext).then(function(response) {
        response.json().then(function(glStyle) {
          olms.applyStyle(ground_text, glStyle, 'openmaptiles').then(function() {
            ground_text.setOpacity(1);
          });
        });
      });

      var batimetria = new ol.layer.Group({
      	layers:[capaBaseVTusig, sea, ground_text],
        queryable : false,
      });
        batimetria.set('name','vector_tiles_usig_oceanbasemap');
        batimetria.set('titulo_es','Vector Tiles uSIG OceanBaseMap');
        batimetria.setOpacity(1);
        map.getLayers().removeAt(0);
        map.getLayers().insertAt(0,batimetria);
        map.getView().setMaxZoom(20);

//Mapa base blue con batimetría de uSIG
} else if (capa == 'vector_tiles_usig_bluebasemap') {
    $("#map").css({'background':'transparent'});
      var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 24}),
      var blue_sea = new ol.layer.VectorTile({
        source: new ol.source.VectorTile({
        format: new ol.format.MVT(),
        queryable : false,
        overlaps:true,
        tileGrid: tilegrid,
        tilePixelRatio: 8,
        url: 'http://usig-teselas.cchs.csic.es/data/elem_marinos/{z}/{x}/{y}.pbf?'
        }),
        zIndex:-20,
        declutter:true,
        preload:Infinity,
        //rendermode: 'vector',
        updateWhileInteracting:true,
        updateWhileAnimating:true,
        useInterimTilesOnError:true,
      });

      var blue_ground_text = new ol.layer.VectorTile({
        source: capaBaseVTusig.getSource(),
        zIndex:-5,
        declutter:true,
        queryable : false,
        // rendermode: 'vector',
        preload:Infinity,
        updateWhileInteracting:true,
        updateWhileAnimating:true,
        useInterimTilesOnError:true,
      });

      var styleblueground = 'js/estilosVT/blue_ground.json'
      fetch(styleblueground).then(function(response) {
        response.json().then(function(glStyle) {
          olms.applyBackground(map, glStyle);
          olms.applyStyle(capaBaseVTusig, glStyle, 'openmaptiles').then(function() {
          	capaBaseVTusig.setOpacity(1);
            capaBaseVTusig.setZIndex(-25);
          });
        });
      });
      var stylebluesea = 'js/estilosVT/blue_sea.json'
      fetch(stylebluesea).then(function(response) {
        response.json().then(function(glStyle) {
          olms.applyStyle(blue_sea, glStyle, 'elementos_marinos').then(function() {
          	blue_sea.setOpacity(1);
          });
        });
      });

      var stylebluegroundtext = 'js/estilosVT/blue_ground_text.json'
      fetch(stylebluegroundtext).then(function(response) {
        response.json().then(function(glStyle) {
          olms.applyStyle(blue_ground_text, glStyle, 'openmaptiles').then(function() {
            blue_ground_text.setOpacity(1);
          });
        });
      });

      var blue_batimetria = new ol.layer.Group({
      	layers:[capaBaseVTusig, blue_sea, blue_ground_text],
        queryable : false,
      });
        blue_batimetria.set('name','vector_tiles_usig_bluebasemap');
        blue_batimetria.set('titulo_es','Vector Tiles uSIG BlueBaseMap');
        blue_batimetria.setOpacity(1);
        map.getLayers().removeAt(0);
        map.getLayers().insertAt(0,blue_batimetria);
        map.getView().setMaxZoom(20);
}
  else if (capa == 'osm_base_map') {
    $("#map").css({'background':'#ffffff'});
    var capaBaseOSM = new ol.layer.Tile({
      titulo_es: 'OSM Base Map',
      tipo: 'OGC:WMTS',
      queryable : false,
      source: new ol.source.OSM({
        attributions: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      })
    });
    capaBaseOSM.set('name','osm_base_map');
    capaBaseOSM.setOpacity(0.8);
    map.getLayers().removeAt(0);
    map.getLayers().insertAt(0,capaBaseOSM);
    map.getView().setMaxZoom(20);
  }
    else if (capa == 'esri_world_imagery') {
    $("#map").css({'background':'#ffffff'});
      var capaBaseEsriWI = new ol.layer.Tile({
        titulo_es: 'Esri World Imagery',
        tipo: 'OGC:WMTS',
        queryable : false,
        source: new ol.source.XYZ({
          attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Imagery/MapServer">ArcGIS</a>',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Imagery/MapServer/tile/{z}/{y}/{x}'
          })
      });
      capaBaseEsriWI.set('name','esri_world_imagery');
      capaBaseEsriWI.setOpacity(0.8);
      map.getLayers().removeAt(0);
      map.getLayers().insertAt(0,capaBaseEsriWI);
      map.getView().setMaxZoom(20);
    }
     else if (capa == 'esri_ocean_basemap') {
      $("#map").css({'background':'#ffffff'});
        var capaBaseEsriOB = new ol.layer.Tile({
          titulo_es: 'Esri Ocean Basemap',
          tipo: 'OGC:WMTS',
          queryable : false,
          source: new ol.source.XYZ({
            attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
              'rest/services/Ocean_Basemap/MapServer">ArcGIS</a>',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
              'Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'
          })
        });
        capaBaseEsriOB.set('name','esri_ocean_basemap');
        capaBaseEsriOB.setOpacity(0.8);
        map.getLayers().removeAt(0);
        map.getLayers().insertAt(0,capaBaseEsriOB);
        map.getView().setMaxZoom(10);
    }
      else if (capa == 'mapa_base_awmc') {
         $("#map").css({'background':'#ffffff'});
       var mapBoxBackground = new ol.layer.Tile({
           titulo_es: 'AWMC Background',
           tipo: 'OGC:WMTS',
           queryable : false,
           source: new ol.source.XYZ({
             attributions: "Tiles &copy; <a href='http://mapbox.com/' target='_blank'>MapBox</a> | " +
             "Data &copy; <a href='http://www.openstreetmap.org/' target='_blank'>OpenStreetMap</a> and contributors, CC-BY-SA |"+
             " Tiles and Data &copy; 2013 <a href='http://www.awmc.unc.edu' target='_blank'>AWMC</a>" +
             " <a href='http://creativecommons.org/licenses/by-nc/3.0/deed.en_US' target='_blank'>CC-BY-NC 3.0</a>",
             url: "http://a.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png"
           })
         });
         mapBoxBackground.set('name','mapa_base_awmc');
         mapBoxBackground.setOpacity(1);
         map.getLayers().removeAt(0);
         map.getLayers().insertAt(0,mapBoxBackground);
         map.getView().setMaxZoom(13);
         alert(" El mapa base AWMC se corresponde con el mapa de la Civilización del Mundo Antiguo generado\n a partir del Barrington Atlas, el cual recrea todo el mundo de los griegos y romanos desde las islas\n británicas hasta el subcontinente indio y hasta el norte de África.\n \n IMPORTANTE: sólo deberá cargarse en caso de utilizar datos del Mundo Antiguo.");
      }
      else if (capa == 'esri_world_shaded_relief') {
        $("#map").css({'background':'#ffffff'});
        var capaBaseEsriWSR = new ol.layer.Tile({
          titulo_es: 'Esri World Shaded Relief',
          tipo: 'OGC:WMTS',
          queryable : false,
          source: new ol.source.XYZ({
          attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Shaded_Relief/MapServer">ArcGIS</a>',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
          })
        });
        capaBaseEsriWSR.set('name','esri_world_shaded_relief');
        capaBaseEsriWSR.setOpacity(0.8);
        map.getLayers().removeAt(0);
        map.getLayers().insertAt(0,capaBaseEsriWSR);
        map.getView().setMaxZoom(13);
    }
    else if (capa == 'mapa_base_ign') {
      $("#map").css({'background':'#ffffff'});
      //var projection = ol.proj.get('EPSG:4326');
      var proj3857 = ol.proj.get('EPSG:3857');
      var projectionExtent = proj3857.getExtent();
      var size = ol.extent.getWidth(proj3857.getExtent()) / 256;
      //var size = ol.extent.getWidth(projectionExtent) / 512;
      var resolutions = new Array(18);
      var matrixIds = new Array(18);
      for (var z = 0; z < 18; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        //matrixIds[z] = "EPSG:4326:" + z;
        matrixIds[z] = z;
      }

      var ign = new ol.layer.Tile({
        opacity: 1,
        extent: projectionExtent,
        source: new ol.source.WMTS({
          url: 'http://www.ign.es/wmts/ign-base?',
          layer: 'IGNBaseTodo',
          matrixSet: 'GoogleMapsCompatible',
          //matrixSet: 'EPSG:3857',
          format: 'image/png',
          projection: proj3857,
          tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
          }),
          style: 'default'
        })
      })

      var capaBaseEsriWSR = new ol.layer.Tile({
        titulo_es: 'Esri World Shaded Relief',
        tipo: 'OGC:WMTS',
        queryable : false,
        source: new ol.source.XYZ({
        attributions: '© Inst. Geogr. Nacional <a href="http://www.ign.es/wmts/ign-base?request=GetCapabilities&service=WMTS">IGN</a> | © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/World_Shaded_Relief/MapServer">ArcGIS Tiles Worldmap</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
          'World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
        })
      })

      var capabaseIGN = new ol.layer.Group({
      	layers:[capaBaseEsriWSR, ign],
        queryable : false
      })

      capabaseIGN.set('name','capa_base_ign');
      capabaseIGN.setOpacity(1);
      map.getLayers().removeAt(0);
      map.getLayers().insertAt(0,capabaseIGN);
      map.getView().setMaxZoom(20);
  }
}
