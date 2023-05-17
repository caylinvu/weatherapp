/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// Fetch weather data from weather API
async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json&forecast.json?key=cd77a577f4344b949c0205340231505&q=${location}&days=8`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
        return(weatherData);
    } catch (error) {
        console.error(error);
    }    
}

// Process the json data from API and return object with only required data
function Data(data) {
    this.location = data.location.name;
    this.region = data.location.region;
    this.country = data.location.country;
    this.localTime = data.location.localtime;
    this.temp_f = data.current.temp_f;
    this.temp_c = data.current.temp_c;
    this.icon = data.current.condition.icon;
    this.condition = data.current.condition.text;
    this.feelslike_f = data.current.feelslike_f;
    this.feelslike_c = data.current.feelslike_c;
    this.humidity = data.current.humidity;
    this.uv = data.current.uv;
    this.cloud = data.current.cloud;
    this.wind_mph = data.current.wind_mph;
    this.wind_kph = data.current.wind_kph;
    this.vis_miles = data.current.vis_miles;
    this.vis_km = data.current.vis_km;
    this.sunrise = data.forecast.forecastday[0].astro.sunrise;
    this.sunset = data.forecast.forecastday[0].astro.sunset;
    this.rain = data.forecast.forecastday[0].day.daily_chance_of_rain;
    this.mintemp_f = data.forecast.forecastday[0].day.mintemp_f;
    this.maxtemp_f = data.forecast.forecastday[0].day.maxtemp_f;
    this.mintemp_c = data.forecast.forecastday[0].day.mintemp_c;
    this.maxtemp_c = data.forecast.forecastday[0].day.maxtemp_c;
}

// Display data
function displayData(data) {
    
}

getWeatherData('fayetteville')
    .then(response => {
        const currentData = new Data(response);
        console.log(currentData);
        return(currentData);
    })
    .catch(error => {
        console.error(error)
    });

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHVJQUF1SSxTQUFTLFdBQVcsYUFBYTtBQUN4SztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGZXRjaCB3ZWF0aGVyIGRhdGEgZnJvbSB3ZWF0aGVyIEFQSVxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24mZm9yZWNhc3QuanNvbj9rZXk9Y2Q3N2E1NzdmNDM0NGI5NDljMDIwNTM0MDIzMTUwNSZxPSR7bG9jYXRpb259JmRheXM9OGAsIHttb2RlOiAnY29ycyd9KTtcbiAgICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgICAgICAgcmV0dXJuKHdlYXRoZXJEYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9ICAgIFxufVxuXG4vLyBQcm9jZXNzIHRoZSBqc29uIGRhdGEgZnJvbSBBUEkgYW5kIHJldHVybiBvYmplY3Qgd2l0aCBvbmx5IHJlcXVpcmVkIGRhdGFcbmZ1bmN0aW9uIERhdGEoZGF0YSkge1xuICAgIHRoaXMubG9jYXRpb24gPSBkYXRhLmxvY2F0aW9uLm5hbWU7XG4gICAgdGhpcy5yZWdpb24gPSBkYXRhLmxvY2F0aW9uLnJlZ2lvbjtcbiAgICB0aGlzLmNvdW50cnkgPSBkYXRhLmxvY2F0aW9uLmNvdW50cnk7XG4gICAgdGhpcy5sb2NhbFRpbWUgPSBkYXRhLmxvY2F0aW9uLmxvY2FsdGltZTtcbiAgICB0aGlzLnRlbXBfZiA9IGRhdGEuY3VycmVudC50ZW1wX2Y7XG4gICAgdGhpcy50ZW1wX2MgPSBkYXRhLmN1cnJlbnQudGVtcF9jO1xuICAgIHRoaXMuaWNvbiA9IGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbjtcbiAgICB0aGlzLmNvbmRpdGlvbiA9IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dDtcbiAgICB0aGlzLmZlZWxzbGlrZV9mID0gZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mO1xuICAgIHRoaXMuZmVlbHNsaWtlX2MgPSBkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2M7XG4gICAgdGhpcy5odW1pZGl0eSA9IGRhdGEuY3VycmVudC5odW1pZGl0eTtcbiAgICB0aGlzLnV2ID0gZGF0YS5jdXJyZW50LnV2O1xuICAgIHRoaXMuY2xvdWQgPSBkYXRhLmN1cnJlbnQuY2xvdWQ7XG4gICAgdGhpcy53aW5kX21waCA9IGRhdGEuY3VycmVudC53aW5kX21waDtcbiAgICB0aGlzLndpbmRfa3BoID0gZGF0YS5jdXJyZW50LndpbmRfa3BoO1xuICAgIHRoaXMudmlzX21pbGVzID0gZGF0YS5jdXJyZW50LnZpc19taWxlcztcbiAgICB0aGlzLnZpc19rbSA9IGRhdGEuY3VycmVudC52aXNfa207XG4gICAgdGhpcy5zdW5yaXNlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5yaXNlO1xuICAgIHRoaXMuc3Vuc2V0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5zZXQ7XG4gICAgdGhpcy5yYWluID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XG4gICAgdGhpcy5taW50ZW1wX2YgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2Y7XG4gICAgdGhpcy5tYXh0ZW1wX2YgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2Y7XG4gICAgdGhpcy5taW50ZW1wX2MgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2M7XG4gICAgdGhpcy5tYXh0ZW1wX2MgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2M7XG59XG5cbi8vIERpc3BsYXkgZGF0YVxuZnVuY3Rpb24gZGlzcGxheURhdGEoZGF0YSkge1xuICAgIFxufVxuXG5nZXRXZWF0aGVyRGF0YSgnZmF5ZXR0ZXZpbGxlJylcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRhID0gbmV3IERhdGEocmVzcG9uc2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RGF0YSk7XG4gICAgICAgIHJldHVybihjdXJyZW50RGF0YSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIH0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9