import { knex } from '../../postgres'
import { EnumReminderType, EnumReminderChannel, EnumReminderStatus } from '../../../../types-and-enums/enums'

export const tableNameReminder = 'reminders'

export const createTableReminder = async () => {
  if ( !await knex.schema.hasTable( tableNameReminder ) ) {
    await knex.schema.createTable( tableNameReminder, ( table ) => {
      table.uuid( 'id' ).primary().defaultTo( knex.raw( 'gen_random_uuid()' ) )
      table.uuid( 'transaction_id' ).notNullable().references( 'id' ).inTable( 'share_transactions' ).onDelete( 'CASCADE' )
      table.uuid( 'created_by' ).notNullable().references( 'id' ).inTable( 'users' )
      table.string( 'reminder_type', 30 ).notNullable().defaultTo( EnumReminderType.RETURN_NUDGE )
      table.text( 'message' ).nullable()
      table.string( 'channel', 20 ).notNullable().defaultTo( EnumReminderChannel.EMAIL )
      table.timestamp( 'scheduled_for', { useTz: true } ).notNullable()
      table.timestamp( 'sent_at', { useTz: true } ).nullable()
      table.string( 'status', 20 ).notNullable().defaultTo( EnumReminderStatus.PENDING )
      table.timestamp( 'created_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
      table.timestamp( 'updated_at', { useTz: true } ).notNullable().defaultTo( knex.fn.now() )
    } )
  }
}
