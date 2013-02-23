// connect mongoose
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/vinosdb');
mongoose.connect('mongodb://nodejitsu:c54ead583c18364cd5f6261358f3ff4c@linus.mongohq.com:10008/nodejitsudb3716971115
');

var Schema = mongoose.Schema;

// create schema
var VinoSchema = new mongoose.Schema({
  nombre: String,
  denominacionOrigen: String,
  anyo: String,
  color: String,
  precio: String,
  puntuacion: String,
  cata: String
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
  var vino = new Vino();
  vino.nombre = req.body.nombre;
  vino.denominacionOrigen = req.body.denominacionOrigen;
  vino.anyo = req.body.anyo;
  vino.color = req.body.color;
  vino.precio = req.body.precio;
  vino.puntuacion = req.body.puntuacion;
  vino.cata = req.body.cata;
  vino.save();
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