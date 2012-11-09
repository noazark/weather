isModule = (typeof module !== "undefined" && module.exports)

if(isModule) {
  require('mocha')
  expect = require('expect.js')
  Weather = require('../../weather')
  nock = require('nock')
  nock('http://openweathermap.org')
    .filteringPath(/q=[^&]*/g, 'q=Kansas%20City')
    .get('/data/2.1/find/city?q=Kansas%20City&cnt=1')
    .reply(200);
}

var current;

describe("Current", function() {
  before(function () {
    if(!isModule) {
      $.mockjax({
        log: null,
        url: 'http://openweathermap.org/data/2.1/find/city?*',
        status: 200,
        response: function(request) {
          //trigger callback... because it's JSONP
          request.success();
        }
      });
    }

    current = new Weather.Current(
      {
        list: [
          {
            main: {
              temp: 290.88,
              temp_min: 289.82,
              temp_max: 294.82
            },
            weather: [
              {
                main: "Clear",
                description: "sky is clear"
              }
            ]
          }
        ]
      }
    );
  });

  after(function () {
    if(!isModule) {
      $.mockjaxClear();
    }
  });

  it("creates `Current` weather conditions", function(done) {
    Weather.getCurrent('Kansas City', function(current) {
      expect(current).to.be.a(Weather.Current)
      done();
    });
  });

  describe("temperature", function() {
    it("temperature", function() {
      expect(current.temperature()).to.eql('290.88');
    });
  });

  describe("conditions", function() {
    it("conditions", function() {
      expect(current.conditions()).to.eql('sky is clear');
    });
  });
}); 