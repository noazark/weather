Weather.js
==========

[![Build Status](https://secure.travis-ci.org/noazark/weather.svg?branch=master)](https://travis-ci.org/noazark/weather)
[![npm](https://img.shields.io/npm/v/weather.js.svg)](https://www.npmjs.com/package/weather.js)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/noazark/weather/master/LICENSE)


## About

Weather.js was designed to be a conclusive JavaScript weather library built around the [OpenWeatherMap](http://openweathermap.org/) API (no affiliation). Since other providers format their output differently, currently OpenWeatherMap is the only source provider.

Weather.js is still in early development so expect changes and please contribute! Among the features I hope to incorporate:

-   historical weather information
-   API key usage (but there is a beta version!)
-   more data sources
-   more conversions!

**Note:** As stated above there are plans to add more providers in the future. If you have suggestions for other providers that you'd like to see please create a new [issue](https://github.com/noazark/weather/issues) with info about the provider and a link to the provider's API.

Weather.js was originally created by [Noah Smith](https://github.com/noazark) and is currently maintained by [PallasStreams](https://github.com/PallasStreams).

## Install
Weather.js works in the browser and Node.js. Take your pick, For use in the browser, download the most recent version on GitHub. For use in Node, just install using your NPM package manager of choice. Currently Node has an old version of the library available but it will be updated soon.

```
npm install -g weather.js
```

## Testing
To run the JavaScript unit tests run:
```bash
npm run test
```

## Usage

At the moment you can access the current weather conditions and the forcast for any city. By default it will use the closes match as returned by OpenWeatherMap.

```javascript
// API Key methods
var apiKey = '12345';
Weather.setApiKey( apiKey );
var tempApiKey = Weather.getApiKey();

// Language methods
var langugage = "de"; // set the language to German - libraries default language is "en" (English)
Weather.setLanguage( langugage );
var tempLanguage = Weather.getLanguage();

var cityId = '4393217';

// Get current weather for a given city
Weather.getCurrent( 'Kansas City', function( current ) {
    console.log(
        [ 'Currently:', current.temperature(), 'and', current.conditions() ].join( ' ' );
    );
} );

// Get current weather for a given city using the city id
Weather.getCurrentByCityId( cityId, function( current ) {
    console.log(
        [ 'Currently:', current.temperature(), 'and', current.conditions() ].join( ' ' );
    );
} );

// Get the current weather for a given city using the latitude and longitude
var lat = 39.100,
    long = -94.579;
Weather.getCurrentByLatLong( lat, long, function( current ) {
    console.log(
        [ 'Currently:', current.temperature(), 'and', current.conditions() ].join( ' ' );
    );
} );

// Get the forecast for a given city
Weather.getForecast( 'Kansas City', function( forecast ) {
    console.log( 'Forecast High in Kelvin: ' + forecast.high() );
    console.log( 'Forecast High in Fahrenheit' + Weather.kelvinToFahrenheit( forecast.high() ) );
    console.log( 'Forecast High in Celsius' + Weather.kelvinToCelsius( forecast.high() ) );
} );

// Get the forecast for a given city using the city id
Weather.getForecastByCityId( cityId, function( forecast ) {
    console.log( 'Forecast High in Kelvin: ' + forecast.high() );
    console.log( 'Forecast High in Fahrenheit' + Weather.kelvinToFahrenheit( forecast.high() ) );
    console.log( 'Forecast High in Celsius' + Weather.kelvinToCelsius( forecast.high() ) );
} );

// Get the forecast for a given city using the latitude and longitude
var lat = 39.100,
    long = -94.579;
Weather.getForecastByLatLong( lat, long, function( forecast ) {
    console.log( 'Forecast High in Kelvin: ' + forecast.high() );
    console.log( 'Forecast High in Fahrenheit' + Weather.kelvinToFahrenheit( forecast.high() ) );
    console.log( 'Forecast High in Celsius' + Weather.kelvinToCelsius( forecast.high() ) );
} );
```

[openweathermap.org]: http://openweathermap.org
[Weather.js]: http://github.com/noazark/weather
