/* jshint node: true */
'use strict';

var Datastore = require('nedb'),
    express = require('express'),
    db = new Datastore(),
    app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/latest', function(req, res) {
  db.find({}).sort({time:-1}).limit(10).exec(function(err, docs){
    if (err) {
      res.statusCode = 503;
      res.send('Error 503: Database service unavailable.');
    } else {
      res.json(docs.reverse());
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

app.listen(process.env.PORT || 4747);
