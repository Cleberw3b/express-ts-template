import { NextFunction, Request, Response } from 'express'
import createHttpError, { HttpError } from 'http-errors'

/**
 * exports the create http error function
 */

export { createHttpError }

/**
 * exports middleware function to handle http error
 */

export const errorMiddleware = ( error: HttpError, request: Request, response: Response, next: NextFunction ) => {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  response
    .status( status )
    .send( {
      status,
      message,
    } )
}
