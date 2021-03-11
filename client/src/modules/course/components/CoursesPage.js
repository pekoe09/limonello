import React from 'react'
import { connect } from 'react-redux'
import CoursesListView from './CoursesListView'
import { withCrud, withSearch } from '../../core'
import {
  saveCourse,
  getCourses,
  deleteCourse
} from '../courseActions'

const defaultSort = (a, b) =>
  a.ordinality > b.ordinality ? 1 : (a.ordinality < b.ordinality ? -1 : 0)

const CoursesPage = props => {
  const CoursesWrapped = withSearch(withCrud(CoursesListView))
  return (
    <CoursesWrapped
      repository={'courses'}
      defaultSort={defaultSort}
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
)(CoursesPage)