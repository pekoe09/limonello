import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { login } from '../usersSlice'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleUsernamechange = e => setUsername(e.target.value)
  const handlePasswordchange = e => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    console.log('trying to log in', credentials)
    dispatch(login(credentials))
  }

  return (
    <Form inline>
      <input type="hidden" value="prayer" />
      <FormGroup>
        <FormControl
          placeholder='Tunnus'
          name='username'
          size='mini'
          value={username}
          onChange={handleUsernamechange}
          style={{
            marginRight: 5,
            fontFamily: 'sans-serif'
          }}
          autoComplete='off'
        />
        <FormControl
          placeholder='Salasana'
          name='password'
          size='mini'
          type='password'
          value={password}
          onChange={handlePasswordchange}
          style={{
            marginRight: 10,
            fontFamily: 'sans-serif'
          }}
          autoComplete='off'
        />
        <Button
          type='submit'
          onClick={handleSubmit}
          style={{ fontFamily: 'sans-serif' }}
        >
          Login
          </Button>
      </FormGroup>
    </Form>
  )
}

export default withRouter(Login)