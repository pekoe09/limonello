import React, { useState } from 'react'
import { compose } from 'redux'

const addSearch = (WrappedComponent) => props => {
  const {
    ...rest
  } = props

  const [searchPhrase, setSearchPhrase] = useState('')
  const [searchPhraseToUse, setSearchPhraseToUse] = useState('')

  const handlePhraseChange = searchPhraseEvent => {
    let searchPhrase = searchPhraseEvent.target.value
    if (searchPhrase.trim().length > 0) {
      setSearchPhrase(searchPhrase)
    } else {
      setSearchPhrase('')
    }
  }

  const handleSearch = () => {
    setSearchPhraseToUse(searchPhrase)
  }

  return (
    <WrappedComponent
      searchPhrase={searchPhrase}
      searchPhraseToUse={searchPhraseToUse}
      handlePhraseChange={handlePhraseChange}
      handleSearch={handleSearch}
      {...rest}
    />
  )
}

const withSearch = compose(
  addSearch
)

export default withSearch