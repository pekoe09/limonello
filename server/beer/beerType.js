const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const beerTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  beers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const BeerType = mongoose.model('BeerType', beerTypeSchema)

module.exports = BeerType