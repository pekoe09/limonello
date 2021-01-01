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
const foodStuffRouter = require('express').Router()
const FoodStuff = require('./foodstuff')

foodStuffRouter.get('/', wrapAsync(async (req, res, next) => {
  const foodStuffs = await FoodStuff
    .find({})
    .sort('name')
  res.json(foodStuffs)
}))

foodStuffRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let foodStuff = new FoodStuff({
    name: req.body.name,
    ingredients: [],
    recipes: [],
    metaData: getMetaData(req)
  })
  foodStuff = await foodStuff.save()

  res.status(201).json(foodStuff)
}))

foodStuffRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let foodStuff = await findObjectById(req.params.id, FoodStuff, 'foodStuff')
  foodStuff.name = req.body.name
  foodStuff.metaData = getMetaData(req, foodStuff.metaData)
  foodStuff = await FoodStuff.findByIdAndUpdate(foodStuff._id, foodStuff, { new: true })

  res.status(201).json(foodStuff)
}))

foodStuffRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let foodStuff = await findObjectById(req.params.id, FoodStuff, 'foodStuff')
  if (foodStuff.ingredients.length > 0) {
    throwRefsPreventDeleting('FoodStuff', req.params.id, 'ingredients')
  }
  if (foodStuff.recipes.length > 0) {
    throwRefsPreventDeleting('FoodStuff', req.params.id, 'recipes')
  }

  await FoodStuff.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name'], 'foodStuff', 'create')
  await validateUniqueness(FoodStuff, 'FoodStuff', 'name', req.body.name, req.params.id)
}

module.exports = foodStuffRouter