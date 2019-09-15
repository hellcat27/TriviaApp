const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('TestData', testDataSchema);