import styled, { css } from 'styled-components'
import { Form } from 'react-bootstrap'

const LimonelloForm = styled(Form)`
  font-family: 'Montserrat',
  margin-top: 15px;
  margin-left: 15px;
`

const LimonelloFormLabel = styled(Form.Label)`
  margin-bottom: 0;
`

export {
  LimonelloForm,
  LimonelloFormLabel
}