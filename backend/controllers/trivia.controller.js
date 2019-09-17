const request = require('request');

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