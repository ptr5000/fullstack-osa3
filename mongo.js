const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://dbuser:'+process.env.MONGO_PW+'@ds231228.mlab.com:31228/osa3'

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

