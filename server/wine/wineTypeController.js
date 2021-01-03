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
const wineTypeRouter = require('express').Router()
const WineType = require('./wineType')

wineTypeRouter.get('/', wrapAsync(async (req, res, next) => {
  const wineTypes = await WineType
    .find({})
    .sort('name')
  res.json(wineTypes)
}))

wineTypeRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let wineType = new WineType({
    name: req.body.name,
    wines: [],
    metaData: getMetaData(req)
  })
  wineType = await wineType.save()

  res.status(201).json(wineType)
}))

wineTypeRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let wineType = await findObjectById(req.params.id, WineType, 'wineType')
  wineType.name = req.body.name
  wineType.metaData = getMetaData(req, wineType.metaData)
  wineType = await WineType.findByIdAndUpdate(wineType._id, wineType, { new: true })

  res.status(201).json(wineType)
}))

wineTypeRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let wineType = await findObjectById(req.params.id, WineType, 'wineType')
  if (wineType.wines.length > 0) {
    throwRefsPreventDeleting('WineType', req.params.id, 'wines')
  }

  await WineType.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name'], 'wineType', 'create')
  await validateUniqueness(WineType, 'WineType', 'name', req.body.name, req.params.id)
}

module.exports = wineTypeRouter