import moment from 'moment/moment'

export const logger = ( ...messageParts: unknown[] ) => {
  const timestamp = moment().format( 'DD.MM.Y HH:mm:ss' )
  console.log( timestamp, ...messageParts )
}