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

const LabelPage = () => {
  const {taskId, documentId} = useParams()
  let {figureId, subfigureId} = useParams()
  const [selectedFigureId, setSelectedFigureId] = useState(() =>
    figureId === '0' || figureId === undefined ? null : figureId,
  )
  const [selectedSubfigureId, setSelectedSubfigureId] = useState(
    subfigureId === undefined ? null : subfigureId,
  )

  const history = useHistory()
  const queryClient = useQueryClient()

  const taskQuery = useQuery(['task', taskId], () => fetchTaskById(taskId))

  const docQuery = useQuery(['document', documentId], () =>
    fetchDocumentById(documentId),
  )

  const figsQuery = useQuery(
    ['figures'],
    async () => fetchDocumentFigures(documentId),
    {
      onSuccess: data => {
        if (!selectedFigureId) {
          setSelectedFigureId(data[0]._id)
        }
      },
    },
  )

  const selFigQuery = useQuery(
    ['figure', selectedFigureId],
    () => {
      const figure = figsQuery.data.find(f => f._id === selectedFigureId)
      if (figure) {
        return figure
      } else {
        return figsQuery.data[0]
      }
    },
    {
      enabled: !!figsQuery?.data && !!selectedFigureId,
    },
  )

  const subfigQuery = useQuery(
    ['subfigures', selectedFigureId],
    () => fetchSubfigures(selFigQuery.data._id),
    {
      enabled: !!selFigQuery?.data && !!selectedFigureId,
      onSuccess: data => {
        if (!selectedSubfigureId) {
          setSelectedSubfigureId(data[0]._id)
        }
      },
    },
  )

  const selSubfigQuery = useQuery(
    ['subfigure', selectedSubfigureId],
    () => {
      console.log('recalling the subfigure selected')
      console.log(subfigQuery.data)
      if (selectedSubfigureId) {
        let subfigure = subfigQuery.data.find(
          f => f._id === selectedSubfigureId,
        )
        subfigure = subfigure ? subfigure : subfigQuery.data[0]
        return subfigure
      } else {
        return subfigQuery.data[0]
      }
    },
    {
      enabled: !!subfigQuery?.data && !!setSelectedSubfigureId,
    },
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

  const subfigureMutation = useMutation(values => updateSubfigure(values), {
    onSuccess: async (data, variables) => {
      console.log('mutation')
      console.log(data)
      console.log(variables)
      console.log(selectedSubfigureId, typeof selectedSubfigureId)
      // setSelectedSubfigureId(data._id)
      // queryClient.setQueryData(['subfigure', data._id], data)
      const f = await queryClient.invalidateQueries([
        'subfigures',
        selectedFigureId,
      ])
      console.log('f', f)
      queryClient.invalidateQueries(['subfigure', data._id])
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

  return (
    <div>
      <Grid
        h="95vh"
        w="100%"
        templateRows="50px 1fr 1fr"
        templateColumns="200px 400px 1fr"
        gap={0}
      >
        {/* task and document info header */}
        <GridItem rowSpan={1} colSpan={5}>
          {docQuery.isLoading || taskQuery.isLoading ? (
            'Loading document and task data ...'
          ) : docQuery.isLoading || taskQuery.isLoading ? (
            'Error loading data ...'
          ) : (
            <LabelHeader
              task={taskQuery.data}
              document={docQuery.data}
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
          {figsQuery.isLoading || selFigQuery.isLoading ? (
            'Loading images ...'
          ) : figsQuery.isError || selFigQuery.isError ? (
            'error loading images ...'
          ) : (
            <>
              <DocumentFigures
                figures={figsQuery.data}
                selectedId={selFigQuery.data._id}
                onClick={id => {
                  setSelectedFigureId(id)
                  queryClient.invalidateQueries([
                    'selected_figure',
                    selectedFigureId,
                  ])
                  setSelectedSubfigureId(null)
                  queryClient.invalidateQueries([
                    'subfigures',
                    selectedFigureId,
                  ])
                }}
              />
            </>
          )}
        </GridItem>
        {/* selected figure preview and captions */}
        <GridItem rowSpan={2} colSpan={1}>
          {figsQuery.isLoading ||
          selFigQuery.isLoading ||
          subfigQuery.isLoading ||
          selSubfigQuery.isLoading ? (
            'Loading images ...'
          ) : figsQuery.isError ||
            selFigQuery.isError ||
            subfigQuery.isError ||
            selSubfigQuery.isLoading ? (
            'error loading images ...'
          ) : (
            <>
              <SelectedFigure
                figure={selFigQuery.data}
                subfigures={subfigQuery.data}
                onClick={id => {
                  setSelectedSubfigureId(id)
                  queryClient.invalidateQueries(['selected_subfigure', id])
                }}
                selectedSubfigureId={selSubfigQuery.data._id}
              />
            </>
          )}
        </GridItem>
        <GridItem>
          {modalitiesQuery.isLoading ||
          selSubfigQuery.isLoading ||
          figsQuery.isLoading ||
          selFigQuery.isLoading ||
          subfigQuery.isLoading ? (
            'Loading modalities...'
          ) : modalitiesQuery.isError || selSubfigQuery.isError ? (
            'Error modalities...'
          ) : (
            <Box>
              <Subfigure subfigure={selSubfigQuery.data} />
              <Labeling
                subfigure={selSubfigQuery.data}
                modalities={modalitiesQuery.data}
                onClick={(id, values) => {
                  const {modalities} = values

                  subfigureMutation.mutate({
                    _id: id,
                    modalities: modalities,
                  })
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
