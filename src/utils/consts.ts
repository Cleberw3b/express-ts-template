//
//     Lista de constantes usado no sistema
//

let isTest = false
let isProd = false
let isDev = false
let mongoDBUrlConnection = ''

/**
 * Verifies what environment we are working with
 */
switch ( process.env.NODE_ENV ) {
    case 'test':
        isTest = true
        mongoDBUrlConnection = 'mongodb://test'
        break
    case 'production':
        isProd = true
        mongoDBUrlConnection = 'mongodb://prod'
        break
    default:
        isDev = true
        mongoDBUrlConnection = `mongodb+srv://${ process.env.MONGO_USER }:${ process.env.MONGO_PASSWORD }@${ process.env.MONGO_URL }/${ process.env.MONGO_DB_NAME }?retryWrites=true&w=majority`
}

/**
 * Exports all consts
 */

export const IS_DEVELOPMENT_ENV = isDev

export const IS_PRODUCTION_ENV = isProd

export const IS_TEST_ENV = isTest

export const DEFAULT_PORT = process.env.PORT || '8080'

export const MONGO_DATA_BASE_NAME = process.env.MONGO_DB_NAME

export const MONGO_DB_URL_CONNECTION = mongoDBUrlConnection
