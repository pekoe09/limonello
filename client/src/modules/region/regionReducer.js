import {
  REGION_CREATE_BEGIN,
  REGION_CREATE_SUCCESS,
  REGION_CREATE_FAILURE,
  REGION_READ_BEGIN,
  REGION_READ_SUCCESS,
  REGION_READ_FAILURE,
  REGION_UPDATE_BEGIN,
  REGION_UPDATE_SUCCESS,
  REGION_UPDATE_FAILURE,
  REGION_DELETE_BEGIN,
  REGION_DELETE_SUCCESS,
  REGION_DELETE_FAILURE
} from './regionActions'

const initialState = {
  byId: {},
  allIds: [],
  currentRegion: null,
  gettingRegions: false,
  creatingRegion: false,
  updatingRegion: false,
  deletingRegion: false,
  regionError: null
}

const regionReducer = (store = initialState, action) => {
  switch (action.type) {
    case REGION_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingRegion: true,
        regionError: null
      }
    case REGION_CREATE_SUCCESS:
      console.log('hit create success', action.payload.region)
      const newRegion = action.payload.region
      return {
        ...store,
        byId: {
          ...store.byId,
          [newRegion._id]: newRegion
        },
        allIds: store.allIds.concat(newRegion._id),
        creatingRegion: false,
        regionError: null
      }
    case REGION_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingRegion: false,
        regionError: action.payload.error
      }
    case REGION_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingRegions: true,
        regionError: false
      }
    case REGION_READ_SUCCESS:
      console.log('hit read success', action.payload.regions)
      const regions = action.payload.regions
      return {
        ...store,
        byId: regions.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: regions.map(c => c._id),
        gettingRegions: false,
        regionError: false
      }
    case REGION_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingRegions: false,
        regionError: action.payload.error
      }
    case REGION_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingRegion: true,
        regionError: null
      }
    case REGION_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.region, store.items)
      const region = action.payload.region
      return {
        ...store,
        byId: { ...store.byId, [region._id]: region },
        updatingRegion: false,
        regionError: null
      }
    case REGION_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingRegion: false,
        regionError: action.payload.error
      }
    case REGION_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingRegion: true,
        regionError: null
      }
    case REGION_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.regionId)
      const regionId = action.payload.regionId
      const { [regionId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== regionId),
        deletingRegion: false,
        regionError: null
      }
    case REGION_DELETE_FAILURE:
      console.log('hit delete failure', action.payload.error)
      return {
        ...store,
        deletingRegion: false,
        regionError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default regionReducer