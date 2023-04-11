const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/registerData')
.then(()=>{
    console.log("connection setup")
})
.catch((error)=>{
    console.log(error);
})