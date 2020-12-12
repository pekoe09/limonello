import mongoose from 'mongoose'
import { model } from '../user/user'
import metaDataSchema from '../utils/metaData'

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