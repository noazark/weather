isModule = (typeof module !== "undefined" && module.exports)

if(isModule) {
  Weather = require('../lib/weather')
}

describe("Converters", function() {
  it("kelvin to fahrenheit", function() {
    expect(Weather.kelvinToFahrenheit(295.372).toFixed()).to.eql(72);
  });

  it("kelvin to celsius", function() {
    expect(Weather.kelvinToCelsius(373.15).toFixed()).to.eql(100);
  });
});
