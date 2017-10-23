var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var Sequelize = require('sequelize');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//DEFINIZIONE DB
var sequelize = new Sequelize('database', 'username', 'password',{
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

sequelize.authenticate().then(function(err){
  console.log("Connection has been established successfully");
})
.catch(function(err){
  console.log("Unable to connect to the database:",err);
})


var words = sequelize.define('word',{
  ita: Sequelize.STRING,
  eng: Sequelize.STRING
})


app.get("/", function(req,res){
  console.log("OK!");
  res.send("DIO CARO SE DIVENTEREMO RICCHI AMICA CARPA.");
  res.end();
});

app.get("/newWord", function(req, res){
  var itaWord = req.query.ita;
  var engWord = req.query.eng;



  res.send(encryptedpwd)
  res.end();
})


app.listen(PORT, function(){
  console.log("LISTENING ON PORT: "+PORT);
})
