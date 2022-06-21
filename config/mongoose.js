const mongoose = require("mongoose");

// you can set here url or address of your database 
mongoose.connect(process.env.MONGO_URL);       //i have set url of cloud of mongo db


// establishing connection of database
const db = mongoose.connection;

// if error occur during establishment of data base
db.on("err", console.error.bind(console, "Error in Connection of DB"));


// if database establishment is successful
db.once("open", function () {
  console.log("Connected to Database");
});

module.exports = db;
