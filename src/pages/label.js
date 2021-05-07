import {useState, useEffect} from 'react'
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
  updateSubfigure,
} from '../api/index'
import {Box, Grid, GridItem} from '@chakra-ui/react'
import LabelHeader from '../components/label-header'
import DocumentFigures from '../components/figures-list'
import SelectedFigure from '../components/selected-figures'
import Subfigure from '../components/subfigure'
import Labeling from '../components/labeling'
import {TASK_ASSIGNED} from '../utils/constants'

const HARDCODED_USERNAME = 'jtrell2'

const checkParamId = id => (id === '0' || id === undefined ? null : id)

const LabelPage = () => {
  // always receive taskid and docid, others are optional (0 is null)
  const {taskId, documentId} = useParams()
  let {figureId, subfigureId} = useParams()

  // when no optionals, default to null and let the hooks populate the id
  const [selfigId, setSelFigId] = useState(checkParamId(figureId))
  const [selsubfigId, setSelSubfigId] = useState(checkParamId(subfigureId))

  const queryClient = useQueryClient()
  const history = useHistory()

  // hooks for task and document to fill header
  const task = useQuery(['task', taskId], () => fetchTaskById(taskId))
  const document = useQuery(['document', documentId], () =>
    fetchDocumentById(documentId),
  )

  const figsQuery = useQuery(
    ['figures'],
    async () => fetchDocumentFigures(documentId),
    {
      onSuccess: data => {
        if (!selfigId) {
          setSelFigId(data[0]._id)
        }
      },
    },
  )

  const selFigQuery = useQuery(
    ['figure', selfigId],
    () => {
      const figure = figsQuery.data.find(f => f._id === selfigId)
      if (figure) {
        return figure
      } else {
        return figsQuery.data[0]
      }
    },
    {
      enabled: !!figsQuery?.data && !!selfigId,
    },
  )

  // hook for subfigures and selected subfigure
  const subfigQuery = useQuery(
    ['subfigures', selfigId, selsubfigId],
    async () => {
      const subfigures = await fetchSubfigures(selFigQuery.data._id)
      let selected = null
      if (selsubfigId) {
        selected = subfigures.find(f => f._id === selsubfigId)
      } else if (!selected || !selsubfigId) {
        selected = subfigures[0]
      }
      return {
        subfigures,
        selected,
      }
    },
    {
      enabled: !!selFigQuery?.data && !!selfigId,
      onSuccess: data => {
        if (!selsubfigId) {
          setSelSubfigId(data.subfigures[0]._id)
        }
      },
    },
  )

  // TODO: label comes from task
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

  const subfigureMutation = useMutation(values => updateSubfigure(values), {
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries(['subfigures', selfigId, selsubfigId])
    },
  })

  // update status to started for assigned tasks, triggers only
  // the first time a task is opened
  useEffect(() => {
    // TODO: how to avoid useMutation from the dependency array
    if (task.data) {
      if (task.data.status === TASK_ASSIGNED) {
        startMutation.mutate({_id: task.data._id})
      }
    }
  }, [task.data])

  return (
    <div>
      <Grid
        h="95vh"
        w="100%"
        templateRows="50px 1fr 1fr"
        templateColumns="150px 300px 1fr"
        gap={0}
      >
        {/* task and document info header */}
        <GridItem rowSpan={1} colSpan={5}>
          {document.isLoading || task.isLoading ? (
            'Loading document and task data ...'
          ) : document.isLoading || task.isLoading ? (
            'Error loading data ...'
          ) : (
            <LabelHeader
              task={task.data}
              document={document.data}
              onFinishClick={task =>
                finishMutation.mutate({
                  _id: task._id,
                  username: HARDCODED_USERNAME,
                })
              }
            />
          )}
        </GridItem>

        {/* figures list on the left */}
        <GridItem rowSpan={2} colSpan={1}>
          {figsQuery.isLoading ||
          selFigQuery.isLoading ||
          subfigQuery.isLoading ? (
            'Loading images ...'
          ) : figsQuery.isError || selFigQuery.isError ? (
            'error loading images ...'
          ) : (
            <>
              <DocumentFigures
                figures={figsQuery.data}
                selectedId={selFigQuery.data._id}
                onClick={id => {
                  setSelFigId(id)
                  setSelSubfigId(null)
                  queryClient.invalidateQueries(['subfigures', id, null])
                }}
              />
            </>
          )}
        </GridItem>

        {/* selected figure preview and captions */}
        <GridItem rowSpan={2} colSpan={1}>
          {figsQuery.isLoading ||
          selFigQuery.isLoading ||
          subfigQuery.isLoading ? (
            'Loading images ...'
          ) : figsQuery.isError ||
            selFigQuery.isError ||
            subfigQuery.isError ? (
            'error loading images ...'
          ) : (
            <>
              <SelectedFigure
                figure={selFigQuery.data}
                subfigures={subfigQuery.data.subfigures}
                onClick={id => {
                  setSelSubfigId(id)
                  queryClient.invalidateQueries(['selected_subfigure', id])
                }}
                selectedSubfigureId={subfigQuery.data.selected._id}
              />
            </>
          )}
        </GridItem>

        {/* labeling area to the right */}
        <GridItem>
          {modalitiesQuery.isLoading ||
          figsQuery.isLoading ||
          selFigQuery.isLoading ||
          subfigQuery.isLoading ? (
            'Loading modalities...'
          ) : modalitiesQuery.isError ? (
            'Error modalities...'
          ) : (
            <Box>
              <Labeling
                caption={selFigQuery.data.caption}
                subfigure={subfigQuery.data.selected}
                modalities={modalitiesQuery.data}
                onClick={(id, values) => {
                  const {modalities} = values
                  subfigureMutation.mutate({_id: id, modalities})
                }}
              />
            </Box>
          )}
        </GridItem>
      </Grid>
    </div>
  )
}

export default LabelPage
