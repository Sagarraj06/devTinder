const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateSignUp } = require('../utils/validation');

router.post("/signup", async (req, res) => {

    try{
        // Validate the request body
        validateSignUp(req);
        const {password,firstName,lastName,emailId} = req.body;
        // Encription of password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash); // Log the hashed password
        
        const user = await User.create({
            firstName, lastName,emailId,password:passwordHash,
        });
        //console.log(user); // Log the created user
        res.send("User Added Successfully");
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("An error occurred while adding the user.");
    }
});


router.post("/login", async (req,res)=>{
    try{
        const { emailId , password}= req.body;
        // if(!validator.isEmail(emailId)){
        //     throw new Error("Email is not valid");
        // }
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);


        if(isPasswordValid){
            const token = await jwt.sign({_id:user._id}, "SagarDevTinder");
            console.log(token); // Log the generated token
            res.cookie("token", token );
            res.send("Login successful");
        }
        else{
            res.send("Invalid Credentials");
        }
}
catch(err){
    console.error("Error logging in:", err);
    res.status(400).send("Error : " + err.message);
}
});


router.post("/logout", (req,res)=>{
    try{
        res.clearCookie("token");
        res.send("logout successful");
    }
    catch(err){
        res.status(500).send("Error logging out :" + err.message);
    }
});

// router.post("/logout", async (req, res) =>{
//       res.cookie("token", null,{
//         expires: new Date(date.now()),

//       });
//         res.send("Logout successful");
// });

 
module.exports= router;