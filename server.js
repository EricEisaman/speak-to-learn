const browserify = require('browserify-middleware');
const glslify = require('glslify');
var express = require('express');
 
var app = express()
    .use('/js', browserify('./client', {transform: [glslify]}))
    .use(express.static('public'));
var http = require('http').Server(app);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var teachers = {};
 
app.get("/get-questions",function(request,response){
  let t = request.query.t;
  if(t){
    let uri = process.env.DB_URI;

    mongodb.MongoClient.connect(uri, function(err, db) {

      if(err) throw err;

      var questions = db.collection('questions');

      teachers[t] = questions;

      questions.find({ teacher: { $eq: t} }).toArray(function (err, docs){

            if(err) throw err;

            response.send(docs);
  

      //Only close the connection when your app is terminating.
      db.close(function (err) {
        if(err) throw err;
      });
 
      });

    });

    
  }
});


app.post("/remove", function (request, response) {
  let t = request.query.t;
  let q = request.query.q;
  console.log(t,q);
  teachers[t].remove({teacher:t,question:q});
  response.sendStatus(200);
});

app.post("/new", function (request, response) {
  let t = request.query.t;
  let q = request.query.q;
  let a = request.query.a;
  
  teachers[t].insert({teacher:t,question:q,answer:a});
  response.sendStatus(200);
});


app.get("/teacher", function (request, response) {
  response.sendFile(__dirname + '/views/teacher.html');
});

app.get("/fire-test", function (request, response) {
  response.sendFile(__dirname + '/views/fire-test.html');
});

app.get("/fire-test2", function (request, response) {
  response.sendFile(__dirname + '/views/fire-test2.html');
});

app.post("/login", function (request, response) {
  //response.send(`You are in ${request.query.username}!`);
  let u = request.query.username;
  let p = request.query.password;
  let uri =`mongodb://${u}:${p}${process.env.URI}`;
  mongodb.MongoClient.connect(uri,(err, db)=>{
   
    if(err) {
      response.send(err);
      throw err;
    }
    
    var questions = db.collection('questions');
    teachers[u] = questions;

    //console.log(questions);

    questions.find({ teacher: { $eq: u} }).toArray(function (err, docs){

      if(err) throw err;

      response.send(docs);    

    // Only close the connection when your app is terminating.
//     db.close(function (err) {
//       if(err) throw err;
//     });

     });

  });
});

var listener = http.listen(3000, function(){
  console.log('listening on *:3000');
});

var mongodb = require('mongodb');

var uri = process.env.DB_URI;

var allQuestions = [];

mongodb.MongoClient.connect(uri, function(err, db) {
  
  if(err) throw err;
   
  var questions = db.collection('questions');
  
  //console.log(questions);
  
  questions.find({ teacher: { $eq: 'sirfizx'} }).toArray(function (err, docs){

        if(err) throw err;

        allQuestions = docs;
  
  // Only close the connection when your app is terminating.
  db.close(function (err) {
    if(err) throw err;
  });
  
  });
  
});




