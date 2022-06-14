const User = require("../model/user");
const crypto = require('crypto');

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
module.exports.signout = async (req, res) => {
  await req.logout(function (err) {
    if (err) {
      return;
    }

    req.flash("success", "Logged Out Successful");
    return res.redirect("/user/signin");
  });
};

// update controller
module.exports.update = async function (req, res) {
  // console.log("req.user.id", req.user.id);
  // console.log("req.params.id", req.params.id);
  if (req.user.id == req.body.id) {
    try {
      let user = await User.findById(req.body.id);
      console.log(user);
      if (user) {
        user.name = req.body.name;
        user.password = req.body.password;
        user.save();
        req.flash("success", "Profile Updated");
        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    } catch (error) {
      req.flash("error", error);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorised");
    return res.redirect("back");
  }
};


// controller for forget password
module.exports.forgetPasswordLinkCreate = async (req,res) => {
  try {
    let email = req.body.email;
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        req.flash("error","User not Found~!")
        return res.redirect('back');
      }
      if(user){
        let time = Date.now();
        let secret = crypto.randomBytes(20).toString('hex');
        user.secret = secret;
        user.save();
        console.log(user)
        let link = `${process.env.WEB_URL}/user/${user._id}/${time}/${secret}`
        console.log(link);
        req.flash("success","Reset Link Send to Your Email");
        return res.redirect('back')
      }else{
        req.flash("error","User not Found~!")
        return res.redirect('back');
      }
    })
    

  } catch (error) {
    req.flash("error", "Unauthorised");
    return res.redirect("back");
  }
}


module.exports.forgetPasswordLinkPage = async (req,res) => {
      try {
          User.findById(req.params.id,(err,user)=>{

          if(err){
            req.flash("error","Unauthorised User");
            return res.render("reset", {
              failure : "true"
            });
          }
          if(user.secret !== req.params.secret){
            req.flash("error","Unauthorised User");
            return res.render("reset", {
              failure : "true"
            });
          }
          let prevTime =req.params.time;
          let currentTime = Date.now();
          let timeSession = currentTime-prevTime;

          if(timeSession > 600000){
              req.flash("error","Link is Expired");
              return res.render("reset", {
                failure : "true"
              });
          }

          return res.render("reset", {
            failure : "false",
            user_id : user._id,
            user_secret : user.secret 
          });
          });
      } catch (error) {
        req.flash("error", "Unauthorised");
        return res.redirect("back");
      }
}



// controller for reset the password from link sended to email
module.exports.resetLinkPassword = async (req,res) => {
  try {
    let user = await User.findById(req.body.id);
      if (user) {
        user.password = req.body.password;
        user.secret = "";
        user.save();
        req.flash("success", "Password Updated");
        return res.redirect("/user/signin");
      } else {
        req.flash("error","Unauthorised User");
        return res.redirect("/user/signin");
      }
    
  } catch (error) {
    req.flash("error", "Unauthorised");
    return res.redirect("back");
  }
}