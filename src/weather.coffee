isModule = (typeof module isnt "undefined" and module.exports)

if isModule
  http = require("http")
  URL = require('url')

maxBy = (list, iterator) ->
  max = null
  f = (memo, d) ->
    val = iterator(d)

    if memo == null or val > max
      max = val
      memo = d

    return memo

  list.reduce f, null

minBy = (list, iterator) ->
  min = null
  f = (memo, d) ->
    val = iterator(d)

    if memo == null or val < min
      min = val
      memo = d

    return memo

  list.reduce f, null

beginningOfDay = (date) ->
  if typeof date == 'number'
    date = new Date(date)

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date

endOfDay = (date) ->
  if typeof date == 'number'
    date = new Date(date)

  date.setHours(11)
  date.setMinutes(59)
  date.setSeconds(59)
  date.setMilliseconds(999)

  return date

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
    new Date(minBy(@data.list, (d) -> d.dt).dt * 1000)

  endAt: ->
    new Date(maxBy(@data.list, (d) -> d.dt).dt * 1000)

  day: (date) ->
    return new Weather.Forecast(@_filter(date))

  low: () ->
    return undefined unless @data.list.length > 0
    output = minBy @data.list, (item) ->
      item.main.temp_min

    output.main.temp_min

  high: () ->
    return undefined unless @data.list.length > 0
    output = maxBy @data.list, (item) ->
      item.main.temp_max

    output.main.temp_max

  #
  # Private Methods
  #

  _filter: (date) ->
    if date instanceof Date
      date = date.getTime()

    _beginningOfDay = beginningOfDay(date)
    _endOfDay = endOfDay(date)

    return {
      list: @data.list.filter (range) ->
        dateTimestamp = (range.dt * 1000)
        if dateTimestamp >= _beginningOfDay.getTime() and dateTimestamp <= _endOfDay.getTime()
          return range
    }

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
