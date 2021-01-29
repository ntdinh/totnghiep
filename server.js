var express = require("express");
var app = express();

var hotname = "localhost";
var port = 8000;

app.get("/hello",(req,res)=>{
    res.send("<h1> hi hai ngu </h1>");
});

app.listen(port,hotname,()=>{
    console.log(`hello Dinh, I'm running at ${hotname} : ${port}/`);
});
