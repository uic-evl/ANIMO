import React from 'react'
import {Box, Stack, Text} from '@chakra-ui/react'
import FigureCard from '../components/figure-card'

const DocumentFigures = ({figures, selectedId, onClick}) => {
  const handleOnClick = id => {
    onClick(id.toString())
  }

  return (
    <Box backgroundColor={'gray.400'} height="calc(100vh - 62px)">
      <Text pt="10px" pb="5px" fontSize="20px" align="center">
        Figures
      </Text>
      <Stack
        w="100%"
        direction="column"
        spacing="5px"
        maxHeight="80vh"
        overflowY="scroll"
      >
        {figures.map(figure => (
          <FigureCard
            key={figure._id}
            figure={figure}
            selected={selectedId === figure._id}
            onClick={handleOnClick}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default DocumentFigures
