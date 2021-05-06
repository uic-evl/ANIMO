import React from 'react'
import {Box, Stack} from '@chakra-ui/react'

const SelectedFigure = ({figure}) => {
  return (
    <Box>
      <Stack orientation="vertical">
        <img
          src={`http://localhost:8080/images${figure.uri}`}
          alt={figure.caption}
        />
        <Box>{figure.caption}</Box>
      </Stack>
    </Box>
  )
}

export default SelectedFigure
