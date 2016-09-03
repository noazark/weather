import Client, {
  endsAt,
  high,
  lat,
  latlon,
  lon,
  low,
  startsAt,
  temperature,
  utils,
} from '../../clients/owm';
import {response as currentResponse} from './fixtures/get-current';
import {response as forecastResponse} from './fixtures/get-forecast';
import sinon from 'sinon';

const currentResponseJSON = JSON.parse(currentResponse);
const forecastResponseJSON = JSON.parse(forecastResponse);

describe('OpenWeatherMap#getForecast', function() {
  before(function () {
    this.client = new Client({appid: 123});
  });

  describe('#getCurrent', function () {
    before(function () {
      this.jsonp = sinon.stub(utils, 'jsonp', function () {
        return new Promise((resolve) => resolve(currentResponse));
      });
    });

    after(function () {
      this.jsonp.restore();
    });

    it('makes a request to OWM for the latest conditions', function() {
      let url = 'http://api.openweathermap.org/data/2.5/weather?q=Guntersville&appid=123';
      return this.client.getCurrent('Guntersville')
        .then(() => {
          sinon.assert.calledWith(this.jsonp, url);
        });
    });

    it('parses a JSON response into an object', function () {
      return this.client.getCurrent()
        .then((data) => {
          assert.isObject(data);
          assert.equal(data.id, 4065649);
        });
    });
  });

  describe('#getForecast', function () {
    before(function () {
      this.jsonp = sinon.stub(utils, 'jsonp', function () {
        return new Promise((resolve) => resolve(forecastResponse));
      });
    });

    after(function () {
      this.jsonp.restore();
    });

    it('makes a request to OWM for the latest forecast', function() {
      let url = 'http://api.openweathermap.org/data/2.5/forecast?q=Guntersville&appid=123';
      return this.client.getForecast('Guntersville')
      .then(() => {
        sinon.assert.calledWith(this.jsonp, url);
      });
    });

    it('parses a JSON response into an object', function () {
      return this.client.getCurrent()
      .then((data) => {
        assert.isObject(data);
        assert.equal(data.city.id, 4065649);
      });
    });
  });

  describe('endsAt', function () {
    it('gets the ending time of the current report', function () {
      assert.deepEqual(endsAt(currentResponseJSON), new Date(1471114235000));
    });

    it('gets the ending time of forecasted report', function () {
      assert.deepEqual(endsAt(forecastResponseJSON), new Date(1471554000000));
    });
  });

  describe('high', function () {
    it('throws an error if the resource does not have a high', function () {
      assert.throws(() => {
        high(currentResponseJSON);
      });
    });

    it('gets the forecast high temperature', function () {
      assert.equal(high(forecastResponseJSON), 304.121);
    });
  });

  describe('lat', function () {
    it('gets the latitude of the current report', function () {
      assert.equal(lat(currentResponseJSON), 34.36);
    });
    it('gets the latitude of the forecast report', function () {
      assert.equal(lat(forecastResponseJSON), 34.35815);
    });
  });

  describe('latlon', function () {
    it('gets the latitude and longitude of the current report', function () {
      assert.deepEqual(latlon(currentResponseJSON), [34.36, -86.29]);
    });
    it('gets the latitude and longitude of the forecast report', function () {
      assert.deepEqual(latlon(forecastResponseJSON), [34.35815, -86.294701]);
    });
  });

  describe('lon', function () {
    it('gets the longitude of the current report', function () {
      assert.equal(lon(currentResponseJSON), -86.29);
    });
    it('gets the longitude of the forecast report', function () {
      assert.equal(lon(forecastResponseJSON), -86.294701);
    });
  });

  describe('low', function () {
    it('throws an error if the resource does not have a low', function () {
      assert.throws(() => {
        low(currentResponseJSON);
      });
    });

    it('gets the forecast low temperature', function () {
      assert.equal(low(forecastResponseJSON), 293.725);
    });
  });

  describe('startsAt', function () {
    it('gets the starting time of the current report', function () {
      assert.deepEqual(startsAt(currentResponseJSON), new Date(1471114235000));
    });

    it('gets the starting time of forecasted report', function () {
      assert.deepEqual(startsAt(forecastResponseJSON), new Date(1471154400000));
    });
  });

  describe('temperature', function () {
    it('gets the current temperature', function () {
      assert.equal(temperature(currentResponseJSON), 304.06);
    });

    it('throws an error if the resource does not have a temperature', function () {
      assert.deepEqual(temperature(forecastResponseJSON), [296.53,296.27,296.95,298.95,301.871,303.501,301.717,299.639,298.069,296.569,296.227,301.539,304.121,303.271,301.579,300.372,299.406,299.18,298.679,299.781,300.356,301.481,298.981,296.499,295.246,293.725,294.236,296.594,297.959,297.92,296.823,294.697,293.958,294.552,294.052,295.594,299.799,301.286]);
    });
  });
});
