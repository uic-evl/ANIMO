import React from 'react'
import {Flex, Button, Spacer, Box, chakra} from '@chakra-ui/react'
import {TASK_IN_PROCESS} from '../utils/constants'

const CONTENT_ENDPOINT = process.env.REACT_APP_CONTENT_ENDPOINT

const LabelHeader = ({
  task,
  document,
  onFinishClick,
  finishEnabled,
  onShowPageClick,
  btnRef,
}) => {
  const handleFinishClick = () => {
    onFinishClick(task)
  }

  return (
    <Flex backgroundColor="black" pt="5px" pb="5px">
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
      <Button
        ref={btnRef}
        colorScheme="teal"
        variant="outline"
        mr="1.5"
        size="xs"
        onClick={onShowPageClick}
      >
        Open PDF page
      </Button>
      <Button
        ref={btnRef}
        colorScheme="teal"
        variant="outline"
        mr="1.5"
        size="xs"
      >
        <a
          href={`${CONTENT_ENDPOINT}${document.uri}`}
          target="_blank"
          rel="noreferrer"
          aria-label="pdf document"
        >
          Download PDF
        </a>
      </Button>
      <Button
        colorScheme="teal"
        mr="2.5"
        onClick={handleFinishClick}
        isDisabled={task.status !== TASK_IN_PROCESS || !finishEnabled}
        size="xs"
      >
        Finish Task
      </Button>
    </Flex>
  )
}

export default LabelHeader
