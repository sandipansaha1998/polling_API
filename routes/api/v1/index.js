const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use("/question", require("./question"));
router.use("/options", require("./options"));
router.use("/user", require("./user"));

module.exports = router;
