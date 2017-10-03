var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var Sequelize = require('sequelize');
var algorithm = 'aes-256-ctr';
var password = 'P4l3str4!';
var crypto = require('crypto');
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


var utenti = sequelize.define('utenti',{
  username: Sequelize.STRING,
  password: Sequelize.STRING
})


app.get("/", function(req,res){
  console.log("OK!");
  res.send("INCIDENTE DIO EHHHHHHHHHHH!!!");
  res.end();
});

app.get("/newUser", function(req, res){
  var usr = "michael";
  var password = "password test";
  var encryptedpwd = encrypt(password);
  res.send(encryptedpwd)
  res.end();
})

app.get("/logUsr", function(req,res){
  var encryptedpwd = "489eebb5d2696d3034a959a1cc";
  var pwd = decrypt(encryptedpwd);
  res.send(pwd)
  res.end();
})



//Funzioni crypt and decrypt
function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

app.listen(PORT, function(){
  console.log("LISTENING ON PORT: "+PORT);
})
