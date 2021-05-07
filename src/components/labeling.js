import {useState} from 'react'
import {
  Box,
  Flex,
  Spacer,
  Button,
  Stack,
  Checkbox,
  Text,
  chakra,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  RadioGroup,
  HStack,
  Radio,
  Input,
  Textarea,
} from '@chakra-ui/react'
import Matrix from '../components/modalities-matrix'
import Subfigure from '../components/subfigure'

const Labeling = ({subfigure, modalities, caption, onClick}) => {
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
    <Flex width="100%" h="90vh" pt="2" direction="column">
      <Flex direction="row">
        <Box w="250px">
          <chakra.span fontStyle="italic" pl="1.5">
            Selected subfigure
          </chakra.span>
          <Subfigure subfigure={subfigure} />
        </Box>
        <Box w="70%" pl="1.5">
          <chakra.span fontStyle="italic" pl="1.5">
            Figure Caption{' '}
          </chakra.span>
          <Box h="80px" overflowY="scroll" pl="1.5" pr="3.5">
            <Text align="justify" fontSize="11px">
              {caption}
            </Text>
          </Box>
          <Matrix
            modalities={modalities}
            subfigure={subfigure}
            onClick={ids => {
              setSelectedModalityIds(ids)
            }}
          />
        </Box>
      </Flex>

      <Spacer />
      <Box pt="2.5" pr="10" pb="5">
        <Text>
          <chakra.span fontStyle="italic">Observations</chakra.span>
        </Text>
        <Box>
          <Flex direction="row">
            <Stack direction="column" pt="1.5">
              <Checkbox>Close-up image</Checkbox>
              <Checkbox>Should be further cropped</Checkbox>
              <Checkbox>Over-cropped</Checkbox>
              <Checkbox>Over-fragmented</Checkbox>
              <Checkbox>Missing subfigures</Checkbox>
            </Stack>
            <Spacer />
            <Stack pt="1.5">
              <Checkbox>Compound figure - should be further separated</Checkbox>
              <Box pl="6">
                <FormControl id="amount">
                  <Flex direction="row">
                    <FormLabel>
                      <chakra.span display="inline-flex" alignItems="center">
                        Number Subpanes
                      </chakra.span>
                    </FormLabel>
                    <NumberInput max={30} min={1} size="sm" w="100px">
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </FormControl>
                <Checkbox>Multipane figure</Checkbox>
                <FormControl pt="1.5">
                  <RadioGroup defaultValue="Heterogeneous">
                    <HStack spacing="24px">
                      <Radio value="Heterogeneous">Heterogeneous</Radio>
                      <Radio value="Homogeneous">Homogeneous</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
            <FormControl id="comments" w="200px" pt="1.5" pl="1.5">
              <FormLabel>Comments</FormLabel>
              <Textarea />
            </FormControl>
          </Flex>
        </Box>
      </Box>

      <Flex pt="2" bg="teal.400" p="2">
        <Spacer />
        <Checkbox>Apply labels to all subfigures</Checkbox>
        <Button onClick={handleOnSaveClick} ml="2.5">
          Skip
        </Button>
        <Button onClick={handleOnSaveClick} ml="1.5" mr="1.5">
          Save
        </Button>
      </Flex>
    </Flex>
  )
}

export default Labeling
