// calling express server
const express = require("express");
const router = express.Router(); //fetching router

// fetching passport to authenticate
const passport = require("passport");

// fetching user controller
const userController = require("../controllers/user_controller");

// route to adrress
router.get("/register", userController.signUp);
router.post("/create", userController.create);
router.get("/signin", userController.signIn);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/signin" }),
  userController.createSession
);

module.exports = router;