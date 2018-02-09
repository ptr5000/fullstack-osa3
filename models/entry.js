const mongoose = require('mongoose')

const url = 'mongodb://dbuser:'+process.env.MONGO_PW+'@ds231228.mlab.com:31228/osa3'

mongoose.connect(url)

var entrySchema = new mongoose.Schema({
    name: String,
    number: String
});

entrySchema.statics.format = function(entry) {
    return {
      name: entry.name,
      number: entry.number,
      id: entry._id
    }
  }

const Entry = mongoose.model('Entry', entrySchema)


module.exports = Entry