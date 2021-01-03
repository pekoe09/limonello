const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const wineTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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

const WineType = mongoose.model('WineType', wineTypeSchema)

module.exports = WineType