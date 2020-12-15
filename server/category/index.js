const Country = require('./country')
const Course = require('./course')
const Cuisine = require('./cuisine')
const DishType = require('./dishType')
const countryRouter = require('./countryController')
const courseRouter = require('./courseController')

module.exports = {
  Country,
  Course,
  Cuisine,
  DishType,
  countryRouter,
  courseRouter
}