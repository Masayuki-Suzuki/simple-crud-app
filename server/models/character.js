const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const CharacterSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

module.exports = mongoose.model('Character', CharacterSchema)
