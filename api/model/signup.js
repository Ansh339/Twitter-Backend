const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    number: Number,
    email: String,
    password: String,
    tweets: [{
        type: String
    }]
})

module.exports = mongoose.model('Signup', signupSchema)