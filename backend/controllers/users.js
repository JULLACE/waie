const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Grab just the token from the auhtorization header
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


/*
  Creates a user and registers them onto the DB
  upon receiving username, name, and password.
  Responds with data above and an id.
*/
usersRouter.post('/create', async (request, response) => {
    const { username, name, password } = request.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

/*
  Receives an array of selected allergies / diets,
  and updates user allergy array accordingly
  
  Returns updated user JSON
*/
usersRouter.put('/allergies', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const body = request.body
    if (!body.allergies) {
        return response.status(400).json({
            error: 'allergies missing'
        })
    }

    const user = await User.findById(decodedToken.id)
    user.allergies = body.allergies
    await user.save()

    response.json(user)
})

/*
  Returns an array of users
  (should be removed later)  
*/
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter