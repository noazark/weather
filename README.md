Weather.js
==========

[![Build Status](https://secure.travis-ci.org/noazark/weather.png?branch=master)](https://travis-ci.org/noazark/weather)

## About

There really should be a conclusive Javascript weather library.
Weather.js fetches data from [openweathermap.org][] (no affiliation).
Since other providers format their output differently, currently this is
the only source provider.

Weather.js is still in early development so expect changes and please
contribute! Among the features I hope to incorporate:

-   historical weather information
-   API find method to get city informations
-   API key usage
-   more data sources
-   more conversions!


## Install

Weather.js works in the browser and node.js. Take your pick. For the
browser, [download the most recent version on github][Weather.js]. For use in
node, do the install thing.

```
npm install -g weather.js
```

**Important!** In the browser you will need to also include [Sugar.js][]
and [jQuery][]. I will try to remove these dependancies as soon as
possible.

## Usage

At the moment you can access the current weather conditions and the
forecast for any city. By default it will use the closest match as
returned by Open Weather Map. You can specify the city's contry, like : 
"London,ca" and "London,gb".

### Current conditions

The data format is specified here : http://openweathermap.org/weather-data#current .

```javascript
Weather.byCity("Kansas City").getCurrent(function(current) {
    console.log(current);
    console.log(current.getLocation(), current.getConditions(), current.getIcon(), current.getMapLink());
    console.log(current.getSunrise(), current.getSunset());
});
```

### Forecast

The data format is specified here : http://openweathermap.org/weather-data#5days .

```javascript
Weather.bylatLng("43.000351", "-75.499901").getForecast(function(forecast) {
    console.log(forecast);
    console.log(forecast.high(), forecast.low(), forecast.startAt(), forecast.endAt(), forecast.day());
});
```

### Options

You can use some options, globally or for each function call.

#### Globally

```javascript
// http://openweathermap.org/appid
Weather.options.APPID = "1111111111";

// http://openweathermap.org/current#other
Weather.options.type = "accurate";

// http://openweathermap.org/current#multi
Weather.options.lang = "fr";

// http://openweathermap.org/current#data
Weather.options.unit = "metric"; 
```

#### Per function

```javascript
Weather.byCity('Montpellier,fr').getCurrent({lang: 'fr'}, function (current) { });
```

## Usage example

```javascript
Weather.byCity('Kansas city').getCurrent(function (current) {
  $('#weather').find('.conditions')
      .text('Kansas city : ' + Weather.kelvinToFahrenheit(current.data.main.temp).toFixed() + '°F and ' + current.getConditions())
      .prepend($('<img>').attr('src', current.getIcon()))
  ;
});

//French city conditions request
Weather.byCity('Montpellier,fr').getCurrent({lang: 'fr'}, function (current) {
  $('#weather-france').find('.conditions')
      .text('Montpellier, France : ' + Weather.kelvinToCelsius(current.data.main.temp).toFixed() + '°C et ' + current.getConditions())
      .prepend($('<img>').attr('src', current.getIcon()))
  ;
});
```

# Links

* *openweathermap.org* http://openweathermap.org
* *Weather.js*: http://github.com/noazark/weather
* *Sugar.js*: http://sugarjs.com/
* *jQuery*: http://jquery.com/

