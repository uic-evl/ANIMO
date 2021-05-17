import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Box} from '@chakra-ui/react'
import LabelPage from './label'
import LoginPage from './login'
import InboxPage from './inbox'
import SearchPage from './search-images'
import Header from '../components/header'

const AuthenticatedApp = ({user, logout}) => {
  return (
    <Box bg="gray.600" minH="100vh" w="100%">
      <Box bg="white" margin="auto" maxW="1280px" minH="100vh">
        <Router>
          <Header username={user.username} logout={logout} />

          <Switch>
            <Route path="/login">
              <LoginPage username={user.username} />
            </Route>
            <Route path="/inbox">
              <InboxPage user={user} />
            </Route>
            <Route path="/label/:taskId/:documentId/:figureId?/:subfigureId?">
              <LabelPage user={user} />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/">
              <InboxPage user={user} />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Box>
  )
}

export default AuthenticatedApp
