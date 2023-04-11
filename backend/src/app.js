const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.port || 4300;
require('../db/connection')
const userRoutes = require('../routing/userRoutes')
let user = require('../model/register')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(userRoutes);


app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
})