import {
  FOODSTUFF_CREATE_BEGIN,
  FOODSTUFF_CREATE_SUCCESS,
  FOODSTUFF_CREATE_FAILURE,
  FOODSTUFF_READ_BEGIN,
  FOODSTUFF_READ_SUCCESS,
  FOODSTUFF_READ_FAILURE,
  FOODSTUFF_UPDATE_BEGIN,
  FOODSTUFF_UPDATE_SUCCESS,
  FOODSTUFF_UPDATE_FAILURE,
  FOODSTUFF_DELETE_BEGIN,
  FOODSTUFF_DELETE_SUCCESS,
  FOODSTUFF_DELETE_FAILURE
} from './foodstuffActions'

const initialState = {
  byId: {},
  allIds: [],
  currentFoodstuff: null,
  gettingFoodstuffs: false,
  creatingFoodstuff: false,
  updatingFoodstuff: false,
  deletingFoodstuff: false,
  foodstuffError: null
}

const foodstuffReducer = (store = initialState, action) => {
  switch (action.type) {
    case FOODSTUFF_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingFoodstuff: true,
        foodstuffError: null
      }
    case FOODSTUFF_CREATE_SUCCESS:
      console.log('hit create success', action.payload.foodstuff)
      const newFoodstuff = action.payload.foodstuff
      return {
        ...store,
        byId: {
          ...store.byId,
          [newFoodstuff._id]: newFoodstuff
        },
        allIds: store.allIds.concat(newFoodstuff._id),
        creatingFoodstuff: false,
        foodstuffError: null
      }
    case FOODSTUFF_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingFoodstuff: false,
        foodstuffError: action.payload.error
      }
    case FOODSTUFF_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingFoodstuffs: true,
        foodstuffError: false
      }
    case FOODSTUFF_READ_SUCCESS:
      console.log('hit read success', action.payload.foodstuffs)
      const foodstuffs = action.payload.foodstuffs
      return {
        ...store,
        byId: foodstuffs.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: foodstuffs.map(c => c._id),
        gettingFoodstuffs: false,
        foodstuffError: false
      }
    case FOODSTUFF_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingFoodstuffs: false,
        foodstuffError: action.payload.error
      }
    case FOODSTUFF_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingFoodstuff: true,
        foodstuffError: null
      }
    case FOODSTUFF_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.foodstuff, store.items)
      const foodstuff = action.payload.foodstuff
      return {
        ...store,
        byId: { ...store.byId, [foodstuff._id]: foodstuff },
        updatingFoodstuff: false,
        foodstuffError: null
      }
    case FOODSTUFF_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingFoodstuff: false,
        foodstuffError: action.payload.error
      }
    case FOODSTUFF_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingFoodstuff: true,
        foodstuffError: null
      }
    case FOODSTUFF_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.foodstuffId)
      const foodstuffId = action.payload.foodstuffId
      const { [foodstuffId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== foodstuffId),
        deletingFoodstuff: false,
        foodstuffError: null
      }
    case FOODSTUFF_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingFoodstuff: false,
        foodstuffError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default foodstuffReducer