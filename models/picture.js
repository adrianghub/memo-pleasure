const mongoose = require('mongoose')

const pictureTable = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  tookDate: {
    type: Date,
    required: true
  },
  yearsOld: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Location'
  }
})

module.exports = mongoose.model('Picture', pictureTable)