const express = require("express");
const router = express.Router();
const passport = require("passport");
const options_api = require("../../../controllers/api/v1/option");

// Create an option
// :id => questionID
router.post(
  "/create/:id",
  passport.authenticate("jwt", { session: false }),
  options_api.create
);
// Delete an option
//  :id => optionID
router.get(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  options_api.delete
);
// Vote for an option
router.post(
  "/add-vote/:id",
  passport.authenticate("jwt", { session: false }),
  options_api.addVote
);

module.exports = router;
