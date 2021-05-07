import {useState} from 'react'
import {Box, Flex, Spacer, Button} from '@chakra-ui/react'
import Matrix from '../components/modalities-matrix'

const Labeling = ({subfigure, modalities, onClick}) => {
  const [selectedModalityIds, setSelectedModalityIds] = useState(() =>
    subfigure.modalities ? subfigure.modalities : [],
  )

  const handleOnSaveClick = () => {
    const values = {
      modalities: selectedModalityIds,
    }
    onClick(subfigure._id, values)
  }

  return (
    <Box width="100%" pt="2">
      <Matrix
        modalities={modalities}
        subfigure={subfigure}
        onClick={ids => {
          setSelectedModalityIds(ids)
        }}
      />
      <Flex pt="2">
        <Spacer />
        <Button onClick={handleOnSaveClick}>Save</Button>
      </Flex>
    </Box>
  )
}

export default Labeling
