import {
  COURSE_CREATE_BEGIN,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAILURE,
  COURSE_READ_BEGIN,
  COURSE_READ_SUCCESS,
  COURSE_READ_FAILURE,
  COURSE_UPDATE_BEGIN,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAILURE,
  COURSE_DELETE_BEGIN,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAILURE
} from './courseActions'

const initialState = {
  byId: {},
  allIds: [],
  currentCourse: null,
  gettingCourses: false,
  creatingCourse: false,
  updatingCourse: false,
  deletingCourse: false,
  courseError: null
}

const courseReducer = (store = initialState, action) => {
  switch (action.type) {
    case COURSE_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingCourse: true,
        courseError: null
      }
    case COURSE_CREATE_SUCCESS:
      console.log('hit create success', action.payload.course)
      const newCourse = action.payload.course
      return {
        ...store,
        byId: {
          ...store.byId,
          [newCourse._id]: newCourse
        },
        allIds: store.allIds.concat(newCourse._id),
        creatingCourse: false,
        courseError: null
      }
    case COURSE_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingCourse: false,
        courseError: action.payload.error
      }
    case COURSE_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingCourses: true,
        courseError: false
      }
    case COURSE_READ_SUCCESS:
      console.log('hit read success', action.payload.courses)
      const courses = action.payload.courses
      return {
        ...store,
        byId: courses.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: courses.map(c => c._id),
        gettingCourses: false,
        courseError: false
      }
    case COURSE_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingCourses: false,
        courseError: action.payload.error
      }
    case COURSE_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingCourse: true,
        courseError: null
      }
    case COURSE_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.course, store.items)
      const course = action.payload.course
      return {
        ...store,
        byId: { ...store.byId, [course._id]: course },
        updatingCourse: false,
        courseError: null
      }
    case COURSE_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingCourse: false,
        courseError: action.payload.error
      }
    case COURSE_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingCourse: true,
        courseError: null
      }
    case COURSE_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.courseId)
      const courseId = action.payload.courseId
      const { [courseId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== courseId),
        deletingCourse: false,
        courseError: null
      }
    case COURSE_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingCourse: false,
        courseError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default courseReducer