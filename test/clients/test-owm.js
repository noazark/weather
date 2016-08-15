import Client, {
  endsAt,
  high,
  lat,
  latlon,
  lon,
  low,
  startsAt,
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
    it('gets the current high temperature', function () {
      assert.equal(high(currentResponseJSON), 305.93);
    });

    it('gets the forecasted high temperature', function () {
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
    it('gets the current low temperature', function () {
      assert.equal(low(currentResponseJSON), 302.59);
    });

    it('gets the forecasted low temperature', function () {
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
    it('gets the current temperature');
    it('throws an error if the resource does not have a temperature');
  });
});
