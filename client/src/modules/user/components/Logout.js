import React from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { logout } from '../usersSlice'

const Logout = () => {
  let history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <Form inline>
      <Button
        onClick={handleLogout}
        size='mini'
        style={{
          fontFamily: 'sans-serif'
        }}
      >
        Logout
      </Button>
    </Form>
  )
}

export default withRouter(Logout)