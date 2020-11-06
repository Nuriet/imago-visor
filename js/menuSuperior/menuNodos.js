//FUNCIÓN CargarNodos()
/*
FUNCIONALIDAD:
  Carga el contenido de la barra superior de acceso a los diferentes nodos, creando un "cuadrado" para cada uno de
  los nodos incluidos dentro del array "arrayNodos" (en el archivo js del mismo nombre).
*/
function CargarNodos(idioma){
  $("[id*=nodo_]").remove();
  //Crear un cuadrado por cada nodo:
  for (var i=0; i<arrayNodos.length; i++){
    var nodoNumi = document.createElement("a");
    nodoNumi.innerHTML = '<h4>' + arrayNodos[i].nombre.toUpperCase() + '</h4>';



    var idNodoNumi = "nodo_" + arrayNodos[i].id;
    nodoNumi.setAttribute("id",idNodoNumi);
    nodoNumi.setAttribute("class","card m-0 p-0");
    nodoNumi.setAttribute("style","height:8em;width:8em;border-radius:0;border-width:0;display:flex;justify-content:center;align-items:center;text-decoration:none;" +
      ";background-color:" + arrayNodos[i].color_fondo +
      ";color:#f8f8f8"
    );
    //En función del idioma, un título (tip con el hover):
    if (idioma == 'en'){
      nodoNumi.setAttribute("title",arrayNodos[i].tip_en);
    } else {
      nodoNumi.setAttribute("title",arrayNodos[i].tip_es);
    }
    //Añadir el objeto Nodo al menú superior:
    nodoNumi.setAttribute("href",arrayNodos[i].url);
    nodoNumi.setAttribute("target","_blank");
    document.getElementById("espNodos").appendChild(nodoNumi);
  };
}
