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
app.use(express.json());


// post route to add user
app.post("/signup", async (req, res) => {
        
        const user = await User.create(req.body);
try{
        //console.log(user); // Log the created user
        res.send("User Added Successfully");
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("An error occurred while adding the user.");
    }
});

    // find user by emailId
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
    const users = await User.find({emailId : userEmail});
    if(users.length === 0){
        res.status(404).send("User not found");
    }
    else{
        res.send(users);
    }    
});

// feed route to get all users
app.get("/feed", async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({});
    res.send(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("An error occurred while fetching the users.");
    }
    
});
    // delete user by id
app.delete("/user", async (req,res)=>{
    const userId = req.body._id;
   
    try{
    const user = await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully");
}
catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("An error occurred while deleting the user.");
}
});

// find user and update by id
app.patch("/update/:userId", async (req,res)=>{
    const userId = req.params.userId;
    const data = req.body;

    
    try{
        const ALLOWED_UPDATE=[
            "photoUrl", "about" , "gender" , "age", "skills" , "firstName", "lastName", "password"
        ];
        const idUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATE.includes(k)
        );
        if(!idUpdateAllowed){
            throw new Error("Update not allowed");
        } 


        await User.findByIdAndUpdate(userId,data,{
            returndocument : "after",
            runValidators : true,
        });
        
        
        res.send("user updated successfully");
    }
    catch(err){
        console.error("Error updating user:", err);
        res.status(500).send("An error occurred while updating the user.");
    }
})



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