const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const measureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  partitive: {
    type: String,
    required: true,
    unique: true
  },
  abbreviation: {
    type: String,
    required: true,
    unique: true
  },
  measureType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MeasureType',
    required: true
  },
  recipes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const Measure = mongoose.model('Measure', measureSchema)

module.exports = Measure