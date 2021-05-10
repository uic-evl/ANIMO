import {useState} from 'react'
import {Input, Button} from '@chakra-ui/react'

const LoginPage = ({login, message}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleOnClick = async () => {
    await login(username, password)
  }

  return (
    <form>
      <Input value={username} onChange={e => setUsername(e.target.value)} />
      <Input value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleOnClick}>Log in</Button>
      <div>{message}</div>
    </form>
  )
}

export default LoginPage
