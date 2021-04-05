//
//     Global interfaces
//

import { MongoClient } from "mongodb"

/**
 * Reescreve Interface `global.NodeJS.ProcessEnv`
 */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'test' | 'production'
            PORT?: number
            ENV_VARIABLE_EXAMPLE: string
            MONGO_URL: string
            MONGO_USER: string
            MONGO_PASSWORD: string
            MONGO_DB_NAME: string
            ENABLE_LOG: string
        }
        interface Global {
            connection: MongoClient
        }
    }
}

// convert it into a module by adding an empty export statement.
export { }
