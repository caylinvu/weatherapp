/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');

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
// fetchData('seattle')
//     .then(response => {
//         const currentData = new Data(response);
//         console.log(currentData);
//         return(currentData);
//     })
//     .catch(error => {
//         console.error(error)
//     }
// );

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

finish implementing search bar

add html elements

tie html elements to data

add UI to html elements

implement farhenheit to celsius toggle
*/
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1SUFBdUksU0FBUyxXQUFXLGFBQWE7QUFDeEs7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0Jyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuXG4vLyBGZXRjaCB3ZWF0aGVyIGRhdGEgZnJvbSB3ZWF0aGVyIEFQSVxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKGxvY2F0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uJmZvcmVjYXN0Lmpzb24/a2V5PWNkNzdhNTc3ZjQzNDRiOTQ5YzAyMDUzNDAyMzE1MDUmcT0ke2xvY2F0aW9ufSZkYXlzPThgLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgICAgIHJldHVybih3ZWF0aGVyRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSAgICBcbn1cblxuLy8gUHJvY2VzcyB0aGUganNvbiBkYXRhIGZyb20gQVBJIGFuZCByZXR1cm4gb2JqZWN0IHdpdGggb25seSByZXF1aXJlZCBkYXRhXG5mdW5jdGlvbiBEYXRhKGRhdGEpIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICAgIHRoaXMucmVnaW9uID0gZGF0YS5sb2NhdGlvbi5yZWdpb247XG4gICAgdGhpcy5jb3VudHJ5ID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5O1xuICAgIHRoaXMubG9jYWxUaW1lID0gZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWU7XG4gICAgdGhpcy50ZW1wX2YgPSBkYXRhLmN1cnJlbnQudGVtcF9mO1xuICAgIHRoaXMudGVtcF9jID0gZGF0YS5jdXJyZW50LnRlbXBfYztcbiAgICB0aGlzLmljb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb247XG4gICAgdGhpcy5jb25kaXRpb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG4gICAgdGhpcy5mZWVsc2xpa2VfZiA9IGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZjtcbiAgICB0aGlzLmZlZWxzbGlrZV9jID0gZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jO1xuICAgIHRoaXMuaHVtaWRpdHkgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHk7XG4gICAgdGhpcy51diA9IGRhdGEuY3VycmVudC51djtcbiAgICB0aGlzLmNsb3VkID0gZGF0YS5jdXJyZW50LmNsb3VkO1xuICAgIHRoaXMud2luZF9tcGggPSBkYXRhLmN1cnJlbnQud2luZF9tcGg7XG4gICAgdGhpcy53aW5kX2twaCA9IGRhdGEuY3VycmVudC53aW5kX2twaDtcbiAgICB0aGlzLnZpc19taWxlcyA9IGRhdGEuY3VycmVudC52aXNfbWlsZXM7XG4gICAgdGhpcy52aXNfa20gPSBkYXRhLmN1cnJlbnQudmlzX2ttO1xuICAgIHRoaXMuc3VucmlzZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZTtcbiAgICB0aGlzLnN1bnNldCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0O1xuICAgIHRoaXMucmFpbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICAgIHRoaXMubWludGVtcF9mID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mO1xuICAgIHRoaXMubWF4dGVtcF9mID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mO1xuICAgIHRoaXMubWludGVtcF9jID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jO1xuICAgIHRoaXMubWF4dGVtcF9jID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jO1xufVxuXG4vLyBSZXR1cm4gd2VhdGhlciBkYXRhIG9iamVjdCBmb3Igc3BlY2lmaWVkIGxvY2F0aW9uXG5mdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xuICAgIGZldGNoRGF0YShsb2NhdGlvbilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSBuZXcgRGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RGF0YSk7XG4gICAgICAgICAgICByZXR1cm4oY3VycmVudERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgfVxuICAgICk7XG59XG5cbi8vIERpc3BsYXkgZGF0YVxuZnVuY3Rpb24gZGlzcGxheURhdGEoZGF0YSkge1xuXG59XG5cbi8vIEluaXRpYWwgZGlzcGxheVxuZ2V0V2VhdGhlckRhdGEoJ3NlYXR0bGUnKTtcbi8vIGZldGNoRGF0YSgnc2VhdHRsZScpXG4vLyAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuLy8gICAgICAgICBjb25zdCBjdXJyZW50RGF0YSA9IG5ldyBEYXRhKHJlc3BvbnNlKTtcbi8vICAgICAgICAgY29uc29sZS5sb2coY3VycmVudERhdGEpO1xuLy8gICAgICAgICByZXR1cm4oY3VycmVudERhdGEpO1xuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKGVycm9yID0+IHtcbi8vICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbi8vICAgICB9XG4vLyApO1xuXG4vLyBTZWFyY2ggbmV3IGxvY2F0aW9uXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICghc2VhcmNoRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgc2VhcmNoRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4vKiBcblRPIERPXG5cbmZpbmlzaCBpbXBsZW1lbnRpbmcgc2VhcmNoIGJhclxuXG5hZGQgaHRtbCBlbGVtZW50c1xuXG50aWUgaHRtbCBlbGVtZW50cyB0byBkYXRhXG5cbmFkZCBVSSB0byBodG1sIGVsZW1lbnRzXG5cbmltcGxlbWVudCBmYXJoZW5oZWl0IHRvIGNlbHNpdXMgdG9nZ2xlXG4qLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==