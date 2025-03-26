const express = require("express");
const app=express();

app.use("/hello",(req,res)=>{
    res.send("Hello hello hello");
});

app.use("/",(req,res)=>{
    res.send("Welcome to home page");
});



app.listen(7777,()=>{
    console.log("Server runing at prot 7777...");
    
});