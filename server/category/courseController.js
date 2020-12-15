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
const courseRouter = require('express').Router()
const Course = require('./course')


courseRouter.get('/', wrapAsync(async (req, res, next) => {
  const courses = await Course
    .find({})
    .sort('name')
  res.json(courses)
}))

courseRouter.post('/', wrapAsync(async (req, res, next) => {
  await validate(req)

  let course = new Course({
    name: req.body.name,
    ordinality: req.body.ordinality,
    recipes: [],
    metaData: getMetaData(req)
  })
  course = await course.save()

  res.status(201).json(course)
}))

courseRouter.put('/:id', wrapAsync(async (req, res, next) => {
  await validate(req)

  let course = await findObjectById(req.params.id, Course, 'course')
  course.name = req.body.name
  course.ordinality = req.body.ordinality
  course.metaData = getMetaData(req, course.metaData)
  course = await Course.findByIdAndUpdate(course._id, course, { new: true })

  res.status(201).json(course)
}))

courseRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  await validateUserRights(req, 'admin')

  let course = await findObjectById(req.params.id, Course, 'course')
  if (course.recipes.length > 0) {
    throwRefsPreventDeleting('Course', req.params.id, 'recipes')
  }

  await Course.findByIdAndRemove(req.params.id)
  res.status(204).end()
}))

const validate = async (req) => {
  checkUser(req)
  await validateUserRights(req, 'admin')
  validateMandatoryFields(req, ['name', 'ordinality'], 'course', 'create')
  await validateUniqueness(Course, 'Course', 'name', req.body.name, req.params.id)
}

module.exports = courseRouter