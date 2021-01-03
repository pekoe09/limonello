const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  alcohol: {
    type: Number,
    min: 0,
    max: 100
  },
  hoppiness: {
    type: Number,
    min: 0,
    max: 5
  },
  sweetness: {
    type: Number,
    min: 0,
    max: 5
  },
  stars: {
    type: Number,
    min: 0,
    max: 5
  },
  price: {
    type: Number,
    min: 0
  },
  boughtFrom: {
    type: String
  },
  comment: {
    type: String
  },
  brewery: {
    type: String
  },
  beerType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BeerType',
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  recommendedRecipes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const Beer = mongoose.model('Beer', beerSchema)

module.exports = Beer