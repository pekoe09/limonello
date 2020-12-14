const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  continent: {
    type: String,
    required: true
  },
  beers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer',
      required: true
    }],
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
  regions: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Region',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const Country = mongoose.model('Country', countrySchema)

module.exports = Country