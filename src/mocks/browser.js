import {setupWorker, rest} from 'msw'
import {db} from './db'
// cannot import recursive relationships with mswjs/data
// import modalities from './data/modalities.json'
import * as constants from '../utils/constants'

const modalities = require('./data/modalities.json')

const fetchTasks = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      results: db.task.getAll(),
    }),
  )
}

const fetchTaskById = (req, res, ctx) => {
  const {id} = req.params

  const task = db.task.findFirst({where: {_id: {equals: id}}})
  if (task) {
    return res(
      ctx.status(200),
      ctx.json({
        results: task,
      }),
    )
  } else {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Task not found`,
      }),
    )
  }
}

const startTask = async (req, res, ctx) => {
  const {id} = req.params
  // TODO: filter should include only tasks with state ASSIGNED but somehow it fails
  const updatedTask = db.task.update({
    where: {_id: {equals: id}},
    data: {status: constants.TASK_IN_PROCESS, startDate: new Date()},
  })

  if (updatedTask) {
    return res(
      ctx.status(200),
      ctx.json({
        results: updatedTask,
      }),
    )
  } else {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Task not found`,
      }),
    )
  }
}

const finishTask = async (req, res, ctx) => {
  const {id} = req.params
  const {username} = req.body

  const updatedTask = db.task.update({
    where: {_id: {equals: id}},
    data: {status: 'Finished', endDate: new Date(), taskPerformer: username},
  })

  if (updatedTask) {
    return res(
      ctx.status(200),
      ctx.json({
        results: updatedTask,
      }),
    )
  } else {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Task not found`,
      }),
    )
  }
}

const fetchDocumentById = (req, res, ctx) => {
  const {id} = req.params
  console.log('document', id)

  const document = db.document.findFirst({where: {_id: {equals: id}}})
  if (document) {
    return res(
      ctx.status(200),
      ctx.json({
        results: document,
      }),
    )
  } else {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Document not found`,
      }),
    )
  }
}

const fetchDocumentFigures = (req, res, ctx) => {
  const {id} = req.params
  console.log('fetch figures for', id)

  const figures = db.figure.findMany({
    where: {docId: {equals: id}, type: {equals: constants.FIGURE}},
  })
  if (figures) {
    return res(
      ctx.status(200),
      ctx.json({
        results: figures,
      }),
    )
  } else {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Figures not found`,
      }),
    )
  }
}

const fetchSubfigures = (req, res, ctx) => {
  const {id} = req.params

  const subfigures = db.figure.findMany({
    where: {figureId: {equals: id}, type: {equals: constants.SUBFIGURE}},
  })
  if (subfigures) {
    return res(
      ctx.status(200),
      ctx.json({
        results: subfigures,
      }),
    )
  } else {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Subfigures not found`,
      }),
    )
  }
}

const fetchModalities = (req, res, ctx) => {
  const {name} = req.params

  const tree = modalities.find(m => m.name === name)
  if (tree) {
    const rows = []
    let fringe = tree.modalities

    while (fringe.length > 0) {
      const node = fringe.shift()
      if (node.isRow) {
        rows.push(node)
      } else {
        if (node.children) {
          fringe = fringe.concat(node.children)
        }
      }
    }

    return res(
      ctx.status(200),
      ctx.json({
        results: rows,
      }),
    )
  } else {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Modality tree not found`,
      }),
    )
  }
}

export const worker = setupWorker(
  rest.get('/api/tasks', fetchTasks),
  rest.get('/api/tasks/:id', fetchTaskById),
  rest.patch('/api/tasks/:id/finish', finishTask),
  rest.patch('/api/tasks/:id/start', startTask),
  rest.get('/api/documents/:id', fetchDocumentById),
  rest.get('/api/documents/:id/figures', fetchDocumentFigures),
  rest.get('/api/figures/:id/subfigures', fetchSubfigures),
  rest.get('/api/modalities/:name', fetchModalities),
)
