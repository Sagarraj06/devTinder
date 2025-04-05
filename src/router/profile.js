const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");





profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user; // Access the authenticated user
        res.send(user);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).send("An error occurred while fetching the profile.");
    }
});

module.exports = profileRouter;