const request = require('request');
const ScoreData = require('../models/score.model');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');

exports.getRandomQuestions = (req, res, next) => {
    let numberOfQuestions = req.query.numberOfQuestions;
    let difficulty = req.query.difficulty || '';
    let category = req.query.category || '';
    request(`https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}&category=${category}`, (error, response, body) => {
        if(error){
            res.send("An error occured.");
            console.log(req);
        }
        else{
            //let responseData = JSON.parse(body);
            res.send(JSON.parse(body));
        }
    })
};

exports.saveScore = (req, res, next) => {
    const score = req.body.score;
    const name = sanitize(req.body.name);

    const newScore = new ScoreData({
        _id: new mongoose.Types.ObjectId(),
        name,
        score,
    });

    newScore.save()
    .then(() => res.json('New score added!'))
    .catch(err => res.json('Error: ' + err));
}

exports.getScores = async (req, res, next) => {
    let scores = await ScoreData.find({}).sort([['score', -1]]).limit(10).exec();
    res.send(scores);
}

exports.deleteScores = (req, res, next) => {
    ScoreData.deleteMany({}, function(err){
        if(err){
            res.send('Error deleting scores.')
        }else{
            res.send('Scores erased.')
        }
    });
}