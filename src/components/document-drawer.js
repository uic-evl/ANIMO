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

const CONTENT_ENDPOINT = process.env.REACT_APP_CONTENT_ENDPOINT

const DocumentDrawer = ({isOpen, onClose, btnRef, path}) => {
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
            <Box>
              <Image
                src={`${CONTENT_ENDPOINT}${path}`}
                alt={''}
                margin="auto"
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DocumentDrawer
