import React from 'react'
import {Flex, Button, Spacer, Heading} from '@chakra-ui/react'

const LabelHeader = ({task, document, onFinishClick}) => {
  const handleFinishClick = () => {
    onFinishClick(task)
  }

  return (
    <Flex backgroundColor="gray.100" pt="1.5" pb="1.5" mb="1.5">
      <Heading as="h3" ml="2.5">
        Document {document.name}
      </Heading>
      <Spacer />
      <Button colorScheme="teal" variant="outline" mr="1.5">
        View PDF Page
      </Button>
      <Button
        colorScheme="teal"
        mr="2.5"
        onClick={handleFinishClick}
        isDisabled={task.status !== 'To Review'}
      >
        Finish Task
      </Button>
    </Flex>
  )
}

export default LabelHeader
