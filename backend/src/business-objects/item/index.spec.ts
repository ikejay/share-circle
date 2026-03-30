import { connectToPostgresTestDb, removePostgresTestDb, setUpTables, tearDownTables } from '../../../test-setup'
import { EnumItemCondition } from '../../../types-and-enums/enums'
import { tNewItem } from '../../types'
import { Item } from './index'

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


describe( 'Item Details Tests', () => {
  describe( 'create', () => {
    test( 'Should create and store the item', async () => {
      const item: tNewItem = {
        ownerId: 1,
        categoryId: 1,
        name: 'Test Item 001',
        description: 'text for Test Item ',
        condition: EnumItemCondition.FAIR,
        notes: null,
      }
      const test = await Item.create( item )

      expect( test.id ).toBeTruthy()
    } )

    test( 'Should throw on the second (same) item', async () => {
      const item: tNewItem = {
        ownerId: 1,
        categoryId: 1,
        name: 'Test Item 001',
        description: 'text for Test Item ',
        condition: EnumItemCondition.FAIR,
        notes: null,
      }

      await Item.create( item )
      const test = async () => Item.create( item )

      await expect( test ).rejects.toThrowError( 'DUPLICATE_KEY_ERROR' )
    } )

    test( 'Should create the same item after the first was deleted', async () => {
      const item: tNewItem = {
        ownerId: 1,
        categoryId: 1,
        name: 'Test Item 001',
        description: 'text for Test Item ',
        condition: EnumItemCondition.FAIR,
        notes: null,
      }

      const firstItem = await Item.create( item )
      await Item.remove( firstItem.id )

      const secondItem = await Item.create( item )

      expect( secondItem.id ).toBeTruthy()
      expect( firstItem.id + 1 ).toEqual( secondItem.id )
    } )
  } )
} )
