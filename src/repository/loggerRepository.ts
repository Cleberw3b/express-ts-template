//
//      Serviços de banco de dados para a Interface Logger
//

import { loggerCollection } from '../utils/db/collections'
import { Logger } from '../models/logger'

/**
 * Salve o Logger no Banco de Dados
 * 
 * @param logger
 */
export const saveLogger = async ( logger: Logger ) => {
    try {
        const response = await loggerCollection.insertOne( logger )
    } catch ( error ) {
        console.error( error )
    }
}

/**
 * Recupera o Logger
 * 
 * @param date - timestamp date
 */
export const retrieveLogger = async ( date: number ) => {
    try {
        const logger = await loggerCollection.find( { date } ).toArray()
        if ( !logger ) return null
        return logger

    } catch ( error ) {
        console.error( error )
        return null
    }
}
