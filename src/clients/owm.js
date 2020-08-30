export default class {
    constructor( options ) {
        this.baseUrl = options.baseUrl || 'https://api.openweathermap.org/data/2.5';
        this.appid = options.appid;
    }

    _getJSON( url ) {
        return utils.jsonp( url )
            .then( ( response ) => JSON.parse( response ) );
    }

    getCurrent( city ) {
        let url = `${this.baseUrl}/weather?q=${encodeURIComponent( city )}&appid=${encodeURIComponent( this.appid )}`;

        return this._getJSON( url );
    }

    getForecast( city ) {
        let url = `${this.baseUrl}/forecast?q=${encodeURIComponent( city )}&appid=${encodeURIComponent( this.appid )}`;

        return this._getJSON( url );
    }
}

export function endsAt( resource ) {
    let getTime = ( r ) => r[ 'dt' ] * 1000;

    if ( resource.hasOwnProperty( 'list' ) ) {
        return new Date( Math.max( ...resource[ 'list' ].map( getTime ) ) );
    } else {
        return new Date( getTime( resource ) );
    }

}

export function lat( resource ) {
    if ( resource.hasOwnProperty( 'coord' ) ) {
        return resource[ 'coord' ][ 'lat' ];
    } else {
        return resource[ 'city' ][ 'coord' ][ 'lat' ];
    }
}

export function latlon( resource ) {
    return [ lat( resource ), lon( resource ) ];
}

export function lon( resource ) {
    if ( resource.hasOwnProperty( 'coord' ) ) {
        return resource[ 'coord' ][ 'lon' ];
    } else {
        return resource[ 'city' ][ 'coord' ][ 'lon' ];
    }
}

export function high( resource ) {
    let getHigh = ( r ) => r[ 'main' ][ 'temp' ];

    if ( resource.hasOwnProperty( 'list' ) ) {
        return Math.max( ...resource[ 'list' ].map( getHigh ) );
    } else {
        throw new Error( 'Cannot use high() on with the Current API, use high() or low()' );
    }
}

export function low( resource ) {
    let getLow = ( r ) => r[ 'main' ][ 'temp' ];

    if ( resource.hasOwnProperty( 'list' ) ) {
        return Math.min( ...resource[ 'list' ].map( getLow ) );
    } else {
        throw new Error( 'Cannot use high() on with the Current API, use high() or low()' );
    }
}

export function startsAt( resource ) {
    let getTime = ( r ) => r[ 'dt' ] * 1000;

    if ( resource.hasOwnProperty( 'list' ) ) {
        return new Date( Math.min( ...resource[ 'list' ].map( getTime ) ) );
    } else {
        return new Date( getTime( resource ) );
    }
}

export function temperature( resource ) {
    let getTemp = ( r ) => r[ 'main' ][ 'temp' ];

    if ( !resource.hasOwnProperty( 'list' ) ) {
        return getTemp( resource );
    } else {
        return resource[ 'list' ].map( getTemp );
    }
}

export const utils = {
    jsonp( uri ) {
        return new Promise( function( resolve, reject ) {
            let id = `_${Math.round( 10000 * Math.random() )}`;
            let callbackName = `jsonp_callback_${id}`;
            let el = ( document.getElementsByTagName( 'head' )[ 0 ] || document.body || document.documentElement );
            let script = document.createElement( 'script' );
            let src = uri + '&callback=' + callbackName;

            window[ callbackName ] = function( data ) {
                delete window[ callbackName ];
                let el = document.getElementById( id );
                el.parentNode.removeChild( el );
                resolve( data );
            };

            script.src = src;
            script.id = id;
            script.addEventListener( 'error', () => reject( new Error( 'Request failed' ) ) );
            el.appendChild( script );
        } );
    }
};