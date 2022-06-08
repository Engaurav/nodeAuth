const mongoose = require("mongoose");


// Connectiong mongoose to database
mongoose.connect(`mongodb://localhost:27017/node_authenticate`);



const db = mongoose.connection;

db.on('err',console.error.bind(console,'Error in Connection of DB'));

db.once('open',function(){
    console.log('Connected to Database');
});

module.exports = db;