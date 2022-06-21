const User = require("../model/user");
const crypto = require('crypto');
const forgetLinkMail  = require("../mailers/forgetLinkMail");

//controller to handle signIn route
module.exports.signIn = async (req, res) => {
  try {

    // redirecting to homepage if user is already logged in
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }

    // rending login page
    return res.render("login", {});

  } catch (error) {
    console.log(`Error in SignIn Controller ${error}`);
  }
};

//controller to handle signUp route
module.exports.signUp = async (req, res) => {
  try {

    
    // redirecting to homepage if user is already logged in
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }

    // render register page
    return res.render("register", {});
  } catch (error) {
    console.log(`Error in SignUp Controller ${error}`);
  }
};

//controller to handle signUp POST Data
module.exports.create = async (req, res) => {
  try {

    // checking password and confirm password
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    }

    // finding user from database
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log("error in finding user in signing up");
        return;
      }

      // if user not found 
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

  // verifying user
  if (req.user.id == req.body.id) {
    try {

      // finding user from db
      let user = await User.findById(req.body.id);
      
      // if user found
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
    // fetching emails from body
    let email = req.body.email;

    // finding user from db
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        req.flash("error","User not Found~!")
        return res.redirect('back');
      }
      if(user){

        let time = Date.now();        //fething time to send in url to later check session time out
        let secret = crypto.randomBytes(20).toString('hex');      //creatiing hex code for verification of lick
        user.secret = secret;           //storing secret in db
        user.save();

        // create a link
        let link = `${process.env.WEB_URL}/user/${user._id}/${time}/${secret}`

        // sending mail link
        forgetLinkMail.forgetLinkMailer(user.email,link);
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


// controller to handle forget password link page
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