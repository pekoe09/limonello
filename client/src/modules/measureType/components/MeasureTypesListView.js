import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

function MeasureTypesListView(props) {
  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/measuretypes/edit/${id}`)
    } else {
      history.push('/measuretypes/create')
    }
  }

  const handleRowClick = (row) => {
    props.showError('')
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = props.searchPhraseToUse.toLowerCase()
    let filtered = props.items.map(i => i[1])
    if (props.searchPhraseToUse.length > 0) {
      filtered = props.items.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [props.items, props.searchPhraseToUse])

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
        Header: 'Partitiivi',
        accessor: 'partitive',
        headerStyle: {
          textAlign: 'left'
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
        headerText='Mittatyyppi'
        addBtnText='Lisää mittatyyppi'
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
  loading: store.measureTypes.loading,
  error: store.measureTypes.error
})

export default withRouter(connect(
  mapStateToProps
)(MeasureTypesListView))