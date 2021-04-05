import { AxiosError } from 'axios'

/**
 * Call it inside an async function and it will sleep
 * 
 * @param ms - milliseconds
 */
export const sleep = ( ms: number = 1 ) => {
    return new Promise( ( resolve ) => {
        setTimeout( resolve, ms )
    } )
}

/**
 * Returns the callee name
 * 
 * @param depth - depth
 */
export const getFunctionName = ( depth: number = 1 ) => {
    const error = new Error()
    if ( error.stack ) {
        // tslint:disable-next-line:max-line-length
        return ( ( ( ( error.stack.split( 'at ' ) || [] )[1 + depth] || '' ).match( /(^|\.| <| )(.*[^(<])( \()/ ) || [] )[2] || '' ).split( '.' ).pop()
    }
    return 'NULL'
}

/**
 * 
 * @param timestamp 
 * @returns this format 2020-05-01
 */
export const formatDate = ( timestamp: number ) => {
    const date = new Date( timestamp )
    const year = date.getFullYear()
    const month = date.getMonth() < 10 ? '0' + ( date.getMonth() + 1 ) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return year + '-' + month + '-' + day
}

export const nowForPostgre = ( offset: number = 0 ) => {
    return new Date( Date.now() - offset ).toLocaleString()
}

export const nowIsoDate = () => {
    return new Date( Date.now() ).toISOString()
}

export const nowInSeconds = () => {
    return Math.floor( Date.now() / 1000 )
}

export const getRandomFromList = ( array: any[] ) => {
    if ( array && array.length === 0 ) return null
    const random = Math.floor( Math.random() * 10000000000000000 + 1 )
    const index = random % array.length
    return array[index]
}

export const logAxiosError = ( error: AxiosError ) => {
    console.log( `
    ------ AXIOS ERROR -------

        -- URL --
    ${ prettyFormat( error.config?.url ) } 

    -- REQUEST DATA --
     ${ prettyFormat( error.config?.data ) }

     -- REQUEST HEADERS --
    ${ prettyFormat( error.config?.headers ) }

    -- RESPONSE DATA --
    ${ prettyFormat( error.response?.data ? error.response?.data : error.response ) }
    ------ END LOG -------
    `)
}

export const prettyFormat = ( object: any ) => {
    return JSON.stringify( object, undefined, 2 )
}
