const mongoose = require("mongoose");

const nodeAuthCloudDB =
  process.env.MONGO_URL ;
// const nodeAuthLocalDB = `mongodb://localhost:27017/node_authenticate`;       In Case of Local Database
// Connectiong mongoose to database
mongoose.connect(nodeAuthCloudDB);

const db = mongoose.connection;

db.on("err", console.error.bind(console, "Error in Connection of DB"));

db.once("open", function () {
  console.log("Connected to Database");
});

module.exports = db;
