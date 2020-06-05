import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

/**
 * GET health check with application uptime. 
 */
router.get( '/', ( req: Request, res: Response, next: NextFunction ) => {
  res
    .status( 200 )
    .send( { uptime: process.uptime() } )
} )

export { router }
export { router as healthCheckRouter }
