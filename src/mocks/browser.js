import {setupWorker, rest} from 'msw'
import {db} from './db'
import * as constants from '../utils/constants'

const modalities = require('./data/modalities.json')

const fetchTasks = (req, res, ctx) => {
  const username = req.url.searchParams.get('username')
  let tasks = db.task.getAll()
  // convert assignedTo from string to array (mswjs limitation)
  tasks = tasks.map(t => ({...t, assignedTo: t.assignedTo.split(',')}))
  tasks = tasks.filter(t => t.assignedTo.includes(username))

  return res(ctx.status(200), ctx.json(tasks))
}

const fetchTaskById = (req, res, ctx) => {
  const {id} = req.params
  const task = db.task.findFirst({where: {_id: {equals: id}}})

  if (task) {
    return res(ctx.status(200), ctx.json(task))
  } else {
    return res(ctx.status(400), ctx.json({message: `Task not found`}))
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
    return res(ctx.status(200), ctx.json(updatedTask))
  } else {
    return res(ctx.status(400), ctx.json({message: `Task not found`}))
  }
}

const finishTask = async (req, res, ctx) => {
  const {id} = req.params
  const {username} = req.body

  const updatedTask = db.task.update({
    where: {_id: {equals: id}},
    data: {
      status: constants.TASK_FINISHED,
      endDate: new Date(),
      taskPerformer: username,
    },
  })

  if (updatedTask) {
    return res(ctx.status(200), ctx.json(updatedTask))
  } else {
    return res(ctx.status(400), ctx.json({message: `Task not found`}))
  }
}

const fetchDocumentById = (req, res, ctx) => {
  const {id} = req.params

  const document = db.document.findFirst({where: {_id: {equals: id}}})
  if (document) {
    return res(ctx.status(200), ctx.json(document))
  } else {
    return res(ctx.status(403), ctx.json({message: `Document not found`}))
  }
}

const fetchDocumentFigures = (req, res, ctx) => {
  const {id} = req.params

  const figures = db.figure.findMany({
    where: {docId: {equals: id}, type: {equals: constants.FIGURE}},
  })
  if (figures) {
    return res(ctx.status(200), ctx.json(figures))
  } else {
    return res(ctx.status(403), ctx.json({message: `Figures not found`}))
  }
}

const fetchSubfigures = (req, res, ctx) => {
  const {id} = req.params

  let subfigures = db.figure.findMany({
    where: {figureId: {equals: id}, type: {equals: constants.SUBFIGURE}},
  })
  if (subfigures) {
    for (let sf of subfigures) {
      if (sf.modalities === '') {
        sf.modalities = []
      } else {
        sf.modalities = sf.modalities.split(',')
      }
    }
    return res(ctx.status(200), ctx.json(subfigures))
  } else {
    return res(ctx.status(400), ctx.json({message: `Subfigures not found`}))
  }
}

const fetchModalities = (req, res, ctx) => {
  const {name} = req.params

  // clone JSON reference to avoid mutating in memory
  const options = JSON.parse(JSON.stringify(modalities))
  const tree = options.find(m => m.name === name)
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

    return res(ctx.status(200), ctx.json(rows))
  } else {
    return res(ctx.status(400), ctx.json({message: `Modality tree not found`}))
  }
}

const updateFigure = (req, res, ctx) => {
  const {id} = req.params
  const {modalities, composition, applyToAll} = req.body

  const data = {
    ...req.body,
    state: constants.FIGURE_REVIEWED,
    composition: composition ? composition : '',
  }
  if (modalities) {
    data.modalities = modalities.join()
  }

  const updatedFigure = db.figure.update({where: {_id: {equals: id}}, data})

  if (applyToAll) {
    const data = {
      modalities: modalities.join(),
      state: constants.FIGURE_REVIEWED,
    }
    db.figure.updateMany({
      where: {figureId: {equals: updatedFigure.figureId}},
      data,
    })
  }

  let imagesToReview = db.figure.findMany({
    where: {
      figureId: {equals: updatedFigure.figureId},
    },
  })
  imagesToReview = imagesToReview.filter(
    f => f.state === constants.FIGURE_TO_REVIEW,
  )

  // check if need to update parent figure if every image was reviewed
  const refreshFigure = imagesToReview.length === 0
  if (refreshFigure) {
    db.figure.update({
      where: {_id: {equals: updatedFigure.figureId}},
      data: {state: constants.FIGURE_REVIEWED},
    })
  }

  if (updatedFigure) {
    return res(
      ctx.status(200),
      ctx.json({subfigure: updatedFigure, refreshFigure}),
    )
  } else {
    return res(ctx.status(400), ctx.json({message: `Error updating subfigure`}))
  }
}

const login = (req, res, ctx) => {
  const {username, password} = req.body

  const user = db.user.findFirst({where: {username: {equals: username}}})
  if (!user) {
    return res(ctx.status(400), ctx.json({message: 'authentication error'}))
  }
  const authenticated = user.password === password

  // for mockup, use username also as the token
  if (authenticated) {
    return res(
      ctx.status(200),
      ctx.json({username: user.username, token: user.username}),
    )
  } else {
    return res(
      ctx.status(400),
      ctx.json({user: null, message: 'authentication error'}),
    )
  }
}

const me = async (req, res, ctx) => {
  const user = await getUser(req)
  if (!user) {
    res(ctx.status(401), ctx.json({message: 'Please re-authenticate.'}))
  }

  const token = await getToken(req)
  return res(
    ctx.status(200),
    ctx.json({
      username: user.username,
      email: user.email,
      organization: user.organization,
      token,
    }),
  )
}

const user = (req, res, ctx) => {}

// for mockup, the token is the same as the username, so we can get the user
// info by getting rid of the Bearer part of the header
const getToken = req => req.headers.get('Authorization').replace('Bearer ', '')

async function getUser(req) {
  const token = getToken(req)
  if (!token) {
    return null
  }
  const username = token
  const user = db.user.findFirst({where: {username: {equals: username}}})

  if (user) {
    return user
  } else {
    return null
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
  rest.patch('/api/figures/:id', updateFigure),
  rest.post('/api/login', login),
  rest.get('/api/me/:token', me),
  rest.get('/api/user', user),
)
