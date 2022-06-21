const { redirect } = require("express/lib/response");



// home controller
module.exports.Home = async (req, res) => {
  try {
    // sending flash message
    req.flash("alert", `Welcome ${req.user.name} `);
    return res.render("home", {});
  } catch (error) {
    console.log("Error in Home Controller", error);
  }
};
