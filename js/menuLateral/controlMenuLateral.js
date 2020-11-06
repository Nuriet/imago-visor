function cambiarIconoBoton(boton){
  //En cualquier caso, que se cierre la tabla de opciones o el cuadro de info de capa que pudiera estar abierto:
  CerrarOpcionesEInfo();
  if (((boton == 'tematicas') && ($("#colapsableTematicas").attr('class') == 'collapse show')) || boton == 'ultima_capa_eliminada') {
      $("#iconoMenuTematicas").attr('class', 'fas fa-angle-down');
  } else if ((boton == 'tematicas') && ($("#colapsableTematicas").attr('class') == 'collapse')) {
      $("#iconoMenuTematicas").attr('class', 'fas fa-angle-up');
      $("#iconoMenuBusqueda").attr('class', 'fas fa-angle-down');
      $("#iconoMenuGestion").attr('class', 'fas fa-angle-down');
  } else if ((boton == 'busqueda') && ($("#colapsableBusqueda").attr('class') == 'collapse show')) {
      $("#iconoMenuBusqueda").attr('class', 'fas fa-angle-down');
  } else if ((boton == 'busqueda') && ($("#colapsableBusqueda").attr('class') == 'collapse')) {
      $("#iconoMenuBusqueda").attr('class', 'fas fa-angle-up');
      $("#iconoMenuTematicas").attr('class', 'fas fa-angle-down');
      $("#iconoMenuGestion").attr('class', 'fas fa-angle-down');
  } else if ((boton == 'gestion') && ($("#colapsableGestion").attr('class') == 'collapse show')) {
      $("#iconoMenuGestion").attr('class', 'fas fa-angle-down');
  } else if (((boton == 'gestion') && ($("#colapsableGestion").attr('class') == 'collapse')) || boton == 'capa_cargada') {
      $("#iconoMenuGestion").attr('class', 'fas fa-angle-up');
      $("#iconoMenuTematicas").attr('class', 'fas fa-angle-down');
      $("#iconoMenuBusqueda").attr('class', 'fas fa-angle-down');
  }
}
