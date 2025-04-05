#Api List
  

  ##auth 
    -POST /auth/signup
    -POST /auth/login
    -POST /logout

  ##profileRouter
    -GET /profile/view
    -PATCH /profile/edit
    -PATCH /profile/password

  ##connectionRequestRouter
    -POST /request/send/intrested:userId
    -POST /request/send/ignored:userId
    -POST /request/review/accepted:requestId
    -POST /request/review/rejected/:requestId

  ##userRouter
    -GET /user/connections
    -GET /user/requests
    -GET /user/Feed