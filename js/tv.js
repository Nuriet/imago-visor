
function ponTV(){
  var tilegrid =  ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 24});
  var sea = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    attributions: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>'+ '© <a href="http://unidadsig.cchs.csic.es/sig/">uSIG</a> ',
    format: new ol.format.MVT(),
    overlaps:true,
    tileGrid: tilegrid,
    tilePixelRatio: 8,
    url: 'http://usig-teselas.cchs.csic.es/data/elem_marinos/{z}/{x}/{y}.pbf?',
    zIndex:-20
  }),
  baseLayer: true,
  declutter:true,
  preload:Infinity,
  updateWhileInteracting:true,
  updateWhileAnimating:true,
  useInterimTilesOnError:true,
});
var ground = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    url: 'http://usig-teselas.cchs.csic.es/data/v3/{z}/{x}/{y}.pbf',
    tilePixelRatio: 8,
  }),
  baseLayer: true,
  declutter:true,
  queryable : false,
  preload:Infinity,
  updateWhileInteracting:true,
  updateWhileAnimating:true,
  useInterimTilesOnError:true,
});

var ground_text = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    url: 'http://usig-teselas.cchs.csic.es/data/v3/{z}/{x}/{y}.pbf',
    tilePixelRatio: 8,
  }),
  zIndex:-5,
  declutter:true,
  queryable : false,
  preload:Infinity,
  updateWhileInteracting:true,
  updateWhileAnimating:true,
  useInterimTilesOnError:true,
});



var styleground = 'js/estilosVT/blue_ground.json'
fetch(styleground).then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyBackground(map, glStyle);
    olms.applyStyle(ground, glStyle, 'openmaptiles').then(function() {
      ground.setOpacity(1);
      ground.setZIndex(-25);
      map.addLayer(ground);
    });
  });
});
var stylesea = 'js/estilosVT/blue_sea.json'
fetch(stylesea).then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(sea, glStyle, 'elementos_marinos').then(function() {
      sea.setOpacity(1);
      sea.setZIndex(-20);
      map.addLayer(sea);
      });
    });
 });
var stylegroundtext = 'js/estilosVT/blue_ground_text.json'
fetch(stylegroundtext).then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(ground_text, glStyle, 'openmaptiles').then(function() {
      ground_text.setOpacity(1);
      ground_text.setZIndex(-5);
      map.addLayer(ground_text);
    });
  });
});

var capaBaseVTusig = new ol.layer.Group({
  layers:[ground, sea, ground_text],
  queryable : false,
});
capaBaseVTusig.set('name','vector_tiles_usig_oceanbasemap');
capaBaseVTusig.set('titulo_es','Vector Tiles uSIG OceanBaseMap');
capaBaseVTusig.setOpacity(1);
  // map.getLayers().removeAt(0);
  // map.getView().setMaxZoom(20);
    map.getLayers().insertAt(0,capaBaseVTusig);
}
