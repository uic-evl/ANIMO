import {run} from '../utils/apiClient'

export const fetchTasks = async username => {
  const payload = await run('tasks', 'get', {params: {username}})
  return payload
}

export const fetchTaskById = async id => {
  const payload = await run(`tasks/${id}`, 'get')
  return payload
}

export const fetchDocumentById = async id => {
  const payload = await run(`documents/${id}`, 'get')
  return payload
}

export const startTask = async values => {
  const {_id} = values
  const payload = await run(`tasks/${_id}/start`, 'patch')
  return payload
}

export const finishTask = async values => {
  // TODO: capture here an error with username?
  const {_id, username} = values
  const payload = await run(`tasks/${_id}/finish`, 'patch', {data: {username}})
  return payload
}

export const fetchDocumentFigures = async id => {
  const payload = await run(`documents/${id}/figures`, 'get')
  return payload
}

export const fetchSubfigures = async id => {
  const payload = await run(`figures/${id}/subfigures`, 'get')
  return payload
}

export const fetchModalities = async name => {
  const payload = await run(`modalities/${name}`, 'get')
  return payload
}

export const updateSubfigure = async values => {
  const {_id} = values
  const payload = await run(`figures/${_id}`, 'patch', {data: values})
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
