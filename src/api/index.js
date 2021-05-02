import axios from 'axios'

const fetchTasks = async () => {
  return axios
    .get('http://localhost:3000/api/tasks')
    .then(res => res.data.results)
}

export {fetchTasks}
