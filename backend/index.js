const express = require('express')
const fileupload = require('express-fileupload')

const tesRouter = require('./controllers/tesseract')

const app = express()
app.use(express.json())
app.use(fileupload())
app.use('/api/tes', tesRouter)

app.get('/', (request, response) => {
    response.send('<h1> hi </h1>')
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:3003/`)
})
