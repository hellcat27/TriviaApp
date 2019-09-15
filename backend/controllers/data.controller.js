const request = require('request');
const TestData = require('../models/testdata.model');
const mongoose = require('mongoose');

exports.postTestData = (req, res, next) => {
    const username = req.body.username;

    const newData = new TestData({
        _id: new mongoose.Types.ObjectId(),
        username,
    });

    newData.save()
    .then(() => res.json('Test data added!'))
    .catch(err => res.json('Error: ' + err));
};