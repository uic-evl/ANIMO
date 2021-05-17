import {Link as RouterLink} from 'react-router-dom'
import {Box, Flex, Text, Button, Link, Spacer, chakra} from '@chakra-ui/react'

const Header = ({username, logout}) => {
  const handleLogout = () => logout()

  return (
    <Flex
      as="nav"
      direction="row"
      bg="teal.500"
      color="white"
      alignItems="center"
      pt="2px"
      pb="2px"
    >
      <Box ml="10px">
        <Text>Curation</Text>
      </Box>
      <Box ml="20px">
        <MenuItem to="/inbox">Inbox</MenuItem>
      </Box>
      <Spacer />
      <Box mr="10px">
        <chakra.span fontStyle="italic">{username}</chakra.span>
      </Box>
      <Button size="xs" ml="1.5" mr="10px" color="black" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  )
}

const MenuItem = ({to, children}) => (
  <Link as={RouterLink} to={to} mr={6} display="block">
    {children}
  </Link>
)

export default Header
