import React, { useState, useCallback, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'
import {
  getCourses,
  selectAllCourses
} from '../coursesSlice'

function CoursesListView(props) {
  const dispatch = useDispatch()
  const allCourses = useSelector(selectAllCourses)

  const coursesStatus = useSelector((state) => state.courses.status)
  const error = useSelector((state) => state.courses.error)

  useEffect(() => {
    if(coursesStatus === 'idle') {
      dispatch(getCourses())
    }
  }, [coursesStatus, dispatch])

  const [rowToEdit, setRowToEdit] = useState(null)

  let history = useHistory()

  const handleOpenEditPage = (id) => {
    setRowToEdit(id)
    if (id) {
      history.push(`/courses/edit/${id}`)
    } else {
      history.push('/courses/create')
    }
  }

  const handleRowClick = (row) => {
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = props.searchPhraseToUse.toLowerCase()
    let filtered = allCourses
    if (props.searchPhraseToUse.length > 0) {
      filtered = allCourses.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [allCourses, props.searchPhraseToUse])

  const getData = React.useMemo(() => getFilteredItems(), [getFilteredItems])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nimi',
        accessor: 'name',
        headerStyle: {
          textAlign: 'left'
        }
      },
      {
        Header: 'Järjestys',
        accessor: 'ordinality',
        headerStyle: {
          textAlign: 'center'
        }
      },
      {
        Header: '',
        accessor: 'delete',
        Cell: (item) => (
          <LimonelloButton
            onClick={(e) => props.handleDeleteRequest(item.row.original, e)}
            bsstyle='rowdanger'
          >
            Poista
          </LimonelloButton>
        ),
        style: {
          textAlign: 'center'
        },
        disableSortBy: false,
        filterable: false,
        maxWidth: 80
      }
    ],
    []
  )

  return (
    <React.Fragment>
      <PageBar
        headerText='Ruokalajit'
        addBtnText='Lisää ruokalaji'
        handleOpenEditPage={handleOpenEditPage}
        searchPhrase={props.searchPhrase}
        handlePhraseChange={props.handlePhraseChange}
        handleSearch={props.handleSearch}
      />

      <LimonelloDataTable
        columns={columns}
        data={getData}
        handleRowClick={handleRowClick}
      />

      {props.renderDeletionConfirmation()}
    </React.Fragment>
  )
}

const mapStateToProps = store => ({
  loading: store.courses.loading,
  error: store.courses.error
})

export default withRouter(connect(
  mapStateToProps
)(CoursesListView))