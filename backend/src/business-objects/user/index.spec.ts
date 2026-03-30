import { connectToPostgresTestDb, removePostgresTestDb, setUpTables, tearDownTables } from '../../../test-setup'
import { EnumContactType, EnumUserStatus } from '../../../types-and-enums/enums'
import { snakeToCamelRecord } from '../../helpers/converters'
import { tNewUser } from '../../types'
import { User } from './index'

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


describe( 'User Details Tests', () => {
  describe( 'Email Tests', () => {
    test( 'Should create', async () => {
      const userDetails = {
        displayName: 'Test User',
        status: EnumUserStatus.ACTIVE,
        contacts: [],
      }
      const test = await User.create( userDetails )

      expect( test.id ).toBeTruthy()
    } )
  } )

  describe( 'Create Tests', () => {
    test( 'Should create a user and return the correct fields', async () => {
      const userDetails = {
        displayName: 'Test User',
        status: EnumUserStatus.ACTIVE,
        contacts: [],
      }

      const user = snakeToCamelRecord( await User.create( userDetails ) )

      expect( user.displayName ).toBe( userDetails.displayName )
      expect( user.status ).toBe( EnumUserStatus.ACTIVE )
      expect( user.id ).toBeDefined()
    } )
  } )

  describe( 'GetById Tests', () => {
    test( 'Should return user with 2 contacts', async () => {
      const payload: tNewUser = {
        displayName: 'Guido',
        status: EnumUserStatus.ACTIVE,
        contacts: [
          { type: EnumContactType.EMAIL, value: 'guido@drahota.de' },
          { type: EnumContactType.PHONE, value: '+49 176 323 92 92 5' },
        ],
      }

      const user = await User.create( payload )
      expect( user.displayName ).toEqual( payload.displayName )

      const check = await User.getById( user.id )
      expect( check.displayName ).toEqual( payload.displayName )
      expect( check.contacts ).toHaveLength( 2 )
    } )

    test( 'Should throw an error containing the id when user is not found', async () => {
      const nonExistentId = 444

      const test = async () => User.getById( nonExistentId )

      await expect( test ).rejects.toThrowError( `USER WITH ID=${ nonExistentId } NOT FOUND` )
    } )
  } )

  describe( 'Big ID Test', () => {
    test( 'Should throw an error, ID OUT OF RANGE if ID exceeds integer max', async () => {
      const nonExistentId = 50000000000

      const test = async () => User.getById( nonExistentId )

      await expect( test ).rejects.toThrowError( 'ID OUT OF RANGE' )
    } )
  } )

  describe( 'Negative ID Test', () => {
    test( 'Should throw an error, ID OUT OF RANGE if ID exceeds integer max', async () => {
      const nonExistentId = -50

      const test = async () => User.getById( nonExistentId )

      await expect( test ).rejects.toThrowError( 'ID OUT OF RANGE' )
    } )
  } )


} )