var app = app || {};

(function($){

  app.VistaVino = Backbone.View.extend({
      tagName: "div",
      className: "vino_template",
      template: $("#vinoTemplate").html(),

      render: function(){
        var tmpl = _.template(this.template);
        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
      }
  });

})(jQuery);