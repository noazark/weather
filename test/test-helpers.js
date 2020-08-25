import {
    celsiusToFahrenheit,
    celsiusToKelvin,
    fahrenheitToCelsius,
    fahrenheitToKelvin,
    kelvinToCelsius,
    kelvinToFahrenheit,
} from '../helpers';

describe( 'Helpers', function () {
    describe( '#celsiusToFahrenheit', function () {
        it( 'converts celcius to fahrenheit', function () {
            assert.approximately( celsiusToFahrenheit( 18 ), 64.4, 0.001 );
        } );
    } );

    describe( '#celsiusToKelvin', function () {
        it( 'converts celcius to kelvin', function () {
            assert.approximately( celsiusToKelvin( 18 ), 291.15, 0.001 );
        } );
    } );

    describe( '#fahrenheitToCelsius', function () {
        it( 'converts fahrenheit to celcius', function () {
            assert.approximately( fahrenheitToCelsius( 72 ), 22.2222, 0.001 );
        } );
    } );



    describe( '#fahrenheitToKelvin', function () {
        it( 'converts fahrenheit to kelvin', function () {
            assert.approximately( fahrenheitToKelvin( 72 ), 295.372, 0.001 );
        } );
    } );

    describe( '#kelvinToCelsius', function () {
        it( 'converts kelvin to celcius', function () {
            assert.approximately( kelvinToCelsius( 295 ), 21.85, 0.001 );
        } );
    } );

    describe( '#kelvinToFahrenheit', function () {
        it( 'converts kelvin to fahrenheit', function () {
            assert.approximately( kelvinToFahrenheit( 295 ), 71.33, 0.001 );
        } );
    } );
} );
