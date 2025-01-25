const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1> hi </h1>')
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:3003/`)
})
