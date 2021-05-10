import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Box, Text, Button, Flex, Spacer, chakra} from '@chakra-ui/react'
import LabelPage from './label'
import LoginPage from './login'
import InboxPage from './inbox'
import SearchPage from './search-images'

const AuthenticatedApp = ({user, logout}) => {
  const handleLogout = () => logout()

  return (
    <Box bg="gray.600" minH="100vh" w="100%">
      <Box bg="white" margin="auto" maxW="1280px" minH="100vh">
        <Flex direction="row" alignItems="center">
          <Text>Curation Tool</Text>
          <Spacer />
          <Box>
            <chakra.span fontStyle="italic">{user.username}</chakra.span>
          </Box>
          <Button size="xs" ml="1.5" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/inbox">
              <InboxPage />
            </Route>
            <Route path="/label/:taskId/:documentId/:figureId?/:subfigureId?">
              <LabelPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/">
              <InboxPage />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Box>
  )
}

export default AuthenticatedApp
