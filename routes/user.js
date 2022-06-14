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
router.post("/update", userController.update);
router.get("/signin", userController.signIn);
router.get("/logout", userController.signout);


// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/signin" }),
  userController.createSession
);

// google auth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/sign-in" }),
  userController.createSession
);




//forget password
router.post("/forgetpassword", userController.forgetPasswordLinkCreate);
router.get("/:id/:time/:secret",userController.forgetPasswordLinkPage);
router.post("/reset/password",userController.resetLinkPassword);



module.exports = router;
