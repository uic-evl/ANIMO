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

export const finishTask = async id => {
  return axios
    .patch(`http://localhost:3000/api/tasks/${id}/finish`)
    .then(res => res.data.results)
}
