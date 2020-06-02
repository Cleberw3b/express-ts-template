import express, { Response } from 'express'
import { ENV_VARIABLE_EXAMPLE } from '../util/consts'
const router = express.Router()

/* GET root content. */
router.get( '/', ( res: Response ) => {
  res.send( { string: ENV_VARIABLE_EXAMPLE } )
} )

export { router }
export { router as rootRouter }