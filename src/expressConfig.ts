import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan'
import { } from "http-errors"
import * as routes from './routes/routes'
import { IS_DEVELOPMENT_ENV, DEFAULT_PORT } from './util/consts'
import * as middlewares from './util/middlewares'

/**
 * Create a express app
 */
const app = express()

/**
 * Middleware to concise output colored responses status
 */
if (IS_DEVELOPMENT_ENV) app.use(logger('dev'))

/**
 * Middleware to parse data to Json
 */
app.use(express.json())

/**
 * Middleware to parse only url encoded
 */
app.use(express.urlencoded({ extended: false }))

/**
 * CORS middleware
 */
app.use(middlewares.corsMiddleware)

/**
 * Auth middleware
 */
app.use(middlewares.authMiddleware)

/**
 * Define routes and their handles
 */
app.use('/', routes.root)
app.use('/healthcheck', routes.healthCheck)

/**
 * Middleware to catch 404 and forward to error handler
 */
app.use(middlewares.notFountMiddleware)

/**
 * Middleware to handle error
 */
app.use(middlewares.errorMiddleware)

/**
 * Get default port and store in Express.
 */
app.set("port", DEFAULT_PORT)

export default app
