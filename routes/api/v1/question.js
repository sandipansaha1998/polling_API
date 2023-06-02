const express = require("express");
const router = express.Router();
const question_api = require("../../../controllers/api/v1/question");
const passport = require("passport");
// Create a question
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  question_api.create
);
// Delete a question
router.get(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  question_api.delete
);
// Get details of question with id as id
router.get("/:id", question_api.get);

module.exports = router;
