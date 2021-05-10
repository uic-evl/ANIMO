import {Image, Flex} from '@chakra-ui/react'

const Subfigure = ({subfigure}) => {
  return (
    <Flex width="100%" backgroundColor="black" h="94%">
      <Flex>
        <Image
          margin="auto"
          display="block"
          src={`http://localhost:8080/images${subfigure.uri}`}
        />
      </Flex>
    </Flex>
  )
}

export default Subfigure
