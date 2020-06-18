import { database } from './mongoConnector'
import { Collection } from 'mongodb'

const COLLECTION = 'collection'

interface myModel {
    name: string
    number: number
}

let myCollection: Collection<myModel>

export const createCollections = () => {
    myCollection = database.collection<myModel>( COLLECTION )
}

export { myCollection }
