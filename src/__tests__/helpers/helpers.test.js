const { celsiusToFahrenheit, celsiusToKelvin, fahrenheitToCelsius, fahrenheitToKelvin, kelvinToCelsius, kelvinToFahrenheit } = require( '../../helpers/helpers' );

describe( 'Helpers', () => {
    describe( '#celsiusToFahrenheit', () => {
        test( 'converts celcius to fahrenheit', () => {
            expect( celsiusToFahrenheit( 18 ) ).toBeCloseTo( 64.4, 0.001 );
        } );
    } );

    describe( '#celsiusToKelvin', () => {
        test( 'converts celcius to kelvin', () => {
            expect( celsiusToKelvin( 18 ) ).toBeCloseTo( 291.15, 0.001 );
        } );
    } );

    describe( '#fahrenheitToCelsius', () => {
        test( 'converts fahrenheit to celcius', () => {
            expect( fahrenheitToCelsius( 72 ) ).toBeCloseTo( 22.2222, 0.001 );
        } );
    } );

    describe( '#fahrenheitToKelvin', () => {
        test( 'converts fahrenheit to kelvin', () => {
            expect( fahrenheitToKelvin( 72 ) ).toBeCloseTo( 295.372, 0.001 );
        } );
    } );

    describe( '#kelvinToCelsius', () => {
        test( 'converts kelvin to celcius', () => {
            expect( kelvinToCelsius( 295 ) ).toBeCloseTo( 21.85, 0.001 );
        } );
    } );

    describe( '#kelvinToFahrenheit', () => {
        test( 'converts kelvin to fahrenheit', () => {
            expect( kelvinToFahrenheit( 295 ) ).toBeCloseTo( 71.33, 0.001 );
        } );
    } );
} );