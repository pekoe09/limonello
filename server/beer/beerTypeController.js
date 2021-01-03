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
const beerTypeRouter = require('express').Router()
const BeerType = require('./beerType')

beerTypeRouter.get('/', wrapAsync(async (req, res, next) => {
  const beerTypes = await BeerType
    .find({})
    .sort('name')
  res.json(beerTypes)
}))

beerTypeRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let beerType = new BeerType({
    name: req.body.name,
    description: req.body.description,
    beers: [],
    metaData: getMetaData(req)
  })
  beerType = await beerType.save()

  res.status(201).json(beerType)
}))

beerTypeRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let beerType = await findObjectById(req.params.id, BeerType, 'beerType')
  beerType.name = req.body.name
  beerType.description = req.body.description
  beerType.metaData = getMetaData(req, beerType.metaData)
  beerType = await BeerType.findByIdAndUpdate(beerType._id, beerType, { new: true })

  res.status(201).json(beerType)
}))

beerTypeRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let beerType = await findObjectById(req.params.id, BeerType, 'beerType')
  if (beerType.beers.length > 0) {
    throwRefsPreventDeleting('BeerType', req.params.id, 'beers')
  }

  await BeerType.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name'], 'beerType', 'create')
  await validateUniqueness(BeerType, 'BeerType', 'name', req.body.name, req.params.id)
}

module.exports = beerTypeRouter