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
const dishTypeRouter = require('express').Router()
const DishType = require('./dishType')

dishTypeRouter.get('/', wrapAsync(async (req, res, next) => {
  const dishTypes = await DishType
    .find({})
    .sort('name')
  res.json(dishTypes)
}))

dishTypeRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let dishType = new DishType({
    name: req.body.name,
    recipes: [],
    metaData: getMetaData(req)
  })
  dishType = await dishType.save()

  res.status(201).json(dishType)
}))

dishTypeRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let dishType = await findObjectById(req.params.id, DishType, 'dishType')
  dishType.name = req.body.name
  dishType.metaData = getMetaData(req, dishType.metaData)
  dishType = await DishType.findByIdAndUpdate(dishType._id, dishType, { new: true })

  res.status(201).json(dishType)
}))

dishTypeRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let dishType = await findObjectById(req.params.id, DishType, 'dishType')
  if (dishType.recipes.length > 0) {
    throwRefsPreventDeleting('DishType', req.params.id, 'beers')
  }

  await DishType.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name'], 'dishType', 'create')
  await validateUniqueness(DishType, 'DishType', 'name', req.body.name, req.params.id)
}

module.exports = dishTypeRouter