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
const regionRouter = require('express').Router()
const Region = require('./region')
const { Country } = require('../category')

regionRouter.get('/', wrapAsync(async (req, res, next) => {
  const regions = await Region
    .find({})
    .sort('name')
  res.json(regions)
}))

regionRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)
  let country = await findObjectById(req.body.country, Country, 'country')

  let region = new Region({
    name: req.body.name,
    country: req.body.country,
    wines: [],
    metaData: getMetaData(req)
  })
  region = await region.save()

  await Country.findByIdAndUpdate(
    country._id,
    { $push: { regions: region._id } }
  )

  res.status(201).json(region)
}))

regionRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let region = await findObjectById(req.params.id, Region, 'region')
  let country = await findObjectById(req.body.country, Country, 'country')
  const oldCountry = region.country

  region.name = req.body.name
  region.country = req.body.country
  region.metaData = getMetaData(req, region.metaData)
  region = await Region.findByIdAndUpdate(region._id, region, { new: true })

  if (region.country !== oldCountry) {
    await Country.findByIdAndUpdate(
      oldCountry,
      { $pull: { regions: region._id } }
    )
    await Country.findByIdAndUpdate(
      country._id,
      { $push: { regions: region._id } }
    )
  }

  res.status(201).json(region)
}))

regionRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let region = await findObjectById(req.params.id, Region, 'region')
  if (region.wines.length > 0) {
    throwRefsPreventDeleting('Region', req.params.id, 'wines')
  }

  await Country.findByIdAndUpdate(
    region.country,
    { $pull: { regions: region._id } }
  )

  await Region.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name', 'country'], 'region', 'create')
  await validateUniqueness(Region, 'Region', 'name', req.body.name, req.params.id)
}

module.exports = regionRouter