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
let sunrise = '';
let sunset = '';

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

    if (data.country == 'United States of America' || data.country == 'USA') {
        stateAbbr = getStateAbbr(data.region);
        location = `${data.location}, ${stateAbbr}, United States`;
    } else {
        location = `${data.location}, ${data.country}`;
    }

    const currentDate = new Date(data.localTime);
    const formattedDate = currentDate.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

    if (data.sunrise.startsWith(0)) {
        sunrise = data.sunrise.slice(1);
    } else {
        sunrise = data.sunrise;
    }

    if (data.sunset.startsWith(0)) {
        sunset = data.sunset.slice(1);
    } else {
        sunset = data.sunset;
    }

    locationDisplay.textContent = location;
    localTimeDisplay.textContent = formattedDate;
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
    sunriseDisplay.textContent = sunrise;
    sunsetDisplay.textContent = sunset;
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

maybe find different icons?????

remove leading 0 on sunrise/sunset

add hourly/daily info

handle errors 

add error messages when an invalid location is searched

add loading icon

add footer
 */
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVJQUF1SSxTQUFTLFdBQVcsYUFBYTtBQUN4SztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGlCQUFpQjtBQUNsQyxrQkFBa0IsZ0JBQWdCO0FBQ2xDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixjQUFjO0FBQy9CLGtCQUFrQixnQkFBZ0I7QUFDbEM7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixjQUFjLElBQUksVUFBVTtBQUNsRCxNQUFNO0FBQ04sc0JBQXNCLGNBQWMsSUFBSSxhQUFhO0FBQ3JEOztBQUVBO0FBQ0EsZ0VBQWdFLG1IQUFtSDs7QUFFbkw7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsS0FBSztBQUN0QztBQUNBLGlEQUFpRCxVQUFVO0FBQzNELHVDQUF1QyxRQUFRLE9BQU8sUUFBUTtBQUM5RCxpQ0FBaUMsVUFBVTtBQUMzQyxrQ0FBa0MsV0FBVztBQUM3QztBQUNBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtJyk7XG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtaW5wdXQnKTtcbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtYnRuJyk7XG5jb25zdCBsb2NhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcbmNvbnN0IGxvY2FsVGltZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYWwtdGltZScpO1xuY29uc3QgaWNvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbicpO1xuY29uc3QgdGVtcERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcCcpO1xuY29uc3QgY29uZGl0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24nKTtcbmNvbnN0IGZlZWxzTGlrZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHMtbGlrZScpO1xuY29uc3QgaGlnaExvd0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlnaC1sb3cnKTtcbmNvbnN0IHJhaW5EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhaW4nKTtcbmNvbnN0IGNsb3VkRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG91ZCcpO1xuY29uc3QgdmlzaWJpbGl0eURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaWJpbGl0eScpO1xuY29uc3Qgd2luZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZCcpO1xuY29uc3QgaHVtaWRpdHlEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG5jb25zdCB1dkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXYnKTtcbmNvbnN0IHN1bnJpc2VEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bnJpc2UnKTtcbmNvbnN0IHN1bnNldERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Vuc2V0Jyk7XG5jb25zdCBjZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsLWJ0bicpO1xuY29uc3QgZmFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zhci1idG4nKTtcbmxldCB1bml0VHlwZSA9ICdmYXInO1xubGV0IHRlbXAgPSAnJztcbmxldCBmZWVsc0xpa2UgPSAnJztcbmxldCB3aW5kID0gJyc7XG5sZXQgdmlzID0gJyc7XG5sZXQgbWludGVtcCA9ICcnO1xubGV0IG1heHRlbXAgPSAnJztcbmxldCBsb2NhdGlvbiA9ICcnO1xubGV0IHN0YXRlQWJiciA9ICcnO1xubGV0IHN1bnJpc2UgPSAnJztcbmxldCBzdW5zZXQgPSAnJztcblxuLy8gRmV0Y2ggd2VhdGhlciBkYXRhIGZyb20gd2VhdGhlciBBUElcbmFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShsb2NhdGlvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbiZmb3JlY2FzdC5qc29uP2tleT1jZDc3YTU3N2Y0MzQ0Yjk0OWMwMjA1MzQwMjMxNTA1JnE9JHtsb2NhdGlvbn0mZGF5cz04YCwge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICAgICAgICByZXR1cm4od2VhdGhlckRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gICAgXG59XG5cbi8vIFByb2Nlc3MgdGhlIGpzb24gZGF0YSBmcm9tIEFQSSBhbmQgcmV0dXJuIG9iamVjdCB3aXRoIG9ubHkgcmVxdWlyZWQgZGF0YVxuZnVuY3Rpb24gRGF0YShkYXRhKSB7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGRhdGEubG9jYXRpb24ubmFtZTtcbiAgICB0aGlzLnJlZ2lvbiA9IGRhdGEubG9jYXRpb24ucmVnaW9uO1xuICAgIHRoaXMuY291bnRyeSA9IGRhdGEubG9jYXRpb24uY291bnRyeTtcbiAgICB0aGlzLmxvY2FsVGltZSA9IGRhdGEubG9jYXRpb24ubG9jYWx0aW1lO1xuICAgIHRoaXMudGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9mKTtcbiAgICB0aGlzLnRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfYyk7XG4gICAgdGhpcy5pY29uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uO1xuICAgIHRoaXMuY29uZGl0aW9uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuICAgIHRoaXMuZmVlbHNsaWtlX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZik7XG4gICAgdGhpcy5mZWVsc2xpa2VfYyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jKTtcbiAgICB0aGlzLmh1bWlkaXR5ID0gZGF0YS5jdXJyZW50Lmh1bWlkaXR5O1xuICAgIHRoaXMudXYgPSBkYXRhLmN1cnJlbnQudXY7XG4gICAgdGhpcy5jbG91ZCA9IGRhdGEuY3VycmVudC5jbG91ZDtcbiAgICB0aGlzLndpbmRfbXBoID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQud2luZF9tcGgpO1xuICAgIHRoaXMud2luZF9rcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX2twaCk7XG4gICAgdGhpcy52aXNfbWlsZXMgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfbWlsZXMpO1xuICAgIHRoaXMudmlzX2ttID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudmlzX2ttKTtcbiAgICB0aGlzLnN1bnJpc2UgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnJpc2U7XG4gICAgdGhpcy5zdW5zZXQgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldDtcbiAgICB0aGlzLnJhaW4gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcbiAgICB0aGlzLm1pbnRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mKTtcbiAgICB0aGlzLm1heHRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mKTtcbiAgICB0aGlzLm1pbnRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jKTtcbiAgICB0aGlzLm1heHRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jKTtcbn1cblxuLy8gUmV0dXJuIHdlYXRoZXIgZGF0YSBvYmplY3QgZm9yIHNwZWNpZmllZCBsb2NhdGlvblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgICBmZXRjaERhdGEobG9jYXRpb24pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRhID0gbmV3IERhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudERhdGEpO1xuICAgICAgICAgICAgcmV0dXJuKGN1cnJlbnREYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBjZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmFyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgdW5pdFR5cGUgPSAnY2VsJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBmYXJCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB1bml0VHlwZSA9ICdmYXInO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIH1cbiAgICApO1xufVxuXG4vLyBTdGF0ZXNcbmNvbnN0IHN0YXRlcyA9IHtcbiAgICAnQWxhYmFtYSc6ICdBTCcsXG4gICAgJ0FsYXNrYSc6ICdBSycsXG4gICAgJ0FtZXJpY2FuIFNhbW9hJzogJ0FTJyxcbiAgICAnQXJpem9uYSc6ICdBWicsXG4gICAgJ0Fya2Fuc2FzJzogJ0FSJyxcbiAgICAnQ2FsaWZvcm5pYSc6ICdDQScsXG4gICAgJ0NvbG9yYWRvJzogJ0NPJyxcbiAgICAnQ29ubmVjdGljdXQnOiAnQ1QnLFxuICAgICdEZWxhd2FyZSc6ICdERScsXG4gICAgJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJzogJ0RDJyxcbiAgICAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJzogJ0ZNJyxcbiAgICAnRmxvcmlkYSc6ICdGTCcsXG4gICAgJ0dlb3JnaWEnOiAnR0EnLFxuICAgICdHdWFtJzogJ0dVJyxcbiAgICAnSGF3YWlpJzogJ0hJJyxcbiAgICAnSWRhaG8nOiAnSUQnLFxuICAgICdJbGxpbm9pcyc6ICdJTCcsXG4gICAgJ0luZGlhbmEnOiAnSU4nLFxuICAgICdJb3dhJzogJ0lBJyxcbiAgICAnS2Fuc2FzJzogJ0tTJyxcbiAgICAnS2VudHVja3knOiAnS1knLFxuICAgICdMb3Vpc2lhbmEnOiAnTEEnLFxuICAgICdNYWluZSc6ICdNRScsXG4gICAgJ01hcnNoYWxsIElzbGFuZHMnOiAnTUgnLFxuICAgICdNYXJ5bGFuZCc6ICdNRCcsXG4gICAgJ01hc3NhY2h1c2V0dHMnOiAnTUEnLFxuICAgICdNaWNoaWdhbic6ICdNSScsXG4gICAgJ01pbm5lc290YSc6ICdNTicsXG4gICAgJ01pc3Npc3NpcHBpJzogJ01TJyxcbiAgICAnTWlzc291cmknOiAnTU8nLFxuICAgICdNb250YW5hJzogJ01UJyxcbiAgICAnTmVicmFza2EnOiAnTkUnLFxuICAgICdOZXZhZGEnOiAnTlYnLFxuICAgICdOZXcgSGFtcHNoaXJlJzogJ05IJyxcbiAgICAnTmV3IEplcnNleSc6ICdOSicsXG4gICAgJ05ldyBNZXhpY28nOiAnTk0nLFxuICAgICdOZXcgWW9yayc6ICdOWScsXG4gICAgJ05vcnRoIENhcm9saW5hJzogJ05DJyxcbiAgICAnTm9ydGggRGFrb3RhJzogJ05EJyxcbiAgICAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJzogJ01QJyxcbiAgICAnT2hpbyc6ICdPSCcsXG4gICAgJ09rbGFob21hJzogJ09LJyxcbiAgICAnT3JlZ29uJzogJ09SJyxcbiAgICAnUGFsYXUnOiAnUFcnLFxuICAgICdQZW5uc3lsdmFuaWEnOiAnUEEnLFxuICAgICdQdWVydG8gUmljbyc6ICdQUicsXG4gICAgJ1Job2RlIElzbGFuZCc6ICdSSScsXG4gICAgJ1NvdXRoIENhcm9saW5hJzogJ1NDJyxcbiAgICAnU291dGggRGFrb3RhJzogJ1NEJyxcbiAgICAnVGVubmVzc2VlJzogJ1ROJyxcbiAgICAnVGV4YXMnOiAnVFgnLFxuICAgICdVdGFoJzogJ1VUJyxcbiAgICAnVmVybW9udCc6ICdWVCcsXG4gICAgJ1ZpcmdpbiBJc2xhbmRzJzogJ1ZJJyxcbiAgICAnVmlyZ2luaWEnOiAnVkEnLFxuICAgICdXYXNoaW5ndG9uJzogJ1dBJyxcbiAgICAnV2VzdCBWaXJnaW5pYSc6ICdXVicsXG4gICAgJ1dpc2NvbnNpbic6ICdXSScsXG4gICAgJ1d5b21pbmcnOiAnV1knXG59XG5cbi8vIEdldCBzdGF0ZSBhYmJyZXZpYXRpb25cbmZ1bmN0aW9uIGdldFN0YXRlQWJicihzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZXNbc3RhdGVdO1xufVxuXG4vLyBEaXNwbGF5IGRhdGFcbmZ1bmN0aW9uIGRpc3BsYXlEYXRhKGRhdGEpIHtcbiAgICBpZiAodW5pdFR5cGUgPT0gJ2ZhcicpIHtcbiAgICAgICAgdGVtcCA9IGRhdGEudGVtcF9mO1xuICAgICAgICBmZWVsc0xpa2UgPSBkYXRhLmZlZWxzbGlrZV9mO1xuICAgICAgICBtYXh0ZW1wID0gZGF0YS5tYXh0ZW1wX2Y7XG4gICAgICAgIG1pbnRlbXAgPSBkYXRhLm1pbnRlbXBfZjtcbiAgICAgICAgdmlzID0gYCR7ZGF0YS52aXNfbWlsZXMgIH1tYDtcbiAgICAgICAgd2luZCA9IGAke2RhdGEud2luZF9tcGggIH1tcGhgO1xuICAgIH0gZWxzZSBpZiAodW5pdFR5cGUgPT0gJ2NlbCcpIHtcbiAgICAgICAgdGVtcCA9IGRhdGEudGVtcF9jO1xuICAgICAgICBmZWVsc0xpa2UgPSBkYXRhLmZlZWxzbGlrZV9jO1xuICAgICAgICBtYXh0ZW1wID0gZGF0YS5tYXh0ZW1wX2M7XG4gICAgICAgIG1pbnRlbXAgPSBkYXRhLm1pbnRlbXBfYztcbiAgICAgICAgdmlzID0gYCR7ZGF0YS52aXNfa20gIH1rbWA7XG4gICAgICAgIHdpbmQgPSBgJHtkYXRhLndpbmRfa3BoICB9a3BoYDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5jb3VudHJ5ID09ICdVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2EnIHx8IGRhdGEuY291bnRyeSA9PSAnVVNBJykge1xuICAgICAgICBzdGF0ZUFiYnIgPSBnZXRTdGF0ZUFiYnIoZGF0YS5yZWdpb24pO1xuICAgICAgICBsb2NhdGlvbiA9IGAke2RhdGEubG9jYXRpb259LCAke3N0YXRlQWJicn0sIFVuaXRlZCBTdGF0ZXNgO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sICR7ZGF0YS5jb3VudHJ5fWA7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZShkYXRhLmxvY2FsVGltZSk7XG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGN1cnJlbnREYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ2xvbmcnLCB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnLCBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnLCBob3VyMTI6IHRydWUgfSk7XG5cbiAgICBpZiAoZGF0YS5zdW5yaXNlLnN0YXJ0c1dpdGgoMCkpIHtcbiAgICAgICAgc3VucmlzZSA9IGRhdGEuc3VucmlzZS5zbGljZSgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdW5yaXNlID0gZGF0YS5zdW5yaXNlO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnN1bnNldC5zdGFydHNXaXRoKDApKSB7XG4gICAgICAgIHN1bnNldCA9IGRhdGEuc3Vuc2V0LnNsaWNlKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bnNldCA9IGRhdGEuc3Vuc2V0O1xuICAgIH1cblxuICAgIGxvY2F0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGxvY2F0aW9uO1xuICAgIGxvY2FsVGltZURpc3BsYXkudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWREYXRlO1xuICAgIGljb25EaXNwbGF5LnNyYyA9IGRhdGEuaWNvbjtcbiAgICB0ZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGAke3RlbXB9wrBgO1xuICAgIGNvbmRpdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLmNvbmRpdGlvbjtcbiAgICBmZWVsc0xpa2VEaXNwbGF5LnRleHRDb250ZW50ID0gYEZlZWxzIGxpa2UgJHtmZWVsc0xpa2V9wrBgO1xuICAgIGhpZ2hMb3dEaXNwbGF5LnRleHRDb250ZW50ID0gYEg6ICR7bWF4dGVtcH3CsCBMOiAke21pbnRlbXB9wrBgO1xuICAgIHJhaW5EaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5yYWlufSVgO1xuICAgIGNsb3VkRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2xvdWR9JWA7XG4gICAgdmlzaWJpbGl0eURpc3BsYXkudGV4dENvbnRlbnQgPSB2aXM7XG4gICAgd2luZERpc3BsYXkudGV4dENvbnRlbnQgPSB3aW5kO1xuICAgIGh1bWlkaXR5RGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEuaHVtaWRpdHl9JWA7XG4gICAgdXZEaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS51djtcbiAgICBzdW5yaXNlRGlzcGxheS50ZXh0Q29udGVudCA9IHN1bnJpc2U7XG4gICAgc3Vuc2V0RGlzcGxheS50ZXh0Q29udGVudCA9IHN1bnNldDtcbn1cblxuLy8gSW5pdGlhbCBkaXNwbGF5XG5nZXRXZWF0aGVyRGF0YSgnc2VhdHRsZScpO1xuXG4vLyBTZWFyY2ggbmV3IGxvY2F0aW9uXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICghc2VhcmNoRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgc2VhcmNoRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG5cbi8qIFxuVE8gRE9cblxubWF5YmUgZmluZCBkaWZmZXJlbnQgaWNvbnM/Pz8/P1xuXG5yZW1vdmUgbGVhZGluZyAwIG9uIHN1bnJpc2Uvc3Vuc2V0XG5cbmFkZCBob3VybHkvZGFpbHkgaW5mb1xuXG5oYW5kbGUgZXJyb3JzIFxuXG5hZGQgZXJyb3IgbWVzc2FnZXMgd2hlbiBhbiBpbnZhbGlkIGxvY2F0aW9uIGlzIHNlYXJjaGVkXG5cbmFkZCBsb2FkaW5nIGljb25cblxuYWRkIGZvb3RlclxuICovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9