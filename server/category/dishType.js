import mongoose from 'mongoose'
import metaDataSchema from '../utils/metaData'

const dishTypeSchema = new mongoose.Schema({
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

const DishType = mongoose.model('DishType', dishTypeSchema)

module.exports = DishType