require('dotenv').config()
const express = require('express')
var cors = require('cors')

var task = require('./modules/Task/route')

app = express();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api/',task)
try{
    server = app.listen(1612)
    console.log("Connected to port")
}catch(err){
    console.log("Failed to connect",err)
}