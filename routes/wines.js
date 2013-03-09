//Necesario para almacenar la imagen
var fs = require('fs');
// connect mongoose
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/vinosdb');
mongoose.connect('mongodb://nodejitsu_sasij:94kuo44pvtiappfjkflq4mpii5@ds049537.mongolab.com:49537/nodejitsu_sasij_nodejitsudb2410344318');


var Schema = mongoose.Schema;

// create schema
var VinoSchema = new mongoose.Schema({
  nombre: String,
  denominacionOrigen: String,
  anyo: String,
  color: String,
  precio: String,
  puntuacion: String,
  cata: String,

});

// use the schema to register a model
mongoose.model('Vino', VinoSchema);
var Vino = mongoose.model('Vino');

// get one wine
exports.getVino = function getVino(req, res, next) {
  Vino.findById(req.params.id, function (error,data) {
    res.send(data);
  });
};

//get all Wines
exports.getVinos = function getVinos(req, res, next) {
  Vino.find().limit(100).execFind(function (arr,data) {
    res.send(data);
  });
};

// post a wine
exports.postVino = function postVino(req, res, next) {
  console.log("post recibido");

  var uploadedFile = req.files.uploadingFile;
  var tmpPath = uploadedFile.path;
  var targetPath = './Public/imageUploaded/' + uploadedFile.name;

  var vino = new Vino();
  vino.nombre = req.body.nombre;
  vino.denominacionOrigen = req.body.denominacionOrigen;
  vino.anyo = req.body.anyo;
  vino.color = req.body.color;
  vino.precio = req.body.precio;
  vino.puntuacion = req.body.puntuacion;
  vino.cata = req.body.cata;
  vino.save();

  //Guardamos los datos en el fichero
  fs.rename(tmpPath, targetPath, function(err) {
    if (err) throw err;
    fs.unlink(tmpPath, function() {
        if (err) throw err;
            console.log("guardando");
    });
  });

  res.end();
  /*film.save(function (err, obj) {
    res.send(obj);
    ApiEvent.emit('api:films:change', obj);
  });*/
};

// put new attributes on a wine
exports.putVino = function putFilm(req, res, next) {
  Vino.findById(req.params.id, function(err, vino) {
    vino.nombre = req.body.nombre;
    vino.denominacionOrigen = req.body.denominacionOrigen;
    vino.anyo = req.body.anyo;
    vino.color = req.body.color;
    vino.precio = req.body.precio;
    vino.puntuacion = req.body.puntuacion;
    vino.cata = req.body.cata;
    vino.save();
    res.end();
    /*p.save(function (error, obj) {
      res.send(obj);
      ApiEvent.emit('api:films:change', obj);
    });
    */
  });
};

// delete a wine from the database
exports.deleteVino = function deleteVino(req, res, next) {
  console.log("trying to delete");
  Vino.findById(req.params.id, function(err, p) {
    p.remove();
    res.send('');
  });
};



/*

exports.findAll = function(req, res) {

 res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);

};

exports.findById = function(req, res) {

  res.send({id:req.params.id, name: "The Name", description: "description"});

};

*/
