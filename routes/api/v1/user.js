const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_api = require("../../../controllers/api/v1/user");

// Registers a new user
router.post("/register", user_api.register);
// Creates user session
router.post("/create-session", user_api.createSession);
// Checks if email to be registered is unique
router.get("/is-unique/", user_api.getIsEmailUnique);
// Gets the chosen option for a user against a question
router.get(
  "/getChosenOption/:id",
  passport.authenticate("jwt", { session: false }),
  user_api.getUserOption
);

// List of Created polls
router.get(
  "/mypolls",
  passport.authenticate("jwt", { session: false }),
  user_api.getMypolls
);

// List of voted polls
router.get(
  "/myvotes",
  passport.authenticate("jwt", { session: false }),
  user_api.getMyVotes
);
module.exports = router;
