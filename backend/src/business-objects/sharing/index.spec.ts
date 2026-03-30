import { connectToPostgresTestDb, removePostgresTestDb, setUpTables, tearDownTables } from '../../../test-setup'
import { tNewSharing } from '../../types'
import { Sharing } from './index'

beforeAll( async () => {
  await connectToPostgresTestDb()
} )

beforeEach( async () => {
  return setUpTables()
} )

afterEach( async () => {
  return tearDownTables()
} )

afterAll( async () => {
  await removePostgresTestDb()
} )


describe( 'Sharing Tests', () => {
  describe( 'create', () => {
    test( 'Should throw on the second (same) item', async () => {
      const item: tNewSharing = {
        issuerId: 1,
        recipientId: 2,
        itemId: 1,
      }

      await Sharing.create( item )
      const test = async () => Sharing.create( item )

      await expect( test ).rejects.toThrowError( 'DUPLICATE_KEY_ERROR' )
    } )

  } )
} )
