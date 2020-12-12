const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {
  wrapAsync,
  validateMandatoryFields,
  validateUniqueness,
  validateEmailForm
} = require('../utils/controllerHelpers')
const userRouter = require('express').Router()
const User = require('./user')

userRouter.post('/login', wrapAsync(async (req, res, next) => {
  const body = req.body
  const user = await User
    .findOne({ username: body.username })
    .select({
      _id: 1,
      username: 1,
      passwordHash: 1,
      lastName: 1,
      firstNames: 1,
      email: 1
    })
  console.log('found user', user)

  const isCorrectPsw = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
  if (!user || !isCorrectPsw) {
    let err = new Error('Invalid username or password')
    err.isUnauthorizedAttempt = true
    throw err
  }

  const tokenPayload = {
    username: user.username,
    userId: user._id
  }

  const token = jwt.sign(tokenPayload, process.env.SECRET)

  res.send({
    username: user.username,
    lastName: user.lastName,
    firstNames: user.firstNames,
    email: user.email,
    token
  })
}))

userRouter.post('/register', wrapAsync(async (req, res, next) => {
  const body = req.body
  const mandatories = ['email', 'lastName', 'firstName', 'psw']
  validateMandatoryFields(req, mandatories, 'User', 'register')
  await validateUniqueness(User, 'user', 'username', req.body.email)
  validateEmailForm(req.body.email)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.psw, saltRounds)

  let user = new User({
    username: body.email,
    passwordHash,
    lastName: body.lastName,
    firstNames: body.firstName,
    email: body.email,
    userRights: []
  })

  user = await user.save()
  delete user.passwordHash
  res.status(201).json(user)
}))

// userRouter.put(':/id', wrapAsync(async (req, res, next) => {

// }))

module.exports = userRouter