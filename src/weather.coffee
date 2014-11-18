isModule = (typeof module isnt "undefined" and module.exports)

if isModule
  require('sugar')
  http = require("http")
  URL = require('url')

extend = (object, properties) ->
  for key, val of properties
    object[key] = val
  object

merge = (options, overrides) ->
  extend (extend {}, options), overrides

class Weather
  @VERSION: "0.1.0"
  @apiUrl: "http://api.openweathermap.org/data/2.5/"
  @imgUrl: "http://openweathermap.org/img/w/"
  @options = {}

  @kelvinToFahrenheit: (value) ->
    (@kelvinToCelsius(value) * 1.8) + 32

  @kelvinToCelsius: (value) ->
    value - 273.15

  @iconUrl: (icon) ->
    @imgUrl + icon + ".png"

  @byCity: (city) ->
    new Weather.Request({q: city})

  @byCityId: (cityId) ->
    new Weather.Request({id: cityId})

  @byLatLng: (latitude, longitude) ->
    new Weather.Request({lat: latitude, lon: longitude})

class Weather.Request
  constructor: (@options) ->

  getCurrent: (options = {}, callback) ->
    if typeof options is 'function'
      callback = options
      options = {}

    options = merge {cnt: 1}, @options, options
    getJSON "weather", options, (data) =>
      if typeof callback is 'function' then callback new Weather.Current(data)

  getForecast: (options = {}, callback) ->
    if typeof options is 'function'
      callback = options
      options = {}

    options = merge @options, options
    getJSON "forecast", options, (data) =>
      if typeof callback is 'function' then callback new Weather.Forecast(data)

  #
  # Private Methods
  #
  getJSON = (uri, options = {}, callback) ->
    if typeof options is 'function'
      callback = options
      options = {}

    options = merge Weather.options, options

    url = Weather.apiUrl + uri
    url += (if url.split('?')[1] then "&" else "?") + option + "=" + encodeURIComponent optionValue for option, optionValue of options

    if isModule
      http.get URL.parse(url), (response) ->
        callback(response.body)
    else
      xhr = $.ajax {url: url, dataType: "jsonp"}
      xhr.done callback
      xhr.fail (jqXHR) ->
        if console then console.error jqXHR

class Weather.Forecast
  constructor: (@data) ->

  startAt: ->
    new Date(@data.list.min('dt').dt * 1000)

  endAt: ->
    new Date(@data.list.max('dt').dt * 1000)

  day: (date) ->
    return new Weather.Forecast(@_filter(date))

  low: () ->
    return undefined unless @data.list.length > 0
    output = @data.list.min (item) ->
      item.main.temp_min

    output.main.temp_min

  high: () ->
    return undefined unless @data.list.length > 0
    output = @data.list.max (item) ->
      item.main.temp_max

    output.main.temp_max

  #
  # Private Methods
  #

  _filter: (date) ->
    if date instanceof Date
      date = date.getTime()

    clone = Object.clone(@data)
    beginningOfDay = Date.create(date).beginningOfDay()
    endOfDay = Date.create(date).endOfDay()

    clone.list = clone.list.findAll (range) ->
      dateTimestamp = (range.dt * 1000)
      if dateTimestamp >= beginningOfDay.getTime() and dateTimestamp <= endOfDay.getTime()
        return range

    return clone

class Weather.Current
  constructor: (@data) ->

  getConditions: () ->
    @data.weather[0].description

  getIcon: () ->
    Weather.iconUrl(@data.weather[0].icon);

if isModule
  module.exports = Weather
else
  window.Weather = Weather
