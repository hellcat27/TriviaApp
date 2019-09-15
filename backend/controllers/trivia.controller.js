const request = require('request');

exports.getRandomQuestions = (req, res, next) => {
    let numberOfQuestions = req.body.numberOfQuestions;
    let difficultly = req.body.difficulty || '';
    let type = req.body.type || '';
    request(`https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficultly}&type=${type}`, (error, response, body) => {
        if(error){
            res.send("An error occured.");
        }
        else{
            //let responseData = JSON.parse(body);
            res.send(body);
        }
    })
};