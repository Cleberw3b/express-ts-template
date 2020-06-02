import express from 'express'
const router = express.Router()

/* GET health check with application uptime. */
router.get( '/', ( _req, res ) => {
    res.status( 200 ).json( { uptime: process.uptime() } )
} )

export { router }
export { router as healthCheckRouter }
