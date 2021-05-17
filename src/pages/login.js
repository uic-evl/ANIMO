import {useState} from 'react'
import {Input, Button, Flex, FormControl, FormLabel} from '@chakra-ui/react'

const LoginPage = ({login, message}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOnClick = async () => {
    login(username, password)
  }

  return (
    <Flex align="center" justifyContent="center" minH="100vh">
      <form>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input value={username} onChange={e => setUsername(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          isDisabled={username.trim() === '' || password.trim === ''}
          mt="2"
          onClick={handleOnClick}
        >
          Log in
        </Button>
        <div>{message}</div>
      </form>
    </Flex>
  )
}

export default LoginPage
