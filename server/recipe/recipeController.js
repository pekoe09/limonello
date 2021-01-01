const {
  wrapAsync,
  checkUser,
  getMetaData,
  validateMandatoryFields,
  validateUniqueness,
  validateUserRights,
  findObjectById,
  throwRefsPreventDeleting
} = require('../utils/controllerHelpers')
const recipeRouter = require('express').Router()
const Recipe = require('./recipe')
const { Cuisine, DishType, Course } = require('../category')
const { FoodStuff, Ingredient } = require('../ingredient')

recipeRouter.get('/', wrapAsync(async (req, res, next) => {
  const recipes = await Recipe
    .find({})
    .sort('name')
  res.json(recipes)
}))

recipeRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)
  let cuisine = req.body.cuisine ? await findObjectById(req.body.cuisine, Cuisine, 'Cuisine') : null
  let dishType = await findObjectById(req.body.dishType, DishType, 'DishType')
  let course = await findObjectById(req.body.course, Course, 'Course')
  let mainFoodStuff = req.body.mainFoodStuff ? await findObjectById(req.body.mainFoodStuff, FoodStuff, 'FoodStuff') : null

  let recipe = new Recipe({
    name: req.body.name,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    course: req.body.course,
    mainFoodStuff: req.body.mainfoodstuff,
    cookingTime: req.body.cookingTime,
    serves: req.body.serves,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    comments: req.body.comments,
    beers: req.body.beers,
    wines: req.body.wines,
    metaData: getMetaData(req)
  })
  recipe = await recipe.save()

  if (cuisine) {
    await Cuisine.findByIdAndUpdate(
      cuisine._id,
      { $push: { recipes: recipe._id } }
    )
  }
  await DishType.findByIdAndUpdate(
    dishType._id,
    { $push: { recipes: recipe._id } }
  )
  await Course.findByIdAndUpdate(
    course._id,
    { $push: { recipes: recipe._id } }
  )
  if (mainFoodStuff) {
    await FoodStuff.findByIdAndUpdate(
      mainFoodStuff._id,
      { $push: { recipes: recipe._id } }
    )
  }

  res.status(201).json(recipe)
}))

recipeRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let recipe = await findObjectById(req.params.id, Recipe, 'recipe')
  let cuisine = req.body.cuisine ? await findObjectById(req.body.cuisine, Cuisine, 'Cuisine') : null
  let dishType = await findObjectById(req.body.dishType, DishType, 'DishType')
  let course = await findObjectById(req.body.course, Course, 'Course')
  let mainFoodStuff = req.body.mainFoodStuff ? await findObjectById(req.body.mainFoodStuff, FoodStuff, 'FoodStuff') : null
  const oldCuisine = recipe.cuisine
  const oldDishType = recipe.dishType
  const oldCourse = recipe.course
  const oldMainFoodStuff = recipe.mainFoodStuff

  recipe.name = req.body.name
  recipe.cuisine = req.body.cuisine
  recipe.dishType = req.body.dishType
  recipe.course = req.body.course
  recipe.mainFoodStuff = req.body.mainFoodStuff
  recipe.cookingTime = req.body.cookingTime
  recipe.serves = req.body.serves
  recipe.instructions = req.body.instructions
  recipe.comments = req.body.comments
  recipe.metaData = getMetaData(req, recipe.metaData)
  recipe = await Recipe.findByIdAndUpdate(recipe._id, recipe, { new: true })

  if (recipe.cuisine !== oldCuisine) {
    if (oldCuisine) {
      await Cuising.findByIdAndUpdate(
        oldCuisine,
        { $pull: { recipes: recipe._id } }
      )
    }
    if (recipe.cuisine) {
      await Cuisine.findByIdAndUpdate(
        cuisine._id,
        { $push: { recipes: recipe._id } }
      )
    }
  }
  if (recipe.dishType !== oldDishType) {
    await DishType.findByIdAndUpdate(
      oldDishType,
      { $pull: { recipes: recipe._id } }
    )
    await DishType.findByIdAndUpdate(
      dishType._id,
      { $push: { recipes: recipe._id } }
    )
  }
  if (recipe.course !== oldCourse) {
    await Course.findByIdAndUpdate(
      oldCourse,
      { $pull: { recipes: recipe._id } }
    )
    await Course.findByIdAndUpdate(
      course._id,
      { $push: { recipes: recipe._id } }
    )
  }
  if (recipe.mainFoodStuff !== oldMainFoodStuff) {
    if (oldMainFoodStuff) {
      await FoodStuff.findByIdAndUpdate(
        oldMainFoodStuff,
        { $pull: { recipes: recipe._id } }
      )
    }
    if (recipe.mainFoodStuff) {
      await FoodStuff.findByIdAndUpdate(
        mainFoodStuff._id,
        { $push: { recipes: recipe._id } }
      )
    }
  }

  res.status(201).json(recipe)
}))

recipeRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let recipe = await findObjectById(req.params.id, Recipe, 'recipe')

  if (recipe.cuisine) {
    await Cuisine.findByIdAndUpdate(
      recipe.cuisine,
      { $pull: { recipes: recipe._id } }
    )
  }
  await DishType.findByIdAndUpdate(
    recipe.dishType,
    { $pull: { recipes: recipe._id } }
  )
  await Course.findByIdAndUpdate(
    recipe.course,
    { $pull: { recipes: recipe._id } }
  )
  if (recipe.mainFoodStuff) {
    await FoodStuff.findByIdAndUpdate(
      recipe.mainFoodStuff,
      { $pull: { recipes: recipe._id } }
    )
  }

  await Recipe.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name', 'dishType', 'course'], 'recipe', 'create')
  await validateUniqueness(Recipe, 'Recipe', 'name', req.body.name, req.params.id)
}

module.exports = recipeRouter