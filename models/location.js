const mongoose = require('mongoose')

const locationTable = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Location', locationTable)