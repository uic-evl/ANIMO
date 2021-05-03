import {setupWorker, rest} from 'msw'
import {db} from './db'
import * as constants from '../utils/constants'

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

export const worker = setupWorker(
  rest.get('/api/tasks', fetchTasks),
  rest.get('/api/tasks/:id', fetchTaskById),
  rest.patch('/api/tasks/:id/finish', finishTask),
  rest.patch('/api/tasks/:id/start', startTask),
  rest.get('/api/documents/:id', fetchDocumentById),
)
