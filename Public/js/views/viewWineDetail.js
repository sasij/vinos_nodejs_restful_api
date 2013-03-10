var app = app || {};

(function($) {

    app.VistaDetalladaVino = Backbone.View.extend({

        el: $("#vinos"),
        className: "vino_template",
        template: $("#detalleVino").html(),

/*
        events: {
            "dblclick li":  "edit"
        },
*/

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on("reset", this.render, this);
        },

        render: function() {
            var tmpl = _.template(this.template);
            $(this.el).html(tmpl(this.model.toJSON()));
            return this;
        }

    });
})(jQuery);