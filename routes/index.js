// calling express server
const express = require("express");
const router = express.Router();        //fetching router

// call homecontroller to fetch home
const homeController = require("../controllers/home_controller");     


// route to '/'
router.get("/", homeController.Home);


// routes for user login register and logut
router.use("/user", require("./user"));

module.exports = router;
