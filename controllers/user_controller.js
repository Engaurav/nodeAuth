//controller to handle signIn route
module.exports.signIn = async (req, res) => {
  try {
    return res.render('sign_in', {});
  } catch (error) {
    console.log(`Error in SignIn Controller ${error}`);
  }
};

//controller to handle signUp route
module.exports.signUp = async (req, res) => {
  try {
    return res.render('sign_up', {});
  } catch (error) {
    console.log(`Error in SignUp Controller ${error}`);
  }
};
