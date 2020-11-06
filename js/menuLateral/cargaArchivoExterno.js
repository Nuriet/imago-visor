//CARGA DE ARCHIVOS EXTERNOS:
/* Se puede realizar desde el input de selección "Examinar"; o arrastrando el archivo al div "zonaArrastrar" */

//Función CargarArchivoExternoExaminar(evt)
/*
FUNCIONALIDAD:
  Permite cargar archivos desde el input "Examinar", gestionando los datos de diferente manera en función del formato de archivo subido por el usuario.
*/
function CargarArchivoExternoExaminar(evt) {
  //Lista de objetos subidos por el usuario:
  var files = evt.target.files;
  //Recorrer todos los archivos cargados a la vez:
  for (var i = 0, f; f = files[i]; i++) {
    //A) Comprobar el tamaño del fichero y sólo permitir la carga si es menor de lo indicado en la variable "tamanoMaximoArchivo":
    //A1) Tamaño de archivo adecuado:
    if (f.size < tamanoMaximoArchivo){
      //B) En función del tipo de formato del archivo:
      //B1) Archivo geojson
      if (f.name.indexOf('.geojson')!= -1){
        //Creación del lector de archivos:
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        //Ejecución del lector de archivos:
        reader.onload = (function(theFile) {
          return function(e) {
            var data = JSON.parse(e.target.result);
            //Crear el nombre que se utilizará para la capa (quitando la extensión):
            var nombreArchivoConExtension = theFile.name;
            var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
            //Ejecutar la función cargarCapa():
            CargarCapa('geojson','','','menuBusqueda',data,nombreArchivo,'','','','',1,true);
          };
        })(f);

      //B2) Archivo zip (6 o 7 archivos para shapefile comprimidos)
      } else if (f.name.indexOf('.zip')!= -1) {
        //Crear el nombre que se utilizará para la capa (quitando la extensión):
        var nombreArchivoConExtension = f.name;
        var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
        //Se ejecuta la función para convertir desde .zip (con los 7 archivos del shp comprimidos) hasta geojson:
        loadshp({
          url: f,
          encoding: 'UTF-8',
          EPSG: 4326
        }, function(data) {
        //Ejecutar la función cargarCapa(), siendo el tipo de archivo geojson:
          CargarCapa('geojson','','','menuBusqueda',data,nombreArchivo,'','','','',1,true);
        });

      //B3) Archivo kml
      } else if (f.name.indexOf('.kml')!= -1) {
        //Creación del lector de archivos:
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        //Ejecución del lector de archivos:
        reader.onload = (function(theFile) {
          return function(e) {
            var data = $.parseXML(e.target.result);
            //Crear el nombre que se utilizará para la capa (quitando la extensión):
            var nombreArchivoConExtension = theFile.name;
            var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
            //Ejecutar la función cargarCapa(), siendo el tipo de archivo kml:
            CargarCapa('kml','','','menuBusqueda',data,nombreArchivo,'','','','',1,false);
          };
        })(f);

      //B4) Archivo kmz
      } else if (f.name.indexOf('.kmz')!= -1) {
        //Crear el nombre que se utilizará para la capa (quitando la extensión):
        var nombreArchivoConExtension = f.name;
        var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
        //Descomprimir el archivo .kmz para obtener el archivo .kml:
        //(necesarios todos los archivos incluidos en "js/fuente/zip")
        zip.createReader(new zip.BlobReader(f), function(reader) {
          reader.getEntries(function(entries) {
            if (entries.length) {
              //Bucle para recorrer todos los archivos existentes dentro del archivo comprimido y encontrar el .kml:
              for (var i=0; i<entries.length; i++){
                if (entries[i].filename.indexOf('.kml') != -1){
                  entries[i].getData(new zip.TextWriter(), function(text) {
                    var data = $.parseXML(text);
                    //Ejecutar la función cargarCapa(), siendo el tipo de archivo kml:
                    CargarCapa('kml','','','menuBusqueda',data,nombreArchivo,'','','','',1,false);
                    reader.close(function() {
                    });
                  }, function(current, total) {
                  });
                }
              }
            }
          });
        }, function(error) {
        });

      //B5) Archivo gpx
      } else if (f.name.indexOf('.gpx')!= -1) {
        //Creación del lector de archivos:
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        //Ejecución del lector de archivos:
        reader.onload = (function(theFile) {
          return function(e) {
            var data = $.parseXML(e.target.result);
            //Crear el nombre que se utilizará para la capa (quitando la extensión):
            var nombreArchivoConExtension = theFile.name;
            var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
            //Ejecutar la función cargarCapa(), siendo el tipo de archivo kml:
            CargarCapa('gpx','','','menuBusqueda',data,nombreArchivo,'','','','',1,false);
          };
        })(f);

      //B6) Cualquier otro tipo de archivo:
      } else {
        alert(alertFormatoNoValido);
      }
    // A2) Tamaño de archivo no adecuado:
    } else {
      alert(alertArchivoDemasiadoPesado);
    }
  }
}

//Función CargarArchivoExternoArrastrar(evt)
/*
FUNCIONALIDAD:
  Permite cargar archivos al arrastrarlos al div "zonaArrastrar", gestionando los datos de diferente manera en función del formato de archivo subido por el usuario.
*/
function CargarArchivoExternoArrastrar(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files;
  //Recorrer todos los archivos cargados a la vez:
  for (var i = 0, f; f = files[i]; i++) {
    //A) Comprobar el tamaño del fichero y sólo permitir la carga si es menor de lo indicado en la variable "tamanoMaximoArchivo":
    //A1) Tamaño de archivo adecuado:
    if (f.size < tamanoMaximoArchivo){
      //B) Comprobar el tipo de formato del archivo:
      //B1) Archivo geojson
      if (f.name.indexOf('.geojson')!= -1){
        //Creación del lector de archivos:
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        //Ejecución del lector de archivos:
        reader.onload = (function(theFile) {
          return function(e) {
            var data = JSON.parse(e.target.result);
            //Crear el nombre que se utilizará para la capa (quitando la extensión):
            var nombreArchivoConExtension = theFile.name;
            var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
            //Ejecutar la función cargarCapa():
            CargarCapa('geojson','','','menuBusqueda',data,nombreArchivo,'','','','',1,true);
          };
        })(f);

      //B2) Archivo zip (6 o 7 archivos para shapefile comprimidos)
      } else if (f.name.indexOf('.zip')!= -1) {
        //Crear el nombre que se utilizará para la capa (quitando la extensión):
        var nombreArchivoConExtension = f.name;
        var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
        //Se ejecuta la función para convertir desde .zip (con los 7 archivos del shp comprimidos) hasta geojson:
        loadshp({
          url: f,
          encoding: 'UTF-8',
          EPSG: 4326
        }, function(data) {
        //Ejecutar la función cargarCapa(), siendo el tipo de archivo geojson:
          CargarCapa('geojson','','','menuBusqueda',data,nombreArchivo,'','','','',1,true);
        });

      //B3) Archivo kml
      } else if (f.name.indexOf('.kml')!= -1) {
        //Creación del lector de archivos:
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        //Ejecución del lector de archivos:
        reader.onload = (function(theFile) {
          return function(e) {
            var data = $.parseXML(e.target.result);
            //Crear el nombre que se utilizará para la capa (quitando la extensión):
            var nombreArchivoConExtension = theFile.name;
            var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
            //Ejecutar la función cargarCapa(), siendo el tipo de archivo kml:
            CargarCapa('kml','','','menuBusqueda',data,nombreArchivo,'','','','',1,false);
          };
        })(f);

      //B4) Archivo kmz
      } else if (f.name.indexOf('.kmz')!= -1) {
        //Crear el nombre que se utilizará para la capa (quitando la extensión):
        var nombreArchivoConExtension = f.name;
        var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
        //Descomprimir el archivo .kmz para obtener el archivo .kml:
        //(necesarios todos los archivos incluidos en "js/fuente/zip")
        zip.createReader(new zip.BlobReader(f), function(reader) {
          reader.getEntries(function(entries) {
            if (entries.length) {
              //Bucle para recorrer todos los archivos existentes dentro del archivo comprimido y encontrar el .kml:
              for (var i=0; i<entries.length; i++){
                if (entries[i].filename.indexOf('.kml') != -1){
                  entries[i].getData(new zip.TextWriter(), function(text) {
                    var data = $.parseXML(text);
                    //Ejecutar la función cargarCapa(), siendo el tipo de archivo kml:
                    CargarCapa('kml','','','menuBusqueda',data,nombreArchivo,'','','','',1,false);
                    reader.close(function() {
                    });
                  }, function(current, total) {
                  });
                }
              }
            }
          });
        }, function(error) {
        });

      //B5) Archivo gpx
      } else if (f.name.indexOf('.gpx')!= -1) {
        //Creación del lector de archivos:
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        //Ejecución del lector de archivos:
        reader.onload = (function(theFile) {
          return function(e) {
            var data = $.parseXML(e.target.result);
            //Crear el nombre que se utilizará para la capa (quitando la extensión):
            var nombreArchivoConExtension = theFile.name;
            var nombreArchivo = nombreArchivoConExtension.slice(0, nombreArchivoConExtension.indexOf('.'));
            //Ejecutar la función cargarCapa(), siendo el tipo de archivo kml:
            CargarCapa('gpx','','','menuBusqueda',data,nombreArchivo,'','','','',1,false);
          };
        })(f);

      //B6) Cualquier otro tipo de archivo:
      } else {
        alert(alertFormatoNoValido);
      }
    // A2) Tamaño de archivo no adecuado:
    } else {
      alert(alertArchivoDemasiadoPesado);
    }
  }
}

//Función necesaria para que no se habra una ventana nueva con la lectura del archivo cargado:
function GestionCargaArchivoExternoArrastrar(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

//Función a ejecutar en el "onload" del body, para "activar" los listeners que permiten cargar archivos externos; tanto en el input "selectorArchivos" como en el div "zonaArrastrar":
function ActivarListenerArchivosExternos(){
  //Añadir el "listener" al cuadro de selección de archivo a cargar:
  document.getElementById('selectorArchivos').addEventListener('change', CargarArchivoExternoExaminar, false);
  //Añadir los "listeners" al div para arrastrar archivos:
  document.getElementById('zonaArrastrar').addEventListener('dragover', GestionCargaArchivoExternoArrastrar, false);
  document.getElementById('zonaArrastrar').addEventListener('drop', CargarArchivoExternoArrastrar, false);
}
