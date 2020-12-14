const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const cuisineSchema = new mongoose.Schema({
  name: {
    type: String,
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

const Cuisine = mongoose.model('Cuisine', cuisineSchema)

module.exports = Cuisine