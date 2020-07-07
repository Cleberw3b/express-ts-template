import logger from 'morgan'
import { LoggerType, Logger } from '../models/logger'

export const log = ( message: string, type: LoggerType ) => {

    const isoDate = new Date().toISOString()
    const timestamp = Date.now()

    const logger: Logger = {
        type,
        service: 'senha-vpp',
        message,
        timestamp,
    }

    console.log( type.toUpperCase() + '-> ' + message )
}

export { logger }
