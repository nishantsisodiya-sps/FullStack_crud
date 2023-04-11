const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        minlength : 2
    },
    lastname : {
        type : String,
        required : true,
        minlength : 3
    },
    email : {
        type : String,
        required : true,
        unique : [true , 'Email id already exist'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone : {
        type : Number,
        required : true,
        minlength : 10,
        maxlength : 10,
        unique : true
    },
    
})


const user = new mongoose.model('user' , userSchema);
module.exports = user;

