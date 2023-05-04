const express = require('express');
const router = express.Router();

const question_api = require('../../../controllers/api/v1/question');


router.post('/create',question_api.create);
router.get('/get',question_api.get);
router.get('/delete',question_api.delete)



router.use('/options',require('./options'));







module.exports = router;