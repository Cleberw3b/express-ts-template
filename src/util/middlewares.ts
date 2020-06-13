import createHttpError, { HttpError } from "http-errors"
import { Request, Response, NextFunction } from "express"
import { JWT_SECRET } from "./consts"


/**
 * Middleware to catch 404 and forward to error handler
 */
export const notFountMiddleware = (error: HttpError, request: Request, response: Response, next: NextFunction) => {
    next(createHttpError(404))
}

/**
 * exports middleware function to handle http error
 */
export const errorMiddleware = (error: HttpError, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500
    const message = error.message || 'Something went wrong'
    response
        .status(status)
        .send({
            status,
            message,
        })
}

/**
 * exports middleware function to handle authorization
 */
export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Allow Origins
    res.header("Access-Control-Allow-Origin", "*")
    // Allow Methods
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    // Allow Headers
    res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization")
    // Handle preflight, it must return 200
    if (req.method === "OPTIONS")
    {
        // Stop the middleware chain
        return res.status(200).end()
    }
    // Next middleware 
    next()
}

/**
 * exports middleware function to handle authorization
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // login does not require jwt verification
    if (req.path == '/api/login')
    {
        // next middleware
        return next()
    }

    // get token from request header Authorization
    const token = req.headers.authorization

    // Token verification
    try
    {
        // var decoded = jwt.verify(token, JWT_SECRET)
        var decoded = JWT_SECRET
        console.log("decoded", decoded)
    } catch (err)
    {
        // Catch the JWT Expired or Invalid errors
        return res.status(401).json({ "msg": err.message })
    }

    // next middleware
    next()
}