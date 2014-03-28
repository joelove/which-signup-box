/* jshint node: true */
'use strict';

var Datastore = require('nedb'),
    express = require('express'),
    db = new Datastore(),
    app = express();

app.use(express.json());
app.use(express.urlencoded());

app.all('/add', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
 });

app.post('/add', function(req, res){
  db.insert({ 'time' : Date.now() }, function (err) {
    res.json(err ? false : true);
  });
});

app.get('/latest', function (req, res) {
  db
  .find({})
  .sort({time:-1})
  .limit(5)
  .exec( function (err, docs) {
    res.json(docs);
  });
});

app.listen(process.env.PORT || 4747);
