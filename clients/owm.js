export const utils = {
  jsonp(uri) {
    return new Promise(function (resolve, reject) {
      let id = `_${Math.round(10000 * Math.random())}`;
      let callbackName = `jsonp_callback_${id}`;
      let el = (document.getElementsByTagName('head')[0] || document.body || document.documentElement);
      let script = document.createElement('script');
      let src = uri + '&callback=' + callbackName;

      window[callbackName] = function(data){
        delete window[callbackName];
        let el = document.getElementById(id);
        el.parentNode.removeChild(el);
        resolve(data);
      };

      script.src = src;
      script.id = id;
      script.addEventListener('error', () => reject(new Error('Request failed')));
      el.appendChild(script);
    });
  }
};

export class Client {
  constructor(options) {
    this.baseUrl = options.baseUrl || 'http://api.openweathermap.org/data/2.5';
    this.appid = options.appid;
  }

  _getJSON(url) {
    return utils.jsonp(url)
      .then((response) => JSON.parse(response));
  }

  getCurrent(city) {
    let url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(this.appid)}`;

    return this._getJSON(url);
  }

  getForecast(city) {
    let url = `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(this.appid)}`;

    return this._getJSON(url);
  }
}
