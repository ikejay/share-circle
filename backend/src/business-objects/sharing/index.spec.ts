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

    test( 'Should return the created sharing', async () => {
      const item: tNewSharing = {
        issuerId: 1,
        recipientId: 2,
        itemId: 2,
      }

      const sharing = await Sharing.create( item )

      expect( sharing.issuerId ).toBe( String( item.issuerId ) )
      expect( sharing.recipientId ).toBe( String( item.recipientId ) )
      expect( sharing.itemId ).toBe( String( item.itemId ) )
    } )
  } )

  describe( 'remove', () => {
    test( 'Should soft delete so getById throws afterwards', async () => {
      const created = await Sharing.create( {
        issuerId: 1,
        recipientId: 2,
        itemId: 3,
      } )

      await Sharing.remove( created.id )

      await expect( () => Sharing.getById( created.id ) ).rejects.toThrow()
    } )
  } )
} )
