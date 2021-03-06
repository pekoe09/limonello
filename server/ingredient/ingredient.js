const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  partitive: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  foodstuff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodStuff',
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

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient