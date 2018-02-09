const http = require('http')
const express = require('express')
var morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

morgan.token('json', function(req, res){ return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :json :response-time ms - :res[content-length]'))


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

app.get('/api/persons/:id', (req, res) => {
    const b = book.find(entry => entry.id === Number(req.params.id))

    if(b == null) {
        res.status(404).end()
    } else {
        res.json(b) 
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (body.name === undefined) {
        return res.status(400).json({error: 'name missing'})
    }

    if (body.number === undefined) {
        return res.status(400).json({error: 'number missing'})
    }

    if(book.find(entry => entry.name == body.name)) {
        return res.status(400).json({error: 'name already exists'})
    }

    let n = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100000000000)
    }

    book = book.concat(n)

    res.json(n)

})

app.delete('/api/persons/:id', (req, res) => {
    book = book.filter(entry => entry.id !== Number(req.params.id))
    res.status(204).end()
})



app.get('/info/', (req, res) => {
    res.send("puhelinluettelossa " + book.length + " henkilön tiedot")
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})