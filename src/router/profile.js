const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user; // Access the authenticated user
        res.send(user);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).send("An error occurred while fetching the profile.");
    }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
try{
    if(!validateEditProfileData(req)){
        throw new Error("Invalid data provided for editing profile.");
    }
    const user = req.user;
    console.log(user);
 
    Object.keys(req.body).forEach((keys)=>{
        user[keys]= req.body[keys]
    });
    console.log(user);
    await user.save();

    res.json({message: `${user.firstName}, your Profile udpated successfully`,
        data: user,
});
}
catch(err){
    console.error("Error editing profile:", err);
    res.status(500).send("An error occurred while editing the profile.");
}
});

profileRouter.post("/profile/password", userAuth, async (req, res) => {
    try {
        const user = req.user; // Access the authenticated user
        const { oldPassword, newPassword } = req.body;
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (isPasswordValid) {
            const passwordHash = await bcrypt.hash(newPassword, 10);
            user.password = passwordHash;
            await user.save();
            res.send("Password updated successfully");
        } else {
            res.status(400).send("Invalid old password");
        }
    } catch (err) {
        console.error("Error updating password:", err);
        res.status(500).send("An error occurred while updating the password.");
    }
}); 

module.exports = profileRouter;