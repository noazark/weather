import Client, { endsAt, high, lat, latlon, lon, low, startsAt, temperature, utils } from '../../clients/owm';
const currentResponse = require( '../__fixtures__/get-current' );
const forecastResponse = require( '../__fixtures__/get-forecast' );


describe( 'OpenWeatherMap#getForecast', () => {
    let client;

    beforeAll( () => {
        client = new Client( { appid: 123 } );
    } );

    describe( '#getCurrent', () => {
        let jsonpSpy;

        beforeEach( () => {
            jsonpSpy = jest.spyOn( client, '_getJSON' ).mockImplementation( ( url ) => {
                return Promise.resolve( currentResponse );
            } );
        } );

        afterEach( () => {
            jsonpSpy.mockRestore();
        } );

        test( 'makes a request to OWM for the latest conditions', () => {
            let expected = 'https://api.openweathermap.org/data/2.5/weather?q=Guntersville&appid=123';
            return client.getCurrent( "Guntersville" )
                .then( () => {
                    expect( jsonpSpy ).toBeCalledWith( expected );
                } );
        } );

        test( 'parses a JSON response into an object', () => {
            return client.getCurrent()
                .then( ( data ) => {
                    expect( typeof data ).toEqual( 'object' );
                } );
        } );
    } );

    describe( '#getForecast', () => {
        let jsonpSpy;

        beforeEach( () => {
            jsonpSpy = jest.spyOn( client, '_getJSON' ).mockImplementation( ( url ) => {
                return Promise.resolve( currentResponse );
            } );
        } );

        afterEach( () => {
            jsonpSpy.mockRestore();
        } );

        test( 'makes a request to OWM for the latest forecast', () => {
            let expected = 'https://api.openweathermap.org/data/2.5/forecast?q=Guntersville&appid=123';
            return client.getForecast( "Guntersville" )
                .then( () => {
                    expect( jsonpSpy ).toBeCalledWith( expected );
                } );
        } );

        test( 'parses a JSON response into an object', () => {
            return client.getCurrent()
                .then( ( data ) => {
                    expect( typeof data ).toEqual( 'object' );
                } );
        } );
    } );

    describe( 'endsAt', () => {
        test( 'gets the ending time of the current report', () => {
            expect( endsAt( currentResponse ) ).toEqual( new Date( 1471114235000 ) );
        } );

        test( 'gets the ending time of forecasted report', () => {
            expect( endsAt( forecastResponse ) ).toEqual( new Date( 1471554000000 ) );
        } );
    } );

    describe( 'high', () => {
        test( 'throws an error if the resource does not have a high', () => {
            expect( () => {
                high( currentResponse );
            } ).toThrow();
        } );

        test( 'gets the forecast high temperature', () => {
            expect( high( forecastResponse ) ).toEqual( 304.121 );
        } );
    } );

    describe( 'lat', () => {
        test( 'gets the latitude of the current report', () => {
            expect( lat( currentResponse ) ).toEqual( 34.36 );
        } );

        test( 'gets the latitude of the forecast report', () => {
            expect( lat( forecastResponse ) ).toEqual( 34.35815 );
        } );
    } );

    describe( 'latlon', () => {
        test( 'gets the latitude and longitude of the current report', () => {
            expect( latlon( currentResponse ) ).toEqual( [ 34.36, -86.29 ] );
        } );

        test( 'gets the latitude and longitude of the forecast report', () => {
            expect( latlon( forecastResponse ) ).toEqual( [ 34.35815, -86.294701 ] );
        } );
    } );

    describe( 'lon', () => {
        test( 'gets the longitude of the current report', () => {
            expect( lon( currentResponse ) ).toEqual( -86.29 );
        } );

        test( 'gets the longitude of the forecast report', () => {
            expect( lon( forecastResponse ) ).toEqual( -86.294701 );
        } );
    } );

    describe( 'low', () => {
        test( 'throws an error if the resource does not have a low', () => {
            expect( () => {
                low( currentResponse );
            } ).toThrow();
        } );

        test( 'gets the forecast low temperature', () => {
            expect( low( forecastResponse ) ).toEqual( 293.725 );
        } );
    } );

    describe( 'startsAt', () => {
        test( 'gets the starting time of the current report', () => {
            expect( startsAt( currentResponse ) ).toEqual( new Date( 1471114235000 ) );
        } );

        test( 'gets the starting time of forecasted report', () => {
            expect( startsAt( forecastResponse ) ).toEqual( new Date( 1471154400000 ) );
        } );
    } );

    describe( 'temperature', () => {
        test( 'gets the current temperature', () => {
            expect( temperature( currentResponse ) ).toEqual( 304.06 );
        } );

        test( 'throws an error if the resource does not have a temperature', () => {
            expect( temperature( forecastResponse ) ).toEqual( [ 296.53, 296.27, 296.95, 298.95, 301.871, 303.501, 301.717, 299.639, 298.069, 296.569, 296.227, 301.539, 304.121, 303.271, 301.579, 300.372, 299.406, 299.18, 298.679, 299.781, 300.356, 301.481, 298.981, 296.499, 295.246, 293.725, 294.236, 296.594, 297.959, 297.92, 296.823, 294.697, 293.958, 294.552, 294.052, 295.594, 299.799, 301.286 ] );
        } );
    } );
} );
