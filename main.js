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
        .then(response => {
            displayData(response);
        })
        .catch(error => {
            console.error(error)
        }
    );
}

// Display data
function displayData(data) {
    locationDisplay.textContent = `${data.location}, ${data.country}`;
    localTimeDisplay.textContent = data.localTime;
    iconDisplay.src = data.icon;
    tempDisplay.textContent = `${data.temp_f}°`;
    conditionDisplay.textContent = data.condition;
    feelsLikeDisplay.textContent = `Feels like ${data.feelslike_f}°`;
    highLowDisplay.textContent = `H: ${data.maxtemp_f}° L: ${data.mintemp_f}°`;
    rainDisplay.textContent = `${data.rain}%`;
    cloudDisplay.textContent = `${data.cloud}%`;
    visibilityDisplay.textContent = `${data.vis_miles}m`;
    windDisplay.textContent = `${data.wind_mph}mph`;
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

round temps to whole number

format h/l better (add space in between???)

implement farhenheit to celsius toggle

add hourly/daily info

add footer
*/
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1SUFBdUksU0FBUyxXQUFXLGFBQWE7QUFDeEs7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUMsY0FBYyxJQUFJLGFBQWE7QUFDcEU7QUFDQTtBQUNBLGlDQUFpQyxZQUFZO0FBQzdDO0FBQ0EsaURBQWlELGlCQUFpQjtBQUNsRSx1Q0FBdUMsZUFBZSxPQUFPLGVBQWU7QUFDNUUsaUNBQWlDLFVBQVU7QUFDM0Msa0NBQWtDLFdBQVc7QUFDN0MsdUNBQXVDLGVBQWU7QUFDdEQsaUNBQWlDLGNBQWM7QUFDL0MscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWZvcm0nKTtcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpO1xuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1idG4nKTtcbmNvbnN0IGxvY2F0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbicpO1xuY29uc3QgbG9jYWxUaW1lRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhbC10aW1lJyk7XG5jb25zdCBpY29uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pY29uJyk7XG5jb25zdCB0ZW1wRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJyk7XG5jb25zdCBjb25kaXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbicpO1xuY29uc3QgZmVlbHNMaWtlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVscy1saWtlJyk7XG5jb25zdCBoaWdoTG93RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoLWxvdycpO1xuY29uc3QgcmFpbkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFpbicpO1xuY29uc3QgY2xvdWREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3VkJyk7XG5jb25zdCB2aXNpYmlsaXR5RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpYmlsaXR5Jyk7XG5jb25zdCB3aW5kRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kJyk7XG5jb25zdCBodW1pZGl0eURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbmNvbnN0IHV2RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1dicpO1xuY29uc3Qgc3VucmlzZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VucmlzZScpO1xuY29uc3Qgc3Vuc2V0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW5zZXQnKTtcblxuLy8gRmV0Y2ggd2VhdGhlciBkYXRhIGZyb20gd2VhdGhlciBBUElcbmFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShsb2NhdGlvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbiZmb3JlY2FzdC5qc29uP2tleT1jZDc3YTU3N2Y0MzQ0Yjk0OWMwMjA1MzQwMjMxNTA1JnE9JHtsb2NhdGlvbn0mZGF5cz04YCwge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICAgICAgICByZXR1cm4od2VhdGhlckRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gICAgXG59XG5cbi8vIFByb2Nlc3MgdGhlIGpzb24gZGF0YSBmcm9tIEFQSSBhbmQgcmV0dXJuIG9iamVjdCB3aXRoIG9ubHkgcmVxdWlyZWQgZGF0YVxuZnVuY3Rpb24gRGF0YShkYXRhKSB7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGRhdGEubG9jYXRpb24ubmFtZTtcbiAgICB0aGlzLnJlZ2lvbiA9IGRhdGEubG9jYXRpb24ucmVnaW9uO1xuICAgIHRoaXMuY291bnRyeSA9IGRhdGEubG9jYXRpb24uY291bnRyeTtcbiAgICB0aGlzLmxvY2FsVGltZSA9IGRhdGEubG9jYXRpb24ubG9jYWx0aW1lO1xuICAgIHRoaXMudGVtcF9mID0gZGF0YS5jdXJyZW50LnRlbXBfZjtcbiAgICB0aGlzLnRlbXBfYyA9IGRhdGEuY3VycmVudC50ZW1wX2M7XG4gICAgdGhpcy5pY29uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uO1xuICAgIHRoaXMuY29uZGl0aW9uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuICAgIHRoaXMuZmVlbHNsaWtlX2YgPSBkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2Y7XG4gICAgdGhpcy5mZWVsc2xpa2VfYyA9IGRhdGEuY3VycmVudC5mZWVsc2xpa2VfYztcbiAgICB0aGlzLmh1bWlkaXR5ID0gZGF0YS5jdXJyZW50Lmh1bWlkaXR5O1xuICAgIHRoaXMudXYgPSBkYXRhLmN1cnJlbnQudXY7XG4gICAgdGhpcy5jbG91ZCA9IGRhdGEuY3VycmVudC5jbG91ZDtcbiAgICB0aGlzLndpbmRfbXBoID0gZGF0YS5jdXJyZW50LndpbmRfbXBoO1xuICAgIHRoaXMud2luZF9rcGggPSBkYXRhLmN1cnJlbnQud2luZF9rcGg7XG4gICAgdGhpcy52aXNfbWlsZXMgPSBkYXRhLmN1cnJlbnQudmlzX21pbGVzO1xuICAgIHRoaXMudmlzX2ttID0gZGF0YS5jdXJyZW50LnZpc19rbTtcbiAgICB0aGlzLnN1bnJpc2UgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnJpc2U7XG4gICAgdGhpcy5zdW5zZXQgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldDtcbiAgICB0aGlzLnJhaW4gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcbiAgICB0aGlzLm1pbnRlbXBfZiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZjtcbiAgICB0aGlzLm1heHRlbXBfZiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZjtcbiAgICB0aGlzLm1pbnRlbXBfYyA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfYztcbiAgICB0aGlzLm1heHRlbXBfYyA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfYztcbn1cblxuLy8gUmV0dXJuIHdlYXRoZXIgZGF0YSBvYmplY3QgZm9yIHNwZWNpZmllZCBsb2NhdGlvblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgICBmZXRjaERhdGEobG9jYXRpb24pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRhID0gbmV3IERhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudERhdGEpO1xuICAgICAgICAgICAgcmV0dXJuKGN1cnJlbnREYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgfVxuICAgICk7XG59XG5cbi8vIERpc3BsYXkgZGF0YVxuZnVuY3Rpb24gZGlzcGxheURhdGEoZGF0YSkge1xuICAgIGxvY2F0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEubG9jYXRpb259LCAke2RhdGEuY291bnRyeX1gO1xuICAgIGxvY2FsVGltZURpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLmxvY2FsVGltZTtcbiAgICBpY29uRGlzcGxheS5zcmMgPSBkYXRhLmljb247XG4gICAgdGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLnRlbXBfZn3CsGA7XG4gICAgY29uZGl0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEuY29uZGl0aW9uO1xuICAgIGZlZWxzTGlrZURpc3BsYXkudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke2RhdGEuZmVlbHNsaWtlX2Z9wrBgO1xuICAgIGhpZ2hMb3dEaXNwbGF5LnRleHRDb250ZW50ID0gYEg6ICR7ZGF0YS5tYXh0ZW1wX2Z9wrAgTDogJHtkYXRhLm1pbnRlbXBfZn3CsGA7XG4gICAgcmFpbkRpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLnJhaW59JWA7XG4gICAgY2xvdWREaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jbG91ZH0lYDtcbiAgICB2aXNpYmlsaXR5RGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEudmlzX21pbGVzfW1gO1xuICAgIHdpbmREaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS53aW5kX21waH1tcGhgO1xuICAgIGh1bWlkaXR5RGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEuaHVtaWRpdHl9JWA7XG4gICAgdXZEaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS51djtcbiAgICBzdW5yaXNlRGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEuc3VucmlzZTtcbiAgICBzdW5zZXREaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS5zdW5zZXQ7XG59XG5cbi8vIEluaXRpYWwgZGlzcGxheVxuZ2V0V2VhdGhlckRhdGEoJ3NlYXR0bGUnKTtcblxuXG4vLyBTZWFyY2ggbmV3IGxvY2F0aW9uXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICghc2VhcmNoRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgc2VhcmNoRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4vKiBcblRPIERPXG5hZGQgVUkgdG8gaHRtbCBlbGVtZW50c1xuXG5jbGVhbiB1cCBpbnB1dCBmb3JtYXR0aW5nIChkYXRlL3RpbWUsIGNvdW50cnkgc2hvd24pXG5cbm1heWJlIGZpbmQgZGlmZmVyZW50IGljb25zPz8/Pz9cblxucm91bmQgdGVtcHMgdG8gd2hvbGUgbnVtYmVyXG5cbmZvcm1hdCBoL2wgYmV0dGVyIChhZGQgc3BhY2UgaW4gYmV0d2Vlbj8/PylcblxuaW1wbGVtZW50IGZhcmhlbmhlaXQgdG8gY2Vsc2l1cyB0b2dnbGVcblxuYWRkIGhvdXJseS9kYWlseSBpbmZvXG5cbmFkZCBmb290ZXJcbiovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9