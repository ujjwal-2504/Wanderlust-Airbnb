const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utilities/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const Listing = require("../models/listing.js");

router
  .route("/signup")

  .get(userController.renderSignupForm)

  .post(wrapAsync(userController.createUser));

router
  .route("/login")

  .get(userController.renderLoginForm)

  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      failureFlash: true,
    }),
    userController.loginUser
  );

router.get("/logout", userController.logoutUser);

router.get("/:username", wrapAsync(userController.ownedListings));

module.exports = router;
