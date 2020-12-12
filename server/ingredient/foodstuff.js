import mongoose from 'mongoose'
import metaDataSchema from '../utils/metaData'

const foodStuffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true
    }],
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

const FoodStuff = mongoose.model('FoodStuff', foodStuffSchema)

module.exports = FoodStuff