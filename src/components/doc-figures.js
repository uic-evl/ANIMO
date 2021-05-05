import React from 'react'
import {Box, Stack, Text} from '@chakra-ui/react'

const DocumentFigures = ({figures, onFigureClick}) => {
  return (
    <Box>
      <Text fontSize="24px">Figures</Text>
      <Stack
        w="150px"
        direction="column"
        spacing="5px"
        maxHeight="85vh"
        overflowY="scroll"
      >
        {figures.map(figure => (
          <img
            key={figure._id}
            src={`http://localhost:8080/images${figure.uri}`}
            alt={figure.caption}
            style={{
              borderLeftWidth: '5px',
              borderLeftStyle: 'solid',
              borderLeftColor: 'red',
            }}
            onClick={() => onFigureClick()}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default DocumentFigures
