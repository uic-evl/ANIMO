import {useState, useEffect} from 'react'
import {useTable, useFilters, useSortBy, usePagination} from 'react-table'
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Input,
  Button,
  Flex,
  Center,
  Spacer,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons'
import * as constants from '../utils/constants'

const Table = ({columns, data, onRowClick, hiddenColumns = []}) => {
  const [filterInput, setFilterInput] = useState('')
  const [filterStatus, setFilterStatus] = useState(constants.TASK_ASSIGNED)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize},
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: hiddenColumns,
        pageIndex: 0,
      },
    },
    useFilters,
    useSortBy,
    usePagination,
  )

  useEffect(() => {
    setFilter('status', filterStatus)
  }, [])

  const handleFilterChange = e => {
    const value = e.target.value || undefined
    setFilter('description', value)
    setFilterInput(value || '')
  }

  const handleChangeStatus = e => {
    const value = e.target.value
    setFilter('status', value)
    setFilterStatus(value)
  }

  return (
    <>
      <Flex>
        <FormControl mr="1.5">
          <FormLabel>Description</FormLabel>
          <Input
            size="sm"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder="Search description"
          />
        </FormControl>

        <FormControl w="200px">
          <FormLabel>Status</FormLabel>
          <Select size="sm" value={filterStatus} onChange={handleChangeStatus}>
            <option value={constants.TASK_ASSIGNED}>
              {constants.TASK_ASSIGNED}
            </option>
            <option value={constants.TASK_IN_PROCESS}>
              {constants.TASK_IN_PROCESS}
            </option>
            <option value={constants.TASK_FINISHED}>
              {constants.TASK_FINISHED}
            </option>
          </Select>
        </FormControl>
      </Flex>

      <ChakraTable {...getTableProps()} mt="10px" variant="striped">
        <Thead>
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <Tr
                {...row.getRowProps()}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(row.values)
                  }
                }}
              >
                {row.cells.map(cell => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </ChakraTable>

      <Flex width="100%" mt="5px">
        <Center>
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            mr="1.5"
          >
            {'<<'}
          </Button>{' '}
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            mr="1.5"
          >
            {'<'}
          </Button>{' '}
          <Button onClick={() => nextPage()} disabled={!canNextPage} mr="1.5">
            {'>'}
          </Button>{' '}
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>{' '}
        </Center>
        <Center>
          <chakra.span pl="2.5">
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </chakra.span>
          <chakra.span ml="1.5">
            | Go to page:{' '}
            <Input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{width: '70px'}}
            />
          </chakra.span>{' '}
        </Center>
        <Spacer />
        <Select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
          w="150px"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
    </>
  )
}

export default Table
