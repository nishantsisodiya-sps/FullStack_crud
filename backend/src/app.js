const express = require('express');
const app = express();
const port = process.env.port || 4300;

app.get('/' , (req , res)=>{
    res.send('welcome')
})

app.listen(port , ()=>{
    console.log(`server is listening ${port}`);
})