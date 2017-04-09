isModule = (typeof module !== "undefined" && module.exports)

if(isModule) {
  expect = require('expect.js')
  sinon = require('sinon')
  Weather = require('../lib/weather')
}

var current;
var myAPIKey = 'sdaqkj210982hkd96akj21987skjggha'; // put your own apikey here. This one is invalid

describe("Current", function() {
  before(function () {
    sinon.stub(Weather, '_getJSON', function (url, callback) {
      callback('{}')
    })
  })

  before(function () {
    Weather.setApiKey(myAPIKey);
    current = new Weather.Current({
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
    })
  });

  after(function () {
    Weather._getJSON.restore()
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
