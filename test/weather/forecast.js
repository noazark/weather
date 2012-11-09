isModule = (typeof module !== "undefined" && module.exports)

if(isModule) {
  require('mocha')
  expect = require('expect.js')
  Weather = require('../../weather')
  nock = require('nock')
  nock('http://openweathermap.org')
    .filteringPath(/q=[^&]*/g, 'q=Kansas%20City')
    .get('/data/2.1/forecast/city?q=Kansas%20City&cnt=1')
    .reply(200);
}

var forecast;

describe("Forecast", function() {
  beforeEach(function() {
    if(!isModule) {
      $.mockjax({
        log: null,
        url: 'http://openweathermap.org/data/2.1/forecast/city?*',
        status: 200,
        response: function(request) {
          //trigger callback... because it's JSONP
          request.success()
        }
      });
    }

    forecast = new Weather.Forecast({
      list: [
        {
          dt: Date.create('today').getTime() / 1000,
          main: {
            temp_min: 200,
            temp_max: 230
          }
        },
        {
          dt: Date.create('tomorrow').getTime() / 1000,
          main: {
            temp_min: 210,
            temp_max: 220
          }
        }
      ]
    });
  });

  after(function() {
    if(!isModule) {
      $.mockjaxClear();
    }
  })

  it("creates a `Forecast`", function(done) {
    Weather.getForecast('Kansas City', function(forecast) {
      expect(forecast).to.be.a(Weather.Forecast)
      done();
    });
  });

  describe("high", function() {
    it("returns highest temperature in the forecast", function() {
      expect(forecast.high()).to.equal(230);
    });    
  });

  describe("low", function() {
    it("returns lowest temperature in the forecast", function() {
      expect(forecast.low()).to.equal(200);
    });
  });

  describe("startAt", function() {
    it("gets the earliest forcasted time", function() {
      expect(forecast.startAt()).to.eql(Date.create('today'));
    });
  });

  describe("endAt", function(){
    it("gets the latest forcasted time", function() {
      expect(forecast.endAt()).to.eql(Date.create('tomorrow'));
    });
  });

  describe("day", function() {
    it("date", function() {
      expect(forecast.day(0)).to.be.a(Weather.Forecast)
    });

    it("number", function() {
      expect(forecast.day(Date.create('tomorrow'))).to.be.a(Weather.Forecast)
    });

    it("filters the extended forecast to a single day", function() {
      expect(forecast.day(Date.create('tomorrow')).data).to.eql({
        list: [
          {
            dt: Date.create('tomorrow').getTime()/1000,
            main: {
              temp_min: 210,
              temp_max: 220
            }
          }
        ]
      })
    });
  })

});