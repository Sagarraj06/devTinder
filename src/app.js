const express = require("express");
const app=express();
const {adminAuth, userAuth} = require("./middlewares/auth");


app.use("/admin", adminAuth);
app.use("/user", userAuth);
app.get("/admin/alldata", (req,res)=>{
    res.send("All data from admin");
});

app.get("/user/data",(req,res)=>{
    res.send("Data from User");
});

app.listen(7777,()=>{
    console.log("Server runing at prot 7777...");
    
});