import {factory, primaryKey} from '@mswjs/data'
import tasksData from './data/tasks.json'
import documentData from './data/documents.json'

export const db = factory({
  task: {
    _id: primaryKey(String),
    description: () => 'description',
    assignedTo: () => [],
    taskPerformer: () => '',
    username: () => 'johndoe',
    userId: () => '1',
    status: () => 'To Review',
    creationDate: () => new Date(),
    startDate: () => new Date(null),
    endDate: () => new Date(null),
    type: () => 'Label',
    documentId: () => '1',
  },
  document: {
    _id: primaryKey(String),
    name: () => 'document',
    pubmedId: () => '11111',
    entityId: () => '',
    username: () => 'johndoe',
  },
})

tasksData.forEach(task => db.task.create(task))
documentData.forEach(document => db.document.create(document))
