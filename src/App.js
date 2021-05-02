import './App.css'

import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from 'react-query'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import LabelPage from './pages/label'
import LoginPage from './pages/login'
import InboxPage from './pages/inbox'
import SearchPage from './pages/search-images'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h2>Curation Tool</h2>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/inbox">
              <InboxPage />
            </Route>
            <Route path="/label">
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
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
