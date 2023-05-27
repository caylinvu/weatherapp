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

    const hourlyDataList = data.forecast.forecastday[0].hour;
    const hourlyForecastArray = [];
    for (let i = 0; i < 24; i++) {
        const forecastHour = new Date(hourlyDataList[i].time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const temperature_f = Math.round(hourlyDataList[i].temp_f);
        const temperature_c = Math.round(hourlyDataList[i].temp_c);
        const hourlyForecastIcon = hourlyDataList[i].condition.icon;
        
        const hourlyForecastObj = {
            hour: forecastHour,
            temp_f: temperature_f,
            temp_c: temperature_c,
            icon: hourlyForecastIcon,
        };
        hourlyForecastArray.push(hourlyForecastObj);
    }

    const nextDayData = data.forecast.forecastday[1].hour;
    const nextDayForecastArray = [];
    for (let i = 0; i < 24; i++) {
        const nextDayForecastHour = new Date(nextDayData[i].time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const nextDayTemp_f = Math.round(nextDayData[i].temp_f);
        const nextDayTemp_c = Math.round(nextDayData[i].temp_c);
        const nextDayForecastIcon = nextDayData[i].condition.icon;
        
        const nextDayForecastObj = {
            hour: nextDayForecastHour,
            temp_f: nextDayTemp_f,
            temp_c: nextDayTemp_c,
            icon: nextDayForecastIcon,
        };
        nextDayForecastArray.push(nextDayForecastObj);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEM7QUFDQSxpREFBaUQsVUFBVTtBQUMzRCx1Q0FBdUMsUUFBUSxPQUFPLFFBQVE7QUFDOUQsaUNBQWlDLFVBQVU7QUFDM0Msa0NBQWtDLFdBQVc7QUFDN0M7QUFDQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMsU0FBUztBQUNyRCwyQ0FBMkMsUUFBUTtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7OztBQUlKO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtJyk7XG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtaW5wdXQnKTtcbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtYnRuJyk7XG5jb25zdCBsb2NhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcbmNvbnN0IGxvY2FsVGltZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYWwtdGltZScpO1xuY29uc3QgaWNvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbicpO1xuY29uc3QgdGVtcERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcCcpO1xuY29uc3QgY29uZGl0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24nKTtcbmNvbnN0IGZlZWxzTGlrZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHMtbGlrZScpO1xuY29uc3QgaGlnaExvd0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlnaC1sb3cnKTtcbmNvbnN0IHJhaW5EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhaW4nKTtcbmNvbnN0IGNsb3VkRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG91ZCcpO1xuY29uc3QgdmlzaWJpbGl0eURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaWJpbGl0eScpO1xuY29uc3Qgd2luZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZCcpO1xuY29uc3QgaHVtaWRpdHlEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG5jb25zdCB1dkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXYnKTtcbmNvbnN0IHN1bnJpc2VEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bnJpc2UnKTtcbmNvbnN0IHN1bnNldERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Vuc2V0Jyk7XG5jb25zdCBjZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsLWJ0bicpO1xuY29uc3QgZmFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zhci1idG4nKTtcbmNvbnN0IGRhaWx5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhaWx5LWJ0bicpO1xuY29uc3QgaG91cmx5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdXJseS1idG4nKTtcbmNvbnN0IGRhaWx5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhaWx5LWNvbnRhaW5lcicpO1xuY29uc3QgaG91cmx5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJseS1jb250YWluZXInKTtcbmNvbnN0IGRhaWx5Rm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFpbHktZm9yZWNhc3QnKTtcbmNvbnN0IGhvdXJseUZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJseS1mb3JlY2FzdCcpO1xubGV0IHVuaXRUeXBlID0gJ2Zhcic7XG5sZXQgZm9yZWNhc3RUeXBlID0gJ2RhaWx5JztcbmxldCB0ZW1wID0gJyc7XG5sZXQgZmVlbHNMaWtlID0gJyc7XG5sZXQgd2luZCA9ICcnO1xubGV0IHZpcyA9ICcnO1xubGV0IG1pbnRlbXAgPSAnJztcbmxldCBtYXh0ZW1wID0gJyc7XG5sZXQgbG9jYXRpb24gPSAnJztcbmxldCBzdGF0ZUFiYnIgPSAnJztcbmxldCBzdW5yaXNlID0gJyc7XG5sZXQgc3Vuc2V0ID0gJyc7XG5cbi8vIEZldGNoIHdlYXRoZXIgZGF0YSBmcm9tIHdlYXRoZXIgQVBJXG5hc3luYyBmdW5jdGlvbiBmZXRjaERhdGEobG9jYXRpb24pIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24mZm9yZWNhc3QuanNvbj9rZXk9Y2Q3N2E1NzdmNDM0NGI5NDljMDIwNTM0MDIzMTUwNSZxPSR7bG9jYXRpb259JmRheXM9MTBgLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgICAgIHJldHVybih3ZWF0aGVyRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSAgICBcbn1cblxuLy8gUHJvY2VzcyB0aGUganNvbiBkYXRhIGZyb20gQVBJIGFuZCByZXR1cm4gb2JqZWN0IHdpdGggb25seSByZXF1aXJlZCBkYXRhXG5mdW5jdGlvbiBEYXRhKGRhdGEpIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICAgIHRoaXMucmVnaW9uID0gZGF0YS5sb2NhdGlvbi5yZWdpb247XG4gICAgdGhpcy5jb3VudHJ5ID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5O1xuICAgIHRoaXMubG9jYWxUaW1lID0gZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWU7XG4gICAgdGhpcy50ZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2YpO1xuICAgIHRoaXMudGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9jKTtcbiAgICB0aGlzLmljb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb247XG4gICAgdGhpcy5jb25kaXRpb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG4gICAgdGhpcy5mZWVsc2xpa2VfZiA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mKTtcbiAgICB0aGlzLmZlZWxzbGlrZV9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MpO1xuICAgIHRoaXMuaHVtaWRpdHkgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHk7XG4gICAgdGhpcy51diA9IGRhdGEuY3VycmVudC51djtcbiAgICB0aGlzLmNsb3VkID0gZGF0YS5jdXJyZW50LmNsb3VkO1xuICAgIHRoaXMud2luZF9tcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX21waCk7XG4gICAgdGhpcy53aW5kX2twaCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LndpbmRfa3BoKTtcbiAgICB0aGlzLnZpc19taWxlcyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnZpc19taWxlcyk7XG4gICAgdGhpcy52aXNfa20gPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfa20pO1xuICAgIHRoaXMuc3VucmlzZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZTtcbiAgICB0aGlzLnN1bnNldCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0O1xuICAgIHRoaXMucmFpbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICAgIHRoaXMubWludGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2YpO1xuICAgIHRoaXMubWF4dGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2YpO1xuICAgIHRoaXMubWludGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2MpO1xuICAgIHRoaXMubWF4dGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2MpO1xuXG4gICAgY29uc3QgZGF0YUxpc3QgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5O1xuICAgIGNvbnN0IGRhaWx5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdERheSA9IG5ldyBEYXRlKGRhdGFMaXN0W2ldLmRhdGUpLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ2xvbmcnIH0pO1xuICAgICAgICBjb25zdCBoaWdoVGVtcF9mID0gTWF0aC5yb3VuZChkYXRhTGlzdFtpXS5kYXkubWF4dGVtcF9mKTtcbiAgICAgICAgY29uc3QgaGlnaFRlbXBfYyA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1heHRlbXBfYyk7XG4gICAgICAgIGNvbnN0IGxvd1RlbXBfZiA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1pbnRlbXBfZik7XG4gICAgICAgIGNvbnN0IGxvd1RlbXBfYyA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1pbnRlbXBfYyk7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0SWNvbiA9IGRhdGFMaXN0W2ldLmRheS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0T2JqID0ge1xuICAgICAgICAgICAgZGF5OiBmb3JlY2FzdERheSxcbiAgICAgICAgICAgIGhpZ2h0ZW1wX2Y6IGhpZ2hUZW1wX2YsXG4gICAgICAgICAgICBoaWdodGVtcF9jOiBoaWdoVGVtcF9jLFxuICAgICAgICAgICAgbG93dGVtcF9mOiBsb3dUZW1wX2YsXG4gICAgICAgICAgICBsb3d0ZW1wX2M6IGxvd1RlbXBfYyxcbiAgICAgICAgICAgIGljb246IGZvcmVjYXN0SWNvbixcbiAgICAgICAgfTtcbiAgICAgICAgZGFpbHlGb3JlY2FzdEFycmF5LnB1c2goZm9yZWNhc3RPYmopO1xuICAgIH1cblxuICAgIHRoaXMuZGFpbHlGb3JlY2FzdEFycmF5ID0gZGFpbHlGb3JlY2FzdEFycmF5O1xuXG4gICAgY29uc3QgaG91cmx5RGF0YUxpc3QgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXI7XG4gICAgY29uc3QgaG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdEhvdXIgPSBuZXcgRGF0ZShob3VybHlEYXRhTGlzdFtpXS50aW1lKS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgdGVtcGVyYXR1cmVfZiA9IE1hdGgucm91bmQoaG91cmx5RGF0YUxpc3RbaV0udGVtcF9mKTtcbiAgICAgICAgY29uc3QgdGVtcGVyYXR1cmVfYyA9IE1hdGgucm91bmQoaG91cmx5RGF0YUxpc3RbaV0udGVtcF9jKTtcbiAgICAgICAgY29uc3QgaG91cmx5Rm9yZWNhc3RJY29uID0gaG91cmx5RGF0YUxpc3RbaV0uY29uZGl0aW9uLmljb247XG4gICAgICAgIFxuICAgICAgICBjb25zdCBob3VybHlGb3JlY2FzdE9iaiA9IHtcbiAgICAgICAgICAgIGhvdXI6IGZvcmVjYXN0SG91cixcbiAgICAgICAgICAgIHRlbXBfZjogdGVtcGVyYXR1cmVfZixcbiAgICAgICAgICAgIHRlbXBfYzogdGVtcGVyYXR1cmVfYyxcbiAgICAgICAgICAgIGljb246IGhvdXJseUZvcmVjYXN0SWNvbixcbiAgICAgICAgfTtcbiAgICAgICAgaG91cmx5Rm9yZWNhc3RBcnJheS5wdXNoKGhvdXJseUZvcmVjYXN0T2JqKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0RGF5RGF0YSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uaG91cjtcbiAgICBjb25zdCBuZXh0RGF5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICBjb25zdCBuZXh0RGF5Rm9yZWNhc3RIb3VyID0gbmV3IERhdGUobmV4dERheURhdGFbaV0udGltZSkudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnLCBob3VyMTI6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IG5leHREYXlUZW1wX2YgPSBNYXRoLnJvdW5kKG5leHREYXlEYXRhW2ldLnRlbXBfZik7XG4gICAgICAgIGNvbnN0IG5leHREYXlUZW1wX2MgPSBNYXRoLnJvdW5kKG5leHREYXlEYXRhW2ldLnRlbXBfYyk7XG4gICAgICAgIGNvbnN0IG5leHREYXlGb3JlY2FzdEljb24gPSBuZXh0RGF5RGF0YVtpXS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5leHREYXlGb3JlY2FzdE9iaiA9IHtcbiAgICAgICAgICAgIGhvdXI6IG5leHREYXlGb3JlY2FzdEhvdXIsXG4gICAgICAgICAgICB0ZW1wX2Y6IG5leHREYXlUZW1wX2YsXG4gICAgICAgICAgICB0ZW1wX2M6IG5leHREYXlUZW1wX2MsXG4gICAgICAgICAgICBpY29uOiBuZXh0RGF5Rm9yZWNhc3RJY29uLFxuICAgICAgICB9O1xuICAgICAgICBuZXh0RGF5Rm9yZWNhc3RBcnJheS5wdXNoKG5leHREYXlGb3JlY2FzdE9iaik7XG4gICAgfVxufVxuXG4vLyBSZW1vdmUgYWxsIGNoaWxkIGVsZW1lbnRzIFxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4oZGl2KSB7XG4gICAgd2hpbGUgKGRpdi5sYXN0Q2hpbGQpIHtcbiAgICAgICAgZGl2LnJlbW92ZUNoaWxkKGRpdi5sYXN0Q2hpbGQpO1xuICAgIH1cbn1cblxuLy8gUmV0dXJuIHdlYXRoZXIgZGF0YSBvYmplY3QgZm9yIHNwZWNpZmllZCBsb2NhdGlvblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgICBmZXRjaERhdGEobG9jYXRpb24pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRhID0gbmV3IERhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudERhdGEpO1xuICAgICAgICAgICAgcmV0dXJuKGN1cnJlbnREYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBjZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmFyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgdW5pdFR5cGUgPSAnY2VsJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBmYXJCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB1bml0VHlwZSA9ICdmYXInO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGFpbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaG91cmx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZGFpbHlCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFR5cGUgPSAnZGFpbHknO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0VHlwZSk7XG5cbiAgICAgICAgICAgICAgICBob3VybHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIGRhaWx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaG91cmx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRhaWx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaG91cmx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUeXBlID0gJ2hvdXJseSc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZm9yZWNhc3RUeXBlKTtcblxuICAgICAgICAgICAgICAgIGRhaWx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBob3VybHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICB9XG4gICAgKTtcbn1cblxuLy8gU3RhdGVzXG5jb25zdCBzdGF0ZXMgPSB7XG4gICAgJ0FsYWJhbWEnOiAnQUwnLFxuICAgICdBbGFza2EnOiAnQUsnLFxuICAgICdBbWVyaWNhbiBTYW1vYSc6ICdBUycsXG4gICAgJ0FyaXpvbmEnOiAnQVonLFxuICAgICdBcmthbnNhcyc6ICdBUicsXG4gICAgJ0NhbGlmb3JuaWEnOiAnQ0EnLFxuICAgICdDb2xvcmFkbyc6ICdDTycsXG4gICAgJ0Nvbm5lY3RpY3V0JzogJ0NUJyxcbiAgICAnRGVsYXdhcmUnOiAnREUnLFxuICAgICdEaXN0cmljdCBPZiBDb2x1bWJpYSc6ICdEQycsXG4gICAgJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYSc6ICdGTScsXG4gICAgJ0Zsb3JpZGEnOiAnRkwnLFxuICAgICdHZW9yZ2lhJzogJ0dBJyxcbiAgICAnR3VhbSc6ICdHVScsXG4gICAgJ0hhd2FpaSc6ICdISScsXG4gICAgJ0lkYWhvJzogJ0lEJyxcbiAgICAnSWxsaW5vaXMnOiAnSUwnLFxuICAgICdJbmRpYW5hJzogJ0lOJyxcbiAgICAnSW93YSc6ICdJQScsXG4gICAgJ0thbnNhcyc6ICdLUycsXG4gICAgJ0tlbnR1Y2t5JzogJ0tZJyxcbiAgICAnTG91aXNpYW5hJzogJ0xBJyxcbiAgICAnTWFpbmUnOiAnTUUnLFxuICAgICdNYXJzaGFsbCBJc2xhbmRzJzogJ01IJyxcbiAgICAnTWFyeWxhbmQnOiAnTUQnLFxuICAgICdNYXNzYWNodXNldHRzJzogJ01BJyxcbiAgICAnTWljaGlnYW4nOiAnTUknLFxuICAgICdNaW5uZXNvdGEnOiAnTU4nLFxuICAgICdNaXNzaXNzaXBwaSc6ICdNUycsXG4gICAgJ01pc3NvdXJpJzogJ01PJyxcbiAgICAnTW9udGFuYSc6ICdNVCcsXG4gICAgJ05lYnJhc2thJzogJ05FJyxcbiAgICAnTmV2YWRhJzogJ05WJyxcbiAgICAnTmV3IEhhbXBzaGlyZSc6ICdOSCcsXG4gICAgJ05ldyBKZXJzZXknOiAnTkonLFxuICAgICdOZXcgTWV4aWNvJzogJ05NJyxcbiAgICAnTmV3IFlvcmsnOiAnTlknLFxuICAgICdOb3J0aCBDYXJvbGluYSc6ICdOQycsXG4gICAgJ05vcnRoIERha290YSc6ICdORCcsXG4gICAgJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcyc6ICdNUCcsXG4gICAgJ09oaW8nOiAnT0gnLFxuICAgICdPa2xhaG9tYSc6ICdPSycsXG4gICAgJ09yZWdvbic6ICdPUicsXG4gICAgJ1BhbGF1JzogJ1BXJyxcbiAgICAnUGVubnN5bHZhbmlhJzogJ1BBJyxcbiAgICAnUHVlcnRvIFJpY28nOiAnUFInLFxuICAgICdSaG9kZSBJc2xhbmQnOiAnUkknLFxuICAgICdTb3V0aCBDYXJvbGluYSc6ICdTQycsXG4gICAgJ1NvdXRoIERha290YSc6ICdTRCcsXG4gICAgJ1Rlbm5lc3NlZSc6ICdUTicsXG4gICAgJ1RleGFzJzogJ1RYJyxcbiAgICAnVXRhaCc6ICdVVCcsXG4gICAgJ1Zlcm1vbnQnOiAnVlQnLFxuICAgICdWaXJnaW4gSXNsYW5kcyc6ICdWSScsXG4gICAgJ1ZpcmdpbmlhJzogJ1ZBJyxcbiAgICAnV2FzaGluZ3Rvbic6ICdXQScsXG4gICAgJ1dlc3QgVmlyZ2luaWEnOiAnV1YnLFxuICAgICdXaXNjb25zaW4nOiAnV0knLFxuICAgICdXeW9taW5nJzogJ1dZJ1xufVxuXG4vLyBHZXQgc3RhdGUgYWJicmV2aWF0aW9uXG5mdW5jdGlvbiBnZXRTdGF0ZUFiYnIoc3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGVzW3N0YXRlXTtcbn1cblxuLy8gRGlzcGxheSBkYXRhXG5mdW5jdGlvbiBkaXNwbGF5RGF0YShkYXRhKSB7XG5cbiAgICByZW1vdmVDaGlsZHJlbihkYWlseUNvbnRhaW5lcik7XG4gICAgcmVtb3ZlQ2hpbGRyZW4oaG91cmx5Q29udGFpbmVyKTtcblxuICAgIC8vIERpc3BsYXkgY3VycmVudCBmb3JlY2FzdCBkYXRhXG4gICAgaWYgKHVuaXRUeXBlID09ICdmYXInKSB7XG4gICAgICAgIHRlbXAgPSBkYXRhLnRlbXBfZjtcbiAgICAgICAgZmVlbHNMaWtlID0gZGF0YS5mZWVsc2xpa2VfZjtcbiAgICAgICAgbWF4dGVtcCA9IGRhdGEubWF4dGVtcF9mO1xuICAgICAgICBtaW50ZW1wID0gZGF0YS5taW50ZW1wX2Y7XG4gICAgICAgIHZpcyA9IGAke2RhdGEudmlzX21pbGVzICB9bWA7XG4gICAgICAgIHdpbmQgPSBgJHtkYXRhLndpbmRfbXBoICB9bXBoYDtcbiAgICB9IGVsc2UgaWYgKHVuaXRUeXBlID09ICdjZWwnKSB7XG4gICAgICAgIHRlbXAgPSBkYXRhLnRlbXBfYztcbiAgICAgICAgZmVlbHNMaWtlID0gZGF0YS5mZWVsc2xpa2VfYztcbiAgICAgICAgbWF4dGVtcCA9IGRhdGEubWF4dGVtcF9jO1xuICAgICAgICBtaW50ZW1wID0gZGF0YS5taW50ZW1wX2M7XG4gICAgICAgIHZpcyA9IGAke2RhdGEudmlzX2ttICB9a21gO1xuICAgICAgICB3aW5kID0gYCR7ZGF0YS53aW5kX2twaCAgfWtwaGA7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuY291bnRyeSA9PSAnVW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNhJyB8fCBkYXRhLmNvdW50cnkgPT0gJ1VTQScpIHtcbiAgICAgICAgc3RhdGVBYmJyID0gZ2V0U3RhdGVBYmJyKGRhdGEucmVnaW9uKTtcbiAgICAgICAgaWYgKHN0YXRlQWJiciA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sIFVuaXRlZCBTdGF0ZXNgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9jYXRpb24gPSBgJHtkYXRhLmxvY2F0aW9ufSwgJHtzdGF0ZUFiYnJ9LCBVbml0ZWQgU3RhdGVzYDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sICR7ZGF0YS5jb3VudHJ5fWA7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZShkYXRhLmxvY2FsVGltZSk7XG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGN1cnJlbnREYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ2xvbmcnLCB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnLCBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnLCBob3VyMTI6IHRydWUgfSk7XG5cbiAgICBpZiAoZGF0YS5zdW5yaXNlLnN0YXJ0c1dpdGgoMCkpIHtcbiAgICAgICAgc3VucmlzZSA9IGRhdGEuc3VucmlzZS5zbGljZSgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdW5yaXNlID0gZGF0YS5zdW5yaXNlO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnN1bnNldC5zdGFydHNXaXRoKDApKSB7XG4gICAgICAgIHN1bnNldCA9IGRhdGEuc3Vuc2V0LnNsaWNlKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bnNldCA9IGRhdGEuc3Vuc2V0O1xuICAgIH1cblxuICAgIGxvY2F0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGxvY2F0aW9uO1xuICAgIGxvY2FsVGltZURpc3BsYXkudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWREYXRlO1xuICAgIGljb25EaXNwbGF5LnNyYyA9IGRhdGEuaWNvbjtcbiAgICB0ZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGAke3RlbXB9wrBgO1xuICAgIGNvbmRpdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLmNvbmRpdGlvbjtcbiAgICBmZWVsc0xpa2VEaXNwbGF5LnRleHRDb250ZW50ID0gYEZlZWxzIGxpa2UgJHtmZWVsc0xpa2V9wrBgO1xuICAgIGhpZ2hMb3dEaXNwbGF5LnRleHRDb250ZW50ID0gYEg6ICR7bWF4dGVtcH3CsCBMOiAke21pbnRlbXB9wrBgO1xuICAgIHJhaW5EaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5yYWlufSVgO1xuICAgIGNsb3VkRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2xvdWR9JWA7XG4gICAgdmlzaWJpbGl0eURpc3BsYXkudGV4dENvbnRlbnQgPSB2aXM7XG4gICAgd2luZERpc3BsYXkudGV4dENvbnRlbnQgPSB3aW5kO1xuICAgIGh1bWlkaXR5RGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEuaHVtaWRpdHl9JWA7XG4gICAgdXZEaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS51djtcbiAgICBzdW5yaXNlRGlzcGxheS50ZXh0Q29udGVudCA9IHN1bnJpc2U7XG4gICAgc3Vuc2V0RGlzcGxheS50ZXh0Q29udGVudCA9IHN1bnNldDtcblxuICAgIC8vIERpc3BsYXkgZGFpbHkgZm9yZWNhc3QgZGF0YVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBjb25zdCBkYWlseURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBkYXlEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGhpZ2hUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBsb3dUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBkYWlseUljb25EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGxldCBjdXJyZW50RGF5ID0gJyc7XG4gICAgICAgIGxldCBoaWdoVGVtcCA9ICcnO1xuICAgICAgICBsZXQgbG93VGVtcCA9ICcnO1xuXG4gICAgICAgIGRhaWx5RGl2LmNsYXNzTGlzdC5hZGQoJ2RhaWx5LWRpdicpO1xuXG4gICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnREYXkgPSAnVG9kYXknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudERheSA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmRheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bml0VHlwZSA9PSAnZmFyJykge1xuICAgICAgICAgICAgaGlnaFRlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5oaWdodGVtcF9mO1xuICAgICAgICAgICAgbG93VGVtcCA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmxvd3RlbXBfZjtcbiAgICAgICAgfSBlbHNlIGlmICh1bml0VHlwZSA9PSAnY2VsJykge1xuICAgICAgICAgICAgaGlnaFRlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5oaWdodGVtcF9jO1xuICAgICAgICAgICAgbG93VGVtcCA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmxvd3RlbXBfYztcbiAgICAgICAgfVxuXG4gICAgICAgIGRheURpc3BsYXkudGV4dENvbnRlbnQgPSBjdXJyZW50RGF5O1xuICAgICAgICBoaWdoVGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgSDogJHtoaWdoVGVtcH3CsGA7XG4gICAgICAgIGxvd1RlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYEw6ICR7bG93VGVtcH3CsGA7XG4gICAgICAgIGRhaWx5SWNvbkRpc3BsYXkuc3JjID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uaWNvbjtcblxuICAgICAgICBkYWlseURpdi5hcHBlbmRDaGlsZChkYXlEaXNwbGF5KTtcbiAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRlbXBEaXNwbGF5KTtcbiAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQobG93VGVtcERpc3BsYXkpO1xuICAgICAgICBkYWlseURpdi5hcHBlbmRDaGlsZChkYWlseUljb25EaXNwbGF5KTtcbiAgICAgICAgZGFpbHlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGFpbHlEaXYpO1xuICAgIH1cblxuICAgIC8vIERpc3BsYXkgaG91cmx5IGZvcmVjYXN0IGRhdGFcbn1cblxuLy8gSW5pdGlhbCBkaXNwbGF5XG5nZXRXZWF0aGVyRGF0YSgnc2VhdHRsZScpO1xuXG4vLyBTZWFyY2ggbmV3IGxvY2F0aW9uXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICghc2VhcmNoRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgc2VhcmNoRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4vLyBFVkVOVCBMSVNURU5FUlMgSUYgWU9VIFdBTlQgSVQgVE8gRkVUQ0ggREFUQSBFVkVSWSBUSU1FIFlPVSBUT0dHTEUgVU5JVFNcbi8vIGNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBmYXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbi8vICAgICBjZWxCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbi8vICAgICB1bml0VHlwZSA9ICdjZWwnO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbi8vICAgICBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQpO1xuLy8gfSk7XG5cbi8vIGZhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBjZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbi8vICAgICBmYXJCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbi8vICAgICB1bml0VHlwZSA9ICdmYXInO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbi8vICAgICBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQpO1xuLy8gfSk7XG5cblxuXG4vKiBcblRPIERPXG5cbmFkZCBkYWlseSBpbmZvXG5cbiAgICBmZXRjaCByZXF1aXJlZCBkYXRhXG5cbiAgICB0aWUgZGF0YSB0byBodG1sIGVsZW1lbnRzIG9yIGNyZWF0ZSBodG1sIGVsZW1lbnRzIHRvIGRpc3BsYXkgZGF0YVxuXG4gICAgZml4IFVJXG5cbmhhbmRsZSBlcnJvcnMgXG5cbiAgICBhZGQgZXJyb3IgbWVzc2FnZXMgd2hlbiBhbiBpbnZhbGlkIGxvY2F0aW9uIGlzIHNlYXJjaGVkXG5cbmFkZCBsb2FkaW5nIGljb25cblxubWF5YmUgYWRkIGxvY2FsIHN0b3JhZ2U/Pz8/XG5cbm1heWJlIGFkZCBhIHJlZnJlc2ggYnV0dG9uIG5leHQgdG8gdGltZT8/Pz9cblxuYWRkIGZvb3RlclxuICovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9