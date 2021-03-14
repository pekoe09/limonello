import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const REGION_CREATE_BEGIN = 'REGION_CREATE_BEGIN'
export const REGION_CREATE_SUCCESS = 'REGION_CREATE_SUCCESS'
export const REGION_CREATE_FAILURE = 'REGION_CREATE_FAILURE'
export const REGION_READ_BEGIN = 'REGION_READ_BEGIN'
export const REGION_READ_SUCCESS = 'REGION_READ_SUCCESS'
export const REGION_READ_FAILURE = 'REGION_READ_FAILURE'
export const REGION_UPDATE_BEGIN = 'REGION_UPDATE_BEGIN'
export const REGION_UPDATE_SUCCESS = 'REGION_UPDATE_SUCCESS'
export const REGION_UPDATE_FAILURE = 'REGION_UPDATE_FAILURE'
export const REGION_DELETE_BEGIN = 'REGION_DELETE_BEGIN'
export const REGION_DELETE_SUCCESS = 'REGION_DELETE_SUCCESS'
export const REGION_DELETE_FAILURE = 'REGION_DELETE_FAILURE'

export const createRegionBegin = () => ({
  type: REGION_CREATE_BEGIN
})

export const createRegionSuccess = region => ({
  type: REGION_CREATE_SUCCESS,
  payload: { region }
})

export const createRegionFailure = error => ({
  type: REGION_CREATE_FAILURE,
  payload: { error }
})

export const getRegionsBegin = () => ({
  type: REGION_READ_BEGIN
})

export const getRegionsSuccess = regions => ({
  type: REGION_READ_SUCCESS,
  payload: { regions }
})

export const getRegionsFailure = error => ({
  type: REGION_READ_FAILURE,
  payload: { error }
})

export const updateRegionBegin = () => ({
  type: REGION_UPDATE_BEGIN
})

export const updateRegionSuccess = (region, oldCountryId) => ({
  type: REGION_UPDATE_SUCCESS,
  payload: { region, oldCountryId }
})

export const updateRegionFailure = error => ({
  type: REGION_UPDATE_FAILURE,
  payload: { error }
})

export const regionDeleteBegin = () => ({
  type: REGION_DELETE_BEGIN
})

export const regionDeleteSuccess = (regionId, countryId) => ({
  type: REGION_DELETE_SUCCESS,
  payload: { regionId, countryId }
})

export const regionDeleteFailure = error => ({
  type: REGION_DELETE_FAILURE,
  payload: { error }
})

export const getRegions = () => {
  console.log('getting regions')
  return async (dispatch) => {
    dispatch(getRegionsBegin())
    try {
      const regions = await getAll('regions')
      dispatch(getRegionsSuccess(regions))
    } catch (exception) {
      console.log(exception)
      dispatch(getRegionsFailure(exception))
    }
  }
}

export const saveRegion = (region, oldCountryId) => {
  return async (dispatch) => {
    if (region._id) {
      dispatch(updateRegionBegin())
      try {
        region = await updateEntity('regions', region)
        dispatch(updateRegionSuccess(region, oldCountryId))
      } catch (exception) {
        dispatch(updateRegionFailure(exception))
      }
    } else {
      dispatch(createRegionBegin())
      try {
        region = await addEntity('regions', region)
        dispatch(createRegionSuccess(region))
      } catch (exception) {
        dispatch(createRegionFailure(exception))
      }
    }
  }
}

export const deleteRegion = (regionId, { countryId }) => {
  return async (dispatch) => {
    dispatch(regionDeleteBegin())
    try {
      await removeEntity('regions', regionId)
      console.log('sending delete success')
      console.log(regionId)
      console.log(countryId)
      dispatch(regionDeleteSuccess(regionId, countryId))
    } catch (exception) {
      console.log('sending delete failure')
      dispatch(regionDeleteFailure(exception))
    }
  }
}