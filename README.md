Weather.js
==========

[![Build Status](https://secure.travis-ci.org/noazark/weather.svg?branch=master)](https://travis-ci.org/noazark/weather)
[![npm](https://img.shields.io/npm/v/weather.js.svg?maxAge=2592000)](https://www.npmjs.com/package/weather.js)
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

# Install
Weather.js works in the browser and Node.js. Take your pick, For use in the browser, download the most recent version on GitHub. For use in Node, just install using your NPM package manager of choice. Currently Node has an old version of the library available but it will be updated soon.

## Testing
To run the JavaScript unit tests run:
```bash
npm run test
```

You can also have the test run automatically when a file changes while developing by running:
```bash
npm run test-watch
```

# Usage
At the moment you can access the current weather conditions and the forcast for any city. By default it will use the closes match as returned by OpenWeatherMap. More 

```javascript
import Client from 'weather.js';

var client = new Client( { appid: 12345 } );

// Get Currrent Weather for a city
client.getCurrent( "Guntersville" )
  .then( ( response ) => {
      // do something with your JSON response
  } );

// Get the Forecast for a city
client.getForecast( "Guntersville" )
  .then( ( response ) => {
      // do something with your JSON response
  } );
```
