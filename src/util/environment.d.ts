declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'test' | 'production'
            PORT?: number
            ENV_VARIABLE_EXAMPLE: string
        }
    }
}

// convert it into a module by adding an empty export statement.
export { }
