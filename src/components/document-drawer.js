import {useEffect, useState} from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  DrawerHeader,
} from '@chakra-ui/react'

import * as pdfjsLib from 'pdfjs-dist'
// https://github.com/mozilla/pdf.js/issues/10813
import workerUrl from '../pdf.worker.min.data'
import Reader from './pdf-reader/pdf-reader'

const CONTENT_ENDPOINT = process.env.REACT_APP_CONTENT_ENDPOINT

const DocumentDrawer = ({isOpen, onClose, btnRef, figureName, path}) => {
  // Load the PDF here to memoize it. Loading it on the reader causes
  // reloading on each open/close as the component Reader is unmounted
  const [pdf, setPdf] = useState(null)
  const [page, setPage] = useState(null)
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

  useEffect(() => {
    const loadDocument = async documentPath => {
      const url = `${CONTENT_ENDPOINT}${documentPath}`
      const config = {url: url, cMapUrl: pdfjsLib.cMapUrl, cMapPacked: true}
      const pdf = await pdfjsLib.getDocument(config).promise
      setPdf(pdf)
    }

    if (path) {
      loadDocument(path)
    }
  }, [path])

  useEffect(() => {
    if (figureName) {
      setPage(parseInt(figureName.split('_')[0]))
    }
  }, [figureName])

  return (
    <>
      <Drawer
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'lg'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{`Document pg. ${page}`}</DrawerHeader>
          <DrawerBody>
            <Box w="100%">
              <Reader pdf={pdf} page={page} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DocumentDrawer
