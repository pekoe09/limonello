const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  wines: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wine',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const Region = mongoose.model('Area', regionSchema)

module.exports = Region