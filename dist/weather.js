var isModule = typeof module !== "undefined" && module.exports

if (isModule) {
  http = require('http')
  URL = require('url')
}

var Weather = {}

Weather.VERSION = '0.0.2'

Weather.kelvinToFahrenheit = function (value) {
  return (this.kelvinToCelsius(value) * 1.8) + 32
}

Weather.kelvinToCelsius = function (value) {
  return value - 273.15
}

Weather.getCurrent = function (city, callback) {
  var url = 'http://openweathermap.org/data/2.1/find/city?q=' + encodeURIComponent(city) + '&cnt=1'

  return this._getJSON(url, function (data) {
    callback(new Weather.Current(data))
  })
}

Weather.getForecast = function (city, callback) {
  var url = 'http://openweathermap.org/data/2.1/forecast/city?q=' + encodeURIComponent(city) + '&cnt=1'

  return this._getJSON(url, function (data) {
    callback(new Weather.Forecast(data))
  })
}

Weather._getJSON = function( url, callback ) {
  if (isModule) {
    return http.get(URL.parse(url), function(response) {
      return callback(response.body);
    });
  } else {
    // Create a new HTTP request to the url provided
    var request = new XMLHttpRequest();

    // The 3rd parameter must be set to true in order to create an asynchronous request.
    request.open( "GET", url, true );

    request.onreadystatechange = function() {
      if ( request.readyState === 4 && request.status === 200) { // 4 is done & 200 is OK
        // Success!
       callback( JSON.parse( request.responseText ) );
      }
    };

    request.send();
  }
}

Weather.Utils = {}

var maxBy = Weather.Utils.maxBy = function (list, iterator) {
  var max
  var f = function (memo, d) {
    var val = iterator(d)

    if (memo == null || val > max) {
      max = val
      memo = d
    }

    return memo
  }

  return list.reduce(f, null)
}

var minBy = Weather.Utils.minBy = function (list, iterator) {
  var min
  var f = function (memo, d) {
    var val = iterator(d)

    if (memo == null || val < min) {
      min = val
      memo = d
    }

    return memo
  }

  return list.reduce(f, null)
}

var isOnDate = Weather.Utils.isOnDate = function (a, b) {
  var sameYear = a.getYear() === b.getYear()
  var sameMonth = a.getMonth() === b.getMonth()
  var sameDate = a.getDate() === b.getDate()

  return sameYear && sameMonth && sameDate
}

Weather.Forecast = function (data) {
  this.data = data
}

Weather.Forecast.prototype.startAt = function () {
  return new Date(minBy(this.data.list, function (d) { return d.dt }).dt * 1000)
}

Weather.Forecast.prototype.endAt = function () {
  return new Date(maxBy(this.data.list, function (d) { return d.dt }).dt * 1000)
}

Weather.Forecast.prototype.day = function (date) {
  return new Weather.Forecast(this._filter(date))
}

Weather.Forecast.prototype.low = function () {
  if (this.data.list.length === 0) return

  var output = minBy(this.data.list, function (item) {
    return item.main.temp_min
  })

  return output.main.temp_min
}

Weather.Forecast.prototype.high = function () {
  if (this.data.list.length === 0) return

  var output = maxBy(this.data.list, function (item) {
    return item.main.temp_max
  })

  return output.main.temp_max
}

Weather.Forecast.prototype._filter = function (date) {
  return {
    list: this.data.list.filter(function (range) {
      var dateTimestamp = (range.dt * 1000)

      if (isOnDate(new Date(dateTimestamp), date)) {
        return range
      }
    })
  }
}

Weather.Current = function (data) {
  this.data = data
}

Weather.Current.prototype.temperature = function () {
  return this.data.list[0].main.temp
}

Weather.Current.prototype.conditions = function () {
  return this.data.list[0].weather[0].description
}

if (isModule) { module.exports = Weather }
else { window.Weather = Weather }