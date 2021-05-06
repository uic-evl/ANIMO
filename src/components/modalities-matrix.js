import {useState} from 'react'
import {Box, Flex, chakra} from '@chakra-ui/react'

const Matrix = ({modalities, subfigure}) => {
  console.log(subfigure)
  const [selectedIds, setSelectedIds] = useState(subfigure.modalities)

  return (
    <Box>
      {modalities.map(m => (
        <Row key={m.name} row={m} />
      ))}
    </Box>
  )
}

const Row = ({row}) => {
  return (
    <Flex
      fontSize="13px"
      alignItems="center"
      border="2px solid #fff"
      pl="5px"
      pr="5px"
      height="2rem"
      lineHeight="1.1rem"
      minWidth="550px"
    >
      <Box backgroundColor="#fff" width="150px" flex="none">
        <chakra.span fontWeight={700} display="inline-flex" alignItems="center">
          {row.shortname}
        </chakra.span>
      </Box>
      {row.children.map(child => (
        <Box
          flex="1"
          border="inherit"
          pl="inherit"
          pr="inherit"
          height="inherit"
          lineHeight="inherit"
          key={child.name}
          backgroundColor="#f3f4f7"
          cursor="pointer"
          _hover={{bg: 'orange'}}
        >
          <chakra.span minH="30px" display="inline-flex" alignItems="center">
            {child.shortname}
          </chakra.span>
        </Box>
      ))}
    </Flex>
  )
}

export default Matrix
