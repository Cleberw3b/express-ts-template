import { database } from './mongoConnector'
import { Collection } from 'mongodb'
import { Logger } from '../../models/logger'

const LOGGER_COLLECTION = 'logger'

let loggerCollection: Collection<Logger>

export const createCollections = () => {
    loggerCollection = database.collection<Logger>( LOGGER_COLLECTION )
}

export { loggerCollection }
