import { Backend } from './app'

( async () => {
  const PORT: string | number = process.env.PORT || 3000
  const NODE_ENV: string = process.env.NODE_ENV || 'development'

  const backend = new Backend()
  await backend.run()

  const server = backend.app.listen( PORT, () => {
    console.log( `Server running in ${ NODE_ENV } mode on port ${ PORT }` )
    console.log( `Health check: http://localhost:${ PORT }/api/health` )
  } )

// Graceful shutdown
  process.on( 'SIGTERM', () => {
    console.log( 'SIGTERM signal received: closing HTTP server' )
    server.close( () => {
      console.log( 'HTTP server closed' )
    } )
  } )

  process.on( 'SIGINT', () => {
    console.log( 'SIGINT signal received: closing HTTP server' )
    server.close( () => {
      console.log( 'HTTP server closed' )
    } )
  } )
} )()
