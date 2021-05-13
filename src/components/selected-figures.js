import React from 'react'
import {
  Text,
  Box,
  Stack,
  chakra,
  Image,
  Flex,
  Spacer,
  Grid,
  useDisclosure,
} from '@chakra-ui/react'
import {StateBadge} from './figure-card'
import FigureModal from './figure-modal'

const CONTENT_ENDPOINT = process.env.REACT_APP_CONTENT_ENDPOINT

const SelectedFigure = ({figure, subfigures, onClick, selectedSubfigureId}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <Box w="100%" pl="2.5" pr="1.5" height="calc(100vh - 62px)">
      <Stack orientation="vertical" h="100%">
        <Box height="45%">
          <Text>
            Selected Figure:{' '}
            <chakra.span fontWeight="bold">{figure.name}</chakra.span>
          </Text>
          <Box h="90%">
            <Image
              src={`${CONTENT_ENDPOINT}${figure.uri}`}
              alt={figure.caption}
              h="100%"
              margin="auto"
              onClick={onOpen}
              cursor="zoom-in"
            />
          </Box>
        </Box>
        <Box>
          <chakra.span fontStyle="italic">Subfigures</chakra.span>
        </Box>
        <Grid
          w="100%"
          maxH="50%"
          gridGap="1rem"
          padding="4px"
          gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
          overflowY="scroll"
        >
          {subfigures.map(sf => (
            <Box
              key={sf._id}
              backgroundColor={() => {
                return selectedSubfigureId === sf._id ? 'teal.400' : 'white'
              }}
              margin="auto"
              p="5px"
            >
              <Image
                src={`${CONTENT_ENDPOINT}${sf.uri}`}
                w="100px"
                h="100px"
                margin="auto"
                cursor="pointer"
                onClick={() => {
                  onClick(sf._id)
                }}
              />
              <Flex>
                <Spacer />
                <StateBadge state={sf.state} />
              </Flex>
            </Box>
          ))}
        </Grid>
      </Stack>

      <FigureModal isOpen={isOpen} onClose={onClose} figure={figure} />
    </Box>
  )
}

export default SelectedFigure
