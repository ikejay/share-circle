import { knex } from '../../postgres'
import { EnumReminderType, EnumReminderChannel, EnumReminderStatus } from '../../../types-and-enums/enums'

export const tableNameReminder = 'reminders'

export const addSeedReminders = async () => {
  const count = await knex( tableNameReminder ).count( 'id as c' ).first()
  if ( Number( count?.c ) > 0 ) return

  const alice = await knex( 'users' ).where( { email: 'alice@example.com' } ).first()
  if ( !alice ) return

  const drill = await knex( 'items' ).where( { owner_id: alice.id, name: 'DeWalt 20V Drill' } ).first()
  if ( !drill ) return

  const transaction = await knex( 'share_transactions' ).where( { item_id: drill.id, status: 'active' } ).first()
  if ( !transaction ) return

  await knex( tableNameReminder ).insert( [
    {
      transaction_id: transaction.id,
      created_by: alice.id,
      reminder_type: EnumReminderType.RETURN_NUDGE,
      message: 'Hey, just a heads up — the drill return date is coming up soon!',
      channel: EnumReminderChannel.IN_APP,
      scheduled_for: '2026-03-13T09:00:00Z',
      status: EnumReminderStatus.PENDING,
    },
    {
      transaction_id: transaction.id,
      created_by: alice.id,
      reminder_type: EnumReminderType.RETURN_NUDGE,
      message: 'Friendly reminder: the drill is due back tomorrow.',
      channel: EnumReminderChannel.EMAIL,
      scheduled_for: '2026-03-14T09:00:00Z',
      status: EnumReminderStatus.PENDING,
    },
  ] )
}

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
