import React from 'react'
import {Flex, Button, Spacer, Text, Box, chakra} from '@chakra-ui/react'
import {TASK_IN_PROCESS} from '../utils/constants'

const LabelHeader = ({task, document, onFinishClick, finishEnabled}) => {
  const handleFinishClick = () => {
    onFinishClick(task)
  }

  return (
    <Flex backgroundColor="black" pt="1.5" pb="1.5">
      <Box>
        <chakra.span
          display="inline-flex"
          alignItems="center"
          color="white"
          ml="2.5"
          h="100%"
        >
          Document {document.name}
        </chakra.span>
      </Box>
      <Spacer />
      <Button colorScheme="teal" variant="outline" mr="1.5" size="sm">
        View PDF Page
      </Button>
      <Button
        colorScheme="teal"
        mr="2.5"
        onClick={handleFinishClick}
        isDisabled={task.status !== TASK_IN_PROCESS || !finishEnabled}
        size="sm"
      >
        Finish Task
      </Button>
    </Flex>
  )
}

export default LabelHeader
