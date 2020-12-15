const Country = require('./country')
const Course = require('./course')
const Cuisine = require('./cuisine')
const DishType = require('./dishType')
const countryRouter = require('./countryController')
const courseRouter = require('./courseController')
const cuisineRouter = require('./cuisineController')
const dishTypeRouter = require('./dishTypeController')

module.exports = {
  Country,
  Course,
  Cuisine,
  DishType,
  countryRouter,
  courseRouter,
  cuisineRouter,
  dishTypeRouter
}