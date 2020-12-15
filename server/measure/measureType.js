const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const measureTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  partitive: {
    type: String,
    required: true
  },
  measures: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Measure',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const MeasureType = mongoose.model('MeasureType', measureTypeSchema)

module.exports = MeasureType