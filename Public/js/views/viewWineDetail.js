var app = app || {};

(function($) {

    app.VistaDetalladaVino = Backbone.View.extend({

        el: $("#vinos"),

/*
        events: {
            "dblclick li":  "edit"
        },
*/

        template: _.template( "hola" ),

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on("reset", this.render, this);
        },

        render: function() {
            console.log("rendeando");
            
            $(this.el).html("");
            if (!this.model.isNew())
                this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });
})(jQuery);