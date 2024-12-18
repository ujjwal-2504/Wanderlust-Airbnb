const User = require("../models/user.js");
const Listing = require("../models/listing.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are Registered, Welcome to WanderLust");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/user/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome to WanderLust You are logged in");
  redirectUrl = res.locals.redirectUrl ? res.locals.redirectUrl : "/listings";
  res.redirect(redirectUrl);
};

module.exports.ownedListings = async (req, res) => {
  let { username } = req.params;
  const owner = await User.findOne({ username: username });
  const ownerId = owner._id;
  const allListings = await Listing.find({ owner: ownerId });
  // console.log(allListings);
  owned = { owner: username };
  res.render("listings/owned-listings.ejs", { allListings, owned });
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "You are logged out");
    res.redirect("/listings");
  });
};
