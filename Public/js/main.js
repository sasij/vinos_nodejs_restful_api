(function($){


  var vinos;
  var coleccion_vinos;
  var vista_coleccion_vinos;


  /* Models */
  var Vino = Backbone.Model.extend({
    defaults:{
      photo: "../img/wine.png"
    }
  });

  /*Collections*/
  var ColeccionVinos = Backbone.Collection.extend({
    model: Vino,
    //url : 'http://sasij.vinos.jit.su/wines',
    url: '/wines',
    parse: function(response, xhr) {
      _.map(response, function(item) {
        item.id = item._id;
        return item;
      });
      return response;
    }
    ,
    fetch : function() {
      // store reference for this collection
      var collection = this;
      $.ajax({
      type : 'GET',
      url : this.url,
      dataType : 'json',
      success : function(data) {
        console.log(data);
        vinos = data;
        // set collection data (assuming you have retrieved a json object)
        collection.reset(data);
        $("#bar").append(vista_coleccion_vinos.createNav());
        $('.navbar li').on('click', vista_coleccion_vinos.changeNavbar);
      }
      });
    }
  });


  /* Vistas */
  var VistaVino = Backbone.View.extend({
      tagName: "div",
      className: "vino_template",
      template: $("#vinoTemplate").html(),

      render: function(){
        var tmpl = _.template(this.template);
        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
      }
  });

  var VistaColeccionVinos = Backbone.View.extend({
    el: $("#vinos"),

    initialize: function(){

      _.bindAll(this, "render", "filterByType", "setFilter", "changeNavbar");
      this.coleccion = coleccion_vinos;

      this.coleccion.on("change:filterType", this.filterByType, this);
      this.coleccion.on("reset", this.render, this);
    },

    render: function(){
      var that = this;

      console.log(this.coleccion.models);

      $(this.el).html("");
      _.each(this.coleccion.models, function (item){
        that.renderVino(item);
      }, this);

      $('.navbar li').on('click', this.changeNavbar);

      return this;
    },

    changeNavbar: function(event){
      console.log("OK");
      $('ul.nav > li').removeClass('active');
      $(event.currentTarget).addClass('active');
      this.filterType = $(event.currentTarget).find("a").text();
      this.coleccion.trigger("change:filterType");
    },

    renderVino: function(item){
      var vistaVino = new VistaVino({
        model: item
      });
      this.$el.append(vistaVino.render().el);
    },

    getTypes: function(){
      return _.uniq(this.coleccion.pluck("color"), false, function(color){
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
      this.coleccion.trigger("change:filterType");
    },

    filterByType: function () {
      if (this.filterType === "todos") {
        //this.coleccion.reset(vinos);
        this.coleccion.reset(vinos);

      }
      else {
        //this.coleccion.reset(vinos, { silent: true });
        this.coleccion.reset(vinos, { silet : true });

        var filterType = this.filterType,
            filtered = _.filter(this.coleccion.models, function (item) {
            return item.get("color").toLowerCase() === filterType;
        });
        this.coleccion.reset(filtered);

      }
    }

  });

  //ROUTER
  var VinosRouter = Backbone.Router.extend({
    routes:{
      "" : "index",
      "filter/:color" : "urlFilter"
    },

    initialize: function(){
      coleccion_vinos = new ColeccionVinos();
      vista_coleccion_vinos = new VistaColeccionVinos({collection: this.coleccion_vinos});
      coleccion_vinos.fetch();
      vista_coleccion_vinos.render();

    },
    // actions for index
    index: function() {

    },
    urlFilter: function(color){
      vista_coleccion_vinos.filterType = color;
      console.log(color);
    }
  });

  //instanciamos el router
  var vinosRouter = new VinosRouter();
  //iniciamos un historico de url
  Backbone.history.start();
  console.log("funcionando");

}(jQuery));
