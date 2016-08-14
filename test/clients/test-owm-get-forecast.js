import {Client, utils} from '../../clients/owm';
import {response} from './fixtures/get-forecast';
import sinon from 'sinon';

describe('OpenWeatherMap#getForecast', function() {
  before(function () {
    this.client = new Client({appid: 123});
    this.jsonp = sinon.stub(utils, 'jsonp', function () {
      return new Promise((resolve) => resolve(response));
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
