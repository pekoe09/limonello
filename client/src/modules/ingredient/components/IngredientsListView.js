import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import { makeGetIngredientsWithFoodstuff } from '../ingredientSelector'
import {
  LimonelloButton,
  LimonelloDataTable,
  PageBar
} from '../../core'

function IngredientsListView(props) {
  let history = useHistory()

  const handleOpenEditPage = (id) => {
    if (id) {
      history.push(`/ingredients/edit/${id}`)
    } else {
      history.push('/ingredients/create')
    }
  }

  const handleRowClick = (row) => {
    props.showError('')
    handleOpenEditPage(row.original._id)
  }

  const getFilteredItems = useCallback(() => {
    let searchPhrase = props.searchPhraseToUse.toLowerCase()
    let filtered = props.ingredients
    if (props.searchPhraseToUse.length > 0) {
      filtered = props.ingredients.filter(p =>
        p.name.toLowerCase().includes(searchPhrase)
      )
    }

    return filtered
  }, [props.ingredients, props.searchPhraseToUse])

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
        Header: 'Ruoka-aine',
        accessor: 'foodstuff.name',
        headerStyle: {
          textAlign: 'left'
        }
      },
      {
        Header: '',
        accessor: 'delete',
        Cell: (item) => (
          <LimonelloButton
            onClick={(e) => props.handleDeleteRequest(
              item.row.original,
              e,
              { foodstuffId: item.row.original.foodstuff._id }
            )}
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
        headerText='Ainekset'
        addBtnText='Lisää aines'
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

const makeMapStateToProps = () => {
  const getIngredientsWithCountry = makeGetIngredientsWithFoodstuff()
  return store => {
    const ingredients = getIngredientsWithCountry(store)
    console.log('received ingredients', ingredients)
    return {
      ingredients,
      loading: store.ingredients.loading,
      error: store.ingredients.error
    }
  }
}

export default withRouter(connect(
  makeMapStateToProps
)(IngredientsListView))