var express = require('express');
require('dotenv').config({path: './config.env'});
const bodyParser = require('body-parser')
const userRoutes = require(('./routes/user.routes'))
require('./config/db')

const app = express();

app.use(bodyParser.json())

app.use('/api/user' , userRoutes)

app.listen(5000 , ()=>{
    console.log('server are listen');
})