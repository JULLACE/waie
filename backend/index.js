const express = require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const dotenv = require('dotenv');
require('express-async-errors')

dotenv.config();

const tesRouter = require('./controllers/tesseract')
const middleware = require('./utils/middleware')

const app = express()
app.use(express.json())
app.use(fileupload())
app.use(cors()) // May wanna set this just to our deployment's ip...

app.use(express.static('dist'))

app.use('/api/tes', tesRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:3003/`)
})
