import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import { MONGO_DB_URL_CONNECTION, MONGO_DATA_BASE_NAME, IS_DEVELOPMENT_ENV } from '../util/consts'
import { createCollections } from './collections'
import { Express } from 'express'

/**
 * Defines a mongo client options object
 * 
 * @see `MongoClientOptions`
 */
const mongoClientOptions: MongoClientOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

/**
 * Defines a mongo client object
 * 
 * @param MONGO_DB_URL_CONNECTION is the database url to connect
 * @param mongoClientOptions are options to configure mongo connection
 */
export const mongoClient = new MongoClient( MONGO_DB_URL_CONNECTION, mongoClientOptions )

/**
 * Try to connect to server using mongo client
 */
export const mongoConnect = async () => {

    // If is already connect return
    if ( mongoClient.isConnected() ) return

    try {
        await mongoClient.connect()
        return true
    } catch ( e ) {
        console.error( 'Couldn\'t connect to the database' )
        console.error( e )
        return false
    }
}

/**
 * Closes current mongo client connection to server
 */
export const closeMongoConnection = () => {
    mongoClient.close()
}

/**
 * Print databases' name
 */
const printDatabases = async () => {
    const databasesList = await mongoClient.db().admin().listDatabases()
    console.log( 'Databases:' )
    databasesList.databases.forEach( ( db: any ) => console.log( ` - ${ db.name }` ) )
}

/**
 * Defines database type
 */
let database: Db

/**
 * Load database and create collections
 */
export const loadDatabase = async ( app: Express ) => {

    console.debug( 'Database is loading...' )

    // If not connected tries to connect
    if ( !mongoClient.isConnected() ) {
        // If couldn't connect return
        if ( await !mongoConnect() ) return
    }

    // Set database
    database = mongoClient.db( MONGO_DATA_BASE_NAME )

    if ( IS_DEVELOPMENT_ENV ) printDatabases()

    // Create collection ( repository ) 
    await createCollections()

    app.emit( 'ready' )

}

export { database }
