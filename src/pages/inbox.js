import {useMemo} from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'
import Table from '../components/table'

const InboxPage = () => {
  const fetchTasks = async () => {
    return axios
      .get('http://localhost:3000/api/tasks')
      .then(res => res.data.results)
  }

  const {isLoading, isError, data, error} = useQuery('tasks', fetchTasks)

  const tableColumns = useMemo(() => [
    {
      Header: 'Tasks',
      columns: [
        {Header: 'Id', accessor: '_id'},
        {Header: 'Description', accessor: 'description'},
        {Header: 'Type', accessor: 'type'},
        {Header: 'Creation Date', accessor: 'creationDate'},
        {Header: 'Status', accessor: 'status'},
        {Header: 'Start Date', accessor: 'startDate'},
        {Header: 'End Date', accessor: 'endDate'},
      ],
    },
  ])

  if (isLoading) {
    return <span>Loading ...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h2>Inbox Page</h2>
      <Table columns={tableColumns} data={data} hiddenColumns={['_id']} />
    </div>
  )
}

export default InboxPage
