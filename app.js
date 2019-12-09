const express = require('express');
const app = express();
const port = 3000;


var mysql = require('mysql2');
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Metin.234",
    database:'mydb'
  });

  con.connect(function(err) {
      console.log('Connected')
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/register',(req,res)=>{
    res.send(req.body)
    var sql = "INSERT INTO users (username, cnpj, email, password) VALUES ('"+req.body.username+"','"+req.body.cnpj+"','"+req.body.email+"','"+req.body.password+"')"
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          console.log(result);
        });
})

app.get('/registeritem',(req,res)=>{
    res.render('newItem')
})

app.listen(port,()=>{
    console.log('server started!');
})