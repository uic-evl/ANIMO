import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Box, Text} from '@chakra-ui/react'
import LabelPage from './label'
import LoginPage from './login'
import InboxPage from './inbox'
import SearchPage from './search-images'

const AuthenticatedApp = () => {
  return (
    <Box bg="gray.600" minH="100vh" w="100%">
      <Box bg="white" margin="auto" maxW="1280px" minH="100vh">
        <Text>Curation Tool</Text>
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
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Box>
  )
}

export default AuthenticatedApp
