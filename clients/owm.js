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

export function getCurrent(city) {
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city);

  return utils.jsonp(url);
}

export function getForecast(city) {
  let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + encodeURIComponent(city);

  return utils.jsonp(url);
}
