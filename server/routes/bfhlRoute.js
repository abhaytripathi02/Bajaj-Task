const express = require('express');
const router = express.Router();
const {getOperationCode, processData} = require('../controllers/bfhlController');

router.get('/get', getOperationCode);
router.post('/post', processData);

module.exports = router;
