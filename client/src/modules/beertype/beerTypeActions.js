import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const BEERTYPE_CREATE_BEGIN = 'BEERTYPE_CREATE_BEGIN'
export const BEERTYPE_CREATE_SUCCESS = 'BEERTYPE_CREATE_SUCCESS'
export const BEERTYPE_CREATE_FAILURE = 'BEERTYPE_CREATE_FAILURE'
export const BEERTYPE_READ_BEGIN = 'BEERTYPE_READ_BEGIN'
export const BEERTYPE_READ_SUCCESS = 'BEERTYPE_READ_SUCCESS'
export const BEERTYPE_READ_FAILURE = 'BEERTYPE_READ_FAILURE'
export const BEERTYPE_UPDATE_BEGIN = 'BEERTYPE_UPDATE_BEGIN'
export const BEERTYPE_UPDATE_SUCCESS = 'BEERTYPE_UPDATE_SUCCESS'
export const BEERTYPE_UPDATE_FAILURE = 'BEERTYPE_UPDATE_FAILURE'
export const BEERTYPE_DELETE_BEGIN = 'BEERTYPE_DELETE_BEGIN'
export const BEERTYPE_DELETE_SUCCESS = 'BEERTYPE_DELETE_SUCCESS'
export const BEERTYPE_DELETE_FAILURE = 'BEERTYPE_DELETE_FAILURE'

export const createBeerTypeBegin = () => ({
  type: BEERTYPE_CREATE_BEGIN
})

export const createBeerTypeSuccess = beerType => ({
  type: BEERTYPE_CREATE_SUCCESS,
  payload: { beerType }
})

export const createBeerTypeFailure = error => ({
  type: BEERTYPE_CREATE_FAILURE,
  payload: { error }
})

export const getBeerTypesBegin = () => ({
  type: BEERTYPE_READ_BEGIN
})

export const getBeerTypesSuccess = beerTypes => ({
  type: BEERTYPE_READ_SUCCESS,
  payload: { beerTypes }
})

export const getBeerTypesFailure = error => ({
  type: BEERTYPE_READ_FAILURE,
  payload: { error }
})

export const updateBeerTypeBegin = () => ({
  type: BEERTYPE_UPDATE_BEGIN
})

export const updateBeerTypeSuccess = beerType => ({
  type: BEERTYPE_UPDATE_SUCCESS,
  payload: { beerType }
})

export const updateBeerTypeFailure = error => ({
  type: BEERTYPE_UPDATE_FAILURE,
  payload: { error }
})

export const beerTypeDeleteBegin = () => ({
  type: BEERTYPE_DELETE_BEGIN
})

export const beerTypeDeleteSuccess = beerTypeId => ({
  type: BEERTYPE_DELETE_SUCCESS,
  payload: { beerTypeId }
})

export const beerTypeDeleteFailure = error => ({
  type: BEERTYPE_DELETE_FAILURE,
  payload: { error }
})

export const getBeerTypes = () => {
  console.log('getting beerTypes')
  return async (dispatch) => {
    dispatch(getBeerTypesBegin())
    try {
      const beerTypes = await getAll('beerTypes')
      dispatch(getBeerTypesSuccess(beerTypes))
    } catch (exception) {
      console.log(exception)
      dispatch(getBeerTypesFailure(exception))
    }
  }
}

export const saveBeerType = beerType => {
  return async (dispatch) => {
    if (beerType._id) {
      dispatch(updateBeerTypeBegin())
      try {
        beerType = await updateEntity('beerTypes', beerType)
        dispatch(updateBeerTypeSuccess(beerType))
      } catch (exception) {
        dispatch(updateBeerTypeFailure(exception))
      }
    } else {
      dispatch(createBeerTypeBegin())
      try {
        beerType = await addEntity('beerTypes', beerType)
        dispatch(createBeerTypeSuccess(beerType))
      } catch (exception) {
        dispatch(createBeerTypeFailure(exception))
      }
    }
  }
}

export const deleteBeerType = beerTypeId => {
  return async (dispatch) => {
    dispatch(beerTypeDeleteBegin())
    try {
      await removeEntity('beerTypes', beerTypeId)
      dispatch(beerTypeDeleteSuccess(beerTypeId))
    } catch (exception) {
      dispatch(beerTypeDeleteFailure(exception))
    }
  }
}