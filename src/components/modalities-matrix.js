import {useState} from 'react'
import {Box, Flex, chakra} from '@chakra-ui/react'

const Matrix = ({modalities, subfigure, onClick}) => {
  const [selectedIds, setSelectedIds] = useState(() =>
    subfigure.modalities ? subfigure.modalities : [],
  )

  const handleOnClickItem = id => {
    const ids = selectedIds.includes(id)
      ? selectedIds.filter(e => e !== id)
      : [...selectedIds, id]
    onClick(ids)
    setSelectedIds(ids)
  }

  return (
    <Box>
      {modalities.map(m => (
        <Row
          key={m.name}
          row={m}
          selectedIds={selectedIds}
          onClickItem={handleOnClickItem}
        />
      ))}
    </Box>
  )
}

const Row = ({row, selectedIds, onClickItem}) => {
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
          backgroundColor={() =>
            selectedIds.includes(child._id) ? 'orange' : '#f3f4f7'
          }
          cursor="pointer"
          _hover={{bg: 'orange'}}
          onClick={() => onClickItem(child._id)}
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
