const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    score: { type: Number, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('ScoreData', scoreDataSchema);