const mongoose = require('mongoose')
const Picture = require('./picture')

const locationTable = new mongoose.Schema({
  country: {
    type: String,
    required: true
  }
})

locationTable.pre('remove', function(callback) {
  Picture.find({ location: this.id }, (err, pictures) => {
    if (err) {
      callback(err)
    } else if (pictures.length > 0) {
      callback(new Error('There is a picture connected with this particular country.'))
    } else {
      callback()
    }
  }) 
})

module.exports = mongoose.model('Location', locationTable)