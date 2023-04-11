const express = require('express');
const user = require('../model/register');
const router = new express.Router()


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
            const registerUser = new user({
                name : req.body.name,
                email : req.body.email,
                password : req.body.email,
                Cpassword : req.body.Cpassword
            })
            const registered = registerUser.save()

        }else{
            console.log("Password is not matching");
        }


    } catch (error) {
        console.log("register user error" , error);
        res.status(400).send(error)
    }
})


module.exports = router;