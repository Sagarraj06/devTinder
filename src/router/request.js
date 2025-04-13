const express=require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");
const requestRouter = express.Router();
const User = require("../models/user");


requestRouter.post("/request/send/:status/:touserId", userAuth , async (req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.touserId;
        const status = req.params.status;
        const allowedStatus = ["ignored", "intrested"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : " Invalid status type " + status});
        };

        const existingRequest = await ConnectionRequest.findOne({
           $or: [
            {fromUserId,toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}
           ],
    });
        if(existingRequest){
            return res.status(400).json({message: "Connection request already exists"});
        };

            const toUser = await User.findById(toUserId);

            if(!toUser){
                return res.status(404).json({message: "User not found"});
            }
             
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId, 
            status, 
        });
        await connectionRequest.save();
        res.json({message: "Connection request sent successfully", data: connectionRequest});
    }
    catch(err){
        console.error("Error sending request:", err);
        res.status(400).send("An error occurred while sending the request.");
    }






});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const allowedStatus = ["accepted", "rejected"];
        const { status, requestId } = req.params;

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: `Invalid status: '${status}'. Only 'accepted' or 'rejected' are allowed.` });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId, 
            toUserId: loggedInUser._id,
            status: "interested",
        });

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found." });
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        return res.json({ message: "Connection request reviewed successfully.", data });
    } catch (err) {
        console.error("Error reviewing request:", err);
        return res.status(500).json({ message: "An error occurred while reviewing the request." });
    }
});



module.exports = requestRouter;