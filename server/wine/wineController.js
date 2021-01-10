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
const wineRouter = require('express').Router()
const Wine = require('./wine')
const WineType = require('./wineType')
const Grape = require('./grape')
const Region = require('./region')
const { Country } = require('../category')

wineRouter.get('/', wrapAsync(async (req, res, next) => {
  const wines = await Wine
    .find({})
    .sort('name')
  res.json(wines)
}))

wineRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)
  let wineType = await findObjectById(req.body.wineType, WineType, 'WineType')
  let region = req.body.region ? await findObjectById(req.body.region, Region, 'region') : null
  let country = await findObjectById(req.body.country, Country, 'country')

  let wine = new Wine({
    name: req.body.name,
    alcohol: req.body.alcohol,
    stars: req.body.stars,
    price: req.body.price,
    boughtFrom: req.body.boughtFrom,
    comment: req.body.comment,
    producer: req.body.producer,
    wineType: req.body.wineType,
    grapes: req.body.grapes,
    vintage: req.body.vintage,
    region: req.body.region,
    country: req.body.country,
    recommendedRecipes: [],
    metaData: getMetaData(req)
  })
  wine = await wine.save()

  await WineType.findByIdAndUpdate(
    wineType._id,
    { $push: { wines: wine._id } }
  )
  if (region) {
    await Region.findByIdAndUpdate(
      region._id,
      { $push: { wines: wine._id } }
    )
  }
  await Country.findByIdAndUpdate(
    country._id,
    { $push: { wines: wine._id } }
  )
  if (wine.grapes.length > 0) {
    const promises = []
    wine.grapes.forEach((g) => {
      promises.push(Grape.findByIdAndUpdate(
        g.grape,
        { $push: { wines: wine._id } }
      ))
    })
    await Promise.all(promises)
  }

  res.status(201).json(wine)
}))

wineRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let wine = await findObjectById(req.params.id, Wine, 'wine')
  let wineType = await findObjectById(req.body.wineType, WineType, 'wineType')
  let region = req.body.region ? await findObjectById(req.body.region, Region, 'region') : null
  let country = await findObjectById(req.body.country, Country, 'country')
  const oldType = wine.wineType
  const oldRegion = wine.region
  const oldCountry = wine.country
  const oldGrapes = wine.grapes

  wine.name = req.body.name
  wine.alcohol = req.body.alcohol
  wine.stars = req.body.stars
  wine.price = req.body.price
  wine.boughtFrom = req.body.boughtFrom
  wine.comment = req.body.comment
  wine.producer = req.body.producer
  wine.wineType = req.body.wineType
  wine.grapes = req.body.grapes
  wine.vintage = req.body.vintage
  wine.region = req.body.region
  wine.country = req.body.country
  wine.metaData = getMetaData(req, wine.metaData)
  wine = await Wine.findByIdAndUpdate(wine._id, wine, { new: true })

  if (wine.wineType !== oldType) {
    await WineType.findByIdAndUpdate(
      oldType._id,
      { $pull: { wines: wine._id } }
    )
    await WineType.findByIdAndUpdate(
      wineType._id,
      { $push: { wines: wine._id } }
    )
  }
  if (wine.region !== oldRegion) {
    if (oldRegion) {
      await Region.findByIdAndUpdate(
        oldRegion,
        { $pull: { wines: wine._id } }
      )
    }
    if (wine.region) {
      await Region.findByIdAndUpdate(
        region._id,
        { $push: { wines: wine._id } }
      )
    }
  }
  if (wine.country !== oldCountry) {
    await Country.findByIdAndUpdate(
      oldCountry._id,
      { $pull: { wines: wine._id } }
    )
    await Country.findByIdAndUpdate(
      country._id,
      { $push: { wines: wine._id } }
    )
  }

  const oldGrapePromises = []
  oldGrapes.forEach(g => {
    let foundGrapes = wine.grapes.filter(ng => ng.grape === g.grape)
    if (foundGrapes.length === 0) {
      oldGrapePromises.push(Grape.findByIdAndUpdate(
        g.grape,
        { $pull: { wines: wine._id } }
      ))
    }
  })
  await Promise.all(oldGrapePromises)

  const newGrapePromises = []
  wine.grapes.forEach(g => {
    let foundGrapes = oldGrapes.filter(og => og.grape === g.grape)
    if (foundGrapes.length === 0) {
      newGrapePromises.push(Grape.findByIdAndUpdate(
        g.grape,
        { $push: { wines: wine._id } }
      ))
    }
  })
  await Promise.all(newGrapePromises)

  res.status(201).json(wine)
}))

wineRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let wine = await findObjectById(req.params.id, Wine, 'wine')
  if (wine.recommendedRecipes.length > 0) {
    throwRefsPreventDeleting('Wine', req.params.id, 'recipes')
  }

  await WineType.findByIdAndUpdate(
    wine.wineType,
    { $pull: { wines: wine._id } }
  )
  if (wine.country) {
    await Country.findByIdAndUpdate(
      wine.country,
      { $pull: { wines: wine._id } }
    )
  }
  if (wine.region) {
    await Region.findByIdAndUpdate(
      wine.region,
      { $pull: { wines: wine._id } }
    )
  }
  const grapePromises = []
  wine.grapes.forEach(g => {
    grapePromises.push(Grape.findByIdAndUpdate(
      g.grape,
      { $pull: { wines: wine._id } }
    ))
  })
  await Promise.all(grapePromises)

  await Wine.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name', 'wineType', 'country'], 'wine', 'create')
  await validateUniqueness(Wine, 'Wine', 'name', req.body.name, req.params.id)
}

module.exports = wineRouter