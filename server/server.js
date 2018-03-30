const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Character = require('./models/character')

const app = express()
const PORT = 3000
const DB_URL = 'mongodb://localhost/simple-crud-app'

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

mongoose.connect(DB_URL, (dbErr) => {
  if (dbErr) {
    throw new Error(dbErr)
  } else {
    console.log('db connected')
  }
})

app.post('/api/characters', (req, res) => {
  const { name, age } = req.body
  new Character({
    name,
    age,
  }).save((err) => {
    if (err) {
      res.status(500)
    } else {
      res.status(200).send(`${name}(${age}) was successfully created.`)
    }
  })
})

app.get('/', (req, res) => {
  if (res.err) {
    console.log('Error!!')
  } else {
    res.render('index')
  }
})

app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err)
  } else {
    console.log(`listening on port ${PORT}`)
  }
})
