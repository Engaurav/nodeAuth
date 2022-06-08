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





module.exports = passport;