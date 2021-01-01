import mongoose from 'mongoose'
import metaDataSchema from '../utils/metaData'

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cuisine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuisine'
  },
  dishType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DishType',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  mainFoodStuff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodStuff'
  },
  cookingTime: {
    type: {
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    }
  },
  serves: {
    type: Number
  },
  ingredients: {
    type: [{
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
      },
      quantity: {
        type: {
          amount: {
            type: Number,
            required: true
          },
          measure: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Measure',
            required: true
          },
          text: {
            type: String,
            required: true
          },
          ordinality: {
            type: Number,
            required: true
          }
        },
        required: true
      },
      preprocess: {
        type: String
      }
    }],
    required: true
  },
  instructions: {
    type: String
  },
  comments: {
    type: String
  },
  wines: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wine',
      required: true
    }],
    required: true
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

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe