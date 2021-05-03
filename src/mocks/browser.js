import {setupWorker, rest} from 'msw'
import {db} from './db'

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

const finishTask = async (req, res, ctx) => {
  const {id} = req.params

  const updatedTask = db.task.update({
    where: {_id: {equals: id}},
    data: {status: 'Finished', endDate: new Date()},
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
  rest.get('/api/documents/:id', fetchDocumentById),
)
