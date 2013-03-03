var app = app || {};

(function($){

  //Paso jQuery al router de la funcion
  app.Router = Backbone.Router.extend({

    routes:{
      "" : "index",
      "filter/:color" : "urlFilter"
    },

    initialize: function(){

      app.coleccion_vinos = new app.ColeccionVinos();
      app.vista_coleccion_vinos = new app.VistaColeccionVinos({collection: this.coleccion_vinos});
      app.coleccion_vinos.fetch();
      app.vista_coleccion_vinos.render();

    },

    start:function(){
      //iniciamos un historico de url
      Backbone.history.start();
    },
    // actions for index
    index: function() {
    },

    urlFilter: function(color){
      console.log("ok");
      app.vista_coleccion_vinos.filterType = color;
      console.log(color);
    }

  });


})(jQuery);