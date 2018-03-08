var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser  = require("body-parser");
var cors = require('cors');
var methodOverride = require("method-override");
var db = new sqlite3.Database('./database.sqlite');
app = express()

app.use(express.static(__dirname + "../public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(methodOverride("_method"));

process.env.PORT = 3000;

app.get("/", function(req,res){            
    res.render("index");
})

app.get("/agua", function(req,res){      
    db.all("SELECT * from agua" ,function(err,rows){                
        res.render("agua/show", { data: rows });            
    });            
})

app.get("/agua/new", function(req,res){      
    res.render("agua/new");
})

app.get("/agua/show/:id", function(req,res){      
    db.get("SELECT * from agua where id = " + req.params.id ,function(err,row){
        if (!err){            
            res.render("agua/edit", { data: row });    
        }else{
            console.error(err.message);            
        }                
    });      
})

app.post("/agua/show/:id", function(req,res){    
    var params = [req.body.valor, req.body.data, req.params.id];
    var query = "Update agua set valor = ? , data = ? where id = ?";
    db.run(query,params, function(err){
        if(err){
            return console.error(err.message);             
        }        
        res.redirect('/agua');
    })        
})

app.delete("/agua/delete/:id", function(req,res){
    var params = [ req.params.id ];
    var query = "delete from agua where id = ?";
    db.run(query, params, function(err){
        if (!err){
            res.redirect("/agua");
        }
    })    
});

app.post("/agua/new", function(req, res){    
    var params = [req.body.valor, req.body.data];    
    var query = "Insert into agua(valor,data) values (?,?)";
    db.run(query,params,function (err) {
        if (!err) {            
            res.redirect('/agua');
        }else{
            console.error(err.message);            
        }
    });
})

app.get("/electricidade", function(req,res){
    res.render("electricidade/show");
})

app.get("/gas", function(req,res){
    res.render("gas/show");
})

app.listen(process.env.PORT,function (req,res) {     
    console.log("APP is Running on PORT " + process.env.PORT);        
})