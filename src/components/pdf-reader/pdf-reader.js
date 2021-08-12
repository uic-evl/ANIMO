import {useEffect, useState} from 'react'
import * as pdfjsLib from 'pdfjs-dist'
// https://github.com/mozilla/pdf.js/issues/10813
import workerUrl from '../../pdf.worker.min.data'
import PdfPage from './pdf-page'

const workingAreaStyle = {
  width: '100%',
  height: '100%',
  marginBottom: '4em',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#666699',
}

const pdfDocumentStyle = {
  position: 'relative',
  maxWidth: '100%',
  height: '300px',
}

const Reader = ({url, width, height, page}) => {
  // TODO test with test API without https
  const [pdfDocument, setPdfDocument] = useState(null)
  const [scale, setScale] = useState(1)
  const [pageNumber, setPageNumber] = useState(page)
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

  useEffect(() => {
    const loadDocument = async config => {
      const pdf = await pdfjsLib.getDocument(config).promise
      setPdfDocument(pdf)
    }

    const pdfConfig = {url: url, cMapUrl: pdfjsLib.cMapUrl, cMapPacked: true}
    loadDocument(pdfConfig)
  }, [url])

  return (
    <div className="pdf-working-area" style={workingAreaStyle}>
      <div className="pdf-document" style={pdfDocumentStyle}>
        {pdfDocument && (
          <PdfPage
            key={pageNumber}
            pdfDocument={pdfDocument}
            pageNumber={pageNumber}
            scale={scale}
          />
        )}
      </div>
    </div>
  )
}

export default Reader
