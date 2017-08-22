const _ = require('lodash');
const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=<your_api_key>';

const kelvinToF = (kelvin) => {
  return Math.round((kelvin - 273.15) * 1.8 +32) + ' °F';
}

const kelvinToC = (kelvin) => {
  return Math.round(kelvin - 273.15) + ' °C';
}

module.exports = (latitude, longitude) => {
  const url = `${rootUrl}&lat=${latitude}&lon=${longitude}`

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return {
        city: json.name,
        temperature: kelvinToC(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    });
}
