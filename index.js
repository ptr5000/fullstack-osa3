const http = require('http')
const express = require('express')
const app = express()

let book = [
    {
        name: "Seppo",
        number: "040-123456",
        id: 1
    }, {
        name: "Jorma",
        number: "050-543443",
        id: 2
    }, {
        name: "Kari",
        number: "040-5885665",
        id: 3
    }, {
        name: "Pirkko",
        number: "040-565655",
        id: 4
    }
]

app.get('/api/persons/', (req, res) => {
    res.json(book)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})