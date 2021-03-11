import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const COURSE_CREATE_BEGIN = 'COURSE_CREATE_BEGIN'
export const COURSE_CREATE_SUCCESS = 'COURSE_CREATE_SUCCESS'
export const COURSE_CREATE_FAILURE = 'COURSE_CREATE_FAILURE'
export const COURSE_READ_BEGIN = 'COURSE_READ_BEGIN'
export const COURSE_READ_SUCCESS = 'COURSE_READ_SUCCESS'
export const COURSE_READ_FAILURE = 'COURSE_READ_FAILURE'
export const COURSE_UPDATE_BEGIN = 'COURSE_UPDATE_BEGIN'
export const COURSE_UPDATE_SUCCESS = 'COURSE_UPDATE_SUCCESS'
export const COURSE_UPDATE_FAILURE = 'COURSE_UPDATE_FAILURE'
export const COURSE_DELETE_BEGIN = 'COURSE_DELETE_BEGIN'
export const COURSE_DELETE_SUCCESS = 'COURSE_DELETE_SUCCESS'
export const COURSE_DELETE_FAILURE = 'COURSE_DELETE_FAILURE'

export const createCourseBegin = () => ({
  type: COURSE_CREATE_BEGIN
})

export const createCourseSuccess = course => ({
  type: COURSE_CREATE_SUCCESS,
  payload: { course }
})

export const createCourseFailure = error => ({
  type: COURSE_CREATE_FAILURE,
  payload: { error }
})

export const getCoursesBegin = () => ({
  type: COURSE_READ_BEGIN
})

export const getCoursesSuccess = courses => ({
  type: COURSE_READ_SUCCESS,
  payload: { courses }
})

export const getCoursesFailure = error => ({
  type: COURSE_READ_FAILURE,
  payload: { error }
})

export const updateCourseBegin = () => ({
  type: COURSE_UPDATE_BEGIN
})

export const updateCourseSuccess = course => ({
  type: COURSE_UPDATE_SUCCESS,
  payload: { course }
})

export const updateCourseFailure = error => ({
  type: COURSE_UPDATE_FAILURE,
  payload: { error }
})

export const courseDeleteBegin = () => ({
  type: COURSE_DELETE_BEGIN
})

export const courseDeleteSuccess = courseId => ({
  type: COURSE_DELETE_SUCCESS,
  payload: { courseId }
})

export const courseDeleteFailure = error => ({
  type: COURSE_DELETE_FAILURE,
  payload: { error }
})

export const getCourses = () => {
  console.log('getting courses')
  return async (dispatch) => {
    dispatch(getCoursesBegin())
    try {
      const courses = await getAll('courses')
      dispatch(getCoursesSuccess(courses))
    } catch (exception) {
      console.log(exception)
      dispatch(getCoursesFailure(exception))
    }
  }
}

export const saveCourse = course => {
  return async (dispatch) => {
    if (course._id) {
      dispatch(updateCourseBegin())
      try {
        course = await updateEntity('courses', course)
        dispatch(updateCourseSuccess(course))
      } catch (exception) {
        dispatch(updateCourseFailure(exception))
      }
    } else {
      dispatch(createCourseBegin())
      try {
        course = await addEntity('courses', course)
        dispatch(createCourseSuccess(course))
      } catch (exception) {
        dispatch(createCourseFailure(exception))
      }
    }
  }
}

export const deleteCourse = courseId => {
  return async (dispatch) => {
    dispatch(courseDeleteBegin())
    try {
      await removeEntity('courses', courseId)
      dispatch(courseDeleteSuccess(courseId))
    } catch (exception) {
      dispatch(courseDeleteFailure(exception))
    }
  }
}