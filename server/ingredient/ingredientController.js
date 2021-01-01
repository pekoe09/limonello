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
const ingredientRouter = require('express').Router()
const Ingredient = require('./ingredient')
const FoodStuff = require('./foodstuff')

ingredientRouter.get('/', wrapAsync(async (req, res, next) => {
  const ingredients = await Ingredient
    .find({})
    .sort('name')
  res.json(ingredients)
}))

ingredientRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)
  let foodStuff = await findObjectById(req.body.foodStuff, FoodStuff, 'FoodStuff')

  let ingredient = new Ingredient({
    name: req.body.name,
    partitive: req.body.partitive,
    comment: req.body.comment,
    foodStuff: req.body.foodStuff,
    recipes: [],
    metaData: getMetaData(req)
  })
  ingredient = await ingredient.save()

  await FoodStuff.findByIdAndUpdate(
    foodStuff._id,
    { $push: { ingredients: ingredient._id } }
  )

  res.status(201).json(ingredient)
}))

ingredientRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let ingredient = await findObjectById(req.params.id, Ingredient, 'ingredient')
  let foodStuff = await findObjectById(req.body.foodStuff, FoodStuff, 'FoodStuff')
  const oldFoodStuff = ingredient.foodStuff

  ingredient.name = req.body.name
  ingredient.partitive = req.body.partitive
  ingredient.comment = req.body.comment
  ingredient.foodStuff = req.body.foodStuff
  ingredient.metaData = getMetaData(req, ingredient.metaData)
  ingredient = await Ingredient.findByIdAndUpdate(ingredient._id, ingredient, { new: true })

  if (ingredient.foodStuff !== oldFoodStuff) {
    await FoodStuff.findByIdAndUpdate(
      oldFoodStuff._id,
      { $pull: { ingredients: ingredient._id } }
    )
    await FoodStuff.findByIdAndUpdate(
      foodStuff._id,
      { $push: { ingredients: ingredient._id } }
    )
  }

  res.status(201).json(ingredient)
}))

ingredientRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let ingredient = await findObjectById(req.params.id, Ingredient, 'ingredient')
  if (ingredient.recipes.length > 0) {
    throwRefsPreventDeleting('Ingredient', req.params.id, 'recipes')
  }

  await FoodStuff.findByIdAndUpdate(
    ingredient.foodStuff,
    { $pull: { ingredients: ingredient._id } }
  )

  await Ingredient.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name', 'partitive', 'foodStuff'], 'ingredient', 'create')
  await validateUniqueness(Ingredient, 'Ingredient', 'name', req.body.name, req.params.id)
  await validateUniqueness(Ingredient, 'Ingredient', 'partitive', req.body.partitive, req.params.id)
}

module.exports = ingredientRouter