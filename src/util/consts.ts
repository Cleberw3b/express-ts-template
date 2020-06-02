/**
 * Exports all consts that application need
 */

export const IS_DEVELOPMENT_ENV = process.env.NODE_ENV === "development"

export const IS_PRODUCTION_ENV = process.env.NODE_ENV === "production"

export const IS_TEST_ENV = process.env.NODE_ENV === "test"

export const DEFAULT_PORT = process.env.PORT || "8000"

export const ENV_VARIABLE_EXAMPLE = process.env.ENV_VARIABLE_EXAMPLE
