import {rest} from 'msw'
import {getTasks} from './resolvers/tasks'

export const handlers = [rest.get('/api/tasks', getTasks)]
