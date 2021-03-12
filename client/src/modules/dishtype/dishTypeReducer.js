import {
  DISHTYPE_CREATE_BEGIN,
  DISHTYPE_CREATE_SUCCESS,
  DISHTYPE_CREATE_FAILURE,
  DISHTYPE_READ_BEGIN,
  DISHTYPE_READ_SUCCESS,
  DISHTYPE_READ_FAILURE,
  DISHTYPE_UPDATE_BEGIN,
  DISHTYPE_UPDATE_SUCCESS,
  DISHTYPE_UPDATE_FAILURE,
  DISHTYPE_DELETE_BEGIN,
  DISHTYPE_DELETE_SUCCESS,
  DISHTYPE_DELETE_FAILURE
} from './dishTypeActions'

const initialState = {
  byId: {},
  allIds: [],
  currentDishType: null,
  gettingDishTypes: false,
  creatingDishType: false,
  updatingDishType: false,
  deletingDishType: false,
  dishTypeError: null
}

const dishTypeReducer = (store = initialState, action) => {
  switch (action.type) {
    case DISHTYPE_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingDishType: true,
        dishTypeError: null
      }
    case DISHTYPE_CREATE_SUCCESS:
      console.log('hit create success', action.payload.dishType)
      const newDishType = action.payload.dishType
      return {
        ...store,
        byId: {
          ...store.byId,
          [newDishType._id]: newDishType
        },
        allIds: store.allIds.concat(newDishType._id),
        creatingDishType: false,
        dishTypeError: null
      }
    case DISHTYPE_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingDishType: false,
        dishTypeError: action.payload.error
      }
    case DISHTYPE_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingDishTypes: true,
        dishTypeError: false
      }
    case DISHTYPE_READ_SUCCESS:
      console.log('hit read success', action.payload.dishTypes)
      const dishTypes = action.payload.dishTypes
      return {
        ...store,
        byId: dishTypes.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: dishTypes.map(c => c._id),
        gettingDishTypes: false,
        dishTypeError: false
      }
    case DISHTYPE_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingDishTypes: false,
        dishTypeError: action.payload.error
      }
    case DISHTYPE_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingDishType: true,
        dishTypeError: null
      }
    case DISHTYPE_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.dishType, store.items)
      const dishType = action.payload.dishType
      return {
        ...store,
        byId: { ...store.byId, [dishType._id]: dishType },
        updatingDishType: false,
        dishTypeError: null
      }
    case DISHTYPE_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingDishType: false,
        dishTypeError: action.payload.error
      }
    case DISHTYPE_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingDishType: true,
        dishTypeError: null
      }
    case DISHTYPE_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.dishTypeId)
      const dishTypeId = action.payload.dishTypeId
      const { [dishTypeId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== dishTypeId),
        deletingDishType: false,
        dishTypeError: null
      }
    case DISHTYPE_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingDishType: false,
        dishTypeError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default dishTypeReducer