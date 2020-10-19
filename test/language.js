isModule = ( typeof module !== 'undefined' && module.exports );

if ( isModule ) {
    Weather = require( "../lib/weather" );
}

describe( 'language methods', function () {
    it( 'test getLanguage method', function () {
        Weather.setLanguage( 'de' );
        expect( Weather.getLanguage() ).to.eql( 'de' );
    } );

    it( 'test setLanguage method', function () {
        Weather.setLanguage( 'en' );
        expect( Weather.getLanguage() ).to.eql( 'en' );
    } );
} );