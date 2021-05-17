import documentsData from '../data/documents.json'

export const fetchDocumentById = (req, res, ctx) => {
  const {id} = req.params

  const document = documentsData.filter(doc => doc._id === id)
  if (document.length) {
    return res(
      ctx.status(200),
      ctx.json({
        results: document[0],
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
