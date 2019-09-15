const express = require('express');

const router = express.Router();

const dataController = require('../controllers/data.controller');

router.post('/testData', dataController.postTestData);

module.exports = router;