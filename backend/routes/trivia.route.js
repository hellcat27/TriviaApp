const express = require('express');

const router = express.Router();

const triviaController = require('../controllers/trivia.controller');

router.get('/randomquestions', triviaController.getRandomQuestions);

module.exports = router;