import {run} from '../utils/apiClient'

export const fetchTasks = async (user, username) => {
  const payload = await run('tasks', 'get', {
    params: {username},
    token: user.token,
  })
  return payload
}

export const fetchTaskById = async (user, id) => {
  const payload = await run(`tasks/${id}`, 'get', {token: user.token})
  return payload
}

export const fetchDocumentById = async (user, id) => {
  const payload = await run(`documents/${id}`, 'get', {token: user.token})
  return payload
}

export const startTask = async (user, values) => {
  const {_id} = values
  const payload = await run(`tasks/${_id}/start`, 'patch', {token: user.token})
  return payload
}

export const finishTask = async (user, values) => {
  // TODO: capture here an error with username?
  const {_id, username} = values
  const payload = await run(`tasks/${_id}/finish`, 'patch', {
    data: {username},
    token: user.token,
  })
  return payload
}

export const fetchDocumentFigures = async (user, id) => {
  const payload = await run(`documents/${id}/figures`, 'get', {
    token: user.token,
  })
  console.log(payload)
  return payload
}

export const fetchSubfigures = async (user, id) => {
  const payload = await run(`figures/${id}/subfigures`, 'get', {
    token: user.token,
  })
  return payload
}

export const fetchModalities = async name => {
  const payload = await run(`modalities/${name}`, 'get')
  return payload
}

export const updateSubfigure = async (user, values) => {
  const {_id} = values
  const payload = await run(`figures/${_id}`, 'patch', {
    data: values,
    token: user.token,
  })
  return payload
}

export const me = async token => {
  const data = await run(`me/${token}`, 'get', {token: token})
  if (data) {
    return {user: {username: data.username, token: data.token}}
  } else {
    return data
  }
}
