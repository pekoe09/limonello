import styled, { css } from 'styled-components'
import { Button } from 'react-bootstrap'

const LimonelloButton = styled(Button)`
  color: white;
  background-color: '#572617';
  font-family: sans-serif;
  margin-right: 5px;
  ${props => props.bsstyle === 'primary' && css`
    background-color: #E06460;
    color: white;
    border-style: solid;
    border-color: #E06460;
    border-width: 1.5px;
        
    &:hover, &:focus {
      background: #9F201C;
      color: white;
      border-color: #9F201C;
      outline: none;
    }
    &:active:focus {
      background: #9F201C;
      color: white;
      border-color: #9F201C;
      outline: none;
    }
  `}
  ${props => props.bsstyle === 'rowdanger' && css`
      background: white;
      color: indianred;
      border-style: solid;
      border-color: indianred;
      border-width: 1.5px;
      font-size: 0.8em;
      font-weight: 700;
        
      &:hover, &:focus {
        background: white;
        color: indianred;
        border-color: indianred;
        outline: none;
      }
      &:active:focus {
        background: pink;
        color: indianred;
        border-color: indianred;
        outline: none;
      }
    `}
  ${props => props.bsstyle === 'warning' && css`
    background: darkorange;
    color: black;
    border-style: solid;
    border-color: darkorange;
    border-width: 1.5px;
        
    &:hover, &:focus {
      background: orange;
      color: black;
      border-color: orange;
      outline: none;
    }
    &:active:focus {
      background: orange;
      color: black;
      border-color: orange;
      outline: none;
    }
  `}
`

export default LimonelloButton