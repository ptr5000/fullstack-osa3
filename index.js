const http = require('http')
const express = require('express')
var morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Entry = require('./models/entry')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

morgan.token('json', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :json :response-time ms - :res[content-length]'))

app.get('/api/persons/', (req, res) => {
    Entry
        .find({})
        .then(result => {
            res.json(result.map(Entry.format))
        })
})

app.get('/api/persons/:id', (req, res) => {
    Entry
        .findById(req.params.id)
        .then(result => {
            res.json(Entry.format(result))
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res
            .status(400)
            .json({error: 'name missing'})
    }

    if (body.number === undefined) {
        return res
            .status(400)
            .json({error: 'number missing'})
    }

    if (book.find(entry => entry.name == body.name)) {
        return res
            .status(400)
            .json({error: 'name already exists'})
    }

    let n = {
        name: body.name,
        number: body.number
    }

    const entry = new Entry(n)

    entry
        .save()
        .then(response => {
            res.json(n)
            mongoose
                .connection
                .close()
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Entry
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res
                .status(204)
                .end()
        })
        .catch(error => {
            res
                .status(400)
                .send({error: 'unknown id'})
        })
})

app.get('/info/', (req, res) => {
    Entry.count({}, function( err, count){
        res.send("puhelinluettelossa " + count + " henkilön tiedot")
    })
    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})