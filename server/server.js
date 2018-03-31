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
      Character.find({}, (findErr, characterArray) => {
        if (findErr) {
          res.status(500).send()
        } else {
          res.status(200).send(characterArray)
        }
      })
    }
  })
})

app.get('/api/characters', (req, res) => {
  Character.find({}, (err, characterArray) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(200).send(characterArray)
    }
  })
})

app.put('/api/characters', (req, res) => {
  const { id, dec } = req.body
  const INC = dec ? -1 : 1
  Character.findByIdAndUpdate(id, { $inc: { age: INC } }, (err) => {
    if (err) {
      res.status(500).send()
    } else {
      Character.find({}, (findErr, characterArray) => {
        if (findErr) {
          res.status(500).send()
        } else {
          res.status(200).send(characterArray)
        }
      })
    }
  })
})

app.delete('/api/characters', (req, res) => {
  const { id } = req.body
  Character.findByIdAndRemove(id, (err) => {
    if (err) {
      res.status(500).send()
    } else {
      Character.find({}, (findErr, characterArray) => {
        if (findErr) {
          res.status(500).send()
        } else {
          res.status(200).send(characterArray)
        }
      })
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
