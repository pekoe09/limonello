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
const measureTypeRouter = require('express').Router()
const MeasureType = require('./measureType')

measureTypeRouter.get('/', wrapAsync(async (req, res, next) => {
  const measureTypes = await MeasureType
    .find({})
    .sort('name')
  res.json(measureTypes)
}))

measureTypeRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let measureType = new MeasureType({
    name: req.body.name,
    partitive: req.body.partitive,
    measures: [],
    metaData: getMetaData(req)
  })
  measureType = await measureType.save()

  res.status(201).json(measureType)
}))

measureTypeRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let measureType = await findObjectById(req.params.id, MeasureType, 'measureType')
  measureType.name = req.body.name
  measureType.partitive = req.body.partitive
  measureType.metaData = getMetaData(req, measureType.metaData)
  measureType = await MeasureType.findByIdAndUpdate(measureType._id, measureType, { new: true })

  res.status(201).json(measureType)
}))

measureTypeRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let measureType = await findObjectById(req.params.id, MeasureType, 'measureType')
  if (measureType.measures.length > 0) {
    throwRefsPreventDeleting('MeasureType', req.params.id, 'measures')
  }

  await MeasureType.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name', 'partitive'], 'measureType', 'create')
  await validateUniqueness(MeasureType, 'MeasureType', 'name', req.body.name, req.params.id)
}

module.exports = measureTypeRouter