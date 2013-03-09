var app = app || {};

(function($){

  app.VistaColeccionVinos = Backbone.View.extend({

    el: $("#vinos"),

    initialize: function(){

      _.bindAll(this, "filterByType", "setFilter", "changeNavbar");

      app.coleccion_vinos.on("change:filterType", this.filterByType, this);
      app.coleccion_vinos.on("reset", this.render, this);

      //$('.navbar li').on('click', this.changeNavbar);

    },

    render: function(){
      var that = this;

      $(this.el).html("");
      _.each(app.coleccion_vinos.models, function (item){
        that.renderVino(item);
      }, this);

      return this;
    },



    changeNavbar: function(event){
      console.log("OK");
      $('ul.nav > li').removeClass('active');
      $(event.currentTarget).addClass('active');
      this.filterType = $(event.currentTarget).find("a").text();
      app.coleccion_vinos.trigger("change:filterType");
    },

    renderVino: function(item){
        app.vistaVino = new app.VistaVino({
        model: item
      });
      this.$el.append(app.vistaVino.render().el);
    },

    getTypes: function(){
      return _.uniq(app.coleccion_vinos.pluck("color"), false, function(color){
        return color.toLowerCase();
      });
    },

    createNav: function () {
            var ul = "";
            _.each(this.getTypes(), function (item) {
                var li ='<li><a href="#filter/'+item+'">'+ item +'</a></li>';
                ul += li;
            });
            return ul;
    },

    setFilter: function(event) {
      this.filterType = $(event.currentTarget).find("option:selected").val();
      app.coleccion_vinos.trigger("change:filterType");
    },

filterByType: function () {
      if (this.filterType === "todos") {
        //this.coleccion.reset(vinos);
        app.coleccion_vinos.reset(app.vinos);

      }
      else {
        //this.coleccion.reset(vinos, { silent: true });
        app.coleccion_vinos.reset(app.vinos, { silent : true });

        var filterType = this.filterType,
            filtered = _.filter(app.coleccion_vinos.models, function (item) {
            return item.get("color").toLowerCase() === filterType;
        });
        app.coleccion_vinos.reset(filtered);

      }
    }

  });
})(jQuery);