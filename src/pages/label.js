import {useParams, useRouteMatch} from 'react-router-dom'

const LabelPage = () => {
  const params = useParams()
  // const match = useRouteMatch(
  //   '/label/:taskId/:documentId/:figureId/:subfigureId',
  // )
  console.log('params', params)
  // console.log('document', documentId)
  // console.log('figure', figureId)
  // console.log('subfigure', subfigureId)

  return <div>Label Page 1</div>
}

export default LabelPage
