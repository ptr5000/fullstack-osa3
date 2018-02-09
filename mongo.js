const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

console.log(url)

mongoose.connect(url)

const Entry = mongoose.model('Entry', {
    name: String,
    number: String
  })


if(process.argv.length > 2) {
    const entry = new Entry({
    name: process.argv[2],
    number: process.argv[3]
    })

    entry.save()
    .then(response => {
        console.log('entry saved!')
        mongoose.connection.close()
    })
} else {
    Entry
    .find({})
    .then(result => {
        result.forEach(entry => {
        console.log(entry)
        })
        mongoose.connection.close()
    })
}

