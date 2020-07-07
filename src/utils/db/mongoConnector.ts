import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import { MONGO_DB_URL_CONNECTION, MONGO_DATA_BASE_NAME } from '../consts'
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
 * Defines database type
 */
let database: Db

/**
 * Try to connect to server using mongo client,
 * load database and create/retrieve collections
 */
export const loadDatabase = ( app: Express ) => {

  console.debug( 'Database is loading...' )
  // If is already connect return
  if ( mongoClient.isConnected() ) return

  try {
    mongoClient.connect( ( err ) => {
      if ( err ) throw err
      // Set database
      database = mongoClient.db( MONGO_DATA_BASE_NAME )
      // Create collection ( repository ) 
      createCollections()
      app.emit( 'ready' )
    } )

  } catch ( error ) {
    console.error( 'Não foi possível conectar com o banco de dados.' )
    console.error( error )
  }
}

/**
 * Closes current mongo client connection to server
 */
export const closeMongoConnection = () => {
  mongoClient.close()
}

export { database }
