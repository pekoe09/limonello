import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

const coursesAdapter = createEntityAdapter({
  selectId: course => course._id
})

export const getCourses = createAsyncThunk(
  'courses/getCourses',
  async () => {
    const courses = await getAll('courses')
    return courses
  }
)

export const addCourse = createAsyncThunk(
  'courses/addCourse',
  async course => {
    course = await addEntity('courses', course)
    return course
  }
)

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async course => {
    course = await updateEntity('courses', course)
    return course
  }
)

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async courseId => {
    await removeEntity('courses', courseId)
  }
)

const initialState = coursesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: {
    [getCourses.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getCourses.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      coursesAdapter.upsertMany(state, action.payload)
    },
    [getCourses.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addCourse.fulfilled]: coursesAdapter.addOne,
    [addCourse.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateCourse.fulfilled]: coursesAdapter.updateOne,
    [updateCourse.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteCourse.fulfilled]: coursesAdapter.removeOne,
    [deleteCourse.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectCourseById,
  selectAll: selectAllCourses
} = coursesAdapter.getSelectors(state => state.courses)

export default coursesSlice.reducer