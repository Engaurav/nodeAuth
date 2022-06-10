const User = require("../model/user");

//controller to handle signIn route
module.exports.signIn = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    return res.render("login", {});
  } catch (error) {
    console.log(`Error in SignIn Controller ${error}`);
  }
};

//controller to handle signUp route
module.exports.signUp = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    return res.render("register", {});
  } catch (error) {
    console.log(`Error in SignUp Controller ${error}`);
  }
};

//controller to handle signUp POST Data
module.exports.create = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    }

    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log("error in finding user in signing up");
        return;
      }

      if (!user) {
        User.create(req.body, (err, user) => {
          if (err) {
            console.log("error in finding user in signing up");
            return;
          }
          req.flash("success", "User Created");
          return res.redirect("/user/signin");
        });
      } else {
        // if user exist we are sending back to signup page
        req.flash("error", "User Already Exists");
        return res.redirect("back");
      }
    });
  } catch (error) {
    console.log(`Error in Create Controller ${error}`);
  }
};

// sign-in and create session
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in Successful");
  // we will authenticate user in route using middleware
  return res.redirect("/");
};

// signout use to destry the seesion

module.exports.signout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return;
    }
  });
  req.flash("success", "You have Logged out!");
  return res.redirect("/user/signin");
};
