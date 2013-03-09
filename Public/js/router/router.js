var app = app || {};

(function($){

  //Paso jQuery al router de la funcion
  app.Router = Backbone.Router.extend({

    routes:{
      "" : "index",
      "filter/:color" : "urlFilter",
      "id/:identificator" : "viewDetail"
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
      app.vista_coleccion_vinos.filterType = color;
    },

    viewDetail : function(identificator){

      if (app.vistaVino !== undefined) app.vistaVino.undelegateEvents();
      if (app.vista_coleccion_vinos !== undefined) app.vista_coleccion_vinos.undelegateEvents();
      app.vino = new app.Vino({id:identificator});
      app.vista_detallada_vino = new app.VistaDetalladaVino({model:app.vino});
      app.vino.fetch();

    }

  });


})(jQuery);