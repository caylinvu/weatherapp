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
let forecastType = 'hourly';
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

// CAN REMOVE THIS AFTER FINISHING HOURLY DISPLAY
if (forecastType === 'hourly') {
    hourlyForecast.style.display = 'block';
    dailyForecast.style.display = 'none';
    dailyBtn.classList.remove('selected');
    hourlyBtn.classList.add('selected');

} else if (forecastType === 'daily') {
    dailyForecast.style.display = 'block';
    hourlyForecast.style.display = 'none';
    hourlyBtn.classList.remove('selected');
    dailyBtn.classList.add('selected');
}

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

    this.hourlyForecastArray = hourlyForecastArray;

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

    this.nextDayForecastArray = nextDayForecastArray;
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

    // Display daily or hourly forecast data depending on selected button
    if (forecastType === 'daily') {
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

            if (i === 0) {
                currentDay = 'Today';
            } else {
                currentDay = data.dailyForecastArray[i].day;
            }

            if (unitType === 'far') {
                highTemp = data.dailyForecastArray[i].hightemp_f;
                lowTemp = data.dailyForecastArray[i].lowtemp_f;
            } else if (unitType === 'cel') {
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
    } else if (forecastType === 'hourly') {
        for (let i = 0; i < 24; i++) {
            const hourlyDiv = document.createElement('div');
            const hourDisplay = document.createElement('div');
            const hourlyTempDisplay = document.createElement('div');
            const hourlyIconDisplay = document.createElement('img');
            let hourlyTemp = '';

            hourlyDiv.classList.add('hourly-div');

            if (unitType === 'far') {
                hourlyTemp = data.hourlyForecastArray[i].temp_f;
            } else if (unitType === 'cel') {
                hourlyTemp = data.hourlyForecastArray[i].temp_c;
            }

            hourDisplay.textContent = data.hourlyForecastArray[i].hour;
            hourlyTempDisplay.textContent = `${hourlyTemp}°`;
            hourlyIconDisplay.src = data.hourlyForecastArray[i].icon;

            hourlyDiv.appendChild(hourDisplay);
            hourlyDiv.appendChild(hourlyTempDisplay);
            hourlyDiv.appendChild(hourlyIconDisplay);
            hourlyContainer.appendChild(hourlyDiv);
        }
    }


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWZvcm0nKTtcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpO1xuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1idG4nKTtcbmNvbnN0IGxvY2F0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbicpO1xuY29uc3QgbG9jYWxUaW1lRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhbC10aW1lJyk7XG5jb25zdCBpY29uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pY29uJyk7XG5jb25zdCB0ZW1wRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJyk7XG5jb25zdCBjb25kaXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbicpO1xuY29uc3QgZmVlbHNMaWtlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVscy1saWtlJyk7XG5jb25zdCBoaWdoTG93RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoLWxvdycpO1xuY29uc3QgcmFpbkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFpbicpO1xuY29uc3QgY2xvdWREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3VkJyk7XG5jb25zdCB2aXNpYmlsaXR5RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpYmlsaXR5Jyk7XG5jb25zdCB3aW5kRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kJyk7XG5jb25zdCBodW1pZGl0eURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbmNvbnN0IHV2RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1dicpO1xuY29uc3Qgc3VucmlzZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VucmlzZScpO1xuY29uc3Qgc3Vuc2V0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW5zZXQnKTtcbmNvbnN0IGNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWwtYnRuJyk7XG5jb25zdCBmYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFyLWJ0bicpO1xuY29uc3QgZGFpbHlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFpbHktYnRuJyk7XG5jb25zdCBob3VybHlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG91cmx5LWJ0bicpO1xuY29uc3QgZGFpbHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFpbHktY29udGFpbmVyJyk7XG5jb25zdCBob3VybHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG91cmx5LWNvbnRhaW5lcicpO1xuY29uc3QgZGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYWlseS1mb3JlY2FzdCcpO1xuY29uc3QgaG91cmx5Rm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG91cmx5LWZvcmVjYXN0Jyk7XG5sZXQgdW5pdFR5cGUgPSAnZmFyJztcbmxldCBmb3JlY2FzdFR5cGUgPSAnaG91cmx5JztcbmxldCB0ZW1wID0gJyc7XG5sZXQgZmVlbHNMaWtlID0gJyc7XG5sZXQgd2luZCA9ICcnO1xubGV0IHZpcyA9ICcnO1xubGV0IG1pbnRlbXAgPSAnJztcbmxldCBtYXh0ZW1wID0gJyc7XG5sZXQgbG9jYXRpb24gPSAnJztcbmxldCBzdGF0ZUFiYnIgPSAnJztcbmxldCBzdW5yaXNlID0gJyc7XG5sZXQgc3Vuc2V0ID0gJyc7XG5cbi8vIENBTiBSRU1PVkUgVEhJUyBBRlRFUiBGSU5JU0hJTkcgSE9VUkxZIERJU1BMQVlcbmlmIChmb3JlY2FzdFR5cGUgPT09ICdob3VybHknKSB7XG4gICAgaG91cmx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZGFpbHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRhaWx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgaG91cmx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG5cbn0gZWxzZSBpZiAoZm9yZWNhc3RUeXBlID09PSAnZGFpbHknKSB7XG4gICAgZGFpbHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBob3VybHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGhvdXJseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIGRhaWx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG59XG5cbi8vIEZldGNoIHdlYXRoZXIgZGF0YSBmcm9tIHdlYXRoZXIgQVBJXG5hc3luYyBmdW5jdGlvbiBmZXRjaERhdGEobG9jYXRpb24pIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24mZm9yZWNhc3QuanNvbj9rZXk9Y2Q3N2E1NzdmNDM0NGI5NDljMDIwNTM0MDIzMTUwNSZxPSR7bG9jYXRpb259JmRheXM9MTBgLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgICAgIHJldHVybih3ZWF0aGVyRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSAgICBcbn1cblxuLy8gUHJvY2VzcyB0aGUganNvbiBkYXRhIGZyb20gQVBJIGFuZCByZXR1cm4gb2JqZWN0IHdpdGggb25seSByZXF1aXJlZCBkYXRhXG5mdW5jdGlvbiBEYXRhKGRhdGEpIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICAgIHRoaXMucmVnaW9uID0gZGF0YS5sb2NhdGlvbi5yZWdpb247XG4gICAgdGhpcy5jb3VudHJ5ID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5O1xuICAgIHRoaXMubG9jYWxUaW1lID0gZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWU7XG4gICAgdGhpcy50ZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2YpO1xuICAgIHRoaXMudGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9jKTtcbiAgICB0aGlzLmljb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb247XG4gICAgdGhpcy5jb25kaXRpb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG4gICAgdGhpcy5mZWVsc2xpa2VfZiA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mKTtcbiAgICB0aGlzLmZlZWxzbGlrZV9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MpO1xuICAgIHRoaXMuaHVtaWRpdHkgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHk7XG4gICAgdGhpcy51diA9IGRhdGEuY3VycmVudC51djtcbiAgICB0aGlzLmNsb3VkID0gZGF0YS5jdXJyZW50LmNsb3VkO1xuICAgIHRoaXMud2luZF9tcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX21waCk7XG4gICAgdGhpcy53aW5kX2twaCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LndpbmRfa3BoKTtcbiAgICB0aGlzLnZpc19taWxlcyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnZpc19taWxlcyk7XG4gICAgdGhpcy52aXNfa20gPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfa20pO1xuICAgIHRoaXMuc3VucmlzZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZTtcbiAgICB0aGlzLnN1bnNldCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0O1xuICAgIHRoaXMucmFpbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICAgIHRoaXMubWludGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2YpO1xuICAgIHRoaXMubWF4dGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2YpO1xuICAgIHRoaXMubWludGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2MpO1xuICAgIHRoaXMubWF4dGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2MpO1xuXG4gICAgY29uc3QgZGF0YUxpc3QgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5O1xuICAgIGNvbnN0IGRhaWx5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdERheSA9IG5ldyBEYXRlKGRhdGFMaXN0W2ldLmRhdGUpLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ2xvbmcnIH0pO1xuICAgICAgICBjb25zdCBoaWdoVGVtcF9mID0gTWF0aC5yb3VuZChkYXRhTGlzdFtpXS5kYXkubWF4dGVtcF9mKTtcbiAgICAgICAgY29uc3QgaGlnaFRlbXBfYyA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1heHRlbXBfYyk7XG4gICAgICAgIGNvbnN0IGxvd1RlbXBfZiA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1pbnRlbXBfZik7XG4gICAgICAgIGNvbnN0IGxvd1RlbXBfYyA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1pbnRlbXBfYyk7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0SWNvbiA9IGRhdGFMaXN0W2ldLmRheS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0T2JqID0ge1xuICAgICAgICAgICAgZGF5OiBmb3JlY2FzdERheSxcbiAgICAgICAgICAgIGhpZ2h0ZW1wX2Y6IGhpZ2hUZW1wX2YsXG4gICAgICAgICAgICBoaWdodGVtcF9jOiBoaWdoVGVtcF9jLFxuICAgICAgICAgICAgbG93dGVtcF9mOiBsb3dUZW1wX2YsXG4gICAgICAgICAgICBsb3d0ZW1wX2M6IGxvd1RlbXBfYyxcbiAgICAgICAgICAgIGljb246IGZvcmVjYXN0SWNvbixcbiAgICAgICAgfTtcbiAgICAgICAgZGFpbHlGb3JlY2FzdEFycmF5LnB1c2goZm9yZWNhc3RPYmopO1xuICAgIH1cblxuICAgIHRoaXMuZGFpbHlGb3JlY2FzdEFycmF5ID0gZGFpbHlGb3JlY2FzdEFycmF5O1xuXG4gICAgY29uc3QgaG91cmx5RGF0YUxpc3QgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXI7XG4gICAgY29uc3QgaG91cmx5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdEhvdXIgPSBuZXcgRGF0ZShob3VybHlEYXRhTGlzdFtpXS50aW1lKS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgdGVtcGVyYXR1cmVfZiA9IE1hdGgucm91bmQoaG91cmx5RGF0YUxpc3RbaV0udGVtcF9mKTtcbiAgICAgICAgY29uc3QgdGVtcGVyYXR1cmVfYyA9IE1hdGgucm91bmQoaG91cmx5RGF0YUxpc3RbaV0udGVtcF9jKTtcbiAgICAgICAgY29uc3QgaG91cmx5Rm9yZWNhc3RJY29uID0gaG91cmx5RGF0YUxpc3RbaV0uY29uZGl0aW9uLmljb247XG4gICAgICAgIFxuICAgICAgICBjb25zdCBob3VybHlGb3JlY2FzdE9iaiA9IHtcbiAgICAgICAgICAgIGhvdXI6IGZvcmVjYXN0SG91cixcbiAgICAgICAgICAgIHRlbXBfZjogdGVtcGVyYXR1cmVfZixcbiAgICAgICAgICAgIHRlbXBfYzogdGVtcGVyYXR1cmVfYyxcbiAgICAgICAgICAgIGljb246IGhvdXJseUZvcmVjYXN0SWNvbixcbiAgICAgICAgfTtcbiAgICAgICAgaG91cmx5Rm9yZWNhc3RBcnJheS5wdXNoKGhvdXJseUZvcmVjYXN0T2JqKTtcbiAgICB9XG5cbiAgICB0aGlzLmhvdXJseUZvcmVjYXN0QXJyYXkgPSBob3VybHlGb3JlY2FzdEFycmF5O1xuXG4gICAgY29uc3QgbmV4dERheURhdGEgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmhvdXI7XG4gICAgY29uc3QgbmV4dERheUZvcmVjYXN0QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgY29uc3QgbmV4dERheUZvcmVjYXN0SG91ciA9IG5ldyBEYXRlKG5leHREYXlEYXRhW2ldLnRpbWUpLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgaG91cjogJ251bWVyaWMnLCBtaW51dGU6ICdudW1lcmljJywgaG91cjEyOiB0cnVlIH0pO1xuICAgICAgICBjb25zdCBuZXh0RGF5VGVtcF9mID0gTWF0aC5yb3VuZChuZXh0RGF5RGF0YVtpXS50ZW1wX2YpO1xuICAgICAgICBjb25zdCBuZXh0RGF5VGVtcF9jID0gTWF0aC5yb3VuZChuZXh0RGF5RGF0YVtpXS50ZW1wX2MpO1xuICAgICAgICBjb25zdCBuZXh0RGF5Rm9yZWNhc3RJY29uID0gbmV4dERheURhdGFbaV0uY29uZGl0aW9uLmljb247XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZXh0RGF5Rm9yZWNhc3RPYmogPSB7XG4gICAgICAgICAgICBob3VyOiBuZXh0RGF5Rm9yZWNhc3RIb3VyLFxuICAgICAgICAgICAgdGVtcF9mOiBuZXh0RGF5VGVtcF9mLFxuICAgICAgICAgICAgdGVtcF9jOiBuZXh0RGF5VGVtcF9jLFxuICAgICAgICAgICAgaWNvbjogbmV4dERheUZvcmVjYXN0SWNvbixcbiAgICAgICAgfTtcbiAgICAgICAgbmV4dERheUZvcmVjYXN0QXJyYXkucHVzaChuZXh0RGF5Rm9yZWNhc3RPYmopO1xuICAgIH1cblxuICAgIHRoaXMubmV4dERheUZvcmVjYXN0QXJyYXkgPSBuZXh0RGF5Rm9yZWNhc3RBcnJheTtcbn1cblxuLy8gUmVtb3ZlIGFsbCBjaGlsZCBlbGVtZW50cyBcbmZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuKGRpdikge1xuICAgIHdoaWxlIChkaXYubGFzdENoaWxkKSB7XG4gICAgICAgIGRpdi5yZW1vdmVDaGlsZChkaXYubGFzdENoaWxkKTtcbiAgICB9XG59XG5cbi8vIFJldHVybiB3ZWF0aGVyIGRhdGEgb2JqZWN0IGZvciBzcGVjaWZpZWQgbG9jYXRpb25cbmZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XG4gICAgZmV0Y2hEYXRhKGxvY2F0aW9uKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0YSA9IG5ldyBEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnREYXRhKTtcbiAgICAgICAgICAgIHJldHVybihjdXJyZW50RGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZhckJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIHVuaXRUeXBlID0gJ2NlbCc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codW5pdFR5cGUpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZmFyQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgdW5pdFR5cGUgPSAnZmFyJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRhaWx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGhvdXJseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGRhaWx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUeXBlID0gJ2RhaWx5JztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmb3JlY2FzdFR5cGUpO1xuXG4gICAgICAgICAgICAgICAgaG91cmx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBkYWlseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGhvdXJseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkYWlseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGhvdXJseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0VHlwZSA9ICdob3VybHknO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0VHlwZSk7XG5cbiAgICAgICAgICAgICAgICBkYWlseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgaG91cmx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgfVxuICAgICk7XG59XG5cbi8vIFN0YXRlc1xuY29uc3Qgc3RhdGVzID0ge1xuICAgICdBbGFiYW1hJzogJ0FMJyxcbiAgICAnQWxhc2thJzogJ0FLJyxcbiAgICAnQW1lcmljYW4gU2Ftb2EnOiAnQVMnLFxuICAgICdBcml6b25hJzogJ0FaJyxcbiAgICAnQXJrYW5zYXMnOiAnQVInLFxuICAgICdDYWxpZm9ybmlhJzogJ0NBJyxcbiAgICAnQ29sb3JhZG8nOiAnQ08nLFxuICAgICdDb25uZWN0aWN1dCc6ICdDVCcsXG4gICAgJ0RlbGF3YXJlJzogJ0RFJyxcbiAgICAnRGlzdHJpY3QgT2YgQ29sdW1iaWEnOiAnREMnLFxuICAgICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnOiAnRk0nLFxuICAgICdGbG9yaWRhJzogJ0ZMJyxcbiAgICAnR2VvcmdpYSc6ICdHQScsXG4gICAgJ0d1YW0nOiAnR1UnLFxuICAgICdIYXdhaWknOiAnSEknLFxuICAgICdJZGFobyc6ICdJRCcsXG4gICAgJ0lsbGlub2lzJzogJ0lMJyxcbiAgICAnSW5kaWFuYSc6ICdJTicsXG4gICAgJ0lvd2EnOiAnSUEnLFxuICAgICdLYW5zYXMnOiAnS1MnLFxuICAgICdLZW50dWNreSc6ICdLWScsXG4gICAgJ0xvdWlzaWFuYSc6ICdMQScsXG4gICAgJ01haW5lJzogJ01FJyxcbiAgICAnTWFyc2hhbGwgSXNsYW5kcyc6ICdNSCcsXG4gICAgJ01hcnlsYW5kJzogJ01EJyxcbiAgICAnTWFzc2FjaHVzZXR0cyc6ICdNQScsXG4gICAgJ01pY2hpZ2FuJzogJ01JJyxcbiAgICAnTWlubmVzb3RhJzogJ01OJyxcbiAgICAnTWlzc2lzc2lwcGknOiAnTVMnLFxuICAgICdNaXNzb3VyaSc6ICdNTycsXG4gICAgJ01vbnRhbmEnOiAnTVQnLFxuICAgICdOZWJyYXNrYSc6ICdORScsXG4gICAgJ05ldmFkYSc6ICdOVicsXG4gICAgJ05ldyBIYW1wc2hpcmUnOiAnTkgnLFxuICAgICdOZXcgSmVyc2V5JzogJ05KJyxcbiAgICAnTmV3IE1leGljbyc6ICdOTScsXG4gICAgJ05ldyBZb3JrJzogJ05ZJyxcbiAgICAnTm9ydGggQ2Fyb2xpbmEnOiAnTkMnLFxuICAgICdOb3J0aCBEYWtvdGEnOiAnTkQnLFxuICAgICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnOiAnTVAnLFxuICAgICdPaGlvJzogJ09IJyxcbiAgICAnT2tsYWhvbWEnOiAnT0snLFxuICAgICdPcmVnb24nOiAnT1InLFxuICAgICdQYWxhdSc6ICdQVycsXG4gICAgJ1Blbm5zeWx2YW5pYSc6ICdQQScsXG4gICAgJ1B1ZXJ0byBSaWNvJzogJ1BSJyxcbiAgICAnUmhvZGUgSXNsYW5kJzogJ1JJJyxcbiAgICAnU291dGggQ2Fyb2xpbmEnOiAnU0MnLFxuICAgICdTb3V0aCBEYWtvdGEnOiAnU0QnLFxuICAgICdUZW5uZXNzZWUnOiAnVE4nLFxuICAgICdUZXhhcyc6ICdUWCcsXG4gICAgJ1V0YWgnOiAnVVQnLFxuICAgICdWZXJtb250JzogJ1ZUJyxcbiAgICAnVmlyZ2luIElzbGFuZHMnOiAnVkknLFxuICAgICdWaXJnaW5pYSc6ICdWQScsXG4gICAgJ1dhc2hpbmd0b24nOiAnV0EnLFxuICAgICdXZXN0IFZpcmdpbmlhJzogJ1dWJyxcbiAgICAnV2lzY29uc2luJzogJ1dJJyxcbiAgICAnV3lvbWluZyc6ICdXWSdcbn1cblxuLy8gR2V0IHN0YXRlIGFiYnJldmlhdGlvblxuZnVuY3Rpb24gZ2V0U3RhdGVBYmJyKHN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlc1tzdGF0ZV07XG59XG5cbi8vIERpc3BsYXkgZGF0YVxuZnVuY3Rpb24gZGlzcGxheURhdGEoZGF0YSkge1xuXG4gICAgcmVtb3ZlQ2hpbGRyZW4oZGFpbHlDb250YWluZXIpO1xuICAgIHJlbW92ZUNoaWxkcmVuKGhvdXJseUNvbnRhaW5lcik7XG5cbiAgICAvLyBEaXNwbGF5IGN1cnJlbnQgZm9yZWNhc3QgZGF0YVxuICAgIGlmICh1bml0VHlwZSA9PSAnZmFyJykge1xuICAgICAgICB0ZW1wID0gZGF0YS50ZW1wX2Y7XG4gICAgICAgIGZlZWxzTGlrZSA9IGRhdGEuZmVlbHNsaWtlX2Y7XG4gICAgICAgIG1heHRlbXAgPSBkYXRhLm1heHRlbXBfZjtcbiAgICAgICAgbWludGVtcCA9IGRhdGEubWludGVtcF9mO1xuICAgICAgICB2aXMgPSBgJHtkYXRhLnZpc19taWxlcyAgfW1gO1xuICAgICAgICB3aW5kID0gYCR7ZGF0YS53aW5kX21waCAgfW1waGA7XG4gICAgfSBlbHNlIGlmICh1bml0VHlwZSA9PSAnY2VsJykge1xuICAgICAgICB0ZW1wID0gZGF0YS50ZW1wX2M7XG4gICAgICAgIGZlZWxzTGlrZSA9IGRhdGEuZmVlbHNsaWtlX2M7XG4gICAgICAgIG1heHRlbXAgPSBkYXRhLm1heHRlbXBfYztcbiAgICAgICAgbWludGVtcCA9IGRhdGEubWludGVtcF9jO1xuICAgICAgICB2aXMgPSBgJHtkYXRhLnZpc19rbSAgfWttYDtcbiAgICAgICAgd2luZCA9IGAke2RhdGEud2luZF9rcGggIH1rcGhgO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmNvdW50cnkgPT0gJ1VuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYScgfHwgZGF0YS5jb3VudHJ5ID09ICdVU0EnKSB7XG4gICAgICAgIHN0YXRlQWJiciA9IGdldFN0YXRlQWJicihkYXRhLnJlZ2lvbik7XG4gICAgICAgIGlmIChzdGF0ZUFiYnIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2NhdGlvbiA9IGAke2RhdGEubG9jYXRpb259LCBVbml0ZWQgU3RhdGVzYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sICR7c3RhdGVBYmJyfSwgVW5pdGVkIFN0YXRlc2A7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBsb2NhdGlvbiA9IGAke2RhdGEubG9jYXRpb259LCAke2RhdGEuY291bnRyeX1gO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoZGF0YS5sb2NhbFRpbWUpO1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBjdXJyZW50RGF0ZS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IHdlZWtkYXk6ICdsb25nJywgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJywgaG91cjogJ251bWVyaWMnLCBtaW51dGU6ICdudW1lcmljJywgaG91cjEyOiB0cnVlIH0pO1xuXG4gICAgaWYgKGRhdGEuc3VucmlzZS5zdGFydHNXaXRoKDApKSB7XG4gICAgICAgIHN1bnJpc2UgPSBkYXRhLnN1bnJpc2Uuc2xpY2UoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3VucmlzZSA9IGRhdGEuc3VucmlzZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zdW5zZXQuc3RhcnRzV2l0aCgwKSkge1xuICAgICAgICBzdW5zZXQgPSBkYXRhLnN1bnNldC5zbGljZSgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdW5zZXQgPSBkYXRhLnN1bnNldDtcbiAgICB9XG5cbiAgICBsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBsb2NhdGlvbjtcbiAgICBsb2NhbFRpbWVEaXNwbGF5LnRleHRDb250ZW50ID0gZm9ybWF0dGVkRGF0ZTtcbiAgICBpY29uRGlzcGxheS5zcmMgPSBkYXRhLmljb247XG4gICAgdGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHt0ZW1wfcKwYDtcbiAgICBjb25kaXRpb25EaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS5jb25kaXRpb247XG4gICAgZmVlbHNMaWtlRGlzcGxheS50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7ZmVlbHNMaWtlfcKwYDtcbiAgICBoaWdoTG93RGlzcGxheS50ZXh0Q29udGVudCA9IGBIOiAke21heHRlbXB9wrAgTDogJHttaW50ZW1wfcKwYDtcbiAgICByYWluRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEucmFpbn0lYDtcbiAgICBjbG91ZERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNsb3VkfSVgO1xuICAgIHZpc2liaWxpdHlEaXNwbGF5LnRleHRDb250ZW50ID0gdmlzO1xuICAgIHdpbmREaXNwbGF5LnRleHRDb250ZW50ID0gd2luZDtcbiAgICBodW1pZGl0eURpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmh1bWlkaXR5fSVgO1xuICAgIHV2RGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEudXY7XG4gICAgc3VucmlzZURpc3BsYXkudGV4dENvbnRlbnQgPSBzdW5yaXNlO1xuICAgIHN1bnNldERpc3BsYXkudGV4dENvbnRlbnQgPSBzdW5zZXQ7XG5cbiAgICAvLyBEaXNwbGF5IGRhaWx5IG9yIGhvdXJseSBmb3JlY2FzdCBkYXRhIGRlcGVuZGluZyBvbiBzZWxlY3RlZCBidXR0b25cbiAgICBpZiAoZm9yZWNhc3RUeXBlID09PSAnZGFpbHknKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGFpbHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGRheURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbG93VGVtcERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhaWx5SWNvbkRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50RGF5ID0gJyc7XG4gICAgICAgICAgICBsZXQgaGlnaFRlbXAgPSAnJztcbiAgICAgICAgICAgIGxldCBsb3dUZW1wID0gJyc7XG5cbiAgICAgICAgICAgIGRhaWx5RGl2LmNsYXNzTGlzdC5hZGQoJ2RhaWx5LWRpdicpO1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXkgPSAnVG9kYXknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF5ID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uZGF5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodW5pdFR5cGUgPT09ICdmYXInKSB7XG4gICAgICAgICAgICAgICAgaGlnaFRlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5oaWdodGVtcF9mO1xuICAgICAgICAgICAgICAgIGxvd1RlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5sb3d0ZW1wX2Y7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaXRUeXBlID09PSAnY2VsJykge1xuICAgICAgICAgICAgICAgIGhpZ2hUZW1wID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uaGlnaHRlbXBfYztcbiAgICAgICAgICAgICAgICBsb3dUZW1wID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0ubG93dGVtcF9jO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXlEaXNwbGF5LnRleHRDb250ZW50ID0gY3VycmVudERheTtcbiAgICAgICAgICAgIGhpZ2hUZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGBIOiAke2hpZ2hUZW1wfcKwYDtcbiAgICAgICAgICAgIGxvd1RlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYEw6ICR7bG93VGVtcH3CsGA7XG4gICAgICAgICAgICBkYWlseUljb25EaXNwbGF5LnNyYyA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmljb247XG5cbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGRheURpc3BsYXkpO1xuICAgICAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRlbXBEaXNwbGF5KTtcbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGxvd1RlbXBEaXNwbGF5KTtcbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGRhaWx5SWNvbkRpc3BsYXkpO1xuICAgICAgICAgICAgZGFpbHlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGFpbHlEaXYpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChmb3JlY2FzdFR5cGUgPT09ICdob3VybHknKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaG91cmx5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBob3VyRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgaG91cmx5VGVtcERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGhvdXJseUljb25EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBsZXQgaG91cmx5VGVtcCA9ICcnO1xuXG4gICAgICAgICAgICBob3VybHlEaXYuY2xhc3NMaXN0LmFkZCgnaG91cmx5LWRpdicpO1xuXG4gICAgICAgICAgICBpZiAodW5pdFR5cGUgPT09ICdmYXInKSB7XG4gICAgICAgICAgICAgICAgaG91cmx5VGVtcCA9IGRhdGEuaG91cmx5Rm9yZWNhc3RBcnJheVtpXS50ZW1wX2Y7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaXRUeXBlID09PSAnY2VsJykge1xuICAgICAgICAgICAgICAgIGhvdXJseVRlbXAgPSBkYXRhLmhvdXJseUZvcmVjYXN0QXJyYXlbaV0udGVtcF9jO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBob3VyRGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEuaG91cmx5Rm9yZWNhc3RBcnJheVtpXS5ob3VyO1xuICAgICAgICAgICAgaG91cmx5VGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtob3VybHlUZW1wfcKwYDtcbiAgICAgICAgICAgIGhvdXJseUljb25EaXNwbGF5LnNyYyA9IGRhdGEuaG91cmx5Rm9yZWNhc3RBcnJheVtpXS5pY29uO1xuXG4gICAgICAgICAgICBob3VybHlEaXYuYXBwZW5kQ2hpbGQoaG91ckRpc3BsYXkpO1xuICAgICAgICAgICAgaG91cmx5RGl2LmFwcGVuZENoaWxkKGhvdXJseVRlbXBEaXNwbGF5KTtcbiAgICAgICAgICAgIGhvdXJseURpdi5hcHBlbmRDaGlsZChob3VybHlJY29uRGlzcGxheSk7XG4gICAgICAgICAgICBob3VybHlDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91cmx5RGl2KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5cbi8vIEluaXRpYWwgZGlzcGxheVxuZ2V0V2VhdGhlckRhdGEoJ3NlYXR0bGUnKTtcblxuLy8gU2VhcmNoIG5ldyBsb2NhdGlvblxuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoIXNlYXJjaEZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgIHNlYXJjaEZvcm0ucmVwb3J0VmFsaWRpdHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnZXRXZWF0aGVyRGF0YShzZWFyY2hJbnB1dC52YWx1ZSk7XG4gICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59KTtcblxuLy8gRVZFTlQgTElTVEVORVJTIElGIFlPVSBXQU5UIElUIFRPIEZFVENIIERBVEEgRVZFUlkgVElNRSBZT1UgVE9HR0xFIFVOSVRTXG4vLyBjZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgZmFyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4vLyAgICAgY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4vLyAgICAgdW5pdFR5cGUgPSAnY2VsJztcbi8vICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4vLyAgICAgZ2V0V2VhdGhlckRhdGEobG9jYXRpb25EaXNwbGF5LnRleHRDb250ZW50KTtcbi8vIH0pO1xuXG4vLyBmYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4vLyAgICAgZmFyQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4vLyAgICAgdW5pdFR5cGUgPSAnZmFyJztcbi8vICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4vLyAgICAgZ2V0V2VhdGhlckRhdGEobG9jYXRpb25EaXNwbGF5LnRleHRDb250ZW50KTtcbi8vIH0pO1xuXG5cblxuLyogXG5UTyBET1xuXG5hZGQgZGFpbHkgaW5mb1xuXG4gICAgZmV0Y2ggcmVxdWlyZWQgZGF0YVxuXG4gICAgdGllIGRhdGEgdG8gaHRtbCBlbGVtZW50cyBvciBjcmVhdGUgaHRtbCBlbGVtZW50cyB0byBkaXNwbGF5IGRhdGFcblxuICAgIGZpeCBVSVxuXG5oYW5kbGUgZXJyb3JzIFxuXG4gICAgYWRkIGVycm9yIG1lc3NhZ2VzIHdoZW4gYW4gaW52YWxpZCBsb2NhdGlvbiBpcyBzZWFyY2hlZFxuXG5hZGQgbG9hZGluZyBpY29uXG5cbm1heWJlIGFkZCBsb2NhbCBzdG9yYWdlPz8/P1xuXG5tYXliZSBhZGQgYSByZWZyZXNoIGJ1dHRvbiBuZXh0IHRvIHRpbWU/Pz8/XG5cbmFkZCBmb290ZXJcbiAqLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==