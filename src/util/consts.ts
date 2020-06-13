let isTest = false
let isProd = false
let isDev = false

/**
 * Verifies what enviroment we are working with
 */

switch ( process.env.NODE_ENV ) {
    case "test":
        isTest = true
        break
    case "production":
        isProd = true
        break
    default:
        isDev = true
}

/**
 * Exports all consts that application need
 */

export const IS_DEVELOPMENT_ENV = isDev

export const IS_PRODUCTION_ENV = isProd

export const IS_TEST_ENV = isTest

export const DEFAULT_PORT = process.env.PORT || "3000"

export const ENV_VARIABLE_EXAMPLE = process.env.ENV_VARIABLE_EXAMPLE

export const JWT_SECRET = process.env.JWT_SECRET || "mysuperdupersecret"
