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
        const response = await fetch(`https://api.weatherapi.com/v1/current.json&forecast.json?key=cd77a577f4344b949c0205340231505&q=${location}&days=3`, {mode: 'cors'});
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
    for (let i = 0; i < 3; i++) {
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
        const forecastHour = new Date(hourlyDataList[i].time).toLocaleString('en-US', { hour: 'numeric', hour12: true });
        // const numericHour = new Data(hourlyDataList[i].time).toLocaleString
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
        const nextDayForecastHour = new Date(nextDayData[i].time).toLocaleString('en-US', { hour: 'numeric', hour12: true });
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
    const currentHour = currentDate.toLocaleString('en-US', { hour: 'numeric' });

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
        for (let i = 0; i < 3; i++) {
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
        let finalHoursArray = [];

        if (currentHour === '12 AM') {
            finalHoursArray = data.hourlyForecastArray;
            finalHoursArray.shift();
            const tempItem = data.nextDayForecastArray[0];
            finalHoursArray.push(tempItem);
        } else if (currentHour === '11 PM') {
            finalHoursArray = data.nextDayForecastArray;
        } else {
            const tempArray1 = [];
            let temp_i = '';
            for (let i = 0; i < 24; i++) {
                const {hour} = data.hourlyForecastArray[i];
                if (hour === currentHour) {
                    temp_i = i;
                }
                if (temp_i && i > temp_i) {
                    tempArray1.push(data.hourlyForecastArray[i]);
                }
            }
            const tempArray2 = data.nextDayForecastArray.slice(0, -tempArray1.length);
            finalHoursArray = tempArray1.concat(tempArray2);
        }

        for (let i = 0; i < 24; i++) {
            const hourlyDiv = document.createElement('div');
            const hourDisplay = document.createElement('div');
            const hourlyTempDisplay = document.createElement('div');
            const hourlyIconDisplay = document.createElement('img');
            let hourlyTemp = '';

            hourlyDiv.classList.add('hourly-div');

            if (unitType === 'far') {
                hourlyTemp = finalHoursArray[i].temp_f;
            } else if (unitType === 'cel') {
                hourlyTemp = finalHoursArray[i].temp_c;
            }

            hourDisplay.textContent = finalHoursArray[i].hour;
            hourlyTempDisplay.textContent = `${hourlyTemp}°`;
            hourlyIconDisplay.src = finalHoursArray[i].icon;

            hourlyDiv.appendChild(hourDisplay);
            hourlyDiv.appendChild(hourlyIconDisplay);
            hourlyDiv.appendChild(hourlyTempDisplay);
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

handle errors 

    add error messages when an invalid location is searched

add loading icon

maybe add local storage????

maybe add a refresh button next to time????

mobile view

add footer
 */

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7OztBQUlKO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0Jyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuY29uc3QgbG9jYXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJyk7XG5jb25zdCBsb2NhbFRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2FsLXRpbWUnKTtcbmNvbnN0IGljb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24nKTtcbmNvbnN0IHRlbXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXAnKTtcbmNvbnN0IGNvbmRpdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uJyk7XG5jb25zdCBmZWVsc0xpa2VEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWxzLWxpa2UnKTtcbmNvbnN0IGhpZ2hMb3dEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2gtbG93Jyk7XG5jb25zdCByYWluRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWluJyk7XG5jb25zdCBjbG91ZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvdWQnKTtcbmNvbnN0IHZpc2liaWxpdHlEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2liaWxpdHknKTtcbmNvbnN0IHdpbmREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbmNvbnN0IGh1bWlkaXR5RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1pZGl0eScpO1xuY29uc3QgdXZEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3V2Jyk7XG5jb25zdCBzdW5yaXNlRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW5yaXNlJyk7XG5jb25zdCBzdW5zZXREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bnNldCcpO1xuY29uc3QgY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbC1idG4nKTtcbmNvbnN0IGZhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYXItYnRuJyk7XG5jb25zdCBkYWlseUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWlseS1idG4nKTtcbmNvbnN0IGhvdXJseUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3VybHktYnRuJyk7XG5jb25zdCBkYWlseUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYWlseS1jb250YWluZXInKTtcbmNvbnN0IGhvdXJseUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktY29udGFpbmVyJyk7XG5jb25zdCBkYWlseUZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhaWx5LWZvcmVjYXN0Jyk7XG5jb25zdCBob3VybHlGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktZm9yZWNhc3QnKTtcbmxldCB1bml0VHlwZSA9ICdmYXInO1xubGV0IGZvcmVjYXN0VHlwZSA9ICdkYWlseSc7XG5sZXQgdGVtcCA9ICcnO1xubGV0IGZlZWxzTGlrZSA9ICcnO1xubGV0IHdpbmQgPSAnJztcbmxldCB2aXMgPSAnJztcbmxldCBtaW50ZW1wID0gJyc7XG5sZXQgbWF4dGVtcCA9ICcnO1xubGV0IGxvY2F0aW9uID0gJyc7XG5sZXQgc3RhdGVBYmJyID0gJyc7XG5sZXQgc3VucmlzZSA9ICcnO1xubGV0IHN1bnNldCA9ICcnO1xuXG4vLyBDQU4gUkVNT1ZFIFRISVMgQUZURVIgRklOSVNISU5HIEhPVVJMWSBESVNQTEFZXG5pZiAoZm9yZWNhc3RUeXBlID09PSAnaG91cmx5Jykge1xuICAgIGhvdXJseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGRhaWx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYWlseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIGhvdXJseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuXG59IGVsc2UgaWYgKGZvcmVjYXN0VHlwZSA9PT0gJ2RhaWx5Jykge1xuICAgIGRhaWx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgaG91cmx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBob3VybHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICBkYWlseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xufVxuXG4vLyBGZXRjaCB3ZWF0aGVyIGRhdGEgZnJvbSB3ZWF0aGVyIEFQSVxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKGxvY2F0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uJmZvcmVjYXN0Lmpzb24/a2V5PWNkNzdhNTc3ZjQzNDRiOTQ5YzAyMDUzNDAyMzE1MDUmcT0ke2xvY2F0aW9ufSZkYXlzPTNgLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgICAgIHJldHVybih3ZWF0aGVyRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSAgICBcbn1cblxuLy8gUHJvY2VzcyB0aGUganNvbiBkYXRhIGZyb20gQVBJIGFuZCByZXR1cm4gb2JqZWN0IHdpdGggb25seSByZXF1aXJlZCBkYXRhXG5mdW5jdGlvbiBEYXRhKGRhdGEpIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICAgIHRoaXMucmVnaW9uID0gZGF0YS5sb2NhdGlvbi5yZWdpb247XG4gICAgdGhpcy5jb3VudHJ5ID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5O1xuICAgIHRoaXMubG9jYWxUaW1lID0gZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWU7XG4gICAgdGhpcy50ZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2YpO1xuICAgIHRoaXMudGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9jKTtcbiAgICB0aGlzLmljb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb247XG4gICAgdGhpcy5jb25kaXRpb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG4gICAgdGhpcy5mZWVsc2xpa2VfZiA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mKTtcbiAgICB0aGlzLmZlZWxzbGlrZV9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MpO1xuICAgIHRoaXMuaHVtaWRpdHkgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHk7XG4gICAgdGhpcy51diA9IGRhdGEuY3VycmVudC51djtcbiAgICB0aGlzLmNsb3VkID0gZGF0YS5jdXJyZW50LmNsb3VkO1xuICAgIHRoaXMud2luZF9tcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX21waCk7XG4gICAgdGhpcy53aW5kX2twaCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LndpbmRfa3BoKTtcbiAgICB0aGlzLnZpc19taWxlcyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnZpc19taWxlcyk7XG4gICAgdGhpcy52aXNfa20gPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfa20pO1xuICAgIHRoaXMuc3VucmlzZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZTtcbiAgICB0aGlzLnN1bnNldCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0O1xuICAgIHRoaXMucmFpbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICAgIHRoaXMubWludGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2YpO1xuICAgIHRoaXMubWF4dGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2YpO1xuICAgIHRoaXMubWludGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2MpO1xuICAgIHRoaXMubWF4dGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2MpO1xuXG4gICAgY29uc3QgZGF0YUxpc3QgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5O1xuICAgIGNvbnN0IGRhaWx5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0RGF5ID0gbmV3IERhdGUoZGF0YUxpc3RbaV0uZGF0ZSkudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyB3ZWVrZGF5OiAnbG9uZycgfSk7XG4gICAgICAgIGNvbnN0IGhpZ2hUZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5tYXh0ZW1wX2YpO1xuICAgICAgICBjb25zdCBoaWdoVGVtcF9jID0gTWF0aC5yb3VuZChkYXRhTGlzdFtpXS5kYXkubWF4dGVtcF9jKTtcbiAgICAgICAgY29uc3QgbG93VGVtcF9mID0gTWF0aC5yb3VuZChkYXRhTGlzdFtpXS5kYXkubWludGVtcF9mKTtcbiAgICAgICAgY29uc3QgbG93VGVtcF9jID0gTWF0aC5yb3VuZChkYXRhTGlzdFtpXS5kYXkubWludGVtcF9jKTtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RJY29uID0gZGF0YUxpc3RbaV0uZGF5LmNvbmRpdGlvbi5pY29uO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZm9yZWNhc3RPYmogPSB7XG4gICAgICAgICAgICBkYXk6IGZvcmVjYXN0RGF5LFxuICAgICAgICAgICAgaGlnaHRlbXBfZjogaGlnaFRlbXBfZixcbiAgICAgICAgICAgIGhpZ2h0ZW1wX2M6IGhpZ2hUZW1wX2MsXG4gICAgICAgICAgICBsb3d0ZW1wX2Y6IGxvd1RlbXBfZixcbiAgICAgICAgICAgIGxvd3RlbXBfYzogbG93VGVtcF9jLFxuICAgICAgICAgICAgaWNvbjogZm9yZWNhc3RJY29uLFxuICAgICAgICB9O1xuICAgICAgICBkYWlseUZvcmVjYXN0QXJyYXkucHVzaChmb3JlY2FzdE9iaik7XG4gICAgfVxuXG4gICAgdGhpcy5kYWlseUZvcmVjYXN0QXJyYXkgPSBkYWlseUZvcmVjYXN0QXJyYXk7XG5cbiAgICBjb25zdCBob3VybHlEYXRhTGlzdCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cjtcbiAgICBjb25zdCBob3VybHlGb3JlY2FzdEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0SG91ciA9IG5ldyBEYXRlKGhvdXJseURhdGFMaXN0W2ldLnRpbWUpLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgaG91cjogJ251bWVyaWMnLCBob3VyMTI6IHRydWUgfSk7XG4gICAgICAgIC8vIGNvbnN0IG51bWVyaWNIb3VyID0gbmV3IERhdGEoaG91cmx5RGF0YUxpc3RbaV0udGltZSkudG9Mb2NhbGVTdHJpbmdcbiAgICAgICAgY29uc3QgdGVtcGVyYXR1cmVfZiA9IE1hdGgucm91bmQoaG91cmx5RGF0YUxpc3RbaV0udGVtcF9mKTtcbiAgICAgICAgY29uc3QgdGVtcGVyYXR1cmVfYyA9IE1hdGgucm91bmQoaG91cmx5RGF0YUxpc3RbaV0udGVtcF9jKTtcbiAgICAgICAgY29uc3QgaG91cmx5Rm9yZWNhc3RJY29uID0gaG91cmx5RGF0YUxpc3RbaV0uY29uZGl0aW9uLmljb247XG4gICAgICAgIFxuICAgICAgICBjb25zdCBob3VybHlGb3JlY2FzdE9iaiA9IHtcbiAgICAgICAgICAgIGhvdXI6IGZvcmVjYXN0SG91cixcbiAgICAgICAgICAgIHRlbXBfZjogdGVtcGVyYXR1cmVfZixcbiAgICAgICAgICAgIHRlbXBfYzogdGVtcGVyYXR1cmVfYyxcbiAgICAgICAgICAgIGljb246IGhvdXJseUZvcmVjYXN0SWNvbixcbiAgICAgICAgfTtcbiAgICAgICAgaG91cmx5Rm9yZWNhc3RBcnJheS5wdXNoKGhvdXJseUZvcmVjYXN0T2JqKTtcbiAgICB9XG5cbiAgICB0aGlzLmhvdXJseUZvcmVjYXN0QXJyYXkgPSBob3VybHlGb3JlY2FzdEFycmF5O1xuXG4gICAgY29uc3QgbmV4dERheURhdGEgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmhvdXI7XG4gICAgY29uc3QgbmV4dERheUZvcmVjYXN0QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgY29uc3QgbmV4dERheUZvcmVjYXN0SG91ciA9IG5ldyBEYXRlKG5leHREYXlEYXRhW2ldLnRpbWUpLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgaG91cjogJ251bWVyaWMnLCBob3VyMTI6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IG5leHREYXlUZW1wX2YgPSBNYXRoLnJvdW5kKG5leHREYXlEYXRhW2ldLnRlbXBfZik7XG4gICAgICAgIGNvbnN0IG5leHREYXlUZW1wX2MgPSBNYXRoLnJvdW5kKG5leHREYXlEYXRhW2ldLnRlbXBfYyk7XG4gICAgICAgIGNvbnN0IG5leHREYXlGb3JlY2FzdEljb24gPSBuZXh0RGF5RGF0YVtpXS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5leHREYXlGb3JlY2FzdE9iaiA9IHtcbiAgICAgICAgICAgIGhvdXI6IG5leHREYXlGb3JlY2FzdEhvdXIsXG4gICAgICAgICAgICB0ZW1wX2Y6IG5leHREYXlUZW1wX2YsXG4gICAgICAgICAgICB0ZW1wX2M6IG5leHREYXlUZW1wX2MsXG4gICAgICAgICAgICBpY29uOiBuZXh0RGF5Rm9yZWNhc3RJY29uLFxuICAgICAgICB9O1xuICAgICAgICBuZXh0RGF5Rm9yZWNhc3RBcnJheS5wdXNoKG5leHREYXlGb3JlY2FzdE9iaik7XG4gICAgfVxuXG4gICAgdGhpcy5uZXh0RGF5Rm9yZWNhc3RBcnJheSA9IG5leHREYXlGb3JlY2FzdEFycmF5O1xufVxuXG4vLyBSZW1vdmUgYWxsIGNoaWxkIGVsZW1lbnRzIFxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4oZGl2KSB7XG4gICAgd2hpbGUgKGRpdi5sYXN0Q2hpbGQpIHtcbiAgICAgICAgZGl2LnJlbW92ZUNoaWxkKGRpdi5sYXN0Q2hpbGQpO1xuICAgIH1cbn1cblxuLy8gUmV0dXJuIHdlYXRoZXIgZGF0YSBvYmplY3QgZm9yIHNwZWNpZmllZCBsb2NhdGlvblxuZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcbiAgICBmZXRjaERhdGEobG9jYXRpb24pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRhID0gbmV3IERhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudERhdGEpO1xuICAgICAgICAgICAgcmV0dXJuKGN1cnJlbnREYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBjZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmFyQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgdW5pdFR5cGUgPSAnY2VsJztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1bml0VHlwZSk7XG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBmYXJCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB1bml0VHlwZSA9ICdmYXInO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGFpbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaG91cmx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZGFpbHlCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFR5cGUgPSAnZGFpbHknO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0VHlwZSk7XG5cbiAgICAgICAgICAgICAgICBob3VybHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIGRhaWx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaG91cmx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRhaWx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaG91cmx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUeXBlID0gJ2hvdXJseSc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZm9yZWNhc3RUeXBlKTtcblxuICAgICAgICAgICAgICAgIGRhaWx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBob3VybHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICB9XG4gICAgKTtcbn1cblxuLy8gU3RhdGVzXG5jb25zdCBzdGF0ZXMgPSB7XG4gICAgJ0FsYWJhbWEnOiAnQUwnLFxuICAgICdBbGFza2EnOiAnQUsnLFxuICAgICdBbWVyaWNhbiBTYW1vYSc6ICdBUycsXG4gICAgJ0FyaXpvbmEnOiAnQVonLFxuICAgICdBcmthbnNhcyc6ICdBUicsXG4gICAgJ0NhbGlmb3JuaWEnOiAnQ0EnLFxuICAgICdDb2xvcmFkbyc6ICdDTycsXG4gICAgJ0Nvbm5lY3RpY3V0JzogJ0NUJyxcbiAgICAnRGVsYXdhcmUnOiAnREUnLFxuICAgICdEaXN0cmljdCBPZiBDb2x1bWJpYSc6ICdEQycsXG4gICAgJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYSc6ICdGTScsXG4gICAgJ0Zsb3JpZGEnOiAnRkwnLFxuICAgICdHZW9yZ2lhJzogJ0dBJyxcbiAgICAnR3VhbSc6ICdHVScsXG4gICAgJ0hhd2FpaSc6ICdISScsXG4gICAgJ0lkYWhvJzogJ0lEJyxcbiAgICAnSWxsaW5vaXMnOiAnSUwnLFxuICAgICdJbmRpYW5hJzogJ0lOJyxcbiAgICAnSW93YSc6ICdJQScsXG4gICAgJ0thbnNhcyc6ICdLUycsXG4gICAgJ0tlbnR1Y2t5JzogJ0tZJyxcbiAgICAnTG91aXNpYW5hJzogJ0xBJyxcbiAgICAnTWFpbmUnOiAnTUUnLFxuICAgICdNYXJzaGFsbCBJc2xhbmRzJzogJ01IJyxcbiAgICAnTWFyeWxhbmQnOiAnTUQnLFxuICAgICdNYXNzYWNodXNldHRzJzogJ01BJyxcbiAgICAnTWljaGlnYW4nOiAnTUknLFxuICAgICdNaW5uZXNvdGEnOiAnTU4nLFxuICAgICdNaXNzaXNzaXBwaSc6ICdNUycsXG4gICAgJ01pc3NvdXJpJzogJ01PJyxcbiAgICAnTW9udGFuYSc6ICdNVCcsXG4gICAgJ05lYnJhc2thJzogJ05FJyxcbiAgICAnTmV2YWRhJzogJ05WJyxcbiAgICAnTmV3IEhhbXBzaGlyZSc6ICdOSCcsXG4gICAgJ05ldyBKZXJzZXknOiAnTkonLFxuICAgICdOZXcgTWV4aWNvJzogJ05NJyxcbiAgICAnTmV3IFlvcmsnOiAnTlknLFxuICAgICdOb3J0aCBDYXJvbGluYSc6ICdOQycsXG4gICAgJ05vcnRoIERha290YSc6ICdORCcsXG4gICAgJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcyc6ICdNUCcsXG4gICAgJ09oaW8nOiAnT0gnLFxuICAgICdPa2xhaG9tYSc6ICdPSycsXG4gICAgJ09yZWdvbic6ICdPUicsXG4gICAgJ1BhbGF1JzogJ1BXJyxcbiAgICAnUGVubnN5bHZhbmlhJzogJ1BBJyxcbiAgICAnUHVlcnRvIFJpY28nOiAnUFInLFxuICAgICdSaG9kZSBJc2xhbmQnOiAnUkknLFxuICAgICdTb3V0aCBDYXJvbGluYSc6ICdTQycsXG4gICAgJ1NvdXRoIERha290YSc6ICdTRCcsXG4gICAgJ1Rlbm5lc3NlZSc6ICdUTicsXG4gICAgJ1RleGFzJzogJ1RYJyxcbiAgICAnVXRhaCc6ICdVVCcsXG4gICAgJ1Zlcm1vbnQnOiAnVlQnLFxuICAgICdWaXJnaW4gSXNsYW5kcyc6ICdWSScsXG4gICAgJ1ZpcmdpbmlhJzogJ1ZBJyxcbiAgICAnV2FzaGluZ3Rvbic6ICdXQScsXG4gICAgJ1dlc3QgVmlyZ2luaWEnOiAnV1YnLFxuICAgICdXaXNjb25zaW4nOiAnV0knLFxuICAgICdXeW9taW5nJzogJ1dZJ1xufVxuXG4vLyBHZXQgc3RhdGUgYWJicmV2aWF0aW9uXG5mdW5jdGlvbiBnZXRTdGF0ZUFiYnIoc3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGVzW3N0YXRlXTtcbn1cblxuLy8gRGlzcGxheSBkYXRhXG5mdW5jdGlvbiBkaXNwbGF5RGF0YShkYXRhKSB7XG5cbiAgICByZW1vdmVDaGlsZHJlbihkYWlseUNvbnRhaW5lcik7XG4gICAgcmVtb3ZlQ2hpbGRyZW4oaG91cmx5Q29udGFpbmVyKTtcblxuICAgIC8vIERpc3BsYXkgY3VycmVudCBmb3JlY2FzdCBkYXRhXG4gICAgaWYgKHVuaXRUeXBlID09ICdmYXInKSB7XG4gICAgICAgIHRlbXAgPSBkYXRhLnRlbXBfZjtcbiAgICAgICAgZmVlbHNMaWtlID0gZGF0YS5mZWVsc2xpa2VfZjtcbiAgICAgICAgbWF4dGVtcCA9IGRhdGEubWF4dGVtcF9mO1xuICAgICAgICBtaW50ZW1wID0gZGF0YS5taW50ZW1wX2Y7XG4gICAgICAgIHZpcyA9IGAke2RhdGEudmlzX21pbGVzICB9bWA7XG4gICAgICAgIHdpbmQgPSBgJHtkYXRhLndpbmRfbXBoICB9bXBoYDtcbiAgICB9IGVsc2UgaWYgKHVuaXRUeXBlID09ICdjZWwnKSB7XG4gICAgICAgIHRlbXAgPSBkYXRhLnRlbXBfYztcbiAgICAgICAgZmVlbHNMaWtlID0gZGF0YS5mZWVsc2xpa2VfYztcbiAgICAgICAgbWF4dGVtcCA9IGRhdGEubWF4dGVtcF9jO1xuICAgICAgICBtaW50ZW1wID0gZGF0YS5taW50ZW1wX2M7XG4gICAgICAgIHZpcyA9IGAke2RhdGEudmlzX2ttICB9a21gO1xuICAgICAgICB3aW5kID0gYCR7ZGF0YS53aW5kX2twaCAgfWtwaGA7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuY291bnRyeSA9PSAnVW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNhJyB8fCBkYXRhLmNvdW50cnkgPT0gJ1VTQScpIHtcbiAgICAgICAgc3RhdGVBYmJyID0gZ2V0U3RhdGVBYmJyKGRhdGEucmVnaW9uKTtcbiAgICAgICAgaWYgKHN0YXRlQWJiciA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sIFVuaXRlZCBTdGF0ZXNgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9jYXRpb24gPSBgJHtkYXRhLmxvY2F0aW9ufSwgJHtzdGF0ZUFiYnJ9LCBVbml0ZWQgU3RhdGVzYDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sICR7ZGF0YS5jb3VudHJ5fWA7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZShkYXRhLmxvY2FsVGltZSk7XG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGN1cnJlbnREYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ2xvbmcnLCB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnLCBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnLCBob3VyMTI6IHRydWUgfSk7XG4gICAgY29uc3QgY3VycmVudEhvdXIgPSBjdXJyZW50RGF0ZS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IGhvdXI6ICdudW1lcmljJyB9KTtcblxuICAgIGlmIChkYXRhLnN1bnJpc2Uuc3RhcnRzV2l0aCgwKSkge1xuICAgICAgICBzdW5yaXNlID0gZGF0YS5zdW5yaXNlLnNsaWNlKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bnJpc2UgPSBkYXRhLnN1bnJpc2U7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuc3Vuc2V0LnN0YXJ0c1dpdGgoMCkpIHtcbiAgICAgICAgc3Vuc2V0ID0gZGF0YS5zdW5zZXQuc2xpY2UoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3Vuc2V0ID0gZGF0YS5zdW5zZXQ7XG4gICAgfVxuXG4gICAgbG9jYXRpb25EaXNwbGF5LnRleHRDb250ZW50ID0gbG9jYXRpb247XG4gICAgbG9jYWxUaW1lRGlzcGxheS50ZXh0Q29udGVudCA9IGZvcm1hdHRlZERhdGU7XG4gICAgaWNvbkRpc3BsYXkuc3JjID0gZGF0YS5pY29uO1xuICAgIHRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYCR7dGVtcH3CsGA7XG4gICAgY29uZGl0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEuY29uZGl0aW9uO1xuICAgIGZlZWxzTGlrZURpc3BsYXkudGV4dENvbnRlbnQgPSBgRmVlbHMgbGlrZSAke2ZlZWxzTGlrZX3CsGA7XG4gICAgaGlnaExvd0Rpc3BsYXkudGV4dENvbnRlbnQgPSBgSDogJHttYXh0ZW1wfcKwIEw6ICR7bWludGVtcH3CsGA7XG4gICAgcmFpbkRpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLnJhaW59JWA7XG4gICAgY2xvdWREaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jbG91ZH0lYDtcbiAgICB2aXNpYmlsaXR5RGlzcGxheS50ZXh0Q29udGVudCA9IHZpcztcbiAgICB3aW5kRGlzcGxheS50ZXh0Q29udGVudCA9IHdpbmQ7XG4gICAgaHVtaWRpdHlEaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5odW1pZGl0eX0lYDtcbiAgICB1dkRpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLnV2O1xuICAgIHN1bnJpc2VEaXNwbGF5LnRleHRDb250ZW50ID0gc3VucmlzZTtcbiAgICBzdW5zZXREaXNwbGF5LnRleHRDb250ZW50ID0gc3Vuc2V0O1xuXG4gICAgLy8gRGlzcGxheSBkYWlseSBvciBob3VybHkgZm9yZWNhc3QgZGF0YSBkZXBlbmRpbmcgb24gc2VsZWN0ZWQgYnV0dG9uXG4gICAgaWYgKGZvcmVjYXN0VHlwZSA9PT0gJ2RhaWx5Jykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGFpbHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGRheURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbG93VGVtcERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhaWx5SWNvbkRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50RGF5ID0gJyc7XG4gICAgICAgICAgICBsZXQgaGlnaFRlbXAgPSAnJztcbiAgICAgICAgICAgIGxldCBsb3dUZW1wID0gJyc7XG5cbiAgICAgICAgICAgIGRhaWx5RGl2LmNsYXNzTGlzdC5hZGQoJ2RhaWx5LWRpdicpO1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXkgPSAnVG9kYXknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF5ID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uZGF5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodW5pdFR5cGUgPT09ICdmYXInKSB7XG4gICAgICAgICAgICAgICAgaGlnaFRlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5oaWdodGVtcF9mO1xuICAgICAgICAgICAgICAgIGxvd1RlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5sb3d0ZW1wX2Y7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaXRUeXBlID09PSAnY2VsJykge1xuICAgICAgICAgICAgICAgIGhpZ2hUZW1wID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uaGlnaHRlbXBfYztcbiAgICAgICAgICAgICAgICBsb3dUZW1wID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0ubG93dGVtcF9jO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXlEaXNwbGF5LnRleHRDb250ZW50ID0gY3VycmVudERheTtcbiAgICAgICAgICAgIGhpZ2hUZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGBIOiAke2hpZ2hUZW1wfcKwYDtcbiAgICAgICAgICAgIGxvd1RlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYEw6ICR7bG93VGVtcH3CsGA7XG4gICAgICAgICAgICBkYWlseUljb25EaXNwbGF5LnNyYyA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmljb247XG5cbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGRheURpc3BsYXkpO1xuICAgICAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRlbXBEaXNwbGF5KTtcbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGxvd1RlbXBEaXNwbGF5KTtcbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGRhaWx5SWNvbkRpc3BsYXkpO1xuICAgICAgICAgICAgZGFpbHlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGFpbHlEaXYpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChmb3JlY2FzdFR5cGUgPT09ICdob3VybHknKSB7XG4gICAgICAgIGxldCBmaW5hbEhvdXJzQXJyYXkgPSBbXTtcblxuICAgICAgICBpZiAoY3VycmVudEhvdXIgPT09ICcxMiBBTScpIHtcbiAgICAgICAgICAgIGZpbmFsSG91cnNBcnJheSA9IGRhdGEuaG91cmx5Rm9yZWNhc3RBcnJheTtcbiAgICAgICAgICAgIGZpbmFsSG91cnNBcnJheS5zaGlmdCgpO1xuICAgICAgICAgICAgY29uc3QgdGVtcEl0ZW0gPSBkYXRhLm5leHREYXlGb3JlY2FzdEFycmF5WzBdO1xuICAgICAgICAgICAgZmluYWxIb3Vyc0FycmF5LnB1c2godGVtcEl0ZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRIb3VyID09PSAnMTEgUE0nKSB7XG4gICAgICAgICAgICBmaW5hbEhvdXJzQXJyYXkgPSBkYXRhLm5leHREYXlGb3JlY2FzdEFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdGVtcEFycmF5MSA9IFtdO1xuICAgICAgICAgICAgbGV0IHRlbXBfaSA9ICcnO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2hvdXJ9ID0gZGF0YS5ob3VybHlGb3JlY2FzdEFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09PSBjdXJyZW50SG91cikge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wX2kgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGVtcF9pICYmIGkgPiB0ZW1wX2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEFycmF5MS5wdXNoKGRhdGEuaG91cmx5Rm9yZWNhc3RBcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGVtcEFycmF5MiA9IGRhdGEubmV4dERheUZvcmVjYXN0QXJyYXkuc2xpY2UoMCwgLXRlbXBBcnJheTEubGVuZ3RoKTtcbiAgICAgICAgICAgIGZpbmFsSG91cnNBcnJheSA9IHRlbXBBcnJheTEuY29uY2F0KHRlbXBBcnJheTIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBob3VybHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGhvdXJEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBob3VybHlUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgaG91cmx5SWNvbkRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGxldCBob3VybHlUZW1wID0gJyc7XG5cbiAgICAgICAgICAgIGhvdXJseURpdi5jbGFzc0xpc3QuYWRkKCdob3VybHktZGl2Jyk7XG5cbiAgICAgICAgICAgIGlmICh1bml0VHlwZSA9PT0gJ2ZhcicpIHtcbiAgICAgICAgICAgICAgICBob3VybHlUZW1wID0gZmluYWxIb3Vyc0FycmF5W2ldLnRlbXBfZjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodW5pdFR5cGUgPT09ICdjZWwnKSB7XG4gICAgICAgICAgICAgICAgaG91cmx5VGVtcCA9IGZpbmFsSG91cnNBcnJheVtpXS50ZW1wX2M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhvdXJEaXNwbGF5LnRleHRDb250ZW50ID0gZmluYWxIb3Vyc0FycmF5W2ldLmhvdXI7XG4gICAgICAgICAgICBob3VybHlUZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2hvdXJseVRlbXB9wrBgO1xuICAgICAgICAgICAgaG91cmx5SWNvbkRpc3BsYXkuc3JjID0gZmluYWxIb3Vyc0FycmF5W2ldLmljb247XG5cbiAgICAgICAgICAgIGhvdXJseURpdi5hcHBlbmRDaGlsZChob3VyRGlzcGxheSk7XG4gICAgICAgICAgICBob3VybHlEaXYuYXBwZW5kQ2hpbGQoaG91cmx5SWNvbkRpc3BsYXkpO1xuICAgICAgICAgICAgaG91cmx5RGl2LmFwcGVuZENoaWxkKGhvdXJseVRlbXBEaXNwbGF5KTtcbiAgICAgICAgICAgIGhvdXJseUNvbnRhaW5lci5hcHBlbmRDaGlsZChob3VybHlEaXYpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cblxuLy8gSW5pdGlhbCBkaXNwbGF5XG5nZXRXZWF0aGVyRGF0YSgnc2VhdHRsZScpO1xuXG4vLyBTZWFyY2ggbmV3IGxvY2F0aW9uXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICghc2VhcmNoRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgc2VhcmNoRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4vLyBFVkVOVCBMSVNURU5FUlMgSUYgWU9VIFdBTlQgSVQgVE8gRkVUQ0ggREFUQSBFVkVSWSBUSU1FIFlPVSBUT0dHTEUgVU5JVFNcbi8vIGNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBmYXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbi8vICAgICBjZWxCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbi8vICAgICB1bml0VHlwZSA9ICdjZWwnO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbi8vICAgICBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQpO1xuLy8gfSk7XG5cbi8vIGZhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBjZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbi8vICAgICBmYXJCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbi8vICAgICB1bml0VHlwZSA9ICdmYXInO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbi8vICAgICBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQpO1xuLy8gfSk7XG5cblxuXG4vKiBcblRPIERPXG5cbmhhbmRsZSBlcnJvcnMgXG5cbiAgICBhZGQgZXJyb3IgbWVzc2FnZXMgd2hlbiBhbiBpbnZhbGlkIGxvY2F0aW9uIGlzIHNlYXJjaGVkXG5cbmFkZCBsb2FkaW5nIGljb25cblxubWF5YmUgYWRkIGxvY2FsIHN0b3JhZ2U/Pz8/XG5cbm1heWJlIGFkZCBhIHJlZnJlc2ggYnV0dG9uIG5leHQgdG8gdGltZT8/Pz9cblxubW9iaWxlIHZpZXdcblxuYWRkIGZvb3RlclxuICovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=