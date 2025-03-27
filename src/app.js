const express = require("express");
const app=express();

app.get("/user", (req,res)=>{
    res.send({ firstname:"Sagar",lastname:"Raj"});
})
app.post("/user",(req,res)=>{
res.send("Data successfully saved to the database!");
});

app.delete("/user",(req,res)=>{
    res.send(" Delete successfully ")}
);



// this will match all the http method API call to /test
app.use("/Test",(req,res)=>{
    res.send("Welcome to our server");
});


app.listen(7777,()=>{
    console.log("Server runing at prot 7777...");
    
});