var isModule = typeof module !== "undefined" && module.exports;

if (isModule) {
  request = require('request');
  URL = require('url');
}

var Weather = { Utils: {} };

Weather.VERSION = "0.0.3";

var jsonp = Weather.Utils.jsonp = function (uri, callback) {
  return new Promise(function (resolve, reject) {
    var id = '_' + Math.round(10000 * Math.random());
    var callbackName = 'jsonp_callback_' + id;
    var el = (document.getElementsByTagName('head')[0] || document.body || document.documentElement);
    var script = document.createElement('script');
    var src = uri + '&callback=' + callbackName;

    window[callbackName] = function (data) {
      delete window[callbackName];
      var ele = document.getElementById(id);
      ele.parentNode.removeChild(ele);
      resolve(data);
    };

    script.src = src;
    script.id = id;
    script.addEventListener('error', reject);
    el.appendChild(script);
  });
};

Weather.setApiKey = function (apiKey) {
  Weather.APIKEY = apiKey;
};

Weather.getApiKey = function () {
  return Weather.APIKEY;
};

Weather.kelvinToFahrenheit = function (value) {
  return (this.kelvinToCelsius(value) * 1.8) + 32;
};

Weather.kelvinToCelsius = function (value) {
  return value - 273.15;
};

Weather.getCurrentByCityCountry = function (city, country, callback) {
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "," + encodeURIComponent(country) + "&cnt=1";

  if (Weather.APIKEY) {
    url = url + "&APPID=" + Weather.APIKEY;
  } else {
    console.log('WARNING: You must set an apiKey for openweathermap');
  }

  return this._getJSON(url, function (data) {
    callback(new Weather.Current(JSON.parse(data)));
  });
};

Weather.getCurrentByLatLon = function (lat, lon, callback) {
  var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon) + "&cnt=1";

  if (Weather.APIKEY) {
    url = url + "&APPID=" + Weather.APIKEY;
  } else {
    console.log('WARNING: You must set an apiKey for openweathermap');
  }

  return this._getJSON(url, function (data) {
    callback(new Weather.Current(JSON.parse(data)));
  });
};

Weather.getForecast = function (city, callback) {
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "&cnt=1";

  if (Weather.APIKEY) {
    url = url + "&APPID=" + Weather.APIKEY;
  } else {
    console.log('WARNING: You must set an apiKey for openweathermap');
  }

  return this._getJSON(url, function (data) {
    callback(new Weather.Forecast(data));
  });
};

Weather._getJSON = function (url, callback) {
  if (isModule) {
    request(url, function (error, response, body) {
      return callback(body);
    });
  } else {
    jsonp(url).then(callback);
  }
};

var maxBy = Weather.Utils.maxBy = function (list, iterator) {
  var max;
  var f = function (memo, d) {
    var val = iterator(d);

    if (memo === null || val > max) {
      max = val;
      memo = d;
    }

    return memo;
  };

  return list.reduce(f, null);
};

var minBy = Weather.Utils.minBy = function (list, iterator) {
  var min;
  var f = function (memo, d) {
    var val = iterator(d);

    if (memo === null || val < min) {
      min = val;
      memo = d;
    }

    return memo;
  };

  return list.reduce(f, null);
};

var isOnDate = Weather.Utils.isOnDate = function (a, b) {
  var sameYear = a.getYear() === b.getYear();
  var sameMonth = a.getMonth() === b.getMonth();
  var sameDate = a.getDate() === b.getDate();

  return sameYear && sameMonth && sameDate;
};

Weather.Forecast = function (data) {
  this.data = data;
};

Weather.Forecast.prototype.startAt = function () {
  return new Date(minBy(this.data.list, function (d) { return d.dt; }).dt * 1000);
};

Weather.Forecast.prototype.endAt = function () {
  return new Date(maxBy(this.data.list, function (d) { return d.dt; }).dt * 1000);
};

Weather.Forecast.prototype.day = function (date) {
  return new Weather.Forecast(this._filter(date));
};

Weather.Forecast.prototype.low = function () {
  if (this.data.list.length === 0) return;

  var output = minBy(this.data.list, function (item) {
    return item.main.temp_min;
  });

  return output.main.temp_min;
};

Weather.Forecast.prototype.high = function () {
  if (this.data.list.length === 0) return;

  var output = maxBy(this.data.list, function (item) {
    return item.main.temp_max;
  });

  return output.main.temp_max;
};

Weather.Forecast.prototype._filter = function (date) {
  return {
    list: this.data.list.filter(function (range) {
      var dateTimestamp = (range.dt * 1000);

      if (isOnDate(new Date(dateTimestamp), date)) {
        return range;
      }
    })
  };
};

Weather.Current = function (data) {
  this.data = data;
};

Weather.Current.prototype.temperature = function () {
  return this.data.list[0].main.temp;
};

Weather.Current.prototype.minTemperature = function () {
  return this.data.list[0].main.temp_min;
};

Weather.Current.prototype.maxTemperature = function () {
  return this.data.list[0].main.temp_max;
};

Weather.Current.prototype.pressure = function () {
  return this.data.list[0].main.pressure;
};

Weather.Current.prototype.humidity = function () {
  return this.data.list[0].main.humidity;
};

Weather.Current.prototype.conditions = function () {
  var conditions = this.data.list[0].weather;
  return conditions;
};

Weather.Current.prototype.conditionsDescription = function () {
  var conditions = this.data.list[0].weather;
  return conditions.map(function (condition) {
    return condition.description;
  });
};

Weather.Current.prototype.conditionsGroup = function () {
  var conditions = this.data.list[0].weather;
  return conditions.map(function (condition) {
    return condition.main;
  });
};

if (isModule) { module.exports = Weather; }
else { window.Weather = Weather; }
