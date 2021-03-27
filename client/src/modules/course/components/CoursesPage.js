import React from 'react'
import CoursesListView from './CoursesListView'
import { withCrud2, withSearch } from '../../core'
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  selectAllCourses,
  selectCourseById
} from '../coursesSlice'

const defaultSort = (a, b) =>
  a.ordinality > b.ordinality ? 1 : (a.ordinality < b.ordinality ? -1 : 0)

const CoursesPage = () => {
  const CoursesWrapped = withSearch(withCrud2(CoursesListView))
  return (
    <CoursesWrapped
      repository={'courses'}
      defaultSort={defaultSort}
      addItem={addCourse}
      getAllItems={getCourses}
      updateItem={updateCourse}
      deleteItem={deleteCourse}
      selectAllItems={selectAllCourses}
      selectItemById={selectCourseById}
    />
  )
}

export default CoursesPage