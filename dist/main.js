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
const sunsetDisplay = document.getElementById('sunset');
const celBtn = document.getElementById('cel-btn');
const farBtn = document.getElementById('far-btn');
let unitType = 'far';
let temp = '';
let feelsLike = '';
let wind = '';
let vis = '';
let mintemp = '';
let maxtemp = '';

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
    this.temp_f = Math.round(data.current.temp_f);
    this.temp_c = Math.round(data.current.temp_c);
    this.icon = data.current.condition.icon;
    this.condition = data.current.condition.text;
    this.feelslike_f = Math.round(data.current.feelslike_f);
    this.feelslike_c = Math.round(data.current.feelslike_c);
    this.humidity = data.current.humidity;
    this.uv = data.current.uv;
    this.cloud = data.current.cloud;
    this.wind_mph = Math.round(data.current.wind_mph);
    this.wind_kph = Math.round(data.current.wind_kph);
    this.vis_miles = Math.round(data.current.vis_miles);
    this.vis_km = Math.round(data.current.vis_km);
    this.sunrise = data.forecast.forecastday[0].astro.sunrise;
    this.sunset = data.forecast.forecastday[0].astro.sunset;
    this.rain = data.forecast.forecastday[0].day.daily_chance_of_rain;
    this.mintemp_f = Math.round(data.forecast.forecastday[0].day.mintemp_f);
    this.maxtemp_f = Math.round(data.forecast.forecastday[0].day.maxtemp_f);
    this.mintemp_c = Math.round(data.forecast.forecastday[0].day.mintemp_c);
    this.maxtemp_c = Math.round(data.forecast.forecastday[0].day.maxtemp_c);
}

// Return weather data object for specified location
function getWeatherData(location) {
    fetchData(location)
        .then(response => {
            const currentData = new Data(response);
            console.log(currentData);
            return(currentData);
        })
        .then(response => {
            displayData(response);

            celBtn.addEventListener('click', () => {
                farBtn.classList.remove('selected');
                celBtn.classList.add('selected');
                unitType = 'cel';
                console.log(unitType);
                displayData(response);
            });
            
            farBtn.addEventListener('click', () => {
                celBtn.classList.remove('selected');
                farBtn.classList.add('selected');
                unitType = 'far';
                console.log(unitType);
                displayData(response);
            });
        })
        .catch(error => {
            console.error(error)
        }
    );
}

// Display data
function displayData(data) {
    if (unitType == 'far') {
        temp = data.temp_f;
        feelsLike = data.feelslike_f;
        maxtemp = data.maxtemp_f;
        mintemp = data.mintemp_f;
        vis = `${data.vis_miles  }m`;
        wind = `${data.wind_mph  }mph`;
    } else if (unitType == 'cel') {
        temp = data.temp_c;
        feelsLike = data.feelslike_c;
        maxtemp = data.maxtemp_c;
        mintemp = data.mintemp_c;
        vis = `${data.vis_km  }km`;
        wind = `${data.wind_kph  }kph`;
    }

    locationDisplay.textContent = `${data.location}, ${data.country}`;
    localTimeDisplay.textContent = data.localTime;
    iconDisplay.src = data.icon;
    tempDisplay.textContent = `${temp}°`;
    conditionDisplay.textContent = data.condition;
    feelsLikeDisplay.textContent = `Feels like ${feelsLike}°`;
    highLowDisplay.textContent = `H: ${maxtemp}° L: ${mintemp}°`;
    rainDisplay.textContent = `${data.rain}%`;
    cloudDisplay.textContent = `${data.cloud}%`;
    visibilityDisplay.textContent = vis;
    windDisplay.textContent = wind;
    humidityDisplay.textContent = `${data.humidity}%`;
    uvDisplay.textContent = data.uv;
    sunriseDisplay.textContent = data.sunrise;
    sunsetDisplay.textContent = data.sunset;
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

add UI to html elements

clean up input formatting (date/time, country shown)

maybe find different icons?????

format h/l better (add space in between???)

add hourly/daily info

remove leading 0 on sunrise/sunset

handle errors

add loading icon

add footer
 */
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1SUFBdUksU0FBUyxXQUFXLGFBQWE7QUFDeEs7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDLGtCQUFrQixnQkFBZ0I7QUFDbEMsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGNBQWM7QUFDL0Isa0JBQWtCLGdCQUFnQjtBQUNsQzs7QUFFQSxxQ0FBcUMsY0FBYyxJQUFJLGFBQWE7QUFDcEU7QUFDQTtBQUNBLGlDQUFpQyxLQUFLO0FBQ3RDO0FBQ0EsaURBQWlELFVBQVU7QUFDM0QsdUNBQXVDLFFBQVEsT0FBTyxRQUFRO0FBQzlELGlDQUFpQyxVQUFVO0FBQzNDLGtDQUFrQyxXQUFXO0FBQzdDO0FBQ0E7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWZvcm0nKTtcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpO1xuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1idG4nKTtcbmNvbnN0IGxvY2F0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbicpO1xuY29uc3QgbG9jYWxUaW1lRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhbC10aW1lJyk7XG5jb25zdCBpY29uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pY29uJyk7XG5jb25zdCB0ZW1wRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJyk7XG5jb25zdCBjb25kaXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbicpO1xuY29uc3QgZmVlbHNMaWtlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVscy1saWtlJyk7XG5jb25zdCBoaWdoTG93RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoLWxvdycpO1xuY29uc3QgcmFpbkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFpbicpO1xuY29uc3QgY2xvdWREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3VkJyk7XG5jb25zdCB2aXNpYmlsaXR5RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpYmlsaXR5Jyk7XG5jb25zdCB3aW5kRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kJyk7XG5jb25zdCBodW1pZGl0eURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbmNvbnN0IHV2RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1dicpO1xuY29uc3Qgc3VucmlzZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VucmlzZScpO1xuY29uc3Qgc3Vuc2V0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW5zZXQnKTtcbmNvbnN0IGNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWwtYnRuJyk7XG5jb25zdCBmYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFyLWJ0bicpO1xubGV0IHVuaXRUeXBlID0gJ2Zhcic7XG5sZXQgdGVtcCA9ICcnO1xubGV0IGZlZWxzTGlrZSA9ICcnO1xubGV0IHdpbmQgPSAnJztcbmxldCB2aXMgPSAnJztcbmxldCBtaW50ZW1wID0gJyc7XG5sZXQgbWF4dGVtcCA9ICcnO1xuXG4vLyBGZXRjaCB3ZWF0aGVyIGRhdGEgZnJvbSB3ZWF0aGVyIEFQSVxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKGxvY2F0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uJmZvcmVjYXN0Lmpzb24/a2V5PWNkNzdhNTc3ZjQzNDRiOTQ5YzAyMDUzNDAyMzE1MDUmcT0ke2xvY2F0aW9ufSZkYXlzPThgLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgICAgIHJldHVybih3ZWF0aGVyRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSAgICBcbn1cblxuLy8gUHJvY2VzcyB0aGUganNvbiBkYXRhIGZyb20gQVBJIGFuZCByZXR1cm4gb2JqZWN0IHdpdGggb25seSByZXF1aXJlZCBkYXRhXG5mdW5jdGlvbiBEYXRhKGRhdGEpIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICAgIHRoaXMucmVnaW9uID0gZGF0YS5sb2NhdGlvbi5yZWdpb247XG4gICAgdGhpcy5jb3VudHJ5ID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5O1xuICAgIHRoaXMubG9jYWxUaW1lID0gZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWU7XG4gICAgdGhpcy50ZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2YpO1xuICAgIHRoaXMudGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9jKTtcbiAgICB0aGlzLmljb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb247XG4gICAgdGhpcy5jb25kaXRpb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG4gICAgdGhpcy5mZWVsc2xpa2VfZiA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mKTtcbiAgICB0aGlzLmZlZWxzbGlrZV9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MpO1xuICAgIHRoaXMuaHVtaWRpdHkgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHk7XG4gICAgdGhpcy51diA9IGRhdGEuY3VycmVudC51djtcbiAgICB0aGlzLmNsb3VkID0gZGF0YS5jdXJyZW50LmNsb3VkO1xuICAgIHRoaXMud2luZF9tcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX21waCk7XG4gICAgdGhpcy53aW5kX2twaCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LndpbmRfa3BoKTtcbiAgICB0aGlzLnZpc19taWxlcyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnZpc19taWxlcyk7XG4gICAgdGhpcy52aXNfa20gPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfa20pO1xuICAgIHRoaXMuc3VucmlzZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZTtcbiAgICB0aGlzLnN1bnNldCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0O1xuICAgIHRoaXMucmFpbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICAgIHRoaXMubWludGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2YpO1xuICAgIHRoaXMubWF4dGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2YpO1xuICAgIHRoaXMubWludGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2MpO1xuICAgIHRoaXMubWF4dGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2MpO1xufVxuXG4vLyBSZXR1cm4gd2VhdGhlciBkYXRhIG9iamVjdCBmb3Igc3BlY2lmaWVkIGxvY2F0aW9uXG5mdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xuICAgIGZldGNoRGF0YShsb2NhdGlvbilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSBuZXcgRGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RGF0YSk7XG4gICAgICAgICAgICByZXR1cm4oY3VycmVudERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG5cbiAgICAgICAgICAgIGNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBjZWxCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB1bml0VHlwZSA9ICdjZWwnO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZmFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGZhckJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIHVuaXRUeXBlID0gJ2Zhcic7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codW5pdFR5cGUpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgfVxuICAgICk7XG59XG5cbi8vIERpc3BsYXkgZGF0YVxuZnVuY3Rpb24gZGlzcGxheURhdGEoZGF0YSkge1xuICAgIGlmICh1bml0VHlwZSA9PSAnZmFyJykge1xuICAgICAgICB0ZW1wID0gZGF0YS50ZW1wX2Y7XG4gICAgICAgIGZlZWxzTGlrZSA9IGRhdGEuZmVlbHNsaWtlX2Y7XG4gICAgICAgIG1heHRlbXAgPSBkYXRhLm1heHRlbXBfZjtcbiAgICAgICAgbWludGVtcCA9IGRhdGEubWludGVtcF9mO1xuICAgICAgICB2aXMgPSBgJHtkYXRhLnZpc19taWxlcyAgfW1gO1xuICAgICAgICB3aW5kID0gYCR7ZGF0YS53aW5kX21waCAgfW1waGA7XG4gICAgfSBlbHNlIGlmICh1bml0VHlwZSA9PSAnY2VsJykge1xuICAgICAgICB0ZW1wID0gZGF0YS50ZW1wX2M7XG4gICAgICAgIGZlZWxzTGlrZSA9IGRhdGEuZmVlbHNsaWtlX2M7XG4gICAgICAgIG1heHRlbXAgPSBkYXRhLm1heHRlbXBfYztcbiAgICAgICAgbWludGVtcCA9IGRhdGEubWludGVtcF9jO1xuICAgICAgICB2aXMgPSBgJHtkYXRhLnZpc19rbSAgfWttYDtcbiAgICAgICAgd2luZCA9IGAke2RhdGEud2luZF9rcGggIH1rcGhgO1xuICAgIH1cblxuICAgIGxvY2F0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEubG9jYXRpb259LCAke2RhdGEuY291bnRyeX1gO1xuICAgIGxvY2FsVGltZURpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLmxvY2FsVGltZTtcbiAgICBpY29uRGlzcGxheS5zcmMgPSBkYXRhLmljb247XG4gICAgdGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHt0ZW1wfcKwYDtcbiAgICBjb25kaXRpb25EaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS5jb25kaXRpb247XG4gICAgZmVlbHNMaWtlRGlzcGxheS50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7ZmVlbHNMaWtlfcKwYDtcbiAgICBoaWdoTG93RGlzcGxheS50ZXh0Q29udGVudCA9IGBIOiAke21heHRlbXB9wrAgTDogJHttaW50ZW1wfcKwYDtcbiAgICByYWluRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEucmFpbn0lYDtcbiAgICBjbG91ZERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNsb3VkfSVgO1xuICAgIHZpc2liaWxpdHlEaXNwbGF5LnRleHRDb250ZW50ID0gdmlzO1xuICAgIHdpbmREaXNwbGF5LnRleHRDb250ZW50ID0gd2luZDtcbiAgICBodW1pZGl0eURpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmh1bWlkaXR5fSVgO1xuICAgIHV2RGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEudXY7XG4gICAgc3VucmlzZURpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLnN1bnJpc2U7XG4gICAgc3Vuc2V0RGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEuc3Vuc2V0O1xufVxuXG4vLyBJbml0aWFsIGRpc3BsYXlcbmdldFdlYXRoZXJEYXRhKCdzZWF0dGxlJyk7XG5cbi8vIFNlYXJjaCBuZXcgbG9jYXRpb25cbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKCFzZWFyY2hGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICBzZWFyY2hGb3JtLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2V0V2VhdGhlckRhdGEoc2VhcmNoSW5wdXQudmFsdWUpO1xuICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufSk7XG5cblxuLyogXG5UTyBET1xuXG5hZGQgVUkgdG8gaHRtbCBlbGVtZW50c1xuXG5jbGVhbiB1cCBpbnB1dCBmb3JtYXR0aW5nIChkYXRlL3RpbWUsIGNvdW50cnkgc2hvd24pXG5cbm1heWJlIGZpbmQgZGlmZmVyZW50IGljb25zPz8/Pz9cblxuZm9ybWF0IGgvbCBiZXR0ZXIgKGFkZCBzcGFjZSBpbiBiZXR3ZWVuPz8/KVxuXG5hZGQgaG91cmx5L2RhaWx5IGluZm9cblxucmVtb3ZlIGxlYWRpbmcgMCBvbiBzdW5yaXNlL3N1bnNldFxuXG5oYW5kbGUgZXJyb3JzXG5cbmFkZCBsb2FkaW5nIGljb25cblxuYWRkIGZvb3RlclxuICovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9