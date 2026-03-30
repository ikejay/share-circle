import Bluebird from 'bluebird'
import { connectToPostgres, knex } from '../src/postgres'
import { ensureTableExists } from '../src/seeder'
import { addDefaultCategories } from '../src/seeder/categories'
import { addSeedItems } from '../src/seeder/items'
import { addSeedUsers } from '../src/seeder/users'

export const connectToPostgresTestDb = async () => connectToPostgres( 'test' )

export const setUpTables = async () => {
  await ensureTableExists()
  await addSeedUsers()
  await addDefaultCategories()
  await addSeedItems()
}

export const tearDownTables = async () => {
  const allTableDefNames = (
    await knex.queryBuilder()
      .select( 'table_name' )
      .from( 'information_schema.tables' )
      .where( 'table_schema', 'test' )
  ).map( ( { table_name } ) => table_name )

  await Bluebird.each( allTableDefNames, tableName => {
    return knex.raw( `DROP TABLE IF EXISTS "test"."${ tableName }" CASCADE` )
  } )

  return allTableDefNames as string[]
}

export const removePostgresTestDb = async () => {
  const allTableDefNames = await tearDownTables()

  await Bluebird.each( allTableDefNames, tableName => {
    return knex.schema.withSchema( 'test' ).raw( `DROP SEQUENCE IF EXISTS "test"."${ tableName }__data_seq"` )
  } )
}
