const mongoose = require('mongoose')

const locationTable = new mongoose.Schema({
  country: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Location', locationTable)