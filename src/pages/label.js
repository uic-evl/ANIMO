import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {fetchTaskById, fetchDocumentById, finishTask} from '../api/index'
import LabelHeader from '../components/label-header'

const LabelPage = () => {
  const {taskId, documentId, figureId, subfigureId} = useParams()

  const taskQuery = useQuery(['task', taskId], () => fetchTaskById(taskId))

  const docQuery = useQuery(['document', documentId], () =>
    fetchDocumentById(documentId),
  )

  if (docQuery.isLoading || taskQuery.isLoading) {
    return <span>Loading ...</span>
  }

  if (docQuery.isError || taskQuery.isError) {
    return <span>Error: {docQuery.error.message}</span>
  }

  const onFinishClick = task => {
    finishTask(task._id)
  }

  return (
    <div>
      <LabelHeader
        task={taskQuery.data}
        document={docQuery.data}
        onFinishClick={onFinishClick}
      />
    </div>
  )
}

export default LabelPage
