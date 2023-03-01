const express = require('express')
const router = express.Router()
const Signup = require('../model/signup')

router.get('/', (req, res) => {
    Signup.find()
        .then(result => res.status(200).json( {message: "All Tweets", Tweets: result.map(result => result.tweets)}))
        .catch(err => res.status(500).json( {message: "Server Error", error: err}))
})

router.post('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password
    const tweet = req.body.tweet

    Signup.find({email: userEmail})
    .then(result => {
        if(result.length === 0)
        {res.status(401).json({message: "User does not Exist"})}
        else
        {
            if(result[0].password === userPassword)
            {
                // const newTweet = {
                //     _id: result[0]._id,
                //     email: result[0].email,
                //     name: result[0].name,
                //     number: result[0].number,
                //     tweets: tweet
                // }

                Signup.updateOne({_id: result[0]._id}, {$push: {tweets: tweet} })
                    .then(NewTweet => res.status(200).json({message: 'New Tweet Added', NewTweet: result.map(result => result.tweets)}))
                    .catch(err => res.status(500).json({message: "Server Error", error: err}))
            }
            else
            {res.status(400).json({message: "Email or Password is Wrong"})}
        }
    })
    .catch(error => res.status(500).json( {message: "Database Error", err: error}))
})

module.exports = router