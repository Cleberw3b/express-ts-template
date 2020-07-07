//
//     Declara códigos de HttpStatus suportados pelo VPP-Aviso
//

/**
 * Lista de http status code suportados
 */
type HttpStatusCode =

    200 |
    201 |
    204 |
    301 |
    302 |
    400 |
    401 |
    403 |
    404 |
    408 |
    500

/**
 *  Lista de http message para os códigos suportados acima
 */
type HttpMessage =
    'Ok' |
    'Created' |
    'No Content' |
    'Found' |
    'Bad Request' |
    'Unauthorized' |
    'Forbidden' |
    'Not Found' |
    'Request Timeout' |
    'Internal Server Error'

/**
 * Descreve Interface HttpStatus
 */
export interface HttpStatus {
    status: HttpStatusCode
    message: HttpMessage | string
}

/**
 * HttpStatus Ok
 */
export const ok: HttpStatus = { status: 200, message: 'Ok' }

/**
 * HttpStatus Created
 */
export const created: HttpStatus = { status: 201, message: 'Created' }

/**
 * HttpStatus No Content
 */
export const noContent: HttpStatus = { status: 204, message: 'No Content' }

/**
 *  HttpStatus Found
 */
export const found: HttpStatus = { status: 302, message: 'Found' }

/**
 * HttpStatus Bad Request
 */
export const badRequest: HttpStatus = { status: 400, message: 'Bad Request' }

/**
 * HttpStatus Unauthorized
 */
export const unauthorized: HttpStatus = { status: 401, message: 'Unauthorized' }

/**
 * HttpStatus Forbidden
 */
export const forbidden: HttpStatus = { status: 403, message: 'Forbidden' }

/**
 * HttpStatus Not Found
 */
export const notFound: HttpStatus = { status: 404, message: 'Not Found' }

/**
 * HttpStatus Request Timeout
 */
export const requestTimeout: HttpStatus = { status: 408, message: 'Request Timeout' }

/**
 * HttpStatus Internal Server Error
 */
export const internalServerError: HttpStatus = { status: 500, message: 'Internal Server Error' }

/**
 * Interface HttpStatusResponse
 */
export interface HttpStatusResponse extends HttpStatus {
    errors?: Error[]
}

/**
 * Cria um http error
 * 
 * @param HttpStatus 
 * @param error 
 * @param message 
 */
export const createHttpStatus = ( HttpStatus: HttpStatus, errors?: Error[], message?: string ) => {
    const newError: HttpStatusResponse = {
        status: HttpStatus.status,
        message: message ? message : HttpStatus.message,
        errors
    }

    return newError
}

/**
 * Lista de Http Errors
 */
const HttpStatussList = [
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    requestTimeout,
    internalServerError,
]

/**
 * Verifica se existe um error conhecido, se nao retorna o padrão `internalServerError`
 */
export const findErrorByStatus = ( errorCode: HttpStatusCode ) => {
    const HttpStatus = HttpStatussList.find( error => error.status === errorCode )
    if ( !HttpStatus ) return internalServerError
    return HttpStatus
}
