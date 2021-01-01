const FoodStuff = require('./foodstuff')
const Ingredient = require('./ingredient')
const foodStuffRouter = require('./foodStuffController')
const ingredientRouter = require('./ingredientController')

module.exports = {
  FoodStuff,
  Ingredient,
  foodStuffRouter,
  ingredientRouter
}