import {useState, useEffect, useRef} from 'react'
import * as pdfjsLib from 'pdfjs-dist'

const pageContainerStyle = {
  position: 'relative',
  borderStyle: 'solid',
  borderWidth: '12px',
  borderRadius: '8px',
}

const canvasStyle = {
  overflow: 'hidden',
  userSelect: 'none',
}

const PdfPage = ({pdfDocument, pageNumber, scale}) => {
  const [textContent, setTextContent] = useState(null)
  const [viewport, setViewport] = useState(null)
  const textCanvasRef = useRef(null)
  const textContainerRef = useRef(null)
  const [printed, setPrinted] = useState(false)

  useEffect(() => {
    const loadPage = async () => {
      const page = await pdfDocument.getPage(pageNumber)
      const text = await page.getTextContent({
        normalizeWhitespace: true,
        disableCombineTextItems: true,
      })

      const pageViewport = page.getViewport({scale})
      renderCanvas(pageViewport, page)

      setViewport(pageViewport)
      setTextContent(text)
    }

    loadPage()
  }, [pdfDocument, pageNumber, scale])

  const renderCanvas = async (viewport, page) => {
    const devicePixelRatio = window.devicePixelRatio || 1

    const canvas = textCanvasRef.current
    const context = canvas.getContext('2d')
    canvas.style.width = viewport.width + 'px'
    canvas.style.height = viewport.height + 'px'
    canvas.width = viewport.width * devicePixelRatio
    canvas.height = viewport.height * devicePixelRatio

    const transform = [devicePixelRatio, 0, 0, devicePixelRatio, 0, 0]

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
      transform,
      enableWebGL: true,
    }
    await page.render(renderContext)
  }

  useEffect(() => {
    if (textContent && viewport && !printed) {
      const container = textContainerRef.current
      const parameters = {
        textContent,
        container,
        viewport,
        enhanceTextSelection: false,
      }

      pdfjsLib.renderTextLayer(parameters)
      setPrinted(true)
    }
  }, [textContent, viewport, printed])

  return (
    <div className="pdf-page-container" style={pageContainerStyle}>
      <div className="pdf-page-canvas">
        <canvas ref={textCanvasRef}></canvas>
      </div>
      <div
        className="pdf-page-text-layer"
        style={canvasStyle}
        ref={textContainerRef}
      />
    </div>
  )
}

export default PdfPage
