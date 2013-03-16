var app = app || {};

(function($){

  app.ColeccionVinos = Backbone.Collection.extend({
    model: app.Vino,
    //url : 'http://sasij.vinos.jit.su/wines',
    url: '/wines',

    parse: function(response, xhr) {
      _.map(response, function(item) {
        item.id = item._id;
        return item;
      });
      return response;
    },

   fetch : function() {
      // store reference for this collection
      var collection = this;
      $.ajax({
        type : 'GET',
        url : this.url,
        dataType : 'json',
        success : function(data) {
          $("#bar").html("");
          $("#bar").append('<li class="active"><a href="#">todos</a></li>');
          console.log(data);
          app.vinos = data;
          // set collection data (assuming you have retrieved a json object)
          collection.reset(data);
          $("#bar").append(app.vista_coleccion_vinos.createNav());
          $('.navbar li').on('click', app.vista_coleccion_vinos.changeNavbar);
        }
      });
    }

  });

})(jQuery);