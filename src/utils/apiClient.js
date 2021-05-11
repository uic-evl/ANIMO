import axios from 'axios'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

async function client(endpoint, method, {data, token} = {}) {
  const headers = {
    Authorization: token ? `Bearer ${token}` : undefined,
    'Content-Type': 'application/json',
  }

  try {
    console.log(`${API_ENDPOINT}/${endpoint}`)
    const response = await axios({
      method,
      url: `${API_ENDPOINT}/${endpoint}`,
      data,
      headers,
    })

    return response.data
  } catch (error) {
    if (error.response.status === 400) {
      return {user: null, message: 'Incorrect credentials'}
    }
    if (error.response.status === 401) {
      return {user: null, message: 'Please, re-authenticate'}
    }
  }
}

export {client}
