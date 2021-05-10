import {client} from './apiClient'

const localStorageKey = '__curation_auth_provider_token__'

export const getToken = () => {
  return localStorage.getItem(localStorageKey)
}

export const login = async (username, password) => {
  const data = await client('login', 'post', {data: {username, password}})
  if (data.user) {
    localStorage.setItem(localStorageKey, data.token)
    return {
      user: {...data.user, token: data.token},
      message: `Welcome ${data.user.username}`,
    }
  } else {
    return {user: null, message: data.message}
  }
}

export const logout = async () => {
  localStorage.removeItem(localStorageKey)
}
