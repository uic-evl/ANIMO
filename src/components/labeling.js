import {useState, useEffect} from 'react'
import {
  Box,
  Flex,
  Spacer,
  Button,
  Stack,
  Checkbox,
  Text,
  chakra,
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
  Textarea,
} from '@chakra-ui/react'
import Matrix from '../components/modalities-matrix'
import Subfigure from '../components/subfigure'
import {FIGURE_SKIPPED} from '../utils/constants'

const Labeling = ({subfigure, modalities, caption, onClick}) => {
  console.log(window.innerHeight)
  const [selectedModalityIds, setSelectedModalityIds] = useState([])
  const [isCloseUp, setIsCloseUp] = useState(false)
  const [needsCropping, setNeedsCropping] = useState(false)
  const [isOvercropped, setIsOvercropped] = useState(false)
  const [isOverfragmented, setIsOverfragmented] = useState(false)
  const [isCompound, setIsCompound] = useState(false)
  const [isMissingSubfigures, setIsMissingSubfigures] = useState(false)
  const [numberSubpanes, setNumberSubpanes] = useState(1)
  const [isMultipane, setIsMultipane] = useState(false)
  const [observations, setObservations] = useState('')
  const [composition, setComposition] = useState(null)
  const [applyToAll, setApplyToAll] = useState(false)

  const handleOnSaveClick = () => {
    const values = {
      modalities: selectedModalityIds,
      closeUp: isCloseUp,
      needsCropping: needsCropping,
      isOvercropped: isOvercropped,
      isOverfragmented: isOverfragmented,
      isCompound: isCompound,
      isMissingSubfigures: isMissingSubfigures,
      numberSubpanes: numberSubpanes,
      observations: observations,
      composition: !isMultipane ? null : composition,
      applyToAll: applyToAll,
      state: null,
    }
    onClick(subfigure._id, values)
  }

  const handleOnSkipClick = () => {
    onClick(subfigure._id, {state: FIGURE_SKIPPED})
  }

  useEffect(() => {
    setIsCloseUp(subfigure.closeUp)
    setNeedsCropping(subfigure.needsCropping)
    setIsOvercropped(subfigure.isOvercropped)
    setIsOverfragmented(subfigure.isOverfragmented)
    setIsCompound(subfigure.isCompound)
    setIsMissingSubfigures(subfigure.isMissingSubfigures)
    setIsMultipane(subfigure.composition ? true : false)
    setObservations(subfigure.observations)
    setComposition(subfigure.composition)
    setNumberSubpanes(
      subfigure.numberSubpanes === 0 ? 1 : subfigure.numberSubpanes,
    )
    setSelectedModalityIds(subfigure.modalities ? subfigure.modalities : [])
  }, [subfigure])

  return (
    <Flex width="100%" height="calc(100vh - 62px)" pt="2" direction="column">
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
              <Checkbox
                isChecked={isCloseUp}
                onChange={e => setIsCloseUp(e.target.checked)}
              >
                Close-up image
              </Checkbox>
              <Checkbox
                isChecked={needsCropping}
                onChange={e => setNeedsCropping(e.target.checked)}
              >
                Should be further cropped
              </Checkbox>
              <Checkbox
                isChecked={isOvercropped}
                onChange={e => setIsOvercropped(e.target.checked)}
              >
                Over-cropped
              </Checkbox>
              <Checkbox
                isChecked={isOverfragmented}
                onChange={e => setIsOverfragmented(e.target.checked)}
              >
                Over-fragmented
              </Checkbox>
              <Checkbox
                isChecked={isMissingSubfigures}
                onChange={e => setIsMissingSubfigures(e.target.checked)}
              >
                Missing subfigures
              </Checkbox>
            </Stack>
            <Spacer />
            <Stack pt="1.5">
              <Checkbox
                isChecked={isCompound}
                onChange={e => setIsCompound(e.target.checked)}
              >
                Compound figure - should be further separated
              </Checkbox>
              <Box pl="6">
                <FormControl id="amount">
                  <Flex direction="row">
                    <FormLabel>
                      <chakra.span display="inline-flex" alignItems="center">
                        Number Subpanes
                      </chakra.span>
                    </FormLabel>
                    <NumberInput
                      max={30}
                      min={1}
                      size="sm"
                      w="100px"
                      value={numberSubpanes}
                      onChange={value => setNumberSubpanes(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </FormControl>
                <Checkbox
                  isChecked={isMultipane}
                  onChange={e => setIsMultipane(e.target.checked)}
                >
                  Multipane figure
                </Checkbox>
                <FormControl pt="1.5">
                  <RadioGroup
                    value={composition}
                    onChange={value => setComposition(value)}
                  >
                    <HStack spacing="24px">
                      <Radio value="heterogeneous" isDisabled={!isMultipane}>
                        Heterogeneous
                      </Radio>
                      <Radio value="homogeneous" isDisabled={!isMultipane}>
                        Homogeneous
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
            <FormControl id="comments" w="200px" pt="1.5" pl="1.5">
              <FormLabel>Comments</FormLabel>
              <Textarea
                value={observations}
                onChange={e => setObservations(e.target.value)}
              />
            </FormControl>
          </Flex>
        </Box>
      </Box>

      <Flex pt="2" bg="teal.400" p="2">
        <Spacer />
        <Checkbox
          checked={applyToAll}
          onChange={e => setApplyToAll(e.target.checked)}
        >
          Apply labels to all subfigures
        </Checkbox>
        <Button onClick={handleOnSkipClick} ml="2.5">
          Skip
        </Button>
        <Button
          onClick={handleOnSaveClick}
          ml="1.5"
          mr="1.5"
          isDisabled={selectedModalityIds.length === 0}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  )
}

export default Labeling
