const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
firstName: {
    type: String,
    required: true,
    trim: true,
    uppercase : true,
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
    default : "data:image/png;base64,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",
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

module.exports = mongoose.model("User", userSchema);