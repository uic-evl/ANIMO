import {useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {
  fetchTaskById,
  fetchDocumentById,
  startTask,
  finishTask,
} from '../api/index'
import LabelHeader from '../components/label-header'
import {TASK_ASSIGNED} from '../utils/constants'

const HARDCODED_USERNAME = 'jtrell2'

const LabelPage = () => {
  const {taskId, documentId, figureId, subfigureId} = useParams()
  const history = useHistory()
  const queryClient = useQueryClient()

  const taskQuery = useQuery(['task', taskId], () => fetchTaskById(taskId))

  const docQuery = useQuery(['document', documentId], () =>
    fetchDocumentById(documentId),
  )

  const startMutation = useMutation(values => startTask(values), {
    onSuccess: (data, values) => {
      queryClient.invalidateQueries(['task', taskId])
    },
  })

  const finishMutation = useMutation(values => finishTask(values), {
    onSuccess: _ => {
      queryClient.invalidateQueries(['task', taskId])
      //history.push('/inbox')
    },
  })

  useEffect(() => {
    // TODO: how to avoid useMutation from the dependency array
    if (taskQuery.data) {
      if (taskQuery.data.status === TASK_ASSIGNED) {
        startMutation.mutate({_id: taskQuery.data._id})
      }
    }
  }, [taskQuery.data])

  if (docQuery.isLoading || taskQuery.isLoading) {
    return <span>Loading ...</span>
  }

  if (docQuery.isError || taskQuery.isError) {
    return <span>Error: {docQuery.error.message}</span>
  }

  return (
    <div>
      <LabelHeader
        task={taskQuery.data}
        document={docQuery.data}
        onFinishClick={task =>
          finishMutation.mutate({_id: task._id, username: HARDCODED_USERNAME})
        }
      />
    </div>
  )
}

export default LabelPage
