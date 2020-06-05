import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

/**
 * GET root content.
 */
router.get( '/', ( req: Request, res: Response, next: NextFunction ) => {
  res
    .status( 200 )
    .send( "Hello World" )
} )

export { router }
export { router as rootRouter }
