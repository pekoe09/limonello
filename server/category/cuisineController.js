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
const cuisineRouter = require('express').Router()
const Cuisine = require('./cuisine')

cuisineRouter.get('/', wrapAsync(async (req, res, next) => {
  const cuisines = await Cuisine
    .find({})
    .sort('name')
  res.json(cuisines)
}))

cuisineRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let cuisine = new Cuisine({
    name: req.body.name,
    recipes: [],
    metaData: getMetaData(req)
  })
  cuisine = await cuisine.save()

  res.status(201).json(cuisine)
}))

cuisineRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let cuisine = await findObjectById(req.params.id, Cuisine, 'cuisine')
  cuisine.name = req.body.name
  cuisine.metaData = getMetaData(req, cuisine.metaData)
  cuisine = await Cuisine.findByIdAndUpdate(cuisine._id, cuisine, { new: true })

  res.status(201).json(cuisine)
}))

cuisineRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let cuisine = await findObjectById(req.params.id, Cuisine, 'cuisine')
  if (cuisine.recipes.length > 0) {
    throwRefsPreventDeleting('Cuisine', req.params.id, 'beers')
  }

  await Cuisine.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name'], 'cuisine', 'create')
  await validateUniqueness(Cuisine, 'Cuisine', 'name', req.body.name, req.params.id)
}

module.exports = cuisineRouter