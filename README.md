Weather.js
==========

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/noazark/weather/master/LICENSE)


## About

Internal PureClarity Weather.js fork. Fetches data from [OpenWeatherMap](http://openweathermap.org/).

## Install

Reference the master branch for this repo in the package.json.

```
npm install PureClarity/weather --save
```

## Usage

Access the current weather conditions for any city. By default it will use the closest match as
returned by Open Weather Map.

```javascript
Weather.getCurrent("York", function(current) {
  console.log(
    ["currently:",current.temperature(),"and",current.conditions()].join(" ")
  );
});

Weather.getForecast("York", function(forecast) {
  console.log("Forecast High in Kelvin: " + forecast.high());
  console.log("Forecast High in Fahrenheit" + Weather.kelvinToFahrenheit(forecast.high()));
  console.log("Forecast High in Celsius" + Weather.kelvinToCelsius(forecast.high()));
});
```

[openweathermap.org]: http://openweathermap.org
[Forked from Weather.js]: http://github.com/noazark/weather
