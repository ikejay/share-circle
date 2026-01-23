import { connectToPostgresTestDb, removePostgresTestDb, setUpTables, tearDownTables } from '../../../test-setup'
import { Product } from './index'

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

describe( 'Product Tests', () => {
  describe( 'Product Name Tests', () => {
    test( 'Should throw error, BRAND NAME IS EMPTY', async () => {
      const test = async () => Product.create( '', 1 )

      await expect( test ).rejects.toThrowError( 'PRODUCT NAME IS EMPTY' )
    } )
  } )

  describe( 'BrandID Tests', () => {
    test( 'Should throw error, NO BRAND ID PROVIDED', async () => {
      const test = async () => Product.create( 'TurnSchuhe', 0 )

      await expect( test ).rejects.toThrowError( 'INVALID BRAND ID' )
    } )

    test( 'Should throw error, BRAND DOES NOT EXIST', async () => {
      const test = async () => Product.create( 'TurnSchuhe', 200 )

      await expect( test ).rejects.toThrowError( 'BRAND DOES NOT EXIST' )
    } )
  } )
} )