const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
require('express-async-errors')

dotenv.config();

const tesRouter = require('./controllers/tesseract')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware')

mongoose.connect(process.env.MDB_URI)
    .then(() => {
        console.log('connectoed to MongoDB')
    })
    .catch((error) => {
        console.error('error connecting to MongoDB:', error.message)
    })


const app = express()
app.use(express.json())
app.use(fileupload())
app.use(cors()) // May wanna set this just to our deployment's ip...

app.get('/', (request, response) => {
    response.send('<h1> hi </h1>')
})

app.use('/api/tes', tesRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:3003/`)
})
