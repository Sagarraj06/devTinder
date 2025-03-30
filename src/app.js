const express = require("express");
const connectDB = require ("./config/database");
const User = require("./models/user");
const app=express();

// const {adminAuth, userAuth} = require("./middlewares/auth");


// app.use("/admin", adminAuth);
// app.use("/user", userAuth);
// app.get("/admin/alldata", (req,res)=>{
//     res.send("All data from admin");
// });

// app.get("/user/data",(req,res)=>{
//     res.send("Data from User");
// });
app.post("/signup", async (req, res) => {
        const userObj = {
            firstName: "Aditi",
            lastName: "Sagar Raj",
            emailId: "Sagar@raj.com",
            password: "Sagarraj1@",
        };

        
        const user = await User.create(userObj);
try{
        console.log(user); // Log the created user
        res.send("User Added Successfully");
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("An error occurred while adding the user.");
    }
});

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