import axios from 'axios'
import {response} from 'msw'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

async function client(endpoint, method, {data, token, params} = {}) {
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios({
      method,
      url: `${API_ENDPOINT}/${endpoint}`,
      data,
      headers,
      params,
    })

    return {error: false, payload: response.data, message: null}
  } catch (error) {
    if (error.message === 'Network Error') {
      return {error: true, payload: null, message: error.message}
    }
    if (error.response.status === 400) {
      return {error: true, payload: null, message: response.data.message}
    }
    if (error.response.status === 401) {
      return {error: true, payload: null, message: 'Please, re-authenticate'}
    }
  }
}

async function run(endpoint, method, {data, token, params} = {}) {
  // if used with react-query, populate the error fields
  // for other calls, handle with try - catch
  const {error, payload, message} = await client(endpoint, method, {
    data,
    token,
    params,
  })
  if (error) throw new Error(message)
  else return payload
}

export {client, run}
