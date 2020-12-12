import mongoose from 'mongoose'
import metaDataSchema from '../utils/metaData'

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ordinality: {
    type: Number,
    min: 0,
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

const Course = mongoose.model('Course', courseSchema)

module.exports = Course