const express = require('express')
const router = express.Router()


// all locations
router.get('/', (req, res) => {
  res.render('locations/index')
})

// new location
router.get('/new', (req, res) => {
  res.render('locations/new')
})

// create new location
router.post('/', (req, res) => {
  res.send('Create')
})

module.exports = router