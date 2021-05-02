import {useState} from 'react'
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
} from '@chakra-ui/react'
import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons'

const Table = ({columns, data, hiddenColumns = []}) => {
  const [filterInput, setFilterInput] = useState('')

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

  const handleFilterChange = e => {
    const value = e.target.value || undefined
    setFilter('description', value)
    setFilterInput(value || '')
  }

  return (
    <>
      <Input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Search description"
      />

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
              <Tr {...row.getRowProps()} onClick={() => console.log(row.cells)}>
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
