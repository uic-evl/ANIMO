import {useMemo} from 'react'
import {useQuery} from 'react-query'
import {useHistory} from 'react-router-dom'
import Table from '../components/table'
import {Heading, Box} from '@chakra-ui/react'
import {fetchTasks} from '../api/index'
import {dateAccessor} from '../utils/format'

const InboxPage = ({username}) => {
  const {isLoading, isError, data, error} = useQuery('tasks', () =>
    fetchTasks(username),
  )
  const history = useHistory()

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
          {Header: 'End Date', accessor: d => dateAccessor(d, 'endDate')},
          {Header: 'DocumentId', accessor: 'documentId'},
        ],
      },
    ],
    [],
  )

  const handleRowClick = values => {
    const {_id, documentId} = values
    history.push(`/label/${_id}/${documentId}/0/0`)
  }

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
        <Table
          columns={tableColumns}
          data={data}
          hiddenColumns={['_id', 'documentId']}
          onRowClick={handleRowClick}
        />
      </Box>
    </div>
  )
}

export default InboxPage
