import { connectToPostgresTestDb, removePostgresTestDb, setUpTables, tearDownTables } from '../../../test-setup'
import { Brand } from './index'

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

describe( 'Brand Tests', () => {
  describe( 'Brand Name Tests', () => {
    test( 'Should throw error, BRAND NAME IS EMPTY', async () => {
      const test = async () => Brand.create( '' )

      await expect( test ).rejects.toThrowError( 'BRAND NAME IS EMPTY' )
    } )


    test( 'Should throw error, BRAND NAME IS TOO LONG', async () => {
      const test = async () => Brand.create( 'AIDAOIDMIAODIVAIODIAJIDOFAIOSIDFJAIMODFIAOIDFJAIODFIAJIOIMIAOIDOAI' )

      await expect( test ).rejects.toThrowError( 'BRAND NAME IS TOO LONG' )
    } )

    test( 'Should return name GERMANCHEF without leading empty space', async () => {
      const test = async () => Brand.create( '  GERMANCHEF' )
      const getBrand = await test()
      const brandName = getBrand.name

      expect( brandName ).toBe( 'GERMANCHEF' )
    } )

    test( 'Should return name BRUHM without trailing empty space', async () => {
      const test = async () => Brand.create( 'BRUHM  ' )
      const getBrand = await test()
      const brandName = getBrand.name

      expect( brandName ).toBe( 'BRUHM' )
    } )

    test( 'Should return name AKAI without leading and trailing empty space', async () => {
      const test = async () => Brand.create( '  AKAI  ' )
      const getBrand = await test()
      const brandName = getBrand.name

      expect( brandName ).toBe( 'AKAI' )
    } )

    test( 'Should return name Zollner Elektronik AG without removing empty spaces between the names', async () => {
      const test = async () => Brand.create( 'Zollner Elektronik AG' )
      const getBrand = await test()
      const brandName = getBrand.name

      expect( brandName ).toBe( 'Zollner Elektronik AG' )
    } )

    test( 'Should return name Burmester Audiosysteme without removing empty spaces between the names', async () => {
      const test = async () => Brand.create( ' Burmester Audiosysteme  ' )
      const getBrand = await test()
      const brandName = getBrand.name

      expect( brandName ).toBe( 'Burmester Audiosysteme' )
    } )
  } )
} )
