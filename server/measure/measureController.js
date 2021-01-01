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
const measureRouter = require('express').Router()
const Measure = require('./measure')
const MeasureType = require('./measureType')

measureRouter.get('/', wrapAsync(async (req, res, next) => {
  const measures = await Measure
    .find({})
    .sort('name')
  res.json(measures)
}))

measureRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)
  let measureType = await findObjectById(req.body.measureType, MeasureType, 'MeasureType')

  let measure = new Measure({
    name: req.body.name,
    partitive: req.body.partitive,
    abbreviation: req.body.abbreviation,
    measureType: req.body.measureType,
    recipes: [],
    metaData: getMetaData(req)
  })
  measure = await measure.save()

  await MeasureType.findByIdAndUpdate(
    measureType._id,
    { $push: { measures: measure._id } }
  )

  res.status(201).json(measure)
}))

measureRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let measure = await findObjectById(req.params.id, Measure, 'measure')
  let measureType = await findObjectById(req.body.measureType, MeasureType, 'MeasureType')
  const oldType = measure.measureType

  measure.name = req.body.name
  measure.partitive = req.body.partitive
  measure.abbreviation = req.body.abbreviation
  measure.measureType = req.body.measureType
  measure.metaData = getMetaData(req, measure.metaData)
  measure = await Measure.findByIdAndUpdate(measure._id, measure, { new: true })

  if (measure.measureType !== oldType) {
    await MeasureType.findByIdAndUpdate(
      oldType._id,
      { $pull: { measures: measure._id } }
    )
    await MeasureType.findByIdAndUpdate(
      measureType._id,
      { $push: { measures: measure._id } }
    )
  }

  res.status(201).json(measure)
}))

measureRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let measure = await findObjectById(req.params.id, Measure, 'measure')
  if (measure.recipes.length > 0) {
    throwRefsPreventDeleting('Measure', req.params.id, 'recipes')
  }

  await MeasureType.findByIdAndUpdate(
    measure.measureType,
    { $pull: { measures: measure._id } }
  )

  await Measure.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name', 'partitive', 'abbreviation', 'measureType'], 'measure', 'create')
  await validateUniqueness(Measure, 'Measure', 'name', req.body.name, req.params.id)
  await validateUniqueness(Measure, 'Measure', 'partitive', req.body.partitive, req.params.id)
  await validateUniqueness(Measure, 'Measure', 'abbreviation', req.body.abbreviation, req.params.id)
}

module.exports = measureRouter