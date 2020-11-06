//Funciones AbrirMenuContexto() y CerrarMenuContexto()
/*
FUNCIONALIDAD:
  Estas funciones hacen aparecer y desaparecer, respectivamente, el menú de botones de contexto.
*/
function AbrirMenuContexto(){
  $("#menuContexto").css({'display':'flex'});
  $("#btnCerrarMenuContexto").css({'display':'flex'});
  $("#btnAbrirMenuContexto").css({'display':'none'});
}
function CerrarMenuContexto(){
  $("#menuContexto").css({'display':'none'});
  $("#btnCerrarMenuContexto").css({'display':'none'});
  $("#btnAbrirMenuContexto").css({'display':'flex'});
}
