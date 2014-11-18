isModule = (typeof module !== "undefined" && module.exports)

if(isModule) {
  require('mocha')
  expect = require('expect.js')
  Weather = require('../../weather')
  nock = require('nock')
  nock('http://api.openweathermap.org')
    .filteringPath(/q=[^&]*/g, 'q=Kansas%20City')
    .get('/data/2.5/find?q=Kansas%20City')
    .reply(200);
}

var current;

describe("Current", function() {
  before(function () {
    if(!isModule) {
      $.mockjax({
        log: null,
        url: 'http://api.openweathermap.org/data/2.5/find?*',
        status: 200,
        response: function(request) {
          //trigger callback... because it's JSONP
          request.success && request.success();
        }
      });
    }

    current = new Weather.Current(
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
    );
  });

  after(function () {
    if(!isModule) {
      $.mockjaxClear();
    }
  });

  it("creates `Current` weather conditions", function(done) {
    Weather.byCity('Kansas City').getCurrent(function(current) {
      expect(current).to.be.a(Weather.Current)
      done();
    });
  });

  describe("getConditions", function() {
    it("getConditions", function() {
      expect(current.getConditions()).to.eql('sky is clear');
    });
  });
}); 
