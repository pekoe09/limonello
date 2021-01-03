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
const grapeRouter = require('express').Router()
const Grape = require('./grape')

grapeRouter.get('/', wrapAsync(async (req, res, next) => {
  const grapes = await Grape
    .find({})
    .sort('name')
  res.json(grapes)
}))

grapeRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let grape = new Grape({
    name: req.body.name,
    description: req.body.description,
    wines: [],
    metaData: getMetaData(req)
  })
  grape = await grape.save()

  res.status(201).json(grape)
}))

grapeRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let grape = await findObjectById(req.params.id, Grape, 'grape')
  grape.name = req.body.name
  grape.description = req.body.description
  grape.metaData = getMetaData(req, grape.metaData)
  grape = await Grape.findByIdAndUpdate(grape._id, grape, { new: true })

  res.status(201).json(grape)
}))

grapeRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let grape = await findObjectById(req.params.id, Grape, 'grape')
  if (grape.wines.length > 0) {
    throwRefsPreventDeleting('Grape', req.params.id, 'wines')
  }

  await Grape.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name'], 'grape', 'create')
  await validateUniqueness(Grape, 'Grape', 'name', req.body.name, req.params.id)
}

module.exports = grapeRouter