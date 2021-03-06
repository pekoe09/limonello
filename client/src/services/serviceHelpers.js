export const getTokenHeader = () => {
  const user = JSON.parse(localStorage.getItem('limonellouser'))
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