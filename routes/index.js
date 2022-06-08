// calling express server
const express = require("express");
const router = express.Router();        //fetching router
const passport = require('passport');

// call homecontroller to fetch home
const homeController = require("../controllers/home_controller");     


// route to '/'
router.get("/",passport.checkAuthentication, homeController.Home);


// routes for user login register and logut
router.use("/user", require("./user"));

module.exports = router;
