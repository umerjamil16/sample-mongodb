var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var path = require("path");
var bodyParser= require('body-parser');
var app = express();
var PORT = process.env.PORT;

app.set('view engine', 'ejs');

var mongoURL = "mongodb://hello:1234@ds047146.mlab.com:47146/stark-quotes";

var db;

MongoClient.connect(mongoURL, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {quotes: result});
  });
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  });
});

app.listen(PORT, function(){
  console.log("server running on PORT " + PORT);
});
