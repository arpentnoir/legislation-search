var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var LEGISLATION_COLLECTION = "legislation";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json({limit: '20Mb'}));

var elasticsearch = require('elasticsearch');
var connectionString = process.env.SEARCHBOX_SSL_URL;

var client = new elasticsearch.Client({
    host: connectionString
});


var db;


mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");


  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/legislation", function(req, res) {
  db.collection(LEGISLATION_COLLECTION).find({},{id:1, title:1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/legislation", function(req, res) {
  var newLegislation = req.body;
  if(!(req.body.id || req.body.title)){
    handleError(res, "Invalid user input", "Must provide id and name for legislation entry", 400);
  }
  db.collection(LEGISLATION_COLLECTION).insertOne(newLegislation, function(err, doc){
    if(err){
      handleError(res, err.message, "Failed to create new legislation record.");
    }else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/legislation/:id", function(req, res) {
  db.collection(LEGISLATION_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get legislation");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/legislation/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(LEGISLATION_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update legislation");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/legislation/:id", function(req, res) {
  db.collection(LEGISLATION_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete legislation");
    } else {
      res.status(204).end();
    }
  });
});
