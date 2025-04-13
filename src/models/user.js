const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
firstName: {
    type: String,
    required: true,
    trim: true,
    minLength : 3,
    maxLength : 20,
},
lastName : {
    type : String,

},
emailId : {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validator(value){
        if(validator.isEmail(value)){
            throw new Error ("Email is not valid");
        }
    },
},
password:{
    type: String,
    required: true,
    validator(value){
        if(validator.isStrongPassword(value)){
            throw new Error ("Password is not enough strong");
        }
    },
},
age: {
    type:Number,
},
gender : {
    type : String,
    validate(value){
        if(!["male", "female", "other"].includes(value)){
            throw new Error("Gender data is not valid");
        }
    },
},
photoUrl : {
    type : String,
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw1BJR81rHxP9lOPJW-6bSPy&ust=1744341781371000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjF6tPBzIwDFQAAAAAdAAAAABAE",
    validator(value){
        if(validator.isURL(value)){
            throw new Error ("URL is not valid");
        }
    },
},
about : {
    type : String,
    Default : "No about data",
}

},{
    timestamps: true,
});
userSchema.index({firstName: 1, lastName: 1}); 

module.exports = mongoose.model("User", userSchema);