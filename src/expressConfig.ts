import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import * as routes from './routes/routes'
import { createHttpError, errorMiddleware } from "./util/exceptions/httpException"
import { IS_DEVELOPMENT_ENV, DEFAULT_PORT } from './util/consts'

/**
 * If Developement it loads enviroment variables from .env file
 */
if ( IS_DEVELOPMENT_ENV ) {
    import( "dotenv" ).then( dotenv => {
        dotenv.config()
    } )
}

/**
 * Create a express app
 */
const app = express()

/**
 * Middleware to concise output colored responses status
 */
if ( IS_DEVELOPMENT_ENV ) {
    app.use( logger( 'dev' ) )
}

/**
 * Middleware to parse data to Json
 */
app.use( express.json() )

/**
 * Middleware to parse only url encoded
 */
app.use( express.urlencoded( { extended: false } ) )

/**
 * Define routes and their handles
 */
app.use( '/', routes.root )
app.use( '/healthcheck', routes.healthCheck )

/**
 * Middleware to catch 404 and forward to error handler
 */
app.use( ( req: Request, res: Response, next: NextFunction ) => {
    next( createHttpError( 404 ) )
} )

/**
 * Middleware to handle error
 */
app.use( errorMiddleware )


/**
 * Get default port and store in Express.
 */
app.set( "port", DEFAULT_PORT )

export default app
