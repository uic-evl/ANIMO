import {useState, useEffect} from 'react'
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ChakraProvider, CSSReset} from '@chakra-ui/react'
import theme from './theme'
import AuthenticatedApp from './pages/authenticated-app'
import UnauthenticatedApp from './pages/unauthenticated-app'
import {login, logout, getToken} from './utils/authProvider'
import {me} from './api/index'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [authMessage, setAuthMessage] = useState('')

  const loginUser = async (username, password) => {
    const {user, message} = await login(username, password)
    if (user) setAuthenticated(true)
    else setAuthMessage(message)
  }

  const logoutUser = async () => {
    logout()
    setUser(null)
    setAuthenticated(false)
  }

  useEffect(() => {
    const getUser = async () => {
      const token = await getToken()
      if (token) {
        const response = await me(token)
        if (response) {
          setUser(response.user)
        }
      }
    }
    getUser()
  }, [authenticated])

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Curation
          user={user}
          login={loginUser}
          logout={logoutUser}
          message={authMessage}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

const Curation = ({user, login, logout, message}) => {
  if (user) {
    return <AuthenticatedApp user={user} logout={logout} />
  } else {
    return <UnauthenticatedApp login={login} message={message} />
  }
}

export default App
