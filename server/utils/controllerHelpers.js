const UserRight = require('../user/userRight')

const wrapAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

const checkUser = (req) => {
  if (!req.user) {
    let err = new Error('Request does not contain valid user identification')
    err.isUnauthorizedAttempt = true
    throw err
  }
}

const getMetaData = (req, old) => {
  const time = new Date()
  const { user } = req
  //console.log('req', req)
  if (!old) {
    return {
      owner: user,
      created: { user, time }
    }
  } else {
    return {
      ...old,
      edited: { user, time }
    }
  }
}

const capitalize = (str) => {
  if (typeof str === 'string' && str.length > 0) {
    str = str.charAt(0).toUpperCase() + str.slice(1)
  }
  return str
}

const validateUserRights = async (req, level) => {
  console.log('querying userrights', req.user.username, req.user._id, level)
  console.log(UserRight)
  const userRight = await UserRight.findOne({ user: req.user._id })
  console.log('found rights', userRight)
  let hasRight = false
  if (userRight) {
    switch (userRight.rightLevel) {
      case 'superadmin':
        hasRight = true
        break
      case 'admin':
        hasRight = (level === 'superadmin') ? false : true
        break
      case 'user':
        hasRight = ((level === 'superadmin') || (level === 'admin')) ? false : true
        break
      case 'guest':
        hasRight = (level === 'guest') ? true : false
        break
      default:
        h
        hasRight = false
    }
  }
  if (!hasRight) {
    let err = new Error(`Operation requires ${level} rights for user ${req.user.username}`)
    err.isUnauthorizedAttempt = true
    throw err
  }
}
const validateMandatoryField = (req, fieldName, entity, operation) => {
  const fieldParts = fieldName.split('.')
  let fieldFound = false
  if (fieldParts.length === 1) {
    fieldFound = req.body[fieldName] && req.body[fieldName].toString().trim().length > 0
  } else if (fieldParts.length === 2) {
    fieldFound = req.body[fieldParts[0]][fieldParts[1]]
  }
  if (!fieldFound) {
    let err = new Error(`Field ${fieldName} is missing when trying to ${operation} ${entity}`)
    err.isBadRequest = true
    throw err
  }
}

const validateMandatoryFields = (req, fieldNames, entity, operation) => {
  fieldNames.forEach(f => validateMandatoryField(req, f, entity, operation))
}

const validateEmailForm = (email) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const isValid = re.test(email.toLowerCase())
  if (!isValid) {
    let err = new Error('Email is in invalid format')
    err.isBadRequest = true
    throw err
  }
}

const validateNonNegativeFields = (req, fieldNames, entity, operation) => {
  fieldNames.forEach(f => {
    const value = req.body[f]
    if (isNaN(value) || value < 0) {
      let err = new Error(`The value for ${f} is negative or NaN (trying to ${operation} ${entity}).`)
      err.isBadRequest = true
      throw err
    }
  })
}

const validateMonthNumbers = (req, fieldNames, entity, operation) => {
  fieldNames.forEach(f => {
    const value = req.body[f]
    if (value !== "") {
      if (isNaN.value || isNaN(parseInt(value)) || value < 1 || value > 12) {
        let err = new Error(`The value for ${f} is not an integer between 1 and 12 (trying to ${operation} ${entity})`)
        err.isBadRequest = true
        throw err
      }
    }
  })
}

const validateUniqueness = async (Entity, entityName, fieldName, newValue, _id) => {
  const isValid = await isUnique(Entity, fieldName, newValue, _id)
  if (!isValid) {
    let err = new Error(`Another ${entityName} has the same name`)
    err.isBadRequest = true
    throw err
  }
}

const isUnique = async (Entity, fieldName, newValue, _id) => {
  const match = await Entity.findOne({ [fieldName]: newValue })
  if (match) {
    if (_id && _id == match._id) {
      return true
    } else {
      return false
    }
  }
  return true
}

const throwRefsPreventDeleting = (entityName, id, refsName) => {
  let err = new Error(`${capitalize(entityName)} (${id}) cannot be deleted as it has ${refsName}`)
  err.isUnauthorizedAttempt = true
  throw err
}

const findObjectById = async (id, Entity, entityName) => {
  const entity = await Entity.findById(id)
  if (!entity) {
    let err = new Error(`${capitalize(entityName)} is not found (${id})`)
    err.isBadRequest = true
    throw err
  }
  return entity
}

const findObjectsById = async (ids, Entity, entityName) => {
  let objects = []
  for (const id of ids) {
    const entity = findObjectById(id, Entity, entityName)
    objects.push(entity)
  }
  return objects
}

const addChildToEntity = async (childId, entityId, Entity, entityName, arrayName) => {
  let entity = await findObjectById(entityId, Entity, entityName)
  entity[arrayName].push(childId)
  await Entity.findByIdAndUpdate(entityId, entity)
}

const removeChildFromEntity = async (childId, entityId, Entity, entityName, arrayName) => {
  let entity = await findObjectById(entityId, Entity, entityName)
  entity[arrayName] = entity[arrayName].filter(a => a !== childId)
  await Entity.findByIdAndUpdate(entityId, entity)
}

const stringifyByProperty = (arr, propertyName, separator) => {
  let propStr = ''
  propStr = arr.reduce((fullString, entity) => `${fullString}${entity[propertyName]}${separator}`, '')
  propStr = propStr.slice(0, propStr.length - separator.length)
  return propStr
}

module.exports = {
  wrapAsync,
  checkUser,
  getMetaData,
  validateUserRights,
  validateMandatoryField,
  validateMandatoryFields,
  validateNonNegativeFields,
  validateMonthNumbers,
  validateUniqueness,
  validateEmailForm,
  findObjectById,
  findObjectsById,
  addChildToEntity,
  removeChildFromEntity,
  isUnique,
  stringifyByProperty,
  throwRefsPreventDeleting
}