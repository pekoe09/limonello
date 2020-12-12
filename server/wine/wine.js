import mongoose from 'mongoose'
import metaDataSchema from '../utils/metaData'

const wineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  alcohol: {
    type: Number,
    min: 0,
    max: 100
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
  producer: {
    type: String
  },
  wineType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WineType',
    required: true
  },
  grapes: {
    type: [{
      grape: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grape',
        required: true
      },
      portion: {
        type: Number,
        min: 0,
        max: 100
      }
    }],
    required: true
  },
  vintage: {
    type: Number,
    min: 1900
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region'
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