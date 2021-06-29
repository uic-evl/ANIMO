import {Image, Flex, useDisclosure} from '@chakra-ui/react'
import FigureModal from './figure-modal'

const CONTENT_ENDPOINT = process.env.REACT_APP_CONTENT_ENDPOINT

const Subfigure = ({subfigure}) => {
  const {isOpen, onClose, onOpen} = useDisclosure()

  return (
    <Flex width="100%" backgroundColor="black" h="94%">
      <Flex width="100%">
        <Image
          margin="auto"
          display="block"
          src={`${CONTENT_ENDPOINT}${subfigure.uri}`}
          cursor="zoom-in"
          onClick={onOpen}
          maxH="100%"
        />
      </Flex>
      <FigureModal isOpen={isOpen} onClose={onClose} figure={subfigure} />
    </Flex>
  )
}

export default Subfigure
