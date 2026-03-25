import { knex } from '../../postgres'
import { EnumShareTransactionStatus } from '../../../../types-and-enums/enums'

export const tableNameShareTransaction = 'share_transactions'

export const createTableShareTransaction = async () => {
  if ( !await knex.schema.hasTable( tableNameShareTransaction ) ) {
    await knex.schema.createTable( tableNameShareTransaction, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'request_id' ).unique().notNullable().references( 'id' ).inTable( 'share_requests' )
      table.uuid( 'item_id' ).notNullable().references( 'id' ).inTable( 'items' )
      table.uuid( 'lender_id' ).notNullable().references( 'id' ).inTable( 'users' )
      table.uuid( 'borrower_user_id' ).nullable().references( 'id' ).inTable( 'users' )
      table.uuid( 'borrower_guest_id' ).nullable().references( 'id' ).inTable( 'guest_users' )
      table.string( 'status', 20 ).notNullable().defaultTo( EnumShareTransactionStatus.ACTIVE )
      table.date( 'start_date' ).notNullable()
      table.date( 'expected_return_date' ).notNullable()
      table.date( 'actual_return_date' ).nullable()
      table.text( 'lender_notes' ).nullable()
      table.text( 'borrower_notes' ).nullable()
      table.string( 'condition_on_return', 30 ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )

    await knex.raw( `
      ALTER TABLE share_transactions
        ADD CONSTRAINT borrower_required CHECK (
          borrower_user_id IS NOT NULL OR borrower_guest_id IS NOT NULL
        )
    ` )
  }
}
