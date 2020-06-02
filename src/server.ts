import app from "./expressConfig"
import http from "http"
import { DEFAULT_PORT } from "./util/consts"

/**
 * Create HTTP server.
 */

const server = http.createServer( app )

/**
 * Event listener for HTTP server "error" event.
 */

const onError = ( error: any ) => {
  if ( error.syscall !== "listen" ) {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch ( error.code ) {
    case "EACCES":
      console.error( "Port " + DEFAULT_PORT + " requires elevated privileges" )
      process.exit( 1 )
      break
    case "EADDRINUSE":
      console.error( "Port " + DEFAULT_PORT + " is already in use" )
      process.exit( 1 )
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  console.debug( "Listening on port " + DEFAULT_PORT )
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen( DEFAULT_PORT )

/**
 * Add on error handle
 */

server.on( "error", onError )

/**
 * Add on error handle
 */

server.on( "listening", onListening )
