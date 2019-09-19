const express = require('express');

const router = express.Router();

const triviaController = require('../controllers/trivia.controller');

router.get('/randomquestions', triviaController.getRandomQuestions);
router.post('/newscore', triviaController.saveScore);
router.get('/getscores', triviaController.getScores);
router.delete('/deletescores', triviaController.deleteScores);

module.exports = router;