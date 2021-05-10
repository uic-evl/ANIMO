import LoginPage from './login'

const UnauthenticatedApp = ({login, message}) => {
  return <LoginPage login={login} message={message} />
}

export default UnauthenticatedApp
