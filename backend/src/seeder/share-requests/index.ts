import { knex } from '../../postgres'
import { EnumShareRequestStatus, EnumShareRequestDirection } from '../../../../types-and-enums/enums'

export const tableNameShareRequest = 'share_requests'

export const createTableShareRequest = async () => {
  if ( !await knex.schema.hasTable( tableNameShareRequest ) ) {
    await knex.schema.createTable( tableNameShareRequest, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'item_id' ).notNullable().references( 'id' ).inTable( 'items' )
      table.uuid( 'requester_id' ).nullable().references( 'id' ).inTable( 'users' )
      table.uuid( 'recipient_user_id' ).nullable().references( 'id' ).inTable( 'users' )
      table.uuid( 'recipient_guest_id' ).nullable().references( 'id' ).inTable( 'guest_users' )
      table.string( 'direction', 10 ).notNullable()
      table.string( 'status', 20 ).notNullable().defaultTo( EnumShareRequestStatus.PENDING )
      table.text( 'message' ).nullable()
      table.date( 'proposed_start_date' ).nullable()
      table.date( 'proposed_end_date' ).nullable()
      table.timestamp( 'responded_at', { useTz: true } ).nullable()
      table.timestamp( 'expires_at', { useTz: true } ).nullable()
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )

    await knex.raw( `
      ALTER TABLE share_requests
        ADD CONSTRAINT recipient_required CHECK (
          recipient_user_id IS NOT NULL OR recipient_guest_id IS NOT NULL
        ),
        ADD CONSTRAINT not_same_requester_recipient CHECK (
          requester_id IS DISTINCT FROM recipient_user_id
        )
    ` )
  }
}
