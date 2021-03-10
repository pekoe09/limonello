import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup, Form, Row, Col } from 'react-bootstrap'
import PageTitle from './PageTitle'
import { LimonelloButton, LimonelloForm } from '../../core'

const PageBar = ({
  headerText,
  addBtnText,
  handleOpenEditPage,
  handlePhraseChange,
  handleSearch,
  searchPhrase
}) => {
  return (
    <div style={{
      backgroundColor: 'navy',
      paddingTop: 8,
      paddingRight: 10,
      marginBottom: 15
    }}>
      <Row>
        <Col md={3}>
          <PageTitle text={headerText} />
        </Col>
        <Col md={9}>
          <LimonelloButton
            bsstyle='primary'
            style={{ marginRight: 10, marginLeft: 10, float: 'right' }}
            onClick={() => handleOpenEditPage()}
          >
            {addBtnText}
          </LimonelloButton>
          <Form
            inline
            style={{
              display: 'grid',
              width: 'auto',
              marginLeft: 25
            }}
          >
            <InputGroup>
              <LimonelloForm.Control
                type='text'
                name='searchPhrase'
                value={searchPhrase}
                onChange={handlePhraseChange}
                placeholder='Kirjoita hakusana'
              />
              <InputGroup.Append>
                <LimonelloButton
                  onClick={handleSearch}
                >
                  Hae!
              </LimonelloButton>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
      </Row>

    </div>
  )
}

export default PageBar

PageBar.propTypes = {
  headerText: PropTypes.string,
  addBtnText: PropTypes.string.isRequired,
  handleOpenEditPage: PropTypes.func,
  handlePhraseChange: PropTypes.func,
  handleSearch: PropTypes.func,
  searchPhrase: PropTypes.string
}