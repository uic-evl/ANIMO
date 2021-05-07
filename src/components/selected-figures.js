import React from 'react'
import {
  Text,
  Box,
  Stack,
  chakra,
  Image,
  Flex,
  Badge,
  Spacer,
} from '@chakra-ui/react'
import {StateBadge} from './figure-card'

const SelectedFigure = ({figure, subfigures, onClick, selectedSubfigureId}) => {
  return (
    <Box w="100%" pl="2.5" pr="1.5">
      <Stack orientation="vertical">
        <Text>
          Selected Figure:{' '}
          <chakra.span fontWeight="bold">{figure.name}</chakra.span>
        </Text>
        <Image
          src={`http://localhost:8080/images${figure.uri}`}
          alt={figure.caption}
        />
        <Box>
          <Text align="justify">
            <chakra.span fontStyle="italic">Caption. </chakra.span>
            {figure.caption}
          </Text>
        </Box>
        <Box>
          <chakra.span fontStyle="italic">Subfigures</chakra.span>
        </Box>
        <Flex
          w="100%"
          h="300px"
          flexWrap="wrap"
          padding="4px"
          justifyContent="space-evenly"
        >
          {subfigures.map(sf => (
            <Box
              key={sf._id}
              backgroundColor={() => {
                return selectedSubfigureId === sf._id ? 'teal.400' : 'white'
              }}
            >
              <Image
                src={`http://localhost:8080/images${sf.uri}`}
                w="100px"
                h="100px"
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
        </Flex>
      </Stack>
    </Box>
  )
}

export default SelectedFigure
