import React from 'react'
import CourseEditView from './CourseEditView'
import { withCrud2 } from '../../core'
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  selectAllCourses,
  selectCourseById
} from '../coursesSlice'

const CourseEditPage = () => {
  const CourseEditWrapped = withCrud2(CourseEditView)
  return (
    <CourseEditWrapped
      defaultSort={() => { }}
      addItem={addCourse}
      getAllItems={getCourses}      
      updateItem={updateCourse}
      deleteItem={deleteCourse}
      selectItemById={selectCourseById}
      selectAllItems={selectAllCourses}
    />
  )
}

export default CourseEditPage