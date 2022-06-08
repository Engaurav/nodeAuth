const { redirect } = require("express/lib/response");


module.exports.Home = async (req, res) => {
  try {
    return res.render('home',{})
  } catch (error) {
      console.log("Error in Home Controller",error)
  }
};
