const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint, dumbass'})
}

// Must be last loaded middleware and routes must be registered beforehand
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformatted ID' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'MongoServerError' &&
        error.message.includes('E11000 duplicate key error')) {
            return response.status(400).json({ error: 'expected username to be unique'})
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid bitch' })
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }

    next(error)
}

module.exports = {
    unknownEndPoint,
    errorHandler
}