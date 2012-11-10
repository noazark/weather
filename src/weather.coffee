isModule = (typeof module isnt "undefined" and module.exports)

if isModule
  require('sugar')
  http = require("http")
  URL = require('url')

class Weather
  @VERSION: "0.0.2"

  @kelvinToFahrenheit: (value) ->
    (@kelvinToCelsius(value) * 1.8) + 32

  @kelvinToCelsius: (value) ->
    value - 273.15

  @getCurrent: (city, callback) ->
    @_getJSON "http://openweathermap.org/data/2.1/find/city?q=#{encodeURIComponent city}&cnt=1", (data) =>
      callback new Weather.Current(data)

  @getForecast: (city, callback) ->
    @_getJSON "http://openweathermap.org/data/2.1/forecast/city?q=#{encodeURIComponent city}&cnt=1", (data) =>
      callback new Weather.Forecast(data)

  #
  # Private Methods
  #

  @_getJSON: (url, callback) ->
    if isModule
      http.get URL.parse(url), (response) ->
        callback(response.body)
    else
      $.ajax
        url: url,
        dataType: "jsonp"
        success: callback

class Weather.Forecast
  constructor: (data) ->
    @data = data

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
  constructor: (data) ->
    @data = data

  temperature: () ->
    temperature = @data.list[0].main.temp

  conditions: () ->
    @data.list[0].weather[0].description

if isModule
  module.exports = Weather
else
  window.Weather = Weather