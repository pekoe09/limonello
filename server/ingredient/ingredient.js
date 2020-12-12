import mongoose from 'mongoose'
import metaDataSchema from '../utils/metaData'

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  partitive: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  foodStuff: {
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