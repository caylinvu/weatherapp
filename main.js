/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');
const locationDisplay = document.querySelector('.location');
const localTimeDisplay = document.querySelector('.local-time');
const iconDisplay = document.querySelector('.icon');
const tempDisplay = document.querySelector('.temp');
const conditionDisplay = document.querySelector('.condition');
const feelsLikeDisplay = document.querySelector('.feels-like');
const highLowDisplay = document.querySelector('.high-low');
const rainDisplay = document.getElementById('rain');
const cloudDisplay = document.getElementById('cloud');
const visibilityDisplay = document.getElementById('visibility');
const windDisplay = document.getElementById('wind');
const humidityDisplay = document.getElementById('humidity');
const uvDisplay = document.getElementById('uv');
const sunriseDisplay = document.getElementById('sunrise');
const sunsetDisplay = document.getElementsByName('sunset');

// Fetch weather data from weather API
async function fetchData(location) {
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

// Return weather data object for specified location
function getWeatherData(location) {
    fetchData(location)
        .then(response => {
            const currentData = new Data(response);
            console.log(currentData);
            return(currentData);
        })
        .catch(error => {
            console.error(error)
        }
    );
}

// Display data
function displayData(data) {

}

// Initial display
getWeatherData('seattle');


// Search new location
submitBtn.addEventListener('click', (e) => {
    if (!searchForm.checkValidity()) {
        searchForm.reportValidity();
    } else {
        getWeatherData(searchInput.value);
        searchInput.value = '';
        e.preventDefault();
    }
});

/* 
TO DO
tie html elements to data

add UI to html elements

implement farhenheit to celsius toggle

add footer
*/
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1SUFBdUksU0FBUyxXQUFXLGFBQWE7QUFDeEs7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtJyk7XG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtaW5wdXQnKTtcbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtYnRuJyk7XG5jb25zdCBsb2NhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcbmNvbnN0IGxvY2FsVGltZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYWwtdGltZScpO1xuY29uc3QgaWNvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbicpO1xuY29uc3QgdGVtcERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcCcpO1xuY29uc3QgY29uZGl0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24nKTtcbmNvbnN0IGZlZWxzTGlrZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHMtbGlrZScpO1xuY29uc3QgaGlnaExvd0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlnaC1sb3cnKTtcbmNvbnN0IHJhaW5EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhaW4nKTtcbmNvbnN0IGNsb3VkRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG91ZCcpO1xuY29uc3QgdmlzaWJpbGl0eURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaWJpbGl0eScpO1xuY29uc3Qgd2luZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZCcpO1xuY29uc3QgaHVtaWRpdHlEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG5jb25zdCB1dkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXYnKTtcbmNvbnN0IHN1bnJpc2VEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bnJpc2UnKTtcbmNvbnN0IHN1bnNldERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnc3Vuc2V0Jyk7XG5cbi8vIEZldGNoIHdlYXRoZXIgZGF0YSBmcm9tIHdlYXRoZXIgQVBJXG5hc3luYyBmdW5jdGlvbiBmZXRjaERhdGEobG9jYXRpb24pIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24mZm9yZWNhc3QuanNvbj9rZXk9Y2Q3N2E1NzdmNDM0NGI5NDljMDIwNTM0MDIzMTUwNSZxPSR7bG9jYXRpb259JmRheXM9OGAsIHttb2RlOiAnY29ycyd9KTtcbiAgICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbiAgICAgICAgcmV0dXJuKHdlYXRoZXJEYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9ICAgIFxufVxuXG4vLyBQcm9jZXNzIHRoZSBqc29uIGRhdGEgZnJvbSBBUEkgYW5kIHJldHVybiBvYmplY3Qgd2l0aCBvbmx5IHJlcXVpcmVkIGRhdGFcbmZ1bmN0aW9uIERhdGEoZGF0YSkge1xuICAgIHRoaXMubG9jYXRpb24gPSBkYXRhLmxvY2F0aW9uLm5hbWU7XG4gICAgdGhpcy5yZWdpb24gPSBkYXRhLmxvY2F0aW9uLnJlZ2lvbjtcbiAgICB0aGlzLmNvdW50cnkgPSBkYXRhLmxvY2F0aW9uLmNvdW50cnk7XG4gICAgdGhpcy5sb2NhbFRpbWUgPSBkYXRhLmxvY2F0aW9uLmxvY2FsdGltZTtcbiAgICB0aGlzLnRlbXBfZiA9IGRhdGEuY3VycmVudC50ZW1wX2Y7XG4gICAgdGhpcy50ZW1wX2MgPSBkYXRhLmN1cnJlbnQudGVtcF9jO1xuICAgIHRoaXMuaWNvbiA9IGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbjtcbiAgICB0aGlzLmNvbmRpdGlvbiA9IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dDtcbiAgICB0aGlzLmZlZWxzbGlrZV9mID0gZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mO1xuICAgIHRoaXMuZmVlbHNsaWtlX2MgPSBkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2M7XG4gICAgdGhpcy5odW1pZGl0eSA9IGRhdGEuY3VycmVudC5odW1pZGl0eTtcbiAgICB0aGlzLnV2ID0gZGF0YS5jdXJyZW50LnV2O1xuICAgIHRoaXMuY2xvdWQgPSBkYXRhLmN1cnJlbnQuY2xvdWQ7XG4gICAgdGhpcy53aW5kX21waCA9IGRhdGEuY3VycmVudC53aW5kX21waDtcbiAgICB0aGlzLndpbmRfa3BoID0gZGF0YS5jdXJyZW50LndpbmRfa3BoO1xuICAgIHRoaXMudmlzX21pbGVzID0gZGF0YS5jdXJyZW50LnZpc19taWxlcztcbiAgICB0aGlzLnZpc19rbSA9IGRhdGEuY3VycmVudC52aXNfa207XG4gICAgdGhpcy5zdW5yaXNlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5yaXNlO1xuICAgIHRoaXMuc3Vuc2V0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5zZXQ7XG4gICAgdGhpcy5yYWluID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XG4gICAgdGhpcy5taW50ZW1wX2YgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2Y7XG4gICAgdGhpcy5tYXh0ZW1wX2YgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2Y7XG4gICAgdGhpcy5taW50ZW1wX2MgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2M7XG4gICAgdGhpcy5tYXh0ZW1wX2MgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2M7XG59XG5cbi8vIFJldHVybiB3ZWF0aGVyIGRhdGEgb2JqZWN0IGZvciBzcGVjaWZpZWQgbG9jYXRpb25cbmZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gICAgZmV0Y2hEYXRhKGxvY2F0aW9uKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0YSA9IG5ldyBEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnREYXRhKTtcbiAgICAgICAgICAgIHJldHVybihjdXJyZW50RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICB9XG4gICAgKTtcbn1cblxuLy8gRGlzcGxheSBkYXRhXG5mdW5jdGlvbiBkaXNwbGF5RGF0YShkYXRhKSB7XG5cbn1cblxuLy8gSW5pdGlhbCBkaXNwbGF5XG5nZXRXZWF0aGVyRGF0YSgnc2VhdHRsZScpO1xuXG5cbi8vIFNlYXJjaCBuZXcgbG9jYXRpb25cbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKCFzZWFyY2hGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICBzZWFyY2hGb3JtLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2V0V2VhdGhlckRhdGEoc2VhcmNoSW5wdXQudmFsdWUpO1xuICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufSk7XG5cbi8qIFxuVE8gRE9cbnRpZSBodG1sIGVsZW1lbnRzIHRvIGRhdGFcblxuYWRkIFVJIHRvIGh0bWwgZWxlbWVudHNcblxuaW1wbGVtZW50IGZhcmhlbmhlaXQgdG8gY2Vsc2l1cyB0b2dnbGVcblxuYWRkIGZvb3RlclxuKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=