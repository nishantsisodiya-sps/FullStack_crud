const express = require('express');
const user = require('../model/register');
const router = new express.Router()
const authUser = require('../model/signup')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

// Post method ===========>>>>>>>>>

router.post('/user', async (req, res) => {
    try {
        console.log(req.body);
        const userData = new user(req.body);
        const CreateUser = await userData.save()
        res.status(201).send(CreateUser)


    } catch (error) {
        console.log("post error" , error);
        console.log(error);
        res.status(400).send(error)
    }
})

// get method =================>>>>>>

router.get('/users', async (req, res) => {
    try {
        const getUsers = await user.find();
        res.send(getUsers)
    } catch (error) {
        console.log("get user error" , error);
        res.status(400).send(error)
    }
})

// delete method =================>>>>>>

router.delete('/users/:id' , async(req , res)=>{
    try {
        const _id = req.params.id;
        const deleteUser = await user.findByIdAndDelete(_id , req.body)
        res.send(deleteUser)
    } catch (error) {
        console.log("delete user error" , error);
        res.status(400).send(error)
    }
})

// patch method =================>>>>>>

router.patch('/users/:id' , async(req,res)=>{
    try {
        const _id = req.params.id;
        const updateUser = await user.findByIdAndUpdate(_id , req.body , {
            new : true
        })
        res.send(updateUser)
    } catch (error) {
        console.log("update user error" , error)
        res.status(400).send(error)
    }
})


// ==============>>>> Authentication <<<<<===================


router.post('/register' , async(req , res)=>{
    try {
        const password = req.body.password;
        const Cpassword = req.body.Cpassword;
        if(password === Cpassword){
            const registerUser = new authUser({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                Cpassword : req.body.Cpassword
            })
            const token = await registerUser.generateAuthToken()

            res.cookie('jwt', token , {               //saving the token into cookiesss
                expires : new Date(Date.now() + 300000),
                httpOnly : true                         
             })  
           
            const registered = await registerUser.save()
            res.status(201).end()

        }else{
            console.log("Password is not matching");
        }

    } catch (error) {
        console.log("register user error" , error);
        res.status(401).send(error)
    }
})


// ===============login auth =================


router.post('/login' , async(req , res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await authUser.findOne({email : email});
        const isMatch = await bcrypt.compare(password , userEmail.password);
        const token = await userEmail.generateAuthToken()
        
        res.cookie('jwt' , token , {
            expires : new Date(Date.now() + 300000),
            httpOnly : true
        })
        
        console.log(cookie);
        if(isMatch){
            res.end()
        }else{
            console.log("invalid password");
        }

    } catch (error) {
        console.log(error)
        res.status(400).send("Invalid Login Details")
    }
})

module.exports = router;