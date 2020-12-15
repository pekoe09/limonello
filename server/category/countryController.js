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
const countryRouter = require('express').Router()
const Country = require('./country')

countryRouter.get('/', wrapAsync(async (req, res, next) => {
  const countries = await Country
    .find({})
    .sort('name')
  res.json(countries)
}))

countryRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let country = new Country({
    name: req.body.name,
    continent: req.body.continent,
    beers: [],
    wines: [],
    regions: [],
    metaData: getMetaData(req)
  })
  country = await country.save()

  res.status(201).json(country)
}))

countryRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let country = await findObjectById(req.params.id, Country, 'country')
  country.name = req.body.name
  country.continent = req.body.continent
  country.metaData = getMetaData(req, country.metaData)
  country = await Country.findByIdAndUpdate(country._id, country, { new: true })

  res.status(201).json(country)
}))

countryRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let country = await findObjectById(req.params.id, Country, 'country')
  if (country.beers.length > 0) {
    throwRefsPreventDeleting('Country', req.params.id, 'beers')
  }
  if (country.regions.length > 0) {
    throwRefsPreventDeleting('Country', req.params.id, 'regions')
  }
  if (country.wines.length > 0) {
    throwRefsPreventDeleting('Country', req.params.id, 'wines')
  }

  await Country.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name'], 'country', 'create')
  await validateUniqueness(Country, 'Country', 'name', req.body.name, req.params.id)
}

module.exports = countryRouter