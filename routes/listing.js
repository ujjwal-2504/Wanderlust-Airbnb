const express = require("express");
const router = express.Router();

const wrapAsync = require("../utilities/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

router
  .route("/")

  //Index Route
  .get(wrapAsync(listingController.index))

  .post(
    // Create Route
    isLoggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// Filter Route
router
  .route("/filter/:category")

  .get(wrapAsync(listingController.filterCategory));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Search
router.get("/search", (req, res) => {
  req.flash("warning", `The search feature will be implemented soon`);
  res.redirect("/listings");
});

router
  .route("/:id")
  // Show Route
  .get(wrapAsync(listingController.showListing))

  // Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )

  // Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
