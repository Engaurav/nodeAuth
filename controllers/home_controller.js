module.exports.Home = async (req, res) => {
  try {
    return res.render('home',{})
  } catch (error) {
      console.log("Error in Home Controller",error)
  }
};
