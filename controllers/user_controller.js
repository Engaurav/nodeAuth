const User = require("../model/user");

//controller to handle signIn route
module.exports.signIn = async (req, res) => {
  try {
    return res.render("sign_in", {});
  } catch (error) {
    console.log(`Error in SignIn Controller ${error}`);
  }
};

//controller to handle signUp route
module.exports.signUp = async (req, res) => {
  try {
    return res.render("sign_up", {});
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

          return res.redirect("/user/signin");
        });
      } else {
        // if user exist we are sending back to signup page
        return res.redirect("back");
      }
    });
  } catch (error) {
    console.log(`Error in Create Controller ${error}`);
  }
};
