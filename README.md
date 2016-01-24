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

**Important!** In the browser you will need to also include [jQuery][].
Currently it is being used simply for ajax requests. I will be removing this
dependency soon.

## Usage

At the moment you can access the current weather conditions and the
forecast for any city. By default it will use the closest match as
returned by Open Weather Map.

```javascript
Weather.getCurrent("Kansas City", function(current) {
  console.log(
    ["currently:",current.temperature(),"and",current.conditions()].join(" ")
  );
});

Weather.getForecast("Kansas City", function(forecast) {
  console.log("Forecast High in Kelvin: " + forecast.high());
  console.log("Forecast High in Fahrenheit" + Weather.kelvinToFahrenheit( forecast.high() );
  console.log("Forecast High in Celsius" + Weather.kelvinToCelsius( forecast.high() );
});
```

[openweathermap.org]: http://openweathermap.org
[Weather.js]: http://github.com/noazark/weather
[jQuery]: http://jquery.com/
