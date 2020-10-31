const express = require('express')
const router = express.Router()
const Picture = require('../models/picture')

router.get('/', async (req, res) => {
  let pictures 
  try {
    pictures = await Picture.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    pictures = []
  }
  res.render('index', { pictures: pictures })
})

module.exports = router