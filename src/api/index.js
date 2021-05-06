import axios from 'axios'

export const fetchTasks = async () => {
  return axios
    .get('http://localhost:3000/api/tasks')
    .then(res => res.data.results)
}

export const fetchTaskById = async id => {
  return axios
    .get(`http://localhost:3000/api/tasks/${id}`)
    .then(res => res.data.results)
}

export const fetchDocumentById = async id => {
  return axios
    .get(`http://localhost:3000/api/documents/${id}`)
    .then(res => res.data.results)
}

export const startTask = async values => {
  const {_id} = values
  return axios
    .patch(`http://localhost:3000/api/tasks/${_id}/start`)
    .then(res => res.data.results)
}

export const finishTask = async values => {
  // TODO: capture here an error with username?
  const {_id, username} = values
  return axios
    .patch(`http://localhost:3000/api/tasks/${_id}/finish`, {username})
    .then(res => res.data.results)
}

export const fetchDocumentFigures = async id => {
  return axios
    .get(`http://localhost:3000/api/documents/${id}/figures`)
    .then(res => res.data.results)
}

export const fetchSubfigures = async id => {
  return axios
    .get(`http://localhost:3000/api/figures/${id}/subfigures`)
    .then(res => res.data.results)
}

export const fetchModalities = async name => {
  return axios
    .get(`http://localhost:3000/api/modalities/${name}`)
    .then(res => res.data.results)
}
