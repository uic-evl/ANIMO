import {useMemo} from 'react'
import {useQuery} from 'react-query'
import Table from '../components/table'
import {Heading, Box} from '@chakra-ui/react'
import {fetchTasks} from '../api/index'

const dateAccessor = (d, field) => {
  return !d[field]
    ? '--'
    : new Date(d[field]).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
}

const InboxPage = () => {
  const {isLoading, isError, data, error} = useQuery('tasks', fetchTasks)

  const tableColumns = useMemo(
    () => [
      {
        Header: 'My Tasks',
        columns: [
          {Header: 'Id', accessor: '_id'},
          {Header: 'Description', accessor: 'description'},
          {Header: 'Type', accessor: 'type'},
          {
            Header: 'Creation Date',
            accessor: d => dateAccessor(d, 'creationDate'),
          },
          {Header: 'Status', accessor: 'status'},
          {Header: 'Start Date', accessor: d => dateAccessor(d, 'startDate')},
          {
            Header: 'End Date',
            accessor: d => dateAccessor(d, 'endDate'),
          },
        ],
      },
    ],
    [],
  )

  if (isLoading) {
    return <span>Loading ...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <Heading as="h1" pb="2.5" pl="2.5">
        Inbox
      </Heading>
      <Box pl="2.5" pr="2.5">
        <Table columns={tableColumns} data={data} hiddenColumns={['_id']} />
      </Box>
    </div>
  )
}

export default InboxPage
