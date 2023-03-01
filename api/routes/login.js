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
            bcrypt.compare(userPassword, result[0].password)
                .then(cmp => {
                    if(cmp === true)
                    {
                        const loggedInUser = {
                            name: result[0].name,
                            number: result[0].number,                  
                            email: userEmail,
                            password: result[0].password
                        }
                        req.session.user = loggedInUser
                        req.session.save()   
                        res.status(200).json({message: "You have Successfully Logged In", result: loggedInUser})
                    }
                    else
                    {res.status(400).json({message: "Email or Password is Wrong"})}
                })
        }
    })
    .catch(error => res.status(500).json( {message: "Database Error", err: error}))
})

module.exports = router;