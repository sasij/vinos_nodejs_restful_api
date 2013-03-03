var app = app || {};

$(document).on("ready", function(){
  //Cuando el documento esta listo creamos el router
  app.router = new app.Router();
  app.router.start();
  //Resto de funciones asociadas a eventos de Socket.io

});