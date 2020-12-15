const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const measureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  partitive: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  },
  measureType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MeasureType',
    required: true
  },
  metaData: metaDataSchema
})

const Measure = mongoose.model('Measure', measureSchema)

module.exports = Measure