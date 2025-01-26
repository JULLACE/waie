const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    // Have to use _id here since we're not using User schema (and toJSON) 
    const userForToken = {
        username: user.username,
        id: user._id
    }

    // We can't blindly trust the user for too long...
    // so we put a expiration of 60*5 seconds (5 min)...
    // todo: probably raise this
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        { expiresIn: 60*5 }
    )

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter