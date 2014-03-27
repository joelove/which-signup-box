/* jshint node: true */
(function(){

  'use strict';

  var Datastore = require('nedb'),
      express = require('express'),
      util = require('util'),
      db = new Datastore(),
      app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.get('/latest', function(req, res) {
    db.find({}).limit(10).exec(function(err, docs){
      if (err) {
        res.send('Error selecting records in database.');
      } else {
        res.send(util.inspect(docs));
      }
    });
  });

  app.post('/add', function(req, res){
    var id = req.body.id,
        doc;

    if(!id) {
      res.statusCode = 400;
      res.send('Error 400: Post syntax incorrect.');
      return;
    }

    doc = {
      'id' : id,
      'time' : Date.now()
    };

    db.insert(doc, function (err) {
      res.json(err ? false : true);
    });
  });

  app.listen(process.env.PORT || 4730);

}());
