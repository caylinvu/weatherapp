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
let location = '';
let stateAbbr = '';

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

// States
const states = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District Of Columbia': 'DC',
    'Federated States Of Micronesia': 'FM',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Marshall Islands': 'MH',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Palau': 'PW',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
}

// Get state abbreviation
function getStateAbbr(state) {
    return states[state];
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

    if (data.country == 'United States of America') {
        stateAbbr = getStateAbbr(data.region);
        location = `${data.location}, ${stateAbbr}, United States`;
    } else {
        location = `${data.location}, ${data.country}`;
    }

    locationDisplay.textContent = location;
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

clean up input formatting (date/time, country shown)

maybe find different icons?????

remove leading 0 on sunrise/sunset

add hourly/daily info

handle errors

add loading icon

add footer
 */
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUlBQXVJLFNBQVMsV0FBVyxhQUFhO0FBQ3hLO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDLGtCQUFrQixnQkFBZ0I7QUFDbEMsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGNBQWM7QUFDL0Isa0JBQWtCLGdCQUFnQjtBQUNsQzs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWMsSUFBSSxVQUFVO0FBQ2xELE1BQU07QUFDTixzQkFBc0IsY0FBYyxJQUFJLGFBQWE7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEM7QUFDQSxpREFBaUQsVUFBVTtBQUMzRCx1Q0FBdUMsUUFBUSxPQUFPLFFBQVE7QUFDOUQsaUNBQWlDLFVBQVU7QUFDM0Msa0NBQWtDLFdBQVc7QUFDN0M7QUFDQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0Jyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuY29uc3QgbG9jYXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJyk7XG5jb25zdCBsb2NhbFRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2FsLXRpbWUnKTtcbmNvbnN0IGljb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24nKTtcbmNvbnN0IHRlbXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXAnKTtcbmNvbnN0IGNvbmRpdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uJyk7XG5jb25zdCBmZWVsc0xpa2VEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWxzLWxpa2UnKTtcbmNvbnN0IGhpZ2hMb3dEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2gtbG93Jyk7XG5jb25zdCByYWluRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWluJyk7XG5jb25zdCBjbG91ZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvdWQnKTtcbmNvbnN0IHZpc2liaWxpdHlEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2liaWxpdHknKTtcbmNvbnN0IHdpbmREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbmNvbnN0IGh1bWlkaXR5RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1pZGl0eScpO1xuY29uc3QgdXZEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3V2Jyk7XG5jb25zdCBzdW5yaXNlRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW5yaXNlJyk7XG5jb25zdCBzdW5zZXREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bnNldCcpO1xuY29uc3QgY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbC1idG4nKTtcbmNvbnN0IGZhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYXItYnRuJyk7XG5sZXQgdW5pdFR5cGUgPSAnZmFyJztcbmxldCB0ZW1wID0gJyc7XG5sZXQgZmVlbHNMaWtlID0gJyc7XG5sZXQgd2luZCA9ICcnO1xubGV0IHZpcyA9ICcnO1xubGV0IG1pbnRlbXAgPSAnJztcbmxldCBtYXh0ZW1wID0gJyc7XG5sZXQgbG9jYXRpb24gPSAnJztcbmxldCBzdGF0ZUFiYnIgPSAnJztcblxuLy8gRmV0Y2ggd2VhdGhlciBkYXRhIGZyb20gd2VhdGhlciBBUElcbmFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShsb2NhdGlvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbiZmb3JlY2FzdC5qc29uP2tleT1jZDc3YTU3N2Y0MzQ0Yjk0OWMwMjA1MzQwMjMxNTA1JnE9JHtsb2NhdGlvbn0mZGF5cz04YCwge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICAgICAgICByZXR1cm4od2VhdGhlckRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gICAgXG59XG5cbi8vIFByb2Nlc3MgdGhlIGpzb24gZGF0YSBmcm9tIEFQSSBhbmQgcmV0dXJuIG9iamVjdCB3aXRoIG9ubHkgcmVxdWlyZWQgZGF0YVxuZnVuY3Rpb24gRGF0YShkYXRhKSB7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGRhdGEubG9jYXRpb24ubmFtZTtcbiAgICB0aGlzLnJlZ2lvbiA9IGRhdGEubG9jYXRpb24ucmVnaW9uO1xuICAgIHRoaXMuY291bnRyeSA9IGRhdGEubG9jYXRpb24uY291bnRyeTtcbiAgICB0aGlzLmxvY2FsVGltZSA9IGRhdGEubG9jYXRpb24ubG9jYWx0aW1lO1xuICAgIHRoaXMudGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9mKTtcbiAgICB0aGlzLnRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfYyk7XG4gICAgdGhpcy5pY29uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uO1xuICAgIHRoaXMuY29uZGl0aW9uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuICAgIHRoaXMuZmVlbHNsaWtlX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZik7XG4gICAgdGhpcy5mZWVsc2xpa2VfYyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jKTtcbiAgICB0aGlzLmh1bWlkaXR5ID0gZGF0YS5jdXJyZW50Lmh1bWlkaXR5O1xuICAgIHRoaXMudXYgPSBkYXRhLmN1cnJlbnQudXY7XG4gICAgdGhpcy5jbG91ZCA9IGRhdGEuY3VycmVudC5jbG91ZDtcbiAgICB0aGlzLndpbmRfbXBoID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQud2luZF9tcGgpO1xuICAgIHRoaXMud2luZF9rcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX2twaCk7XG4gICAgdGhpcy52aXNfbWlsZXMgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfbWlsZXMpO1xuICAgIHRoaXMudmlzX2ttID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudmlzX2ttKTtcbiAgICB0aGlzLnN1bnJpc2UgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnJpc2U7XG4gICAgdGhpcy5zdW5zZXQgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldDtcbiAgICB0aGlzLnJhaW4gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcbiAgICB0aGlzLm1pbnRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mKTtcbiAgICB0aGlzLm1heHRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mKTtcbiAgICB0aGlzLm1pbnRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jKTtcbiAgICB0aGlzLm1heHRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jKTtcbn1cblxuLy8gUmV0dXJuIHdlYXRoZXIgZGF0YSBvYmplY3QgZm9yIHNwZWNpZmllZCBsb2NhdGlvblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgICBmZXRjaERhdGEobG9jYXRpb24pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRhID0gbmV3IERhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudERhdGEpO1xuICAgICAgICAgICAgcmV0dXJuKGN1cnJlbnREYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBjZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmFyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgdW5pdFR5cGUgPSAnY2VsJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBmYXJCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB1bml0VHlwZSA9ICdmYXInO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIH1cbiAgICApO1xufVxuXG4vLyBTdGF0ZXNcbmNvbnN0IHN0YXRlcyA9IHtcbiAgICAnQWxhYmFtYSc6ICdBTCcsXG4gICAgJ0FsYXNrYSc6ICdBSycsXG4gICAgJ0FtZXJpY2FuIFNhbW9hJzogJ0FTJyxcbiAgICAnQXJpem9uYSc6ICdBWicsXG4gICAgJ0Fya2Fuc2FzJzogJ0FSJyxcbiAgICAnQ2FsaWZvcm5pYSc6ICdDQScsXG4gICAgJ0NvbG9yYWRvJzogJ0NPJyxcbiAgICAnQ29ubmVjdGljdXQnOiAnQ1QnLFxuICAgICdEZWxhd2FyZSc6ICdERScsXG4gICAgJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJzogJ0RDJyxcbiAgICAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJzogJ0ZNJyxcbiAgICAnRmxvcmlkYSc6ICdGTCcsXG4gICAgJ0dlb3JnaWEnOiAnR0EnLFxuICAgICdHdWFtJzogJ0dVJyxcbiAgICAnSGF3YWlpJzogJ0hJJyxcbiAgICAnSWRhaG8nOiAnSUQnLFxuICAgICdJbGxpbm9pcyc6ICdJTCcsXG4gICAgJ0luZGlhbmEnOiAnSU4nLFxuICAgICdJb3dhJzogJ0lBJyxcbiAgICAnS2Fuc2FzJzogJ0tTJyxcbiAgICAnS2VudHVja3knOiAnS1knLFxuICAgICdMb3Vpc2lhbmEnOiAnTEEnLFxuICAgICdNYWluZSc6ICdNRScsXG4gICAgJ01hcnNoYWxsIElzbGFuZHMnOiAnTUgnLFxuICAgICdNYXJ5bGFuZCc6ICdNRCcsXG4gICAgJ01hc3NhY2h1c2V0dHMnOiAnTUEnLFxuICAgICdNaWNoaWdhbic6ICdNSScsXG4gICAgJ01pbm5lc290YSc6ICdNTicsXG4gICAgJ01pc3Npc3NpcHBpJzogJ01TJyxcbiAgICAnTWlzc291cmknOiAnTU8nLFxuICAgICdNb250YW5hJzogJ01UJyxcbiAgICAnTmVicmFza2EnOiAnTkUnLFxuICAgICdOZXZhZGEnOiAnTlYnLFxuICAgICdOZXcgSGFtcHNoaXJlJzogJ05IJyxcbiAgICAnTmV3IEplcnNleSc6ICdOSicsXG4gICAgJ05ldyBNZXhpY28nOiAnTk0nLFxuICAgICdOZXcgWW9yayc6ICdOWScsXG4gICAgJ05vcnRoIENhcm9saW5hJzogJ05DJyxcbiAgICAnTm9ydGggRGFrb3RhJzogJ05EJyxcbiAgICAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJzogJ01QJyxcbiAgICAnT2hpbyc6ICdPSCcsXG4gICAgJ09rbGFob21hJzogJ09LJyxcbiAgICAnT3JlZ29uJzogJ09SJyxcbiAgICAnUGFsYXUnOiAnUFcnLFxuICAgICdQZW5uc3lsdmFuaWEnOiAnUEEnLFxuICAgICdQdWVydG8gUmljbyc6ICdQUicsXG4gICAgJ1Job2RlIElzbGFuZCc6ICdSSScsXG4gICAgJ1NvdXRoIENhcm9saW5hJzogJ1NDJyxcbiAgICAnU291dGggRGFrb3RhJzogJ1NEJyxcbiAgICAnVGVubmVzc2VlJzogJ1ROJyxcbiAgICAnVGV4YXMnOiAnVFgnLFxuICAgICdVdGFoJzogJ1VUJyxcbiAgICAnVmVybW9udCc6ICdWVCcsXG4gICAgJ1ZpcmdpbiBJc2xhbmRzJzogJ1ZJJyxcbiAgICAnVmlyZ2luaWEnOiAnVkEnLFxuICAgICdXYXNoaW5ndG9uJzogJ1dBJyxcbiAgICAnV2VzdCBWaXJnaW5pYSc6ICdXVicsXG4gICAgJ1dpc2NvbnNpbic6ICdXSScsXG4gICAgJ1d5b21pbmcnOiAnV1knXG59XG5cbi8vIEdldCBzdGF0ZSBhYmJyZXZpYXRpb25cbmZ1bmN0aW9uIGdldFN0YXRlQWJicihzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZXNbc3RhdGVdO1xufVxuXG4vLyBEaXNwbGF5IGRhdGFcbmZ1bmN0aW9uIGRpc3BsYXlEYXRhKGRhdGEpIHtcbiAgICBpZiAodW5pdFR5cGUgPT0gJ2ZhcicpIHtcbiAgICAgICAgdGVtcCA9IGRhdGEudGVtcF9mO1xuICAgICAgICBmZWVsc0xpa2UgPSBkYXRhLmZlZWxzbGlrZV9mO1xuICAgICAgICBtYXh0ZW1wID0gZGF0YS5tYXh0ZW1wX2Y7XG4gICAgICAgIG1pbnRlbXAgPSBkYXRhLm1pbnRlbXBfZjtcbiAgICAgICAgdmlzID0gYCR7ZGF0YS52aXNfbWlsZXMgIH1tYDtcbiAgICAgICAgd2luZCA9IGAke2RhdGEud2luZF9tcGggIH1tcGhgO1xuICAgIH0gZWxzZSBpZiAodW5pdFR5cGUgPT0gJ2NlbCcpIHtcbiAgICAgICAgdGVtcCA9IGRhdGEudGVtcF9jO1xuICAgICAgICBmZWVsc0xpa2UgPSBkYXRhLmZlZWxzbGlrZV9jO1xuICAgICAgICBtYXh0ZW1wID0gZGF0YS5tYXh0ZW1wX2M7XG4gICAgICAgIG1pbnRlbXAgPSBkYXRhLm1pbnRlbXBfYztcbiAgICAgICAgdmlzID0gYCR7ZGF0YS52aXNfa20gIH1rbWA7XG4gICAgICAgIHdpbmQgPSBgJHtkYXRhLndpbmRfa3BoICB9a3BoYDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5jb3VudHJ5ID09ICdVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2EnKSB7XG4gICAgICAgIHN0YXRlQWJiciA9IGdldFN0YXRlQWJicihkYXRhLnJlZ2lvbik7XG4gICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sICR7c3RhdGVBYmJyfSwgVW5pdGVkIFN0YXRlc2A7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9jYXRpb24gPSBgJHtkYXRhLmxvY2F0aW9ufSwgJHtkYXRhLmNvdW50cnl9YDtcbiAgICB9XG5cbiAgICBsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBsb2NhdGlvbjtcbiAgICBsb2NhbFRpbWVEaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS5sb2NhbFRpbWU7XG4gICAgaWNvbkRpc3BsYXkuc3JjID0gZGF0YS5pY29uO1xuICAgIHRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYCR7dGVtcH3CsGA7XG4gICAgY29uZGl0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEuY29uZGl0aW9uO1xuICAgIGZlZWxzTGlrZURpc3BsYXkudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke2ZlZWxzTGlrZX3CsGA7XG4gICAgaGlnaExvd0Rpc3BsYXkudGV4dENvbnRlbnQgPSBgSDogJHttYXh0ZW1wfcKwIEw6ICR7bWludGVtcH3CsGA7XG4gICAgcmFpbkRpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLnJhaW59JWA7XG4gICAgY2xvdWREaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jbG91ZH0lYDtcbiAgICB2aXNpYmlsaXR5RGlzcGxheS50ZXh0Q29udGVudCA9IHZpcztcbiAgICB3aW5kRGlzcGxheS50ZXh0Q29udGVudCA9IHdpbmQ7XG4gICAgaHVtaWRpdHlEaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5odW1pZGl0eX0lYDtcbiAgICB1dkRpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLnV2O1xuICAgIHN1bnJpc2VEaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS5zdW5yaXNlO1xuICAgIHN1bnNldERpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLnN1bnNldDtcbn1cblxuLy8gSW5pdGlhbCBkaXNwbGF5XG5nZXRXZWF0aGVyRGF0YSgnc2VhdHRsZScpO1xuXG4vLyBTZWFyY2ggbmV3IGxvY2F0aW9uXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICghc2VhcmNoRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgc2VhcmNoRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG5cbi8qIFxuVE8gRE9cblxuY2xlYW4gdXAgaW5wdXQgZm9ybWF0dGluZyAoZGF0ZS90aW1lLCBjb3VudHJ5IHNob3duKVxuXG5tYXliZSBmaW5kIGRpZmZlcmVudCBpY29ucz8/Pz8/XG5cbnJlbW92ZSBsZWFkaW5nIDAgb24gc3VucmlzZS9zdW5zZXRcblxuYWRkIGhvdXJseS9kYWlseSBpbmZvXG5cbmhhbmRsZSBlcnJvcnNcblxuYWRkIGxvYWRpbmcgaWNvblxuXG5hZGQgZm9vdGVyXG4gKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=