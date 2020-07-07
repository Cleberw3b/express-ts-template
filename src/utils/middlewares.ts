import { Request, Response, NextFunction } from 'express'
import { findErrorByStatus, HttpStatus, notFound, createHttpStatus, HttpStatusResponse } from './httpStatus'
import { logger, log } from './loggerUtil'

/**
 * Middleware to catch 404 and forward to error handler
 */
export const notFountMiddleware = ( error: HttpStatus, req: Request, res: Response, next: NextFunction ) => {
    next( createHttpStatus( notFound ) )
}

/**
 * Exports middleware para tratar erros internos do servidor express
 * 
 * @remarks
 * Todos os parâmetros serão passados pelo próprio servidor express
 * 
 * @param error 
 * @param request 
 * @param response 
 * @param next 
 */
export const errorMiddleware = ( error: HttpStatusResponse, req: Request, res: Response, next: NextFunction ) => {

    const status = error.status || 500
    const message = error.message || 'Something went wrong'

    if ( error.errors ) console.error( error.errors )

    return res
        .status( status )
        .send( createHttpStatus( findErrorByStatus( status ), undefined, message ) )
}

/**
 * Middleware function to handle authorization
 */
export const corsMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
    // Allow Origins
    res.header( 'Access-Control-Allow-Origin', '*' )
    // Allow Methods
    res.header( 'Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS' )
    // Allow Headers
    res.header( 'Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization' )
    // Handle preflight, it must return 200
    if ( req.method === 'OPTIONS' ) {
        // Stop the middleware chain
        return res.status( 200 ).end()
    }
    // Call next middleware 
    next()
}

/**
 * Middleware function to handle authorization
 */
export const authMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
    // login does not require jwt verification
    if ( req.path == '/login' ) {
        // Call next middleware
        return next()
    }

    // get token from request header Authorization
    const token = req.headers.authorization

    try {
        // Token verification

        console.log( 'decoded' )
    } catch ( err ) {
        // Catch the JWT Expired or Invalid errors
        return res.status( 401 ).json( { 'msg': err.message } )
    }

    // Call next middleware
    next()
}

export const loggerRequest = logger( ':remote-addr :url :method HTTP/:http-version', {
    immediate: true,
    stream: {
        write: ( message: string ) => {
            log( message.trim(), 'request' )
        }
    }
} )

export const loggerResponse = logger( ':remote-addr :url :method :status :res[content-length] :response-time ms', {
    stream: {
        write: ( message: string ) => {
            log( message.trim(), 'response' )
        }
    }
} )
