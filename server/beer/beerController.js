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
const beerRouter = require('express').Router()
const Beer = require('./beer')
const BeerType = require('./beerType')
const { Country } = require('../category')

beerRouter.get('/', wrapAsync(async (req, res, next) => {
  const beers = await Beer
    .find({})
    .sort('name')
  console.log('returning beers', beers)
  res.json(beers)
}))

beerRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)
  let beerType = await findObjectById(req.body.beerType, BeerType, 'BeerType')
  let country = req.body.country ? await findObjectById(req.body.country, Country, 'country') : null

  let beer = new Beer({
    name: req.body.name,
    alcohol: req.body.alcohol,
    hoppiness: req.body.hoppiness,
    sweetness: req.body.sweetness,
    stars: req.body.stars,
    price: req.body.price,
    boughtFrom: req.body.boughtFrom,
    comment: req.body.comment,
    brewery: req.body.brewery,
    beerType: req.body.beerType,
    country: req.body.country,
    recommendedRecipes: [],
    metaData: getMetaData(req)
  })
  beer = await beer.save()

  await BeerType.findByIdAndUpdate(
    beerType._id,
    { $push: { beers: beer._id } }
  )
  if (country) {
    await Country.findByIdAndUpdate(
      country._id,
      { $push: { beers: beer._id } }
    )
  }

  res.status(201).json(beer)
}))

beerRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let beer = await findObjectById(req.params.id, Beer, 'beer')
  let beerType = await findObjectById(req.body.beerType, BeerType, 'beerType')
  let country = req.body.country ? await findObjectById(req.body.country, Country, 'country') : null
  const oldType = beer.beerType
  const oldCountry = beer.country

  beer.name = req.body.name
  beer.alcohol = req.body.alcohol
  beer.hoppiness = req.body.hoppiness
  beer.sweetness = req.body.sweetness
  beer.stars = req.body.stars
  beer.price = req.body.price
  beer.boughtFrom = req.body.boughtFrom
  beer.comment = req.body.comment
  beer.brewery = req.body.brewery
  beer.beerType = req.body.beerType
  beer.country = req.body.country
  beer.metaData = getMetaData(req, beer.metaData)
  beer = await Beer.findByIdAndUpdate(beer._id, beer, { new: true })

  if (beer.beerType !== oldType) {
    await BeerType.findByIdAndUpdate(
      oldType._id,
      { $pull: { beers: beer._id } }
    )
    await BeerType.findByIdAndUpdate(
      beerType._id,
      { $push: { beers: beer._id } }
    )
  }
  if (beer.country !== oldCountry) {
    if (oldCountry) {
      await Country.findByIdAndUpdate(
        oldCountry,
        { $pull: { beers: beer._id } }
      )
    }
    if (beer.country) {
      await Country.findByIdAndUpdate(
        beer.country,
        { $push: { beers: beer._id } }
      )
    }
  }

  res.status(201).json(beer)
}))

beerRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let beer = await findObjectById(req.params.id, Beer, 'beer')
  if (beer.recommendedRecipes.length > 0) {
    throwRefsPreventDeleting('Beer', req.params.id, 'recipes')
  }

  await BeerType.findByIdAndUpdate(
    beer.beerType,
    { $pull: { beers: beer._id } }
  )
  if (beer.country) {
    await Country.findByIdAndUpdate(
      beer.country,
      { $pull: { beers: beer._id } }
    )
  }

  await Beer.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name', 'beerType', 'country'], 'beer', 'create')
  await validateUniqueness(Beer, 'Beer', 'name', req.body.name, req.params.id)
}

module.exports = beerRouter