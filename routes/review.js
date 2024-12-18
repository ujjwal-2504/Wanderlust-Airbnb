const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utilities/wrapAsync.js");
const Review = require("../models/reviews.js");
const ExpressError = require("../utilities/ExpressError.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isOwner,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewControllers = require("../controllers/reviews.js");

// Create review
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewControllers.createReview)
);

// Delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewControllers.destroyReview)
);

module.exports = router;
