// const express = require("express");
// const userRouter = express.Router();
// const userAuth = require("../middlewares/auth");
// const ConnectionRequest = require("../models/connectionRequest");

// userRouter.get("/user/request/received", userAuth, async(req,res)=>{
//     try {
//         const loggedInUser = req.user;
//         const connectionReqiest = await ConnectionRequest.find({
//             touserId: loggedInUser._id,
//             status : "intrested",
//         });
//         res.json({
//             message: "Data fetched Successfully",
//             data: connectionReqiest,
//         });

//     } 
//     catch (error) {
//         console.error("Error fetching user requests:", error);
//         res.status(500).json({ message: "Internal server error" }); 
        
//     }
// } );

// module.export = userRouter; 


const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User= require("../models/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested", // Fixed typo here as well ("intrested" -> "interested")
        }).populate("fromUserId", "firstName lastName emailId, photoUrl"); // Populating fromUserId with specific fields

        console.log("Received connection requests:", connectionRequest); // Added logging for debugging
        res.json({
            message: "Data fetched Successfully",
            data: connectionRequest,
        });
 
    } catch (error) {
        console.error("Error fetching user requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


userRouter.get("/user/connection", userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" },
            ],
        }).populate("fromUserId", "firstName lastName emailId photoUrl")
          .populate("toUserId", "firstName lastName emailId photoUrl"); // Populating both fields

          const data = connectionRequest.map((row)=> 
            {
               if(row.fromUserId._id.equals(loggedInUser._id)){
                return row.toUserId}
                return row.fromUserId
            }
             );
           
        console.log("User connections:", data  ); // Added logging for debugging
        res.json({
            message: "Data fetched Successfully",
            data: data,
        });
    } catch (error) 
    {
        console.error("Error fetching user connections:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
  
      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      limit = limit > 50 ? 50 : limit;
      const skip = (page - 1) * limit;
  
      const connectionRequests = await ConnectionRequest.find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      }).select("fromUserId  toUserId");
  
      const hideUsersFromFeed = new Set();
      connectionRequests.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
      });
  
      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hideUsersFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      }) 
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);
  
      res.json({ data: users });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });












module.exports = userRouter; // Fixed the typo here