import {Box, Image} from '@chakra-ui/react'

const Subfigure = ({subfigure}) => {
  return (
    <Box width="100%" height="300px" pt="32px">
      <Image src={`http://localhost:8080/images${subfigure.uri}`} />
    </Box>
  )
}

export default Subfigure
