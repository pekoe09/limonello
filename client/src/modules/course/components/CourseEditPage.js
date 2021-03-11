import React from 'react'
import { connect } from 'react-redux'
import CourseEditView from './CourseEditView'
import { withCrud } from '../../core'
import {
  saveCourse,
  getCourses,
  deleteCourse
} from '../courseActions'

const CourseEditPage = props => {
  const id = null

  const CourseEditWrapped = withCrud(CourseEditView)
  return (
    <CourseEditWrapped
      repository={'courses'}
      id={id}
      defaultSort={() => {}}
      addItem={props.saveCourse}
      getAllItems={props.getCourses}
      updateItem={props.saveCourse}
      deleteItem={props.deleteCourse}
    />
  )
}

export default connect(
  null,
  {
    saveCourse,
    getCourses,
    deleteCourse
  }
)(CourseEditPage)