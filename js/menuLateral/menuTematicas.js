//FUNCIÓN CargarTematicas(idioma)
/*
ENTRADAS:
  idioma: variable que habrá cogido su valor al clickar sobre los botones de selección de idioma (archivo ponerIdioma.js). Por defecto: 'es'.
FUNCIONALIDAD:
  Crea un cuadrado por cada temática y un submenú asociado, que sólo se mostrará cuando se ejecute la función AparecerSubmenuTematicaNumi(idTematica,colorFondo,colorLetraBorde),
  a la que se llama desde los propios elementos creados aquí.
*/

function CargarTematicas(idioma){
  //Primero elimina todas las temáticas o submenús que pudieran existir (antes de crear las nuevas) y el propio contenedor:
  //Muy importante para evitar duplicados cada vez que se recrea el menú:
  $("[id*=tematica]").remove();
  $("[id*=submenutematica]").remove();
  $("[id*=contenedorTematicas]").remove();

  //Se crea el contenedor de temáticas, y se le asignan sus atributos:
  //Las dimensiones se calculan a partir de la variable dimensionTematicai, que guarda el alto y ancho que deben tener cada cuadrado (en el archivo configuracionBasica.js).
  var contenedorTematicas = document.createElement("div");
  contenedorTematicas.setAttribute("id","contenedorTematicas");
  contenedorTematicas.setAttribute("class","row m-0 p-0 justify-content-center");
  alturaTematicas = (Math.floor(arrayObjetosTematicas.length/2))*dimensionTematicai*1.05;
  alturaMaximaColapsable = alturaSidebar - 200;
  contenedorTematicas.setAttribute("style","height:" + Math.min(alturaTematicas,alturaMaximaColapsable) + "px;display:flex;");
  document.getElementById("espMenuTematicas").appendChild(contenedorTematicas);

  //Variable para obtener un tamaño algo menor:
  var dimensionTematicaiReducida = dimensionTematicai - 1;

  //Crear un cuadrado y un submenú por cada temática:
  for (var i=0; i<arrayObjetosTematicas.length; i++){
    //Crear un cuadrado por cada temática:
    var tematicaNumi = document.createElement("a");
    if (idioma == 'en'){
      tematicaNumi.innerHTML = '<div class="row m-0 p-1" style="height:100%;"><h4 class="col-12 m-0 p-0 align-self-center">' + arrayObjetosTematicas[i].nombre_en.toUpperCase() + '</h4></div>';
    } else {
      tematicaNumi.innerHTML = '<div class="row m-0 p-1" style="height:100%;"><h4 class="col-12 m-0 p-0 align-self-center">' + arrayObjetosTematicas[i].nombre.toUpperCase() + '</h4></div>';
    }
    var idTematicaNumi = "tematica" + arrayObjetosTematicas[i].id;
    tematicaNumi.setAttribute("id",idTematicaNumi);
    tematicaNumi.setAttribute("class","card m-1 p-0");
    tematicaNumi.setAttribute("style","position:relative;height:" + dimensionTematicai + "px;width:" + dimensionTematicai + "px;border-radius:0;border-width:0.1em;" +
      ";background-color:" + arrayObjetosTematicas[i].color_fondo +
      ";color:" + arrayObjetosTematicas[i].color_letra_borde +
      ";border-color:" + arrayObjetosTematicas[i].color_letra_borde
    );

    //Crear el submenú que se abrirá en cada temática (con los datos del array anterior):
    var submenuTematicaNumi = document.createElement("div");
    submenuTematicaNumi.setAttribute("class","card-deck m-0 p-0");
    submenuTematicaNumi.setAttribute("id","submenu" + idTematicaNumi);
    submenuTematicaNumi.setAttribute("style","flex-flow:row nowrap;");

    var contenedorSubmenuTematicaNumi = document.createElement("div");
    contenedorSubmenuTematicaNumi.setAttribute("id","contenedorsubmenu" + idTematicaNumi);
    contenedorSubmenuTematicaNumi.setAttribute("style","max-width:70%;overflow-x:auto;overflow-y:hidden;position:fixed;z-index:20;background-color:#d8d8d8;display:none;");

    contenedorSubmenuTematicaNumi.appendChild(submenuTematicaNumi);
    document.getElementById("contenedorTematicas").appendChild(contenedorSubmenuTematicaNumi);

    //Crear los elementos dentro del submenú, distinguiendo dos casos: A y B:
    for (var j=0; j<arrayObjetosTematicas[i].contenido.length; j++){
      //CASO A: UN GRUPO DE CAPAS:
      if (arrayObjetosTematicas[i].contenido[j].capas){
        var grupoNumjTematicaNumi = document.createElement("a");
        if (idioma == 'en'){
          grupoNumjTematicaNumi.innerHTML = '<div class="row m-0 p-1" style="height:100%;"><h5 class="col-12 m-0 p-0 align-self-center">' + arrayObjetosTematicas[i].contenido[j].nombre_en.toUpperCase() + '</h5></div>';
        } else {
          grupoNumjTematicaNumi.innerHTML = '<div class="row m-0 p-1" style="height:100%;"><h5 class="col-12 m-0 p-0 align-self-center">' + arrayObjetosTematicas[i].contenido[j].nombre.toUpperCase() + '</h5></div>';
        }
        grupoNumjTematicaNumi.setAttribute("class","card m-1 p-0");
        var idGrupoNumj = "grupo" + arrayObjetosTematicas[i].contenido[j].id;
        grupoNumjTematicaNumi.setAttribute("id",idGrupoNumj);
        grupoNumjTematicaNumi.setAttribute("style","height:" + dimensionTematicai + "px;width:" + dimensionTematicai + "px;border-radius:0;border-width:0.1em" +
          ";background-color:" + arrayObjetosTematicas[i].color_fondo +
          ";color:" + arrayObjetosTematicas[i].color_letra_borde +
          ";border-color:" + arrayObjetosTematicas[i].color_letra_borde
        );
        grupoNumjTematicaNumi.setAttribute("onmouseover","document.getElementById('" + idGrupoNumj + "').style.backgroundColor='" + arrayObjetosTematicas[i].color_letra_borde + "';document.getElementById('" + idGrupoNumj + "').style.color='" + arrayObjetosTematicas[i].color_fondo + "';document.getElementById('" + idGrupoNumj + "').style.borderColor='" + arrayObjetosTematicas[i].color_fondo + "';AparecerGrupoNumjTematicaNumi('" + idGrupoNumj + "','" + arrayObjetosTematicas[i].color_fondo + "','" + arrayObjetosTematicas[i].color_letra_borde + "');");
        grupoNumjTematicaNumi.setAttribute("onmouseout","document.getElementById('" + idGrupoNumj + "').style.backgroundColor='" + arrayObjetosTematicas[i].color_fondo + "';document.getElementById('" + idGrupoNumj + "').style.color='" + arrayObjetosTematicas[i].color_letra_borde + "';document.getElementById('" + idGrupoNumj + "').style.borderColor='" + arrayObjetosTematicas[i].color_letra_borde + "';DesaparecerGrupoNumjTematicaNumi('" + idGrupoNumj + "');");

        //Añadir a cada objeto Temática el submenú que saldrá al clickar sobre él:
        document.getElementById("submenu" + idTematicaNumi).appendChild(grupoNumjTematicaNumi);

        //Submenú de capas dentro de un grupo de contenido:
        var submenuGrupoNumjTematicaNumi = document.createElement("div");
        submenuGrupoNumjTematicaNumi.setAttribute("class","card-deck m-0 p-0");
        submenuGrupoNumjTematicaNumi.setAttribute("id","submenu" + idGrupoNumj);
        submenuGrupoNumjTematicaNumi.setAttribute("style","flex-flow:row nowrap;");

        var contenedorsubmenuGrupoNumjTematicaNumi = document.createElement("div");
        contenedorsubmenuGrupoNumjTematicaNumi.setAttribute("id","contenedorsubmenu" + idGrupoNumj);
        contenedorsubmenuGrupoNumjTematicaNumi.setAttribute("style","max-width:50%;overflow-x:auto;overflow-y:hidden;position:fixed;z-index:20;background-color:#d8d8d8;display:none;");

        contenedorsubmenuGrupoNumjTematicaNumi.appendChild(submenuGrupoNumjTematicaNumi);
        document.getElementById(idGrupoNumj).appendChild(contenedorsubmenuGrupoNumjTematicaNumi);

        //Recorrer todas las capas dentro del array [capas] dentro de [contenido]:
        for (var k=0; k<arrayObjetosTematicas[i].contenido[j].capas.length; k++){
          var capaNumkGrupoNumjTematicaNumi = document.createElement("a");
          if (idioma == 'en'){
            capaNumkGrupoNumjTematicaNumi.innerHTML = '<div class="row m-0 p-1" style="height:100%;width:' + dimensionTematicaiReducida + 'px;"><h5 class="col-12 m-0 p-0 align-self-center">' + arrayObjetosTematicas[i].contenido[j].capas[k].nombre_en + '</h5></div>';
          } else {
            capaNumkGrupoNumjTematicaNumi.innerHTML = '<div class="row m-0 p-1" style="height:100%;width:' + dimensionTematicaiReducida + 'px;"><h5 class="col-12 m-0 p-0 align-self-center">' + arrayObjetosTematicas[i].contenido[j].capas[k].nombre + '</h5></div>';
          }
          capaNumkGrupoNumjTematicaNumi.setAttribute("class","m-1 mt-2 p-0");
          var idCapaNumk = "capa" + arrayObjetosTematicas[i].contenido[j].capas[k].id;
          capaNumkGrupoNumjTematicaNumi.setAttribute("id",idCapaNumk);
          capaNumkGrupoNumjTematicaNumi.setAttribute("style","height:" + dimensionTematicai + "px;width:" + dimensionTematicaiReducida + "px;border-radius:0;border-width:0.1em" +
            ";background-color:" + arrayObjetosTematicas[i].color_fondo +
            ";color:" + arrayObjetosTematicas[i].color_letra_borde +
            ";border-color:" + arrayObjetosTematicas[i].color_letra_borde
          );
          capaNumkGrupoNumjTematicaNumi.setAttribute("onmouseover","document.getElementById('" + idCapaNumk + "').style.backgroundColor='" + arrayObjetosTematicas[i].color_letra_borde + "';document.getElementById('" + idCapaNumk + "').style.color='" + arrayObjetosTematicas[i].color_fondo + "';document.getElementById('" + idCapaNumk + "').style.borderColor='" + arrayObjetosTematicas[i].color_fondo + "'");
          capaNumkGrupoNumjTematicaNumi.setAttribute("onmouseout","document.getElementById('" + idCapaNumk + "').style.backgroundColor='" + arrayObjetosTematicas[i].color_fondo + "';document.getElementById('" + idCapaNumk + "').style.color='" + arrayObjetosTematicas[i].color_letra_borde + "';document.getElementById('" + idCapaNumk + "').style.borderColor='" + arrayObjetosTematicas[i].color_letra_borde + "'");
          capaNumkGrupoNumjTematicaNumi.setAttribute("href","javascript:CargarCapa('" + arrayObjetosTematicas[i].contenido[j].capas[k].tipo + "','" + arrayObjetosTematicas[i].contenido[j].capas[k].id + "','" + arrayObjetosTematicas[i].contenido[j].capas[k].ruta + "','menuCarga','','" + arrayObjetosTematicas[i].contenido[j].capas[k].titulo + "','" + arrayObjetosTematicas[i].contenido[j].capas[k].abstract + "','" + arrayObjetosTematicas[i].contenido[j].capas[k].tipo_leyenda + "','" + arrayObjetosTematicas[i].contenido[j].capas[k].info_estilo + "','" + arrayObjetosTematicas[i].contenido[j].capas[k].ruta_descarga + "',1," + arrayObjetosTematicas[i].contenido[j].capas[k].queryable + ");");

          //Añadir:
          document.getElementById("submenu" + idGrupoNumj).appendChild(capaNumkGrupoNumjTematicaNumi);
        }

      //CASO B: UNA CAPA DE DATOS:
      } else {
        var capaNumjTematicaNumi = document.createElement("a");
        if (idioma == 'en'){
          capaNumjTematicaNumi.innerHTML = '<div class="row m-0 p-1" style="height:100%;width:' + dimensionTematicaiReducida + 'px;"><h5 class="col-12 m-0 p-0 align-self-center">' + arrayObjetosTematicas[i].contenido[j].nombre_en + '</h5></div>';
        } else {
          capaNumjTematicaNumi.innerHTML = '<div class="row m-0 p-1" style="height:100%;width:' + dimensionTematicaiReducida + 'px;"><h5 class="col-12 m-0 p-0 align-self-center">' + arrayObjetosTematicas[i].contenido[j].nombre + '</h5></div>';
        }
        capaNumjTematicaNumi.setAttribute("class","m-1 p-0");
        var idCapaNumj = "capa" + arrayObjetosTematicas[i].contenido[j].id;
        capaNumjTematicaNumi.setAttribute("id",idCapaNumj);
        capaNumjTematicaNumi.setAttribute("style","height:" + dimensionTematicai + "px;width:" + dimensionTematicaiReducida + "px;border-radius:0;border-width:0.1em" +
          ";background-color:" + arrayObjetosTematicas[i].color_fondo +
          ";color:" + arrayObjetosTematicas[i].color_letra_borde +
          ";border-color:" + arrayObjetosTematicas[i].color_letra_borde
        );
        capaNumjTematicaNumi.setAttribute("onmouseover","document.getElementById('" + idCapaNumj + "').style.backgroundColor='" + arrayObjetosTematicas[i].color_letra_borde + "';document.getElementById('" + idCapaNumj + "').style.color='" + arrayObjetosTematicas[i].color_fondo + "';document.getElementById('" + idCapaNumj + "').style.borderColor='" + arrayObjetosTematicas[i].color_fondo + "'");
        capaNumjTematicaNumi.setAttribute("onmouseout","document.getElementById('" + idCapaNumj + "').style.backgroundColor='" + arrayObjetosTematicas[i].color_fondo + "';document.getElementById('" + idCapaNumj + "').style.color='" + arrayObjetosTematicas[i].color_letra_borde + "';document.getElementById('" + idCapaNumj + "').style.borderColor='" + arrayObjetosTematicas[i].color_letra_borde + "'");
        capaNumjTematicaNumi.setAttribute("href","javascript:CargarCapa('" + arrayObjetosTematicas[i].contenido[j].tipo + "','" + arrayObjetosTematicas[i].contenido[j].id + "','" + arrayObjetosTematicas[i].contenido[j].ruta + "','menuCarga','','" + arrayObjetosTematicas[i].contenido[j].titulo + "','" + arrayObjetosTematicas[i].contenido[j].abstract + "','" + arrayObjetosTematicas[i].contenido[j].tipo_leyenda + "','" + arrayObjetosTematicas[i].contenido[j].info_estilo + "','" + arrayObjetosTematicas[i].contenido[j].ruta_descarga + "',1," + arrayObjetosTematicas[i].contenido[j].queryable +");");

        //Añadir a cada objeto Temática el submenú que saldrá al clickar sobre él:
        document.getElementById("submenu" + idTematicaNumi).appendChild(capaNumjTematicaNumi);
      }
    };

    //Añadir la función para abrir el submenú de cada temática al hacer click:
    tematicaNumi.setAttribute("href","javascript:AparecerSubmenuTematicaNumi('" + idTematicaNumi + "','" + arrayObjetosTematicas[i].color_fondo + "','" + arrayObjetosTematicas[i].color_letra_borde + "');");
    //Añadir el objeto Temática al menú lateral:
    document.getElementById("contenedorTematicas").appendChild(tematicaNumi);
  };
}

//FUNCIÓN AparecerSubmenuTematicaNumi(idTematica,colorFondo,colorLetraBorde)
/*
ENTRADAS:
  idTematica: el id de la temática sobre la que se está haciendo click.
  colorFondo: el color de fondo que habrá que asignar a letras y bordes (porque se invierten colores al clickar).
  colorLetraBorde: el color de fondo que habrá que asignar al fondo (porque se invierten colores al clickar).
FUNCIONALIDAD:
  - Hace aparecer el div del submenú ya creado en la función anterior, en el momento en el que se hace click en la temática correspondiente;
  - Crea los eventos onclick (tanto dentro como fuera del submenú) y su comportamiento;
  - Modifica el estilo de todos los cuadros de temáticas.
*/
function AparecerSubmenuTematicaNumi(idTematica,colorFondo,colorLetraBorde){
  //Hago aparecer el div del submenú:
  var idSubmenuTematicaNumi = "contenedorsubmenu" + idTematica;
  document.getElementById(idSubmenuTematicaNumi).style.display = "";

  //Calculo la posición del cuadrado correspondiente a la Temática clickada:
  var cuadradoTematicai = document.getElementById(idTematica);
  var posicionTematicai = cuadradoTematicai.getBoundingClientRect();
  var topTematicai = posicionTematicai.top - 4;
  var leftTematicai = posicionTematicai.left + posicionTematicai.width  + 4;

  document.getElementById(idSubmenuTematicaNumi).style.top = topTematicai + "px";
  document.getElementById(idSubmenuTematicaNumi).style.left = leftTematicai + "px";

  // Control del evento click una vez se ha abierto el submenú:
  //  - Cualquier click fuera del mismo lo cerrará:
  $("html").click(function() {
    CerrarSubmenus();
  });
  //  - Un click dentro del mismo no lo cerrará (de forma que llevará al href correspondiente a cada capa; definido anteriormente):
  $('#' + idSubmenuTematicaNumi).click(function (e) {
    e.stopPropagation();
  });

  //Oscurecer el resto de temáticas:
  $("[id*=tematica]").css({'background-color': '#d8d8d8', 'color':'#b5b5b5', 'border-color':'#b5b5b5'});

  //Mantener el color de la clickada:
  $("#"+idTematica).css({'background-color': colorLetraBorde, 'color': colorFondo, 'border-color': colorFondo});
}

//FUNCIÓN AparecerGrupoNumjTematicaNumi(idGrupo,colorFondo,colorLetraBorde)
/*
ENTRADAS:
  idGrupo: el id del grupo sobre el que se está haciendo hover sobre él.
  colorFondo: el color de fondo que habrá que asignar a letras y bordes (porque se invierten colores al clickar).
  colorLetraBorde: el color de fondo que habrá que asignar al fondo (porque se invierten colores al clickar).
FUNCIONALIDAD:
  - Hace aparecer el div del submenú del grupo ya creado en la función CargarTematicas(), en el momento en el que se pasa con el ratón por encima del grupo correspondiente, dentro de la temática correspondiente;
  - Crea los eventos onclick (tanto dentro como fuera del submenú) y su comportamiento;
*/
function AparecerGrupoNumjTematicaNumi(idGrupo,colorFondo,colorLetraBorde){
  var idSubmenuGrupoNumjTematicaNumi = "contenedorsubmenu" + idGrupo;
  //Hago aparecer el div del submenú:
  document.getElementById(idSubmenuGrupoNumjTematicaNumi).style.display = "";
  //Calculo la posición del cuadrado correspondiente a la Temática clickada:
  var cuadradoGrupojTematicai = document.getElementById(idGrupo);
  var posicionGrupojTematicai = cuadradoGrupojTematicai.getBoundingClientRect();
  var topGrupojTematicai = posicionGrupojTematicai.top + posicionGrupojTematicai.height + 0;
  var leftGrupojTematicai = posicionGrupojTematicai.left - 4;

  document.getElementById(idSubmenuGrupoNumjTematicaNumi).style.top = topGrupojTematicai + "px";
  document.getElementById(idSubmenuGrupoNumjTematicaNumi).style.left = leftGrupojTematicai + "px";

  // Control del evento click una vez se ha abierto el submenú:
  //  - Cualquier click fuera del mismo lo cerrará:
  $("html").click(function() {
    CerrarSubmenus();
  });
  //  - Un click dentro del mismo no lo cerrará (de forma que llevará al href correspondiente a cada capa; definido anteriormente):
  $('#' + idSubmenuGrupoNumjTematicaNumi).click(function (e) {
    e.stopPropagation();
  });
}

//FUNCIÓN DesaparecerGrupoNumjTematicaNumi(idGrupo)
/*
ENTRADAS:
  idGrupo: el id del grupo sobre el que se está haciendo hover.
FUNCIONALIDAD:
  - Hace desaparecer el div del submenú del grupo ya creado en la función CargarTematicas(), en el momento en el que se deja de pasar con el ratón por encima del grupo correspondiente, dentro de la temática correspondiente;
*/
function DesaparecerGrupoNumjTematicaNumi(idGrupo){
  var idSubmenuGrupoNumjTematicaNumi = "contenedorsubmenu" + idGrupo;
  //Hago desaparecer el div del submenú:
  document.getElementById(idSubmenuGrupoNumjTematicaNumi).style.display = "none";
}
