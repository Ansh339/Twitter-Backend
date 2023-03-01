const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect(`mongodb+srv://Ansh339:Ansh2002@cluster0.9j2diyw.mongodb.net/Tweet?retryWrites=true&w=majority`)
    .then(() => console.log('CONNECTION SUCCESSFUL!'))
    .catch(() => console.log('CONNECTION FAILED!'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())    

const signupRoute = require('./api/routes/signup')
const loginRoute = require('./api/routes/login')
const tweetRoute = require('./api/routes/tweets')

app.use('/user/signup', signupRoute)
app.use('/user/login', loginRoute)
app.use('/user/tweets', tweetRoute)

app.use('/', (req, res) => {
    res.status(200).json({message: 'TEST'})
})

app.use((req, res) => {
    res.status(404).json({message: "Seems Like You Are Lost, Resource Not Found "})
})

module.exports = app