import {useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {
  fetchTaskById,
  fetchDocumentById,
  startTask,
  finishTask,
  fetchDocumentFigures,
  fetchSubfigures,
  fetchModalities,
} from '../api/index'
import {Flex} from '@chakra-ui/react'
import LabelHeader from '../components/label-header'
import DocumentFigures from '../components/doc-figures'
import SelectedFigure from '../components/selected-figures'
import Matrix from '../components/modalities-matrix'
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

  const figsQuery = useQuery(['figures'], async () =>
    fetchDocumentFigures(documentId),
  )

  const selFigQuery = useQuery(
    ['sel_figure'],
    () => {
      if (figureId) {
        const figure = figsQuery.data.find(f => f._id === figureId)
        if (figure) {
          return figure
        } else {
          return figsQuery.data[0]
        }
      }
    },
    {
      enabled: !!figsQuery?.data,
    },
  )

  const subfigQuery = useQuery(
    ['subfigures'],
    () => fetchSubfigures(selFigQuery.data._id),
    {enabled: !!selFigQuery?.data},
  )

  const modalitiesQuery = useQuery(['modalities'], () =>
    fetchModalities('curation'),
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

      <Flex>
        {figsQuery.isLoading ||
        selFigQuery.isLoading ||
        subfigQuery.isLoading ? (
          'Loading images ...'
        ) : figsQuery.isError || selFigQuery.isError || subfigQuery.isError ? (
          'error loading images ...'
        ) : (
          <>
            <DocumentFigures figures={figsQuery.data} />
            <SelectedFigure figure={selFigQuery.data} />
            <DocumentFigures figures={subfigQuery.data} />
          </>
        )}
        {modalitiesQuery.isLoading ||
        figsQuery.isLoading ||
        selFigQuery.isLoading ||
        subfigQuery.isLoading ? (
          'Loading modalities...'
        ) : modalitiesQuery.isError || subfigQuery.isError ? (
          'Error modalities...'
        ) : (
          <Matrix
            modalities={modalitiesQuery.data}
            subfigure={subfigQuery.data}
          />
        )}
      </Flex>
    </div>
  )
}

export default LabelPage
