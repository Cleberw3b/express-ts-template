import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import { IS_TEST_ENV, MONGO_DB_NAME, MONGO_PASSWORD, MONGO_USER } from '../consts'
import { createCollections } from './collections'
import { Express } from 'express'

const MONGO_DB_URL = `mongodb+srv://${ MONGO_USER }:${ MONGO_PASSWORD }@cluster0.uv5yk.mongodb.net/${ MONGO_DB_NAME }?retryWrites=true&w=majority`

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
 * @param MONGO_DB_URL is the database url to connect
 * @param mongoClientOptions are options to configure mongo connection
 */
const mongoClient = new MongoClient( MONGO_DB_URL, mongoClientOptions )

// Event listening for database errors
mongoClient.on( 'error', ( error ) => {
  console.error( 'Database error' )
  console.error( error )
} )

// Event listening when database is connected
mongoClient.on( 'open', async () => {

  console.debug( 'Database connected' )

  // Create collection ( repository ) 
  await createCollections( mongoClient.db( MONGO_DB_NAME ) )
} )

// Event listening when database is closed
mongoClient.on( 'close', ( str ) => {
  console.debug( 'Database disconnected: ' + str )
} )

/**
 * Try to connect to server using mongo client,
 * load database and create/retrieve collections
 */
export const loadDatabase = async ( app: Express ) => {

  try {
    // If is already connect return
    if ( mongoClient.isConnected() ) return

    // Try to connect
    await mongoClient.connect()

    // emit event to init server
    if ( !IS_TEST_ENV ) app.emit( 'ready' )

  } catch ( error ) {
    console.error( 'Não foi possível conectar com o banco de dados.' )
    console.error( error )
  }
}

/**
 * Closes current mongo client connection to server
 */
export const closeConnection = () => {
  mongoClient.close()
}
