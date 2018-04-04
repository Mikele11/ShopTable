var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('shop', ['shop']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/shop', function (req, res) {
  console.log('All right');

  db.shop.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
});

app.post('/shop', function (req, res) {
  console.log(req.body);
  db.shop.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/shop/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.shop.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/shop/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.shop.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/shop/:id', function (req, res) {
  var id = req.params.id;
  db.shop.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, count: req.body.count, price: req.body.price, category: req.body.category}},//change avtomatic change
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");