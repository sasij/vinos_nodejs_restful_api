//Load app dependencies
var express = require('express'),
    connect = require("connect"),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server),
    cons    = require('consolidate'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000;
    wines   = require('./routes/wines');


//Configure: bodyParser to parse JSON data
//           methodOverride to implement custom HTTP methods
//           router to crete custom routes
app.configure(function(){
  app.use(express.bodyParser({uploadDir: './upload'}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/Public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

// add cors support
app.all('*', function(req, res, next){
  console.log("RECEIVED: " + req.method);
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});


// define the routes
app.get('/wines', wines.getVinos );
app.get('/wines/:id', wines.getVino );
app.post('/wines', wines.postVino );
app.put('/wines/:id', wines.putVino );
app.delete('/wines/:id', wines.deleteVino );

app.listen(port, function(){
  console.log("Puerto::" + port);
});
console.log('listening on port 3000...x-X');