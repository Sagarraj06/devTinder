const express = require("express");
const connectDB = require ("./config/database");
const app=express();
const cookieParser = require("cookie-parser");
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");  
const requestRouter = require("./router/request");

app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter); // for signup and login
app.use("/", profileRouter); // for profile 
app.use("/", requestRouter); // for connection request





// update user by id 
connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(7777,()=>{
        console.log("Server started runing on port 7777");
    });
})
.catch((err)=>{
console.log("Error connecting to database", err);
});
