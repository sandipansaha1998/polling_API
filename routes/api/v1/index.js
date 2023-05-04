const express = require('express');
const router = express.Router();

console.log("Router started");


router.use('/question',require('./question'));


module.exports = router;