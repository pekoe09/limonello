import store from '../../../store'

export const getTokenHeader = () => {
  console.log('current store', store)
  let state = store.getState()
  const user = state.users.currentUser
  if (user && user.token) {
    return `bearer ${user.token}`
  }
  return null
}

export const getConfig = () => {
  const tokenHeader = getTokenHeader()
  return {
    headers: { 'Authorization': tokenHeader }
  }
}