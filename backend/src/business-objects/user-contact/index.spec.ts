import { connectToPostgresTestDb, removePostgresTestDb, setUpTables, tearDownTables } from '../../../test-setup'
import { EnumContactType, EnumUserStatus } from '../../../types-and-enums/enums'
import { tNewContact } from '../../types'
import { User } from '../user'
import { UserContact } from './index'

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


describe( 'User Contact Tests', () => {
  describe( 'GetById Tests', () => {
    test( 'Should throw an error containing the id when user is not found', async () => {
      const nonExistentId = 444

      const test = async () => UserContact.getById( nonExistentId )

      await expect( test ).rejects.toThrowError( `USER CONTACT WITH ID=${ nonExistentId } NOT FOUND` )
    } )
  } )

  describe( 'User Details Test', () => {
    test( 'Should create contact and return the correct details of contact', async () => {
      const userDetails = {
        displayName: 'Test User',
        status: EnumUserStatus.ACTIVE,
        contacts: [],
      }
      const user = await User.create( userDetails )

      const contact: tNewContact = {
        userId: user.id,
        type: EnumContactType.EMAIL,
        value: 'grey12@example.com',
      }

      const test = await UserContact.create( contact )

      expect( test ).toBeTruthy()
      expect( test.value ).toBe( contact.value )
      expect( test.type ).toBe( contact.type )
    } )
  } )

  describe( 'User ID Tests', () => {
    test( 'Should throw an error: User ID does not exist', async () => {
      const contact: tNewContact = {
        userId: 1000,
        type: EnumContactType.EMAIL,
        value: 'grey12@example.com',
      }

      const test = async () => UserContact.create( contact )

      await expect( test ).rejects.toThrowError( `USER WITH ID=${ contact.userId } NOT FOUND` )
    } )
  } )

} )