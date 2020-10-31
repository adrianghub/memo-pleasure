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
  image: {
    type: Buffer,
    required: true
  },
  imageType: {
    type: String,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Location'
  }
})

pictureTable.virtual('imagePath').get(function() {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
  }
})

module.exports = mongoose.model('Picture', pictureTable)