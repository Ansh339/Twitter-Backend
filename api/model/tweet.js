const mongoose = require('mongoose')

const signupSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    tweet: mongoose.Schema.Types.String
}

module.exports = mongoose.model('Tweet', signupSchema)