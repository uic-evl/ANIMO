import tasksData from '../data/tasks.json'

export const getTasks = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      results: tasksData,
    }),
  )
}
