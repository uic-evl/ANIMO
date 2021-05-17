import {Box, Flex, Image, Badge, Text, Spacer} from '@chakra-ui/react'
import {FIGURE_TO_REVIEW, FIGURE_SKIPPED} from '../utils/constants'

const CONTENT_ENDPOINT = process.env.REACT_APP_CONTENT_ENDPOINT

const FigureCard = ({
  figure,
  selected,
  onClick,
  width = '100%',
  height = null,
}) => {
  return (
    <Box
      p="2"
      width={width}
      height={height}
      borderWidth="1px"
      backgroundColor={() => {
        return selected ? 'teal.400' : 'white'
      }}
      cursor="pointer"
      onClick={() => {
        onClick(figure._id)
      }}
    >
      <Image borderRadius="md" src={`${CONTENT_ENDPOINT}${figure.uri}`} />
      <Flex align="baseline" mt={1}>
        <Text ml={2} textTransform="uppercase" fontSize="10px">
          {figure.name}
        </Text>
        <Spacer />
        <StateBadge state={figure.state} />
      </Flex>
    </Box>
  )
}

export const StateBadge = ({state}) => {
  if (state === FIGURE_TO_REVIEW) {
    return (
      <Badge colorScheme={'red'} fontSize="10px">
        {state}
      </Badge>
    )
  } else if (state === FIGURE_SKIPPED) {
    return (
      <Badge colorScheme={'orange'} fontSize="10px">
        {state}
      </Badge>
    )
  } else {
    return (
      <Badge colorScheme={'green'} fontSize="10px">
        {state}
      </Badge>
    )
  }
}

export default FigureCard
