import { Server } from 'node:http'
import { Backend } from './app'


const terminate = ( server: Server ) => () => {
  console.log( 'SIGINT/SIGTERM signal received: closing HTTP server' )
  server.close( () => {
    console.log( 'HTTP server closed' )
  } )
}

( async () => {
  const backend = new Backend()
  const server = await backend.run()

  // Graceful shutdown
  process.on( 'SIGTERM', terminate( server ) )
  process.on( 'SIGINT', terminate( server ) )
} )()
