const express = require('express')
const router = express.Router()

const Signup = require('../model/signup')

router.get('/', (req, res) => {
    res.status(200).json( {message: 'GET request to /user/login'})
})

router.post('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    Signup.find({email: userEmail})
    .then(result => {
        if(result.length === 0)
        {res.status(401).json({message: "User does not Exist"})}
        else
        {
            if(result[0].password === userPassword)
            {res.status(200).json({message: `Welcome ${result.map(result => result.name)}. You have Successfully Logged In`, tweets: result.map(result => result.tweets)})}
            else
            {res.status(400).json({message: "Email or Password is Wrong"})}
        }
    })
    .catch(error => res.status(500).json( {message: "Database Error", err: error}))
})

module.exports = router;