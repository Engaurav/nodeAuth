
const express = require('express')          //require express to run server
const app = express()
const mongoose = require('./config/mongoose')           // Calling Mongoose Config File
const PORT = 8000;              //Declaring Port Number





app.use(express.urlencoded());


//setting up our view engine for ejs
app.set('view engine', 'ejs');
app.set('views', './views');



// use express router
app.use('/', require('./routes'));





// running project through express using port
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT)
});