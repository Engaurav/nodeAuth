const passport = require("passport");
const User = require("../model/user");
const LocalStrategy = require("passport-local").Strategy;

// telling passport to use passport-local-strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", //your user for your project
    },
    (email, password, done) => {
      //done is callback funtion which is reporting back to passport.js
      //find a user and establish the identity
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log(`Error in finding user ---> Passport`);
          return done(err);
        }

        if (!user || user.password !== password) {
          console.log("Invalid Username Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to be in cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserializing the user from the key in the cookies to be fetched from server
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("Error in finding user -->Passport");
      return;
    }
    return done(null, user);
  });
});

// check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
  // if user is signed in pass request to controller
  if (req.isAuthenticated()) {
    //passport puts method on request
    return next();
  }
  // if user is not signed
  return res.redirect("/user/signin");
};

// set user for the views
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    //passport puts method on request
    //req.user contains the current signed in user from session cookie and we are just sending this to locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
