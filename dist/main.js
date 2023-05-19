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
const dailyBtn = document.getElementById('daily-btn');
const hourlyBtn = document.getElementById('hourly-btn');
const dailyContainer = document.querySelector('.daily-container');
const hourlyContainer = document.querySelector('.hourly-container');
const dailyForecast = document.querySelector('.daily-forecast');
const hourlyForecast = document.querySelector('.hourly-forecast');
let unitType = 'far';
let forecastType = 'daily';
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
        const response = await fetch(`https://api.weatherapi.com/v1/current.json&forecast.json?key=cd77a577f4344b949c0205340231505&q=${location}&days=10`, {mode: 'cors'});
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

    const dataList = data.forecast.forecastday;
    const dailyForecastArray = [];
    for (let i = 0; i < 10; i++) {
        const forecastDay = new Date(dataList[i].date).toLocaleString('en-US', { weekday: 'long' });
        const highTemp_f = Math.round(dataList[i].day.maxtemp_f);
        const highTemp_c = Math.round(dataList[i].day.maxtemp_c);
        const lowTemp_f = Math.round(dataList[i].day.mintemp_f);
        const lowTemp_c = Math.round(dataList[i].day.mintemp_c);
        const forecastIcon = dataList[i].day.condition.icon;
        
        const forecastObj = {
            day: forecastDay,
            hightemp_f: highTemp_f,
            hightemp_c: highTemp_c,
            lowtemp_f: lowTemp_f,
            lowtemp_c: lowTemp_c,
            icon: forecastIcon,
        };
        dailyForecastArray.push(forecastObj);
    }

    this.dailyForecastArray = dailyForecastArray;
}

// Remove all child elements 
function removeChildren(div) {
    while (div.lastChild) {
        div.removeChild(div.lastChild);
    }
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

            dailyBtn.addEventListener('click', () => {
                hourlyBtn.classList.remove('selected');
                dailyBtn.classList.add('selected');
                forecastType = 'daily';
                console.log(forecastType);

                hourlyForecast.style.display = 'none';
                dailyForecast.style.display = 'block';

                displayData(response);
            });

            hourlyBtn.addEventListener('click', () => {
                dailyBtn.classList.remove('selected');
                hourlyBtn.classList.add('selected');
                forecastType = 'hourly';
                console.log(forecastType);

                dailyForecast.style.display = 'none';
                hourlyForecast.style.display = 'block';

                displayData(response);
            })
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

    removeChildren(dailyContainer);
    removeChildren(hourlyContainer);

    // Display current forecast data
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
        if (stateAbbr == undefined) {
            location = `${data.location}, United States`;
        } else {
            location = `${data.location}, ${stateAbbr}, United States`;
        }
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

    // Display daily forecast data
    for (let i = 0; i < 10; i++) {
        const dailyDiv = document.createElement('div');
        const dayDisplay = document.createElement('div');
        const highTempDisplay = document.createElement('div');
        const lowTempDisplay = document.createElement('div');
        const dailyIconDisplay = document.createElement('img');
        let currentDay = '';
        let highTemp = '';
        let lowTemp = '';

        dailyDiv.classList.add('daily-div');

        if (i == 0) {
            currentDay = 'Today';
        } else {
            currentDay = data.dailyForecastArray[i].day;
        }

        if (unitType == 'far') {
            highTemp = data.dailyForecastArray[i].hightemp_f;
            lowTemp = data.dailyForecastArray[i].lowtemp_f;
        } else if (unitType == 'cel') {
            highTemp = data.dailyForecastArray[i].hightemp_c;
            lowTemp = data.dailyForecastArray[i].lowtemp_c;
        }

        dayDisplay.textContent = currentDay;
        highTempDisplay.textContent = `H: ${highTemp}°`;
        lowTempDisplay.textContent = `L: ${lowTemp}°`;
        dailyIconDisplay.src = data.dailyForecastArray[i].icon;

        dailyDiv.appendChild(dayDisplay);
        dailyDiv.appendChild(highTempDisplay);
        dailyDiv.appendChild(lowTempDisplay);
        dailyDiv.appendChild(dailyIconDisplay);
        dailyContainer.appendChild(dailyDiv);
    }

    // Display hourly forecast data
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

// EVENT LISTENERS IF YOU WANT IT TO FETCH DATA EVERY TIME YOU TOGGLE UNITS
// celBtn.addEventListener('click', () => {
//     farBtn.classList.remove('selected');
//     celBtn.classList.add('selected');
//     unitType = 'cel';
//     console.log(unitType);
//     getWeatherData(locationDisplay.textContent);
// });

// farBtn.addEventListener('click', () => {
//     celBtn.classList.remove('selected');
//     farBtn.classList.add('selected');
//     unitType = 'far';
//     console.log(unitType);
//     getWeatherData(locationDisplay.textContent);
// });



/* 
TO DO

add daily info

    fetch required data

    tie data to html elements or create html elements to display data

    fix UI

handle errors 

    add error messages when an invalid location is searched

add loading icon

maybe add local storage????

maybe add a refresh button next to time????

add footer
 */
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLFNBQVM7QUFDckQsMkNBQTJDLFFBQVE7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7Ozs7QUFJSjtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0Jyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuY29uc3QgbG9jYXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJyk7XG5jb25zdCBsb2NhbFRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2FsLXRpbWUnKTtcbmNvbnN0IGljb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24nKTtcbmNvbnN0IHRlbXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXAnKTtcbmNvbnN0IGNvbmRpdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uJyk7XG5jb25zdCBmZWVsc0xpa2VEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWxzLWxpa2UnKTtcbmNvbnN0IGhpZ2hMb3dEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2gtbG93Jyk7XG5jb25zdCByYWluRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWluJyk7XG5jb25zdCBjbG91ZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvdWQnKTtcbmNvbnN0IHZpc2liaWxpdHlEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2liaWxpdHknKTtcbmNvbnN0IHdpbmREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbmNvbnN0IGh1bWlkaXR5RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1pZGl0eScpO1xuY29uc3QgdXZEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3V2Jyk7XG5jb25zdCBzdW5yaXNlRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW5yaXNlJyk7XG5jb25zdCBzdW5zZXREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bnNldCcpO1xuY29uc3QgY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbC1idG4nKTtcbmNvbnN0IGZhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYXItYnRuJyk7XG5jb25zdCBkYWlseUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWlseS1idG4nKTtcbmNvbnN0IGhvdXJseUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3VybHktYnRuJyk7XG5jb25zdCBkYWlseUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYWlseS1jb250YWluZXInKTtcbmNvbnN0IGhvdXJseUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktY29udGFpbmVyJyk7XG5jb25zdCBkYWlseUZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhaWx5LWZvcmVjYXN0Jyk7XG5jb25zdCBob3VybHlGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktZm9yZWNhc3QnKTtcbmxldCB1bml0VHlwZSA9ICdmYXInO1xubGV0IGZvcmVjYXN0VHlwZSA9ICdkYWlseSc7XG5sZXQgdGVtcCA9ICcnO1xubGV0IGZlZWxzTGlrZSA9ICcnO1xubGV0IHdpbmQgPSAnJztcbmxldCB2aXMgPSAnJztcbmxldCBtaW50ZW1wID0gJyc7XG5sZXQgbWF4dGVtcCA9ICcnO1xubGV0IGxvY2F0aW9uID0gJyc7XG5sZXQgc3RhdGVBYmJyID0gJyc7XG5sZXQgc3VucmlzZSA9ICcnO1xubGV0IHN1bnNldCA9ICcnO1xuXG4vLyBGZXRjaCB3ZWF0aGVyIGRhdGEgZnJvbSB3ZWF0aGVyIEFQSVxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKGxvY2F0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uJmZvcmVjYXN0Lmpzb24/a2V5PWNkNzdhNTc3ZjQzNDRiOTQ5YzAyMDUzNDAyMzE1MDUmcT0ke2xvY2F0aW9ufSZkYXlzPTEwYCwge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICAgICAgICByZXR1cm4od2VhdGhlckRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gICAgXG59XG5cbi8vIFByb2Nlc3MgdGhlIGpzb24gZGF0YSBmcm9tIEFQSSBhbmQgcmV0dXJuIG9iamVjdCB3aXRoIG9ubHkgcmVxdWlyZWQgZGF0YVxuZnVuY3Rpb24gRGF0YShkYXRhKSB7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGRhdGEubG9jYXRpb24ubmFtZTtcbiAgICB0aGlzLnJlZ2lvbiA9IGRhdGEubG9jYXRpb24ucmVnaW9uO1xuICAgIHRoaXMuY291bnRyeSA9IGRhdGEubG9jYXRpb24uY291bnRyeTtcbiAgICB0aGlzLmxvY2FsVGltZSA9IGRhdGEubG9jYXRpb24ubG9jYWx0aW1lO1xuICAgIHRoaXMudGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9mKTtcbiAgICB0aGlzLnRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfYyk7XG4gICAgdGhpcy5pY29uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uO1xuICAgIHRoaXMuY29uZGl0aW9uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuICAgIHRoaXMuZmVlbHNsaWtlX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZik7XG4gICAgdGhpcy5mZWVsc2xpa2VfYyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jKTtcbiAgICB0aGlzLmh1bWlkaXR5ID0gZGF0YS5jdXJyZW50Lmh1bWlkaXR5O1xuICAgIHRoaXMudXYgPSBkYXRhLmN1cnJlbnQudXY7XG4gICAgdGhpcy5jbG91ZCA9IGRhdGEuY3VycmVudC5jbG91ZDtcbiAgICB0aGlzLndpbmRfbXBoID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQud2luZF9tcGgpO1xuICAgIHRoaXMud2luZF9rcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX2twaCk7XG4gICAgdGhpcy52aXNfbWlsZXMgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfbWlsZXMpO1xuICAgIHRoaXMudmlzX2ttID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudmlzX2ttKTtcbiAgICB0aGlzLnN1bnJpc2UgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnJpc2U7XG4gICAgdGhpcy5zdW5zZXQgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldDtcbiAgICB0aGlzLnJhaW4gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcbiAgICB0aGlzLm1pbnRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mKTtcbiAgICB0aGlzLm1heHRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mKTtcbiAgICB0aGlzLm1pbnRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jKTtcbiAgICB0aGlzLm1heHRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jKTtcblxuICAgIGNvbnN0IGRhdGFMaXN0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcbiAgICBjb25zdCBkYWlseUZvcmVjYXN0QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3REYXkgPSBuZXcgRGF0ZShkYXRhTGlzdFtpXS5kYXRlKS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KTtcbiAgICAgICAgY29uc3QgaGlnaFRlbXBfZiA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1heHRlbXBfZik7XG4gICAgICAgIGNvbnN0IGhpZ2hUZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5tYXh0ZW1wX2MpO1xuICAgICAgICBjb25zdCBsb3dUZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5taW50ZW1wX2YpO1xuICAgICAgICBjb25zdCBsb3dUZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5taW50ZW1wX2MpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdEljb24gPSBkYXRhTGlzdFtpXS5kYXkuY29uZGl0aW9uLmljb247XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmb3JlY2FzdE9iaiA9IHtcbiAgICAgICAgICAgIGRheTogZm9yZWNhc3REYXksXG4gICAgICAgICAgICBoaWdodGVtcF9mOiBoaWdoVGVtcF9mLFxuICAgICAgICAgICAgaGlnaHRlbXBfYzogaGlnaFRlbXBfYyxcbiAgICAgICAgICAgIGxvd3RlbXBfZjogbG93VGVtcF9mLFxuICAgICAgICAgICAgbG93dGVtcF9jOiBsb3dUZW1wX2MsXG4gICAgICAgICAgICBpY29uOiBmb3JlY2FzdEljb24sXG4gICAgICAgIH07XG4gICAgICAgIGRhaWx5Rm9yZWNhc3RBcnJheS5wdXNoKGZvcmVjYXN0T2JqKTtcbiAgICB9XG5cbiAgICB0aGlzLmRhaWx5Rm9yZWNhc3RBcnJheSA9IGRhaWx5Rm9yZWNhc3RBcnJheTtcbn1cblxuLy8gUmVtb3ZlIGFsbCBjaGlsZCBlbGVtZW50cyBcbmZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuKGRpdikge1xuICAgIHdoaWxlIChkaXYubGFzdENoaWxkKSB7XG4gICAgICAgIGRpdi5yZW1vdmVDaGlsZChkaXYubGFzdENoaWxkKTtcbiAgICB9XG59XG5cbi8vIFJldHVybiB3ZWF0aGVyIGRhdGEgb2JqZWN0IGZvciBzcGVjaWZpZWQgbG9jYXRpb25cbmZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gICAgZmV0Y2hEYXRhKGxvY2F0aW9uKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0YSA9IG5ldyBEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnREYXRhKTtcbiAgICAgICAgICAgIHJldHVybihjdXJyZW50RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZhckJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIHVuaXRUeXBlID0gJ2NlbCc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codW5pdFR5cGUpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZmFyQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgdW5pdFR5cGUgPSAnZmFyJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRhaWx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGhvdXJseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGRhaWx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUeXBlID0gJ2RhaWx5JztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmb3JlY2FzdFR5cGUpO1xuXG4gICAgICAgICAgICAgICAgaG91cmx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBkYWlseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGhvdXJseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkYWlseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGhvdXJseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0VHlwZSA9ICdob3VybHknO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0VHlwZSk7XG5cbiAgICAgICAgICAgICAgICBkYWlseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgaG91cmx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgfVxuICAgICk7XG59XG5cbi8vIFN0YXRlc1xuY29uc3Qgc3RhdGVzID0ge1xuICAgICdBbGFiYW1hJzogJ0FMJyxcbiAgICAnQWxhc2thJzogJ0FLJyxcbiAgICAnQW1lcmljYW4gU2Ftb2EnOiAnQVMnLFxuICAgICdBcml6b25hJzogJ0FaJyxcbiAgICAnQXJrYW5zYXMnOiAnQVInLFxuICAgICdDYWxpZm9ybmlhJzogJ0NBJyxcbiAgICAnQ29sb3JhZG8nOiAnQ08nLFxuICAgICdDb25uZWN0aWN1dCc6ICdDVCcsXG4gICAgJ0RlbGF3YXJlJzogJ0RFJyxcbiAgICAnRGlzdHJpY3QgT2YgQ29sdW1iaWEnOiAnREMnLFxuICAgICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnOiAnRk0nLFxuICAgICdGbG9yaWRhJzogJ0ZMJyxcbiAgICAnR2VvcmdpYSc6ICdHQScsXG4gICAgJ0d1YW0nOiAnR1UnLFxuICAgICdIYXdhaWknOiAnSEknLFxuICAgICdJZGFobyc6ICdJRCcsXG4gICAgJ0lsbGlub2lzJzogJ0lMJyxcbiAgICAnSW5kaWFuYSc6ICdJTicsXG4gICAgJ0lvd2EnOiAnSUEnLFxuICAgICdLYW5zYXMnOiAnS1MnLFxuICAgICdLZW50dWNreSc6ICdLWScsXG4gICAgJ0xvdWlzaWFuYSc6ICdMQScsXG4gICAgJ01haW5lJzogJ01FJyxcbiAgICAnTWFyc2hhbGwgSXNsYW5kcyc6ICdNSCcsXG4gICAgJ01hcnlsYW5kJzogJ01EJyxcbiAgICAnTWFzc2FjaHVzZXR0cyc6ICdNQScsXG4gICAgJ01pY2hpZ2FuJzogJ01JJyxcbiAgICAnTWlubmVzb3RhJzogJ01OJyxcbiAgICAnTWlzc2lzc2lwcGknOiAnTVMnLFxuICAgICdNaXNzb3VyaSc6ICdNTycsXG4gICAgJ01vbnRhbmEnOiAnTVQnLFxuICAgICdOZWJyYXNrYSc6ICdORScsXG4gICAgJ05ldmFkYSc6ICdOVicsXG4gICAgJ05ldyBIYW1wc2hpcmUnOiAnTkgnLFxuICAgICdOZXcgSmVyc2V5JzogJ05KJyxcbiAgICAnTmV3IE1leGljbyc6ICdOTScsXG4gICAgJ05ldyBZb3JrJzogJ05ZJyxcbiAgICAnTm9ydGggQ2Fyb2xpbmEnOiAnTkMnLFxuICAgICdOb3J0aCBEYWtvdGEnOiAnTkQnLFxuICAgICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnOiAnTVAnLFxuICAgICdPaGlvJzogJ09IJyxcbiAgICAnT2tsYWhvbWEnOiAnT0snLFxuICAgICdPcmVnb24nOiAnT1InLFxuICAgICdQYWxhdSc6ICdQVycsXG4gICAgJ1Blbm5zeWx2YW5pYSc6ICdQQScsXG4gICAgJ1B1ZXJ0byBSaWNvJzogJ1BSJyxcbiAgICAnUmhvZGUgSXNsYW5kJzogJ1JJJyxcbiAgICAnU291dGggQ2Fyb2xpbmEnOiAnU0MnLFxuICAgICdTb3V0aCBEYWtvdGEnOiAnU0QnLFxuICAgICdUZW5uZXNzZWUnOiAnVE4nLFxuICAgICdUZXhhcyc6ICdUWCcsXG4gICAgJ1V0YWgnOiAnVVQnLFxuICAgICdWZXJtb250JzogJ1ZUJyxcbiAgICAnVmlyZ2luIElzbGFuZHMnOiAnVkknLFxuICAgICdWaXJnaW5pYSc6ICdWQScsXG4gICAgJ1dhc2hpbmd0b24nOiAnV0EnLFxuICAgICdXZXN0IFZpcmdpbmlhJzogJ1dWJyxcbiAgICAnV2lzY29uc2luJzogJ1dJJyxcbiAgICAnV3lvbWluZyc6ICdXWSdcbn1cblxuLy8gR2V0IHN0YXRlIGFiYnJldmlhdGlvblxuZnVuY3Rpb24gZ2V0U3RhdGVBYmJyKHN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlc1tzdGF0ZV07XG59XG5cbi8vIERpc3BsYXkgZGF0YVxuZnVuY3Rpb24gZGlzcGxheURhdGEoZGF0YSkge1xuXG4gICAgcmVtb3ZlQ2hpbGRyZW4oZGFpbHlDb250YWluZXIpO1xuICAgIHJlbW92ZUNoaWxkcmVuKGhvdXJseUNvbnRhaW5lcik7XG5cbiAgICAvLyBEaXNwbGF5IGN1cnJlbnQgZm9yZWNhc3QgZGF0YVxuICAgIGlmICh1bml0VHlwZSA9PSAnZmFyJykge1xuICAgICAgICB0ZW1wID0gZGF0YS50ZW1wX2Y7XG4gICAgICAgIGZlZWxzTGlrZSA9IGRhdGEuZmVlbHNsaWtlX2Y7XG4gICAgICAgIG1heHRlbXAgPSBkYXRhLm1heHRlbXBfZjtcbiAgICAgICAgbWludGVtcCA9IGRhdGEubWludGVtcF9mO1xuICAgICAgICB2aXMgPSBgJHtkYXRhLnZpc19taWxlcyAgfW1gO1xuICAgICAgICB3aW5kID0gYCR7ZGF0YS53aW5kX21waCAgfW1waGA7XG4gICAgfSBlbHNlIGlmICh1bml0VHlwZSA9PSAnY2VsJykge1xuICAgICAgICB0ZW1wID0gZGF0YS50ZW1wX2M7XG4gICAgICAgIGZlZWxzTGlrZSA9IGRhdGEuZmVlbHNsaWtlX2M7XG4gICAgICAgIG1heHRlbXAgPSBkYXRhLm1heHRlbXBfYztcbiAgICAgICAgbWludGVtcCA9IGRhdGEubWludGVtcF9jO1xuICAgICAgICB2aXMgPSBgJHtkYXRhLnZpc19rbSAgfWttYDtcbiAgICAgICAgd2luZCA9IGAke2RhdGEud2luZF9rcGggIH1rcGhgO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmNvdW50cnkgPT0gJ1VuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYScgfHwgZGF0YS5jb3VudHJ5ID09ICdVU0EnKSB7XG4gICAgICAgIHN0YXRlQWJiciA9IGdldFN0YXRlQWJicihkYXRhLnJlZ2lvbik7XG4gICAgICAgIGlmIChzdGF0ZUFiYnIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2NhdGlvbiA9IGAke2RhdGEubG9jYXRpb259LCBVbml0ZWQgU3RhdGVzYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sICR7c3RhdGVBYmJyfSwgVW5pdGVkIFN0YXRlc2A7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBsb2NhdGlvbiA9IGAke2RhdGEubG9jYXRpb259LCAke2RhdGEuY291bnRyeX1gO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoZGF0YS5sb2NhbFRpbWUpO1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBjdXJyZW50RGF0ZS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IHdlZWtkYXk6ICdsb25nJywgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJywgaG91cjogJ251bWVyaWMnLCBtaW51dGU6ICdudW1lcmljJywgaG91cjEyOiB0cnVlIH0pO1xuXG4gICAgaWYgKGRhdGEuc3VucmlzZS5zdGFydHNXaXRoKDApKSB7XG4gICAgICAgIHN1bnJpc2UgPSBkYXRhLnN1bnJpc2Uuc2xpY2UoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3VucmlzZSA9IGRhdGEuc3VucmlzZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zdW5zZXQuc3RhcnRzV2l0aCgwKSkge1xuICAgICAgICBzdW5zZXQgPSBkYXRhLnN1bnNldC5zbGljZSgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdW5zZXQgPSBkYXRhLnN1bnNldDtcbiAgICB9XG5cbiAgICBsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBsb2NhdGlvbjtcbiAgICBsb2NhbFRpbWVEaXNwbGF5LnRleHRDb250ZW50ID0gZm9ybWF0dGVkRGF0ZTtcbiAgICBpY29uRGlzcGxheS5zcmMgPSBkYXRhLmljb247XG4gICAgdGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHt0ZW1wfcKwYDtcbiAgICBjb25kaXRpb25EaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS5jb25kaXRpb247XG4gICAgZmVlbHNMaWtlRGlzcGxheS50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7ZmVlbHNMaWtlfcKwYDtcbiAgICBoaWdoTG93RGlzcGxheS50ZXh0Q29udGVudCA9IGBIOiAke21heHRlbXB9wrAgTDogJHttaW50ZW1wfcKwYDtcbiAgICByYWluRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEucmFpbn0lYDtcbiAgICBjbG91ZERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNsb3VkfSVgO1xuICAgIHZpc2liaWxpdHlEaXNwbGF5LnRleHRDb250ZW50ID0gdmlzO1xuICAgIHdpbmREaXNwbGF5LnRleHRDb250ZW50ID0gd2luZDtcbiAgICBodW1pZGl0eURpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmh1bWlkaXR5fSVgO1xuICAgIHV2RGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEudXY7XG4gICAgc3VucmlzZURpc3BsYXkudGV4dENvbnRlbnQgPSBzdW5yaXNlO1xuICAgIHN1bnNldERpc3BsYXkudGV4dENvbnRlbnQgPSBzdW5zZXQ7XG5cbiAgICAvLyBEaXNwbGF5IGRhaWx5IGZvcmVjYXN0IGRhdGFcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGFpbHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZGF5RGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBoaWdoVGVtcERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbG93VGVtcERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZGFpbHlJY29uRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBsZXQgY3VycmVudERheSA9ICcnO1xuICAgICAgICBsZXQgaGlnaFRlbXAgPSAnJztcbiAgICAgICAgbGV0IGxvd1RlbXAgPSAnJztcblxuICAgICAgICBkYWlseURpdi5jbGFzc0xpc3QuYWRkKCdkYWlseS1kaXYnKTtcblxuICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICBjdXJyZW50RGF5ID0gJ1RvZGF5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnREYXkgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5kYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5pdFR5cGUgPT0gJ2ZhcicpIHtcbiAgICAgICAgICAgIGhpZ2hUZW1wID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uaGlnaHRlbXBfZjtcbiAgICAgICAgICAgIGxvd1RlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5sb3d0ZW1wX2Y7XG4gICAgICAgIH0gZWxzZSBpZiAodW5pdFR5cGUgPT0gJ2NlbCcpIHtcbiAgICAgICAgICAgIGhpZ2hUZW1wID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uaGlnaHRlbXBfYztcbiAgICAgICAgICAgIGxvd1RlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5sb3d0ZW1wX2M7XG4gICAgICAgIH1cblxuICAgICAgICBkYXlEaXNwbGF5LnRleHRDb250ZW50ID0gY3VycmVudERheTtcbiAgICAgICAgaGlnaFRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYEg6ICR7aGlnaFRlbXB9wrBgO1xuICAgICAgICBsb3dUZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGBMOiAke2xvd1RlbXB9wrBgO1xuICAgICAgICBkYWlseUljb25EaXNwbGF5LnNyYyA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmljb247XG5cbiAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoZGF5RGlzcGxheSk7XG4gICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGhpZ2hUZW1wRGlzcGxheSk7XG4gICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGxvd1RlbXBEaXNwbGF5KTtcbiAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoZGFpbHlJY29uRGlzcGxheSk7XG4gICAgICAgIGRhaWx5Q29udGFpbmVyLmFwcGVuZENoaWxkKGRhaWx5RGl2KTtcbiAgICB9XG5cbiAgICAvLyBEaXNwbGF5IGhvdXJseSBmb3JlY2FzdCBkYXRhXG59XG5cbi8vIEluaXRpYWwgZGlzcGxheVxuZ2V0V2VhdGhlckRhdGEoJ3NlYXR0bGUnKTtcblxuLy8gU2VhcmNoIG5ldyBsb2NhdGlvblxuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoIXNlYXJjaEZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgIHNlYXJjaEZvcm0ucmVwb3J0VmFsaWRpdHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnZXRXZWF0aGVyRGF0YShzZWFyY2hJbnB1dC52YWx1ZSk7XG4gICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59KTtcblxuLy8gRVZFTlQgTElTVEVORVJTIElGIFlPVSBXQU5UIElUIFRPIEZFVENIIERBVEEgRVZFUlkgVElNRSBZT1UgVE9HR0xFIFVOSVRTXG4vLyBjZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgZmFyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4vLyAgICAgY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4vLyAgICAgdW5pdFR5cGUgPSAnY2VsJztcbi8vICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4vLyAgICAgZ2V0V2VhdGhlckRhdGEobG9jYXRpb25EaXNwbGF5LnRleHRDb250ZW50KTtcbi8vIH0pO1xuXG4vLyBmYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4vLyAgICAgZmFyQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4vLyAgICAgdW5pdFR5cGUgPSAnZmFyJztcbi8vICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4vLyAgICAgZ2V0V2VhdGhlckRhdGEobG9jYXRpb25EaXNwbGF5LnRleHRDb250ZW50KTtcbi8vIH0pO1xuXG5cblxuLyogXG5UTyBET1xuXG5hZGQgZGFpbHkgaW5mb1xuXG4gICAgZmV0Y2ggcmVxdWlyZWQgZGF0YVxuXG4gICAgdGllIGRhdGEgdG8gaHRtbCBlbGVtZW50cyBvciBjcmVhdGUgaHRtbCBlbGVtZW50cyB0byBkaXNwbGF5IGRhdGFcblxuICAgIGZpeCBVSVxuXG5oYW5kbGUgZXJyb3JzIFxuXG4gICAgYWRkIGVycm9yIG1lc3NhZ2VzIHdoZW4gYW4gaW52YWxpZCBsb2NhdGlvbiBpcyBzZWFyY2hlZFxuXG5hZGQgbG9hZGluZyBpY29uXG5cbm1heWJlIGFkZCBsb2NhbCBzdG9yYWdlPz8/P1xuXG5tYXliZSBhZGQgYSByZWZyZXNoIGJ1dHRvbiBuZXh0IHRvIHRpbWU/Pz8/XG5cbmFkZCBmb290ZXJcbiAqLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==