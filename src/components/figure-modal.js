import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
} from '@chakra-ui/react'

const CONTENT_ENDPOINT = process.env.REACT_APP_CONTENT_ENDPOINT

const FigureModal = ({figure, isOpen, onClose}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{figure.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={`${CONTENT_ENDPOINT}${figure.uri}`}
              alt={figure.caption}
              margin="auto"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FigureModal
