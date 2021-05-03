import {rest} from 'msw'
import {getTasks, fetchTaskById, finishTask} from './resolvers/tasks'
import {fetchDocumentById} from './resolvers/documents'
import tasksData from './data/tasks.json'

const test = []

export const handlers = [
  rest.get('/api/tasks', (_, res, ctx) => {
    console.log('test', test)
    test.push(1)

    return res(
      ctx.status(200),
      ctx.json({
        results: tasksData,
      }),
    )
  }),
  rest.get('/api/tasks/:id', fetchTaskById),
  rest.patch('/api/tasks/:id/finish', finishTask),
  rest.get('/api/documents/:id', fetchDocumentById),
]
