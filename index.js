
const express = require('express')          //require express to run server
const app = express()
const mongoose = require('./config/mongoose')           // Calling Mongoose Config File
const PORT = 8000;              //Declaring Port Number


app.get('/', function (req, res) {
  res.send('Hello World')
})



// running project through express using port
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT)
});