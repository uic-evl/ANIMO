import {factory, manyOf, primaryKey, string} from '@mswjs/data'
import tasksData from './data/tasks.json'
import documentData from './data/documents.json'
import figureData from './data/figures.json'
import modalityData from './data/modalities.json'

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
  figure: {
    _id: primaryKey(String),
    name: () => 'figure',
    type: () => 'Figure',
    state: () => '',
    caption: () => '',
    observations: () => '',
    needsCropping: () => false,
    isCompound: () => false,
    isOvercropped: () => false,
    isMissingSubfigures: () => false,
    isMissingPanels: () => false,
    isOverfragmented: () => false,
    closeUp: () => false,
    numberSubpanes: () => 0,
    docId: () => '',
    figureId: () => '',
    uri: () => '',
    subfigures: () => [],
    composition: () => '',
    modalities: () => '',
  },

  // modalityNode: {
  //   _id: primaryKey(String),
  //   name: () => '',
  //   shortname: () => '',
  //   isRow: false,
  //   children: manyOf('modalityNode'),
  // },
  // modality: {
  //   _id: primaryKey(String),
  //   name: () => '',
  //   modalities: manyOf('modalityNode'),
  // },
})

tasksData.forEach(task => db.task.create(task))
documentData.forEach(document => db.document.create(document))
figureData.forEach(figure => db.figure.create(figure))
//modalityData.forEach(modality => db.modality.create(modality))
