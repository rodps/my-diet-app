import { beforeEach } from 'bun:test'
import { deleteTestData } from './utils'

beforeEach(async () => {
  await deleteTestData()
})
