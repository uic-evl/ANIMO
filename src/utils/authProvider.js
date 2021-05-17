import {client} from './apiClient'

const localStorageKey = process.env.REACT_APP_AUTH_KEY

export const getToken = () => {
  return localStorage.getItem(localStorageKey)
}

export const login = async (username, password) => {
  const {error, payload, message} = await client('users/login', 'post', {
    data: {username, password},
  })
  if (!error) {
    localStorage.setItem(localStorageKey, payload.token)
    return {
      user: {username: payload.username},
      message: `Welcome ${payload.username}`,
    }
  } else {
    return {user: null, message}
  }
}

export const logout = async () => {
  localStorage.removeItem(localStorageKey)
}
