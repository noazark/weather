import {getCurrent, utils} from '../../clients/owm';
import {response} from './fixtures/get-current';
import sinon from 'sinon';

describe('OpenWeatherMap#getCurrent', function() {
  before(function () {
    this.jsonp = sinon.stub(utils, 'jsonp', function () {
      return new Promise((resolve) => resolve(response));
    });
  });

  after(function () {
    this.jsonp.restore();
  });

  it('makes a request to OWM for the latest conditions', function() {
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=Guntersville';
    return getCurrent('Guntersville')
      .then(() => {
        sinon.assert.calledWith(this.jsonp, url);
      });
  });
});
