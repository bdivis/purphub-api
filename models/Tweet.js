const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet', mongoose.Schema({
    date: { type: Date },
    tweet: String
}));

module.exports = Tweet;