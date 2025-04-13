#Api List
  

  ##auth 
    -POST /auth/signup
    -POST /auth/login
    -POST /auth/logout

  ##profileRouter
    -GET /profile/view
    -PATCH /profile/edit
    -PATCH /profile/password

  ##connectionRequestRouter
    -POST /request/send/intrested:userId
    -POST /request/send/ignored:userId
    -POST /request/review/:status/:requestId

  ##userRouter
    -GET /user/connections
    -GET /user/requests
    -GET /user/Feed - Gets you the profiles of other users on platform.



    Status: ignore, intrested, accepted, reject;