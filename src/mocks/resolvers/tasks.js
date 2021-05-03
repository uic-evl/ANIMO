import tasksData from '../data/tasks.json'

export const getTasks = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      results: tasksData,
    }),
  )
}

export const fetchTaskById = (req, res, ctx) => {
  const {id} = req.params

  const task = tasksData.filter(task => task._id === id)
  if (task.length) {
    return res(
      ctx.status(200),
      ctx.json({
        results: task[0],
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

export const finishTask = async (req, res, ctx) => {
  const {id} = req.params

  const tasks = tasksData.filter(task => task._id === id)
  if (tasks.length) {
    let task = tasks[0]
    task.status = 'Finished'
    task.endDate = new Date()

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
