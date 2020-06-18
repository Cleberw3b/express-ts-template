let isTest = false
let isProd = false
let isDev = false
let mongoDBUrlConnection = ''

/**
 * Verifies what enviroment we are working with
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
        mongoDBUrlConnection = 'mongodb://localhost:27017'
}

/**
 * Exports all consts that application need
 */

export const IS_DEVELOPMENT_ENV = isDev

export const IS_PRODUCTION_ENV = isProd

export const IS_TEST_ENV = isTest

export const DEFAULT_PORT = process.env.PORT || "3000"

export const ENV_VARIABLE_EXAMPLE = process.env.ENV_VARIABLE_EXAMPLE

export const MONGO_DATA_BASE_NAME = 'vpp-aviso'

export const MONGO_DB_URL_CONNECTION = mongoDBUrlConnection
