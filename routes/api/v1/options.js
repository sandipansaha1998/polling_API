const express = require('express');
const router = express.Router();

const options_api = require('../../../controllers/api/v1/option');

router.post('/create/:id',options_api.create);
router.get('/delete',options_api.delete);


module.exports = router;