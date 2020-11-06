//ARRAY DE CONTENIDOS DEL MENÚ DE TEMÁTICAS EN EL MENÚ LATERAL izquierdo
//Para añadir nuevo contenido, ver el manual creado. Ahí se explican las reglas de composición de los objetos y sus campos.
var arrayObjetosTematicas = [
  {
    "id": "arq",
    "nombre": "Arqueología",
    "nombre_en": "Archeology",
    "color_fondo": "#FFB299",
    "color_letra_borde": "#DF3A2C",
    "contenido": [
      {
        "nombre": "IDEARQ",
        "nombre_en": "IDEARQ",
        "id": "arq_ide",
        "capas": [
            {
              "nombre": "Carbono 14",
              "nombre_en": "Radiocarbon data",
              "tipo": "wms",
              "ruta": "http://www.idearqueologia.org/idearq/wms?",
              "id": "idearq_c14"
            },{
              "nombre": "Arte rupestre levantino",
              "nombre_en": "Levantine cave art sets",
              "tipo": "wms",
              "ruta": "http://www.idearqueologia.org/idearq/wms?",
              "id": "idearq_cprl"
            },{
              "nombre": "Isótopos",
              "nombre_en": "Isotopes",
              "tipo": "wms",
              "ruta": "http://www.idearqueologia.org/idearq/wms?",
              "id": "idearq_dimp"
            }
      ]
    }
  ]
  }, {
    "id": "car",
    "nombre": "Cartografía antigua",
    "nombre_en": "Old cartography",
    "color_fondo": "#FFFF99",
    "color_letra_borde": "#F3AB00",
    "contenido": [
      {
        "nombre": "Infraestructura Digital De Investigación en las Artes y Humanidades (DARIAH)",
        "nombre_en": "Digital Research Infrastructure for the Arts and Humanities (DARIAH)",
        "id": "car_dar",
        "capas": [
          {
            "nombre": "Mapa histórico administrativo del 2000 AC.",
            "nombre_en": "Historical map pf 2000 BC.",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry2000bc"
          },
          {
            "nombre": "Mapa histórico administrativo del 1000 AC.",
            "nombre_en": "Historical map pf 1000 BC.",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1000bc"
          },
          {
            "nombre": "Mapa histórico administrativo del 500 AC.",
            "nombre_en": "Historical map pf 500 BC.",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry500bc"
          },
          {
            "nombre": "Mapa histórico administrativo del 323 AC.",
            "nombre_en": "Historical map pf 323 BC.",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry323bc"
          },
          {
            "nombre": "Mapa histórico administrativo del 200 AC.",
            "nombre_en": "Historical map pf 200 BC.",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry200bc"
          },
          {
            "nombre": "Mapa histórico administrativo del 1 AC.",
            "nombre_en": "Historical map pf 1 BC.",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1bc"
          },
          {
            "nombre": "Mapa histórico administrativo del 400",
            "nombre_en": "Historical map pf 400",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry400"
          },
          {
            "nombre": "Mapa histórico administrativo del 600",
            "nombre_en": "Historical map pf 600",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry600"
          },
          {
            "nombre": "Mapa histórico administrativo del 800",
            "nombre_en": "Historical map pf 800",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry800"
          },
          {
            "nombre": "Mapa histórico administrativo del 1000",
            "nombre_en": "Historical map pf 1000",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1000"
          },
          {
            "nombre": "Mapa histórico administrativo de 1272",
            "nombre_en": "Historical map pf 1272",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1272"
          },
          {
            "nombre": "Mapa histórico administrativo de 1492",
            "nombre_en": "Historical map pf 1492",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1492"
          },
          {
            "nombre": "Mapa histórico administrativo de 1530",
            "nombre_en": "Historical map pf 1530",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1530"
          },
          {
            "nombre": "Mapa histórico administrativo de 1650",
            "nombre_en": "Historical map pf 1650",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1650"
          },
          {
            "nombre": "Mapa histórico administrativo de 1715",
            "nombre_en": "Historical map pf 1715",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1715"
          },
          {
            "nombre": "Mapa histórico administrativo de 1783",
            "nombre_en": "Historical map pf 1783",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1783"
          },
          {
            "nombre": "Mapa histórico administrativo de 1815",
            "nombre_en": "Historical map pf 1815",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1815"
          },
          {
            "nombre": "Mapa histórico administrativo de 1880",
            "nombre_en": "Historical map pf 1880",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1880"
          },
          {
            "nombre": "Mapa histórico administrativo de 1914",
            "nombre_en": "Historical map pf 1914",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1914"
          },
          {
            "nombre": "Mapa histórico administrativo de 1920",
            "nombre_en": "Historical map pf 1920",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1920"
          },
          {
            "nombre": "Mapa histórico administrativo de 1938",
            "nombre_en": "Historical map pf 1938",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1938"
          },
          {
            "nombre": "Mapa histórico administrativo de 1949",
            "nombre_en": "Historical map pf 1949",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1949"
          },
          {
            "nombre": "Mapa histórico administrativo de 1994",
            "nombre_en": "Historical map pf 1994",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/historic/wms?",
            "id": "cntry1994"
          },
          {
            "nombre": "Mapa histórico administrativo de 2006",
            "nombre_en": "Historical map pf 2006",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/eurostat/wms?",
            "id": "CNTR_RG_03M_2006"
          },
          {
            "nombre": "Mapa histórico administrativo de 2010",
            "nombre_en": "Historical map pf 2010",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/eurostat/wms?",
            "id": "CNTR_RG_03M_2010"
          },
          {
            "nombre": "Mapa histórico administrativo de 2013",
            "nombre_en": "Historical map pf 2013",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/eurostat/wms?",
            "id": "CNTR_RG_03M_2013"
          },
          {
            "nombre": "Mapa histórico administrativo de 2014",
            "nombre_en": "Historical map pf 2014",
            "tipo": "wms",
            "ruta": "https://ref.de.dariah.eu/geoserver/eurostat/wms?",
            "id": "CNTR_RG_03M_2014"
          }
        ]
      },
      {
        "nombre": "Atlas Digital del Imperio Romano (DARE)",
        "nombre_en": "Digital Atlas of Roman Empire (DARE)",
        "id": "car_are",
        "capas": [
          {
              "nombre": "Provincias romanas - Provincias (ca. AD500)",
            "nombre_en": "Roman Provinces - Provinces (ca. AD500)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "90"
          },
          {
              "nombre": "Provincias romanas - Provincias (ca. AD303-324)",
            "nombre_en": "Roman Provinces - Provinces (ca. AD303-324)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "91"
          },
          {
              "nombre": "Provincias romanas - Provincias (ca. AD117)",
            "nombre_en": "Roman Provinces - Provinces (ca. AD117)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "92"
          },
          {
            "nombre": "Ciudades y Asentamientos",
            "nombre_en": "Cities and Settlements",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "99"
          },
          {
            "nombre": "Carreteras y Transporte - Carreteras Romanas",
            "nombre_en": "Roads and Transportation - Roman Roads",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "94"
          },
          {
            "nombre": "Carreteras y Transporte - Puentes",
            "nombre_en": "Roads and Transportation - Bridges",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "98"
          },
          {
            "nombre": "Infraestructuras - Canales",
            "nombre_en": "Infraestructure - Canals",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "104"
          },
          {
            "nombre": "Infraestructuras - Acueductos",
            "nombre_en": "Infraestructure - Aqueducts",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "105"
          }
        ]
      },
      {
        "nombre": "Atlas Digital de la Civilización Medieval (DAMC)",
        "nombre_en": "Digital Atlas of Medieval Civilization (DAMC)",
        "id": "car_amc",
        "capas": [
          {
            "nombre": "Reinos y Ciudades - Reinos (814DC)",
            "nombre_en": "Kindoms & Towns - Kingdoms (ca.AD814)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "34"
          },
          {
            "nombre": "Reinos y Ciudades - Reinos (1000DC)",
            "nombre_en": "Kindoms & Towns - Kingdoms (ca.AD1000)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "13"
          },
          {
            "nombre": "Reinos y Ciudades - Reinos (1200DC)",
            "nombre_en": "Kindoms & Towns - Kingdoms (ca.AD1200)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "9"
          },
          {
            "nombre": "Reinos y Ciudades - Reinos (1450DC)",
            "nombre_en": "Kindoms & Towns - Kingdoms (ca.AD1450)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "5"
          },
          {
            "nombre": "Reinos y Ciudades - Ciudades (814DC)",
            "nombre_en": "Kingdoms & Towns - Major Towns (ca.AD814)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "35"
          },
          {
            "nombre": "Reinos y Ciudades - Ciudades (1000DC)",
            "nombre_en": "Kingdoms & Towns - Major Towns (ca.AD1000)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "14"
          },
          {
            "nombre": "Reinos y Ciudades - Ciudades (1200DC)",
            "nombre_en": "Kingdoms & Towns - Major Towns (ca.AD1200)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "10"
          },
          {
            "nombre": "Reinos y Ciudades - Ciudades (1450dc)",
            "nombre_en": "Kingdoms & Towns - Major Towns (ca.AD1450)",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "6"
          }
        ]
      },
      {
        "nombre": "Mapas antiguos - Otros paises",
        "nombre_en": "Old maps - Other Countries",
        "id": "car_otr",
        "capas": [
          {
            "nombre": "Mapa de Cassini Francia - S.18",
            "nombre_en": "Cassini Map - France C18",
            "tipo": "wms",
            "ruta": "https://ags.cga.harvard.edu/arcgis/services/darmc/roman/MapServer/WMSServer?",
            "id": "1"
          },
          {
            "nombre": "Agroambiente histórico (Kanto) 1:50000 - 1883",
            "nombre_en": "Historical Agro-Environment (Kanto) - 1:5000 1883",
            "tipo": "wms",
            "ruta": "http://www.finds.jp/ws/wms.php?",
            "id": "HAWMS_Kanto",
            "titulo": "Agroambiente histórico (Kanto) 1:50000 - 1883",
            "abstract": "",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },
          {
            "nombre": "Mapa topográfico UK",
            "nombre_en": "Rapid Survey Map UK",
            "tipo": "wmts",
            "ruta": "http://wmts.maptiler.com/aHR0cHM6Ly9ubHMudGlsZXNlcnZlci5jb20vZnBzVVpieHRndGtuL2luZGV4Lmpzb24/wmts?",
            "id": "fpsUZbxtgtkn"
          }
        ]
      },
      {
        "nombre": "Cartografía histórica - España",
        "nombre_en": "Historical cartography - Spain",
        "id": "car_esp",
        "capas": [
          {
            "nombre": "Primera edición MTN25 (1875-1968) IGN",
            "nombre_en": "First edition MTN25 (1875-1968) IGN",
            "tipo": "wmts",
            "ruta": "https://www.ign.es/wmts/primera-edicion-mtn?",
            "id": "mtn25-edicion1"
          },
          {
            "nombre": "Primera edición MTN50 (1875-1968) IGN",
            "nombre_en": "First edition MTN50 (1875-1968) IGN",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/primera-edicion-mtn?",
            "id": "mtn50-edicion1",
            "titulo": "Primera edición MTN25-IGN",
            "abstract": "WMTS IGN",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },
          {
            "nombre": "Vuelo americano (Serie A, 1956-1957) IGN",
            "nombre_en": "Vuelo americano (Serie A, 1956-1957) IGN",
            "tipo": "wms",
            "ruta": "http://fototeca.cnig.es/wms/fototeca.dll?",
            "id": "americano_serie_a"
          },
          {
            "nombre": "Vuelo americano (Serie B, 1956-1957) IGN",
            "nombre_en": "American flight (Serie B, 1956-1957) IGN",
            "tipo": "wms",
            "ruta": "http://www.ign.es/wms/pnoa-historico?",
            "id": "AMS_1956-1957",
            "titulo": "Vuelo americano (Serie B, 1956-1957) IGN",
            "abstract": "IGN",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },
          {
            "nombre": "Ortofoto de Ruiz de Alda de 1929 - Castilla La Mancha",
            "nombre_en": "Ortofoto de Ruiz de Alda de 1929 - Castilla La Mancha",
            "tipo": "wms",
            "ruta": "http://www.chsegura.es/chswmsserver/RuizdeAlda?",
            "id": "0"
          }
        ]
      },
      {
        "nombre": "Mapas antiguos - Madrid",
        "nombre_en": "Old maps - Madrid",
        "id": "car_mad",
        "capas": [
          {
            "nombre": "Plano de Mancelli, 1622",
            "nombre_en": "Map of Mancelli, 1622",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "MancelliMadrid"
          },
          {
            "nombre": "Plano de Texeira, 1656",
            "nombre_en": "Map of Texeira, 1656 ",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "Texeira"
          },
          {
            "nombre": "Plano de Nicolás Chalmadrier, 1761",
            "nombre_en": "Map of Chalmadrier, 1761",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "ChalmadrierMadrid"
          },
          {
            "nombre": "Plano de Espinosa de los Monteros, 1769",
            "nombre_en": "Map of Espinosa de los Monteros, 1769",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "EspinosaMadrid"
          },
          {
            "nombre": "Plano geometrico de Tomás Lopez, 1785",
            "nombre_en": "Geometric map of Tomás Lopez, 1785",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "GeometricoMadrid"
          },
          {
            "nombre": "Plano de Madoz y Coello, 1848",
            "nombre_en": "Map of Madoz y Coello, 1848",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "MadozMadrid"
          },
          {
            "nombre": "Plano parcelario de Ibáñez de Ibero, 1875",
            "nombre_en": "Parcel map of Ibáñez de Ibero, 1875",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "IbanezMadrid"
          },
          {
            "nombre": "Plano de Facundo Cañada, 1900",
            "nombre_en": "Map of Facundo Cañada, 1900",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "FacundoMadrid"
          },
          {
            "nombre": "Plano de Nuñez Granés, 1910",
            "nombre_en": "Map of Nuñez Granés, 1910",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "NunezMadrid"
          },
          {
            "nombre": "Plano parcelario del Ayuntamiento, 1929",
            "nombre_en": "Parcel map of the city council, 1929",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "AyuntamientoMadrid"
          },
          {
            "nombre": "Plano parcelario de Madrid, 1940-1960",
            "nombre_en": "Parcel map of Madrid, 1940-1960",
            "tipo": "wmts",
            "ruta": "http://www.ign.es/wmts/planos?",
            "id": "ParcelarioMadrid"
          },
          {
            "nombre": "Red de transporte en Madrid (1990)",
            "nombre_en": "Transport network in Madrid (1990)",
            "tipo": "geojson",
            "ruta": "./datos/madrid/red_transporte.geojson",
            "id": "car_mad_tra",
            "titulo": "Red de transporte en Madrid (1900)",
            "abstract": "Abstract a completar MADRID 1900",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "https://seiyria.com/bootstrap-slider/",
            "queryable": true
          },
          {
            "nombre": "Puntos de interés histórico en Madrid (1900)",
            "nombre_en": "Points of Historical interest in Madrid (1900)",
            "tipo": "geojson",
            "ruta": "./datos/madrid/ptos_interes.geojson",
            "id": "car_mad_pto",
            "titulo": "Puntos de interés histórico en Madrid (1900)",
            "abstract": "Abstract a completar MADRID 1900",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },
          {
            "nombre": "Distritos y barrios en Madrid (1900)",
            "nombre_en": "Districts and neighbourhoods in Madrid (1900)",
            "tipo": "geojson",
            "ruta": "./datos/madrid/barrios_distritos00.geojson",
            "id": "car_mad_db0",
            "titulo": "Distritos y barrios en Madrid (1900)",
            "abstract": "Abstract a completar MADRID distritos y barrios 1900",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },
          {
            "nombre": "Valor del suelo en Madrid (1900)",
            "nombre_en": "Land value in Madrid (1900)",
            "tipo": "geojson",
            "ruta": "./datos/madrid/calles_valor.geojson",
            "id": "car_mad_vsu",
            "titulo": "Valor del suelo en Madrid (1900)",
            "abstract": "Abstract a completar MADRID valor",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          }
        ]
      },
      {
        "nombre": "Mapas antiguos - Andalucía",
        "nombre_en": "Old maps - Andalusia",
        "id": "car_and",
        "capas": [
          {
            "nombre": "Mapa de Andalucía 1:50.000 1940-1944, Ejército Alemán",
            "nombre_en": "Map of Andalusia 1:50.000 1940-1944, German Army",
            "tipo": "wms",
            "ruta": "http://www.ideandalucia.es/wms/mta50r_aleman_1944?",
            "id": "MTA50a_1940"
          }
        ]
      },
      {
        "nombre": "Mapas antiguos - Zaragoza",
        "nombre_en": "Old maps - Zaragoza",
        "id": "car_zar",
        "capas": [
          {
            "nombre": "Cartografía histórica, AZM_4-2_0024 (1712)",
            "nombre_en": "Old cartography, AZM_4-2_0024 (1712)",
            "tipo": "wms",
            "ruta": "https://node2.idezar.es/geoserver/ows?",
            "id": "AMZ_4-2_0024"
          },
          {
            "nombre": "Cartografía histórica, AZM_4-2_0005 (1808-1809)",
            "nombre_en": "Old cartography, AZM_4-2_0005 (1808-1809)",
            "tipo": "wms",
            "ruta": "https://node2.idezar.es/geoserver/ows?",
            "id": "AMZ_4-2_0005"
          },
          {
            "nombre": "Cartografía histórica, AZM_4-2_0072_002 (1880)",
            "nombre_en": "Old cartography, AZM_4-2_0072_002 (1880)",
            "tipo": "wms",
            "ruta": "https://node2.idezar.es/geoserver/ows?",
            "id": "AMZ_4-2_0072_002"
          },
          {
            "nombre": "Cartografía histórica, AZM_4-2_0072_001 (1890)",
            "nombre_en": "Old cartography, AZM_4-2_0072_001 (1890)",
            "tipo": "wms",
            "ruta": "https://node2.idezar.es/geoserver/ows?",
            "id": "AMZ_4-2_0072_001"
          },
          {
            "nombre": "Cartografía histórica, AZM_4-2_0080_0001 (1908)",
            "nombre_en": "Old cartography, AZM_4-2_0080_0001 (1908)",
            "tipo": "wms",
            "ruta": "https://node2.idezar.es/geoserver/ows?",
            "id": "AMZ_4-2_0080_0001"
          }
        ]
      }
    ]
  }, {
    "id": "hic",
    "nombre": "Historia",
    "nombre_en": "History",
    "color_fondo": "#C0F9F9",
    "color_letra_borde": "#00ADAD",
    "contenido": [
      {
        "nombre": "Historia de la ciencia",
        "nombre_en": "History of Science",
        "id": "hic_cie",
        "capas": [
          {
            "nombre": "Movilidad de profesores JAE - Ciencias naturales y de la salud (1907–1936)",
            "nombre_en": "Mobility of college professors granted by JAE - Natural Science (1907–1936)",
            "tipo": "geojson",
            "ruta": "./datos/jae_educa/ciencias_naturales_salud.geojson",
            "id": "hic_xxx_cns",
            "titulo": "Movilidad profesores - Ciencias Naturales",
            "abstract": "Abstract a completar JAE EDUCA",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Movilidad de profesores JAE - Lenguas vivas (1907–1936)",
            "nombre_en": "Mobility of college professors granted by JAE - Modern languages(1907–1936)",
            "tipo": "geojson",
            "ruta": "./datos/jae_educa/lenguas_vivas.geojson",
            "id": "hic_xxx_len",
            "titulo": "Movilidad profesores - Lenguas Vivas",
            "abstract": "Abstract a completar JAE EDUCA",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Movilidad de profesores JAE - Artes y oficios (1907–1936)",
            "nombre_en": "Mobility of college professors granted by JAE - Arts and professions (1907–1936)",
            "tipo": "geojson",
            "ruta": "./datos/jae_educa/artes_oficios.geojson",
            "id": "hic_xxx_art",
            "titulo": "Movilidad profesores - Artes y Oficios",
            "abstract": "Abstract a completar JAE EDUCA",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Movilidad de profesores JAE - Humanidades y Ciencias Sociales (1907–1936)",
            "nombre_en": "Mobility of college professors granted by JAE - Humanities and Social Science (1907–1936)",
            "tipo": "geojson",
            "ruta": "./datos/jae_educa/humanidades_ciencias_sociales.geojson",
            "id": "hic_xxx_hum",
            "titulo": "Movilidad profesores - Humanidades y Ciencias Sociales",
            "abstract": "Abstract a completar JAE EDUCA",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Movilidad de profesores JAE - Lenguas Clásicas (1907–1936)",
            "nombre_en": "Mobility of college professors granted by JAE - Classical Languages (1907–1936)",
            "tipo": "geojson",
            "ruta": "./datos/jae_educa/lenguas_clasicas.geojson",
            "id": "hic_xxx_cla",
            "titulo": "Movilidad profesores - Lenguas Clásicas",
            "abstract": "Abstract a completar JAE EDUCA",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Movilidad de profesores JAE - Ciencias Puras (1907–1936)",
            "nombre_en": "Mobility of college professors granted by JAE - Pure Science (1907–1936)",
            "tipo": "geojson",
            "ruta": "./datos/jae_educa/ciencias_puras.geojson",
            "id": "hic_xxx_cie",
            "titulo": "Movilidad profesores - Ciencias Puras",
            "abstract": "Abstract a completar JAE EDUCA",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          }
        ]
      }
    ]
  }, 
  {
    "id": "pob",
    "nombre": "Población",
    "nombre_en": "Community",
    "color_fondo": "#E9A5E9",
    "color_letra_borde": "#7D3280",
    "contenido": [
      {
        "nombre": "ENVEJECIMIENTO",
        "nombre_en": "AGING",
        "id": "pob_env",
        "capas": [
      // {
      //   "nombre": "SIGMAYORES Centros de Servicios Sociales",
      //   "nombre_en": "SIGMAYORES Social Service Centres",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/cmss.geojson",
      //   "id": "pob_xxx_css",
      //   "titulo": "Centros de servicios sociales",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": false
      // },{
      //   "nombre": "SIGMAYORES Residencias",
      //   "nombre_en": "SIGMAYORES Housing",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/residencias.geojson",
      //   "id": "pob_xxx_res",
      //   "titulo": "Residencias",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": false
      // },{
      //   "nombre": "SIGMAYORES Centros INSS",
      //   "nombre_en": "SIGMAYORES Specialized Administration Offices",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/inss.geojson",
      //   "id": "pob_xxx_ins",
      //   "titulo": "Centros INSS",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": false
      // },{
      //   "nombre": "SIGMAYORES Centros de día",
      //   "nombre_en": "SIGMAYORES Specialized Service Of Social Protection",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/centros_dia.geojson",
      //   "id": "pob_xxx_dia",
      //   "titulo": "Centros de día",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": false
      // },{
      //   "nombre": "SIGMAYORES Consultorios",
      //   "nombre_en": "SIGMAYORES General Medical Services",
      //   "tipo": "wms",
      //   "ruta": "http://www.sigmayores.csic.es/ArcGIS/services/Rec-Sanitarios/MapServer/WMSServer?",
      //   "id": "US.generalMedicalService"
      // },{
      //   "nombre": "SIGMAYORES Centros de salud",
      //   "nombre_en": "SIGMAYORES Specialized Medical Services",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/centros_salud.geojson",
      //   "id": "pob_xxx_sal",
      //   "titulo": "Centros de salud",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": false
      // },{
      //   "nombre": "SIGMAYORES Hospitales",
      //   "nombre_en": "SIGMAYORES Hospital Services",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/hospitales.geojson",
      //   "id": "pob_xxx_hos",
      //   "titulo": "Hospitales",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": false
      // },
      // {
      //   "nombre": "Densidad de población por provincias",
      //   "nombre_en": "Population density by provinces",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/provincias.geojson",
      //   "id": "pob_xxx_den",
      //   "titulo": "Densidad de población",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": true
      // },{
      //   "nombre": "Población mayor o igual a 100 años por provincias",
      //   "nombre_en": "Population of 100 and over by provinces",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/provincias.geojson",
      //   "id": "pob_xxx_p00",
      //   "titulo": "Población mayor o igual a 100 años",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": true
      // },{
      //   "nombre": "Población mayor o igual a 85 años por provincias",
      //   "nombre_en": "Population of 85 and over by provinces",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/provincias.geojson",
      //   "id": "pob_xxx_p85",
      //   "titulo": "Población mayor o igual a 85 años",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": true
      // },{
      //   "nombre": "Población mayor o igual a 65 años por provincias",
      //   "nombre_en": "Population of 65 and over by provinces",
      //   "tipo": "geojson",
      //   "ruta": "./datos/ebi/provincias.geojson",
      //   "id": "pob_xxx_p65",
      //   "titulo": "Población mayor o igual a 65 años",
      //   "abstract": "Abstract a completar EBI",
      //   "tipo_leyenda": "imagen",
      //   "ruta_descarga": "",
      //   "queryable": true
      // },
         {
          "nombre": "Ratio de mayores de 100 años por municipios (2002-2013)",
          "nombre_en": "Ratio of 100 and over by municipalities (2002-2013)",
          "tipo": "geojson",
          "ruta": "./datos/ebi/municipios.geojson",
          "id": "pob_xxx_r00",
          "titulo": "Ratio de mayores de 100 años (2002-2013)",
          "abstract": "Abstract a completar EBI",
          "tipo_leyenda": "imagen",
          "ruta_descarga": "",
          "queryable": true
         },{
          "nombre": "Ratio de mayores de 95 años por municipios (2002-2013)",
          "nombre_en": "Ratio of 95 and over by municipalities (2002-2013)",
          "tipo": "geojson",
          "ruta": "./datos/ebi/municipios.geojson",
          "id": "pob_xxx_r95",
          "titulo": "Ratio de mayores de 95 años (2002-2013)",
          "abstract": "Abstract a completar EBI",
          "tipo_leyenda": "imagen",
          "ruta_descarga": "",
          "queryable": true
         },{
          "nombre": "Ratio de mayores de 90 años por municipios (2002-2013)",
          "nombre_en": "Ratio of 90 and over by municipalities (2002-2013)",
          "tipo": "geojson",
          "ruta": "./datos/ebi/municipios.geojson",
          "id": "pob_xxx_r90",
          "titulo": "Ratio de mayores de 90 años (2002-2013)",
          "abstract": "Abstract a completar EBI",
          "tipo_leyenda": "imagen",
          "ruta_descarga": "",
          "queryable": true
         },{
          "nombre": "Índice de longevidad por municipios (2002-2013)",
          "nombre_en": "Longevity index by municipalities (2002-2013)",
          "tipo": "geojson",
          "ruta": "./datos/ebi/municipios.geojson",
          "id": "pob_xxx_lon",
          "titulo": "Índice de longevidad (2002-2013)",
          "abstract": "Abstract a completar EBI",
          "tipo_leyenda": "imagen",
          "ruta_descarga": "",
          "queryable": true
         },{
          "nombre": "Índice de ultralongevidad por municipios (2002-2013)",
          "nombre_en": "Ultra-longevity index by municipalities (2002-2013)",
          "tipo": "geojson",
          "ruta": "./datos/ebi/municipios.geojson",
          "id": "pob_xxx_ult",
          "titulo": "Índice de ultralongevidad (2002-2013)",
          "abstract": "Abstract a completar EBI",
          "tipo_leyenda": "imagen",
          "ruta_descarga": "",
          " queryable": true
         },{
          "nombre": "Índice de concentración etárea por municipios (2002-2013)",
          "nombre_en": "Age concentration index by municipalities (2002-2013)",
          "tipo": "geojson",
          "ruta": "./datos/ebi/municipios.geojson",
          "id": "pob_xxx_ice",
          "titulo": "Índice de concentración etárea (2002-2013)",
          "abstract": "Abstract a completar EBI",
          "tipo_leyenda": "imagen",
          "ruta_descarga": "",
          "queryable": true
         }
        ]
      }
    ]
  },
  {
    "id": "ant",
    "nombre": "Antropología",
    "nombre_en": "Anthropology",
    "color_fondo": "#D4C7F8",
    "color_letra_borde": "#5F3FA8",
    "contenido": [
      {
        "nombre": "EVONATUR",
        "nombre_en": "EVONATUR",
        "id": "ant_evo",
        "capas": [
          {
            "nombre": "Ocupación del Suelo - Parque Regional de Gredos (1990)",
            "nombre_en": "Land Cover Gredos Regional Park (1990)",
            "tipo": "geojson",
            "ruta": "./datos/evonatur/ocup_90.geojson",
            "id": "ant_xxx_o90",
            "titulo": "Ocupación del Suelo 1990 Parque Regional de Gredos",
            "abstract": "Abstract a completar OCUPACIÓN DEL SUELO 1990",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Ocupación del Suelo - Parque Regional de Gredos (2000)",
            "nombre_en": "Land Cover Gredos Regional Park (2000)",
            "tipo": "geojson",
            "ruta": "./datos/evonatur/ocup_00.geojson",
            "id": "ant_xxx_o00",
            "titulo": "Ocupación del Suelo 2000 Parque Regional de Gredos",
            "abstract": "Abstract a completar OCUPACIÓN DEL SUELO 2000",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Ocupación del Suelo - Parque Regional de Gredos (2006)",
            "nombre_en": "Land Cover Gredos Regional Park (2006)",
            "tipo": "geojson",
            "ruta": "./datos/evonatur/ocup_06.geojson",
            "id": "ant_xxx_o06",
            "titulo": "Ocupación del Suelo - 2006 Parque Regional de Gredos",
            "abstract": "Abstract a completar OCUPACIÓN DEL SUELO 2006",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Ocupación del Suelo - Parque Regional de Gredos (2012)",
            "nombre_en": "Land Cover Gredos Regional Park (2012)",
            "tipo": "geojson",
            "ruta": "./datos/evonatur/ocup_12.geojson",
            "id": "ant_xxx_o12",
            "titulo": "Ocupación del Suelo 2012 Parque Regional de Gredos",
            "abstract": "Abstract a completar OCUPACIÓN DEL SUELO 2012",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          }
        ]
      }
      // ,
      // {
      //   "nombre": "MEMORIA HISTÓRICA",
      //   "nombre_en": "MAPA DE FOSAS",
      //   "id": "ant_his",
      //   "capas": [
      //     {
      //       "nombre": "Mapa de fosas (Ministerio de Justicia)",
      //       "nombre_en": "Map of Graves (Ministery of Justice )",
      //       "tipo": "geojson",
      //       "ruta": "./datos/fosas_justicia/fosas_mjust.geojson",
      //       "id": "ant_his_fos",
      //       "titulo": "Mapa de fosas 2011",
      //       "abstract": "Map of Graves 2011",
      //       "tipo_leyenda": "imagen",
      //       "ruta_descarga": "",
      //       "queryable": true
      //     }
      //   ]
      // }
    ]
  },
  {
    "id": "med",
    "nombre": "Medio rural y natural",
    "nombre_en": "Rural and natural environment",
    "color_fondo": "#D0FF99",
    "color_letra_borde": "#5FB323",
    "contenido": [
      {
        "nombre": "EXTERSIAL",
        "nombre_en": "EXTERSIAL",
        "id": "med_ext",
        "capas": [
          {
            "nombre": "Municipios en DOPs olivar",
            "nombre_en": "Municipalities in olive DPOs",
            "tipo": "geojson",
            "ruta": "./datos/extersial/municipios.geojson",
            "id": "med_xxx_mun",
            "titulo": "Municipios",
            "abstract": "Abstract a completar EXTERSIAL",
            "tipo_leyenda": "vectorial",
            "info_estilo": ['MultiPolygon','transparent','#491600'],
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Erosión laminar potencial en DOPs olivar (1990-2012)",
            "nombre_en": "Potential soil erosion in olive DPOs (1990-2012)",
            "tipo": "geojson",
            "ruta": "./datos/extersial/erosion.geojson",
            "id": "med_xxx_ero",
            "titulo": "Erosión laminar potencial (1990-2012)",
            "abstract": "Abstract a completar EXTERSIAL",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": false
          },{
            "nombre": "Almazaras (localización) en DOPs olivar (1990-2012)",
            "nombre_en": "Oil mills (location) in olive DPOs (1990-2012)",
            "tipo": "geojson",
            "ruta": "./datos/extersial/almazaras_punto.geojson",
            "id": "med_xxx_alp",
            "titulo": "Almazaras (localización)(1990-2012)",
            "abstract": "Abstract a completar EXTERSIAL",
            "tipo_leyenda": "vectorial",
            "info_estilo": ['Point','#fe9929','#8c2d04'],
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Almazaras (áreas de influencia) en DOPs olivar (1990-2012)",
            "nombre_en": "Oil mills (area of influence) in olive DPOs (1990-2012)",
            "tipo": "geojson",
            "ruta": "./datos/extersial/almazaras_thiessen.geojson",
            "id": "med_xxx_alt",
            "titulo": "Almazaras (áreas de influencia) (1990-2012)",
            "abstract": "Abstract a completar EXTERSIAL",
            "tipo_leyenda": "vectorial",
            "info_estilo": ['MultiPolygon','#c7f2a9','#597a43'],
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Habitats naturales y seminaturales en DOPs olivar (1990-2012)",
            "nombre_en": "Natural and semi-natural habitats in olive DPOs (1990-2012)",
            "tipo": "geojson",
            "ruta": "./datos/extersial/habitats.geojson",
            "id": "med_xxx_hab",
            "titulo": "Hábitats naturales y seminaturales (1990-2012)",
            "abstract": "Abstract a completar EXTERSIAL",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": true
          },{
            "nombre": "Tipología de parcelas en DOPs olivar (1990-2012)",
            "nombre_en": "Plots typology in olive DPOs (1990-2012)",
            "tipo": "geojson",
            "ruta": "./datos/extersial/tipo_parc.geojson",
            "id": "med_xxx_tip",
            "titulo": "Tipología de parcelas de olivar (1990-2012)",
            "abstract": "Abstract a completar EXTERSIAL",
            "tipo_leyenda": "imagen",
            "ruta_descarga": "",
            "queryable": false
          }
        ]
      }
    ]
  },
  {
    "id": "leng",
    "nombre": "Lengua y literatura",
    "nombre_en": "Language and literature",
    "color_fondo": "#FFD5AA",
    "color_letra_borde": "#ED7500",
    "contenido": []
  },
  /*{
    "id": "eco",
    "nombre": "Economía",
    "nombre_en": "Economy",
    "color_fondo": "#8AD0FF",
    // #9BCDFF",
    "color_letra_borde": "#006DB4",
    "contenido": []
  }*/
  {
    "id": "envej",
    "nombre": "ENVEJECIMIENTO sigMayores",
    "nombre_en": "AGING",
    "color_fondo": "#E9A5E9",
    "color_letra_borde": "#7D3280",
    "contenido": [
              
          {
            "nombre": "Recursos Sanitarios : Consultorios",
            "nombre_en": "General Medical Services",
            "tipo": "wms",
            "ruta": "http://www.sigmayores.csic.es/ArcGIS/services/Rec-Sanitarios/MapServer/WMSServer?",
            "id": "US.generalMedicalService"
          },
               
          {
            "nombre": "Recursos Sanitarios :  Centros de Salud",
            "nombre_en": "Specialized Medical Services",
            "tipo": "wms",
            "ruta": "http://www.sigmayores.csic.es/ArcGIS/services/Rec-Sanitarios/MapServer/WMSServer?",
            "id": "US.specializedMedicalService"
          },
          {
            "nombre": "Recursos Sanitarios :  Hospitales",
            "nombre_en": "Hospital Services",
            "tipo": "wms",
            "ruta": "http://www.sigmayores.csic.es/ArcGIS/services/Rec-Sanitarios/MapServer/WMSServer?",
            "id": "US.hospitalService"
          },
          {
            "nombre": "Recursos Sociales : Centros Servicios Sociales (CSSM)",
            "nombre_en": "Social Services",
            "tipo": "wms",
            "ruta": "http://www.sigmayores.csic.es/ArcGIS/services/Rec-Sociales/MapServer/WMSServer?",
            "id": "US.socialService"
          },
          {
            "nombre": "Recursos Sociales : Centros INSS",
            "nombre_en": "Specialized Administration Office",
            "tipo": "wms",
            "ruta": "http://www.sigmayores.csic.es/ArcGIS/services/Rec-Sociales/MapServer/WMSServer?",
            "id": "US.specialicedAdministrationOffice"
          },
          {
            "nombre": "Recursos Sociales : Centros de día",
            "nombre_en": "Specialized Service Of Social Protection",
            "tipo": "wms",
            "ruta": "http://www.sigmayores.csic.es/ArcGIS/services/Rec-Sociales/MapServer/WMSServer?",
            "id": "US.specializedServiceOfSocialProtection"
          },
          {
            "nombre": "Recursos Sociales : Residencias",
            "nombre_en": "Housing",
            "tipo": "wms",
            "ruta": "http://www.sigmayores.csic.es/ArcGIS/services/Rec-Sociales/MapServer/WMSServer?",
            "id": "US.housing"
          }
      
    
  ]
}
];
