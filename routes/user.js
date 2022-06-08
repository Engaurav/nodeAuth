// calling express server
const express = require("express");
const router = express.Router(); //fetching router

// fetching user controller
const userController = require("../controllers/user_controller");

// route to adrress
router.get("/register", userController.signUp);
router.post("/create", userController.create);
router.get("/signin", userController.signIn);

module.exports = router;
