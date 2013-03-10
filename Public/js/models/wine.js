var app = app || {};

(function($){

    app.Vino = Backbone.Model.extend({

        defaults:{
            nombre:"",
            denominacionOrigen:"",
            color:"",
            anyo:"",
            precio:"",
            cata:"",
            targetPath: "../imageUploaded/wine.png"
        },

        urlRoot: function(){
            return "/wines/";
        }
    });

})(jQuery);