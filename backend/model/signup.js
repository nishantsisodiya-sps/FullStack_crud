//Schema for authentication
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exist"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type : String,
        required: true,
        unique: true,
    },
    Cpassword: {
        type : String,
        required: true,
        unique: true,
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

//generating auth service

authSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id : this._id.toString()} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token})
        await this.save()
        return token
    } catch (error) {
        console.log(error);
    }
}


// password hashing

authSchema.pre("save" , async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10)
        this.Cpassword = await bcrypt.hash(this.password , 10)
    }
    next()
})

const authUser = new mongoose.model('authUser' , authSchema);
module.exports = authUser;