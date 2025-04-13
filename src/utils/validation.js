const validator = require("validator");

const validateSignUp= (req)=>{
    const {firstName, lastName, emailId, password}= req.body;
    if(!firstName){
        throw new Error("First name is required");
    }
    else if(!lastName){
        throw new Error("Last name is requires");
    }
    else if(firstName.length<4 || firstName.length<4 || lastName.length>50 || firstName.length>50){
        throw new Error("First name and last name should be between 4 to 50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
};


const validateEditProfileData = (req) =>{
    const allowedEditProfile= ["firstName", "lastName","emailId","photoUrl","about","age","gender","skills"];
    const isallowed= Object.keys(req.body).every((key)=>allowedEditProfile.includes(key));
    
    
    return isallowed;

}

module.exports = {validateSignUp, validateEditProfileData};