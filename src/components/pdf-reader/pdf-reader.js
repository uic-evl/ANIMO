import PdfPage from './pdf-page'

const workingAreaStyle = {
  width: '100%',
  height: '100%',
  marginBottom: '0',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  justifyContent: 'center',
}

const pdfDocumentStyle = {
  position: 'relative',
  maxWidth: '100%',
}

const Reader = ({pdf, page}) => {
  const scale = 1
  const pageNumber = page

  return (
    <div className="pdf-working-area" style={workingAreaStyle}>
      <div className="pdf-document" style={pdfDocumentStyle}>
        {pdf && (
          <PdfPage
            key={pageNumber}
            pdfDocument={pdf}
            pageNumber={pageNumber}
            scale={scale}
          />
        )}
      </div>
    </div>
  )
}

export default Reader
