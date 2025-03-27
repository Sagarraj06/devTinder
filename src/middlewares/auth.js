const adminAuth= (req,res,next)=>{
    const token = "xyz";
    const isAdminAuth = token==="xyz";
    if(!isAdminAuth){
        return res.status(401).send("Unauthorized");
    }
    else{
        next();
    }
};

const userAuth = (req,res,next)=>{
    const token = "abc";
    const isUserAuth = token==="abc";
    if(!isUserAuth){
        return res.status(401).send("Unauthorized");
    }
    else{
        next();
    }
}
module.exports = {adminAuth, userAuth};