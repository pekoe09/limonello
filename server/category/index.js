const Country = require('./country')
const Course = require('./course')
const Cuisine = require('./cuisine')
const DishType = require('./dishType')
const countryRouter = require('./countryController')

module.exports = {
  Country,
  Course,
  Cuisine,
  DishType,
  countryRouter
}