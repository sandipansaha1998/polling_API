const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_api = require("../../../controllers/api/v1/user");

router.post("/register", user_api.register);
router.post("/create-session", user_api.createSession);
router.get("/is-unique/", user_api.getIsEmailUnique);
router.get(
  "/getChosenOption/:id",
  passport.authenticate("jwt", { session: false }),
  user_api.getUserOption
);

router.get(
  "/mypolls",
  passport.authenticate("jwt", { session: false }),
  user_api.getMypolls
);

router.get(
  "/myvotes",
  passport.authenticate("jwt", { session: false }),
  user_api.getMyVotes
);
module.exports = router;
