import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Image,
  DrawerHeader,
} from '@chakra-ui/react'
import Reader from './pdf-reader/pdf-reader'

const CONTENT_ENDPOINT = process.env.REACT_APP_CONTENT_ENDPOINT

const DocumentDrawer = ({isOpen, onClose, btnRef, figureName, path}) => {
  const startingPage = parseInt(figureName.split('_')[0])
  const documentUrl = `${CONTENT_ENDPOINT}${path}`
  console.log(documentUrl)

  return (
    <>
      <Drawer
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Needs fixing</DrawerHeader>
          <DrawerBody>
            <Box w="500px">
              <Reader url={documentUrl} width={500} page={startingPage} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DocumentDrawer
