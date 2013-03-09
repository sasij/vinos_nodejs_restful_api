var app = app || {};

$(document).on("ready", function(){
  //Cuando el documento esta listo creamos el router
  app.router = new app.Router();
  app.router.start();
  //Resto de funciones asociadas a eventos de Socket.io

  //funciones asociadas a eventos jQuery
  $('#submitButton').on('click', function(e){

    nombre = $('#nombre').val();
	denominacionOrigen = $('#denominacionOrigen').val();
	anyo = $('#anyo').val();
	color = $('#color').val();
	precio = $('#precio').val();
	puntuacion = $('#puntuacion').val();
	cata = $('#cata').val();
	file = $('#inputFile').get(0).files[0];
	isValid = validateForm();

    console.log("is valid:: " + isValid);

    if (!isValid) {
        e.preventDefault();
        //mostrar mensaje de error
        alert("¡Error en el formulario. Debe de rellenar todos los campos!");
        return false;
    }
    else {
        
        var fd = new FormData();
        fd.append('nombre', nombre); // req.body.date
        fd.append('denominacionOrigen', denominacionOrigen);
        fd.append('anyo', anyo);
        fd.append('color', color);
        fd.append('precio', precio);
        fd.append('puntuacion', puntuacion);
        fd.append('cata', cata);
        fd.append('uploadingFile', file);

        jQuery.ajax({
            type: "POST",
            url: "/wines",
            data:fd,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("OK");
                window.location="index.html";
            }
        });

        e.preventDefault();
        return false;
    }

	e.preventDefault();
	return false;

  });
    /**
     * Funcion para validar el formulario  
     **/
    function validateForm(){
        var regexPunt = /^[0-9]+$/;

        if(nombre === '' || denominacionOrigen === '' ||
            color === '' || precio === '' || cata === '')
            return false;

        if (typeof file == 'undefined')
            return false

        if(!regexPunt.test(puntuacion) || !regexPunt.test(anyo))
            return false;
 
        return true;
    }






















});