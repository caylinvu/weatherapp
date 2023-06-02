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
const mainContent = document.querySelector('.main-content');
const errorMsg = document.querySelector('.error-msg');
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
        return(weatherData);
    } catch (error) {
        mainContent.style.display = 'none';
        errorMsg.textContent = 'Error fetching data, please try again';
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
            return(currentData);
        })
        .then(response => {
            displayData(response);

            celBtn.addEventListener('click', () => {
                farBtn.classList.remove('selected');
                celBtn.classList.add('selected');
                unitType = 'cel';
                displayData(response);
            });
            
            farBtn.addEventListener('click', () => {
                celBtn.classList.remove('selected');
                farBtn.classList.add('selected');
                unitType = 'far';
                displayData(response);
            });

            dailyBtn.addEventListener('click', () => {
                hourlyBtn.classList.remove('selected');
                dailyBtn.classList.add('selected');
                forecastType = 'daily';

                hourlyForecast.style.display = 'none';
                dailyForecast.style.display = 'block';

                displayData(response);
            });

            hourlyBtn.addEventListener('click', () => {
                dailyBtn.classList.remove('selected');
                hourlyBtn.classList.add('selected');
                forecastType = 'hourly';

                dailyForecast.style.display = 'none';
                hourlyForecast.style.display = 'block';

                displayData(response);
            })
        })
        .catch(error => {
            mainContent.style.display = 'none';
            errorMsg.textContent = 'Location not found, please enter a valid city name or zip code';
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
        mainContent.style.display = 'flex';
        errorMsg.textContent = '';
        getWeatherData(searchInput.value);
        searchInput.value = '';
        e.preventDefault();
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWlucHV0Jyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0LWJ0bicpO1xuY29uc3QgbG9jYXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJyk7XG5jb25zdCBsb2NhbFRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2FsLXRpbWUnKTtcbmNvbnN0IGljb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24nKTtcbmNvbnN0IHRlbXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXAnKTtcbmNvbnN0IGNvbmRpdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uJyk7XG5jb25zdCBmZWVsc0xpa2VEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWxzLWxpa2UnKTtcbmNvbnN0IGhpZ2hMb3dEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2gtbG93Jyk7XG5jb25zdCByYWluRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWluJyk7XG5jb25zdCBjbG91ZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvdWQnKTtcbmNvbnN0IHZpc2liaWxpdHlEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2liaWxpdHknKTtcbmNvbnN0IHdpbmREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmQnKTtcbmNvbnN0IGh1bWlkaXR5RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodW1pZGl0eScpO1xuY29uc3QgdXZEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3V2Jyk7XG5jb25zdCBzdW5yaXNlRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW5yaXNlJyk7XG5jb25zdCBzdW5zZXREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bnNldCcpO1xuY29uc3QgY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbC1idG4nKTtcbmNvbnN0IGZhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYXItYnRuJyk7XG5jb25zdCBkYWlseUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWlseS1idG4nKTtcbmNvbnN0IGhvdXJseUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3VybHktYnRuJyk7XG5jb25zdCBkYWlseUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYWlseS1jb250YWluZXInKTtcbmNvbnN0IGhvdXJseUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktY29udGFpbmVyJyk7XG5jb25zdCBkYWlseUZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhaWx5LWZvcmVjYXN0Jyk7XG5jb25zdCBob3VybHlGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktZm9yZWNhc3QnKTtcbmNvbnN0IG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tY29udGVudCcpO1xuY29uc3QgZXJyb3JNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3ItbXNnJyk7XG5sZXQgdW5pdFR5cGUgPSAnZmFyJztcbmxldCBmb3JlY2FzdFR5cGUgPSAnZGFpbHknO1xubGV0IHRlbXAgPSAnJztcbmxldCBmZWVsc0xpa2UgPSAnJztcbmxldCB3aW5kID0gJyc7XG5sZXQgdmlzID0gJyc7XG5sZXQgbWludGVtcCA9ICcnO1xubGV0IG1heHRlbXAgPSAnJztcbmxldCBsb2NhdGlvbiA9ICcnO1xubGV0IHN0YXRlQWJiciA9ICcnO1xubGV0IHN1bnJpc2UgPSAnJztcbmxldCBzdW5zZXQgPSAnJztcblxuLy8gQ0FOIFJFTU9WRSBUSElTIEFGVEVSIEZJTklTSElORyBIT1VSTFkgRElTUExBWVxuaWYgKGZvcmVjYXN0VHlwZSA9PT0gJ2hvdXJseScpIHtcbiAgICBob3VybHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBkYWlseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZGFpbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICBob3VybHlCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcblxufSBlbHNlIGlmIChmb3JlY2FzdFR5cGUgPT09ICdkYWlseScpIHtcbiAgICBkYWlseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGhvdXJseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgaG91cmx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgZGFpbHlCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbn1cblxuLy8gRmV0Y2ggd2VhdGhlciBkYXRhIGZyb20gd2VhdGhlciBBUElcbmFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShsb2NhdGlvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbiZmb3JlY2FzdC5qc29uP2tleT1jZDc3YTU3N2Y0MzQ0Yjk0OWMwMjA1MzQwMjMxNTA1JnE9JHtsb2NhdGlvbn0mZGF5cz0zYCwge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgcmV0dXJuKHdlYXRoZXJEYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBtYWluQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBlcnJvck1zZy50ZXh0Q29udGVudCA9ICdFcnJvciBmZXRjaGluZyBkYXRhLCBwbGVhc2UgdHJ5IGFnYWluJztcbiAgICB9ICAgIFxufVxuXG4vLyBQcm9jZXNzIHRoZSBqc29uIGRhdGEgZnJvbSBBUEkgYW5kIHJldHVybiBvYmplY3Qgd2l0aCBvbmx5IHJlcXVpcmVkIGRhdGFcbmZ1bmN0aW9uIERhdGEoZGF0YSkge1xuICAgIHRoaXMubG9jYXRpb24gPSBkYXRhLmxvY2F0aW9uLm5hbWU7XG4gICAgdGhpcy5yZWdpb24gPSBkYXRhLmxvY2F0aW9uLnJlZ2lvbjtcbiAgICB0aGlzLmNvdW50cnkgPSBkYXRhLmxvY2F0aW9uLmNvdW50cnk7XG4gICAgdGhpcy5sb2NhbFRpbWUgPSBkYXRhLmxvY2F0aW9uLmxvY2FsdGltZTtcbiAgICB0aGlzLnRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfZik7XG4gICAgdGhpcy50ZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2MpO1xuICAgIHRoaXMuaWNvbiA9IGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbjtcbiAgICB0aGlzLmNvbmRpdGlvbiA9IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dDtcbiAgICB0aGlzLmZlZWxzbGlrZV9mID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2YpO1xuICAgIHRoaXMuZmVlbHNsaWtlX2MgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfYyk7XG4gICAgdGhpcy5odW1pZGl0eSA9IGRhdGEuY3VycmVudC5odW1pZGl0eTtcbiAgICB0aGlzLnV2ID0gZGF0YS5jdXJyZW50LnV2O1xuICAgIHRoaXMuY2xvdWQgPSBkYXRhLmN1cnJlbnQuY2xvdWQ7XG4gICAgdGhpcy53aW5kX21waCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LndpbmRfbXBoKTtcbiAgICB0aGlzLndpbmRfa3BoID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQud2luZF9rcGgpO1xuICAgIHRoaXMudmlzX21pbGVzID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudmlzX21pbGVzKTtcbiAgICB0aGlzLnZpc19rbSA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnZpc19rbSk7XG4gICAgdGhpcy5zdW5yaXNlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5yaXNlO1xuICAgIHRoaXMuc3Vuc2V0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5zZXQ7XG4gICAgdGhpcy5yYWluID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XG4gICAgdGhpcy5taW50ZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZik7XG4gICAgdGhpcy5tYXh0ZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZik7XG4gICAgdGhpcy5taW50ZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfYyk7XG4gICAgdGhpcy5tYXh0ZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfYyk7XG5cbiAgICBjb25zdCBkYXRhTGlzdCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXk7XG4gICAgY29uc3QgZGFpbHlGb3JlY2FzdEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3REYXkgPSBuZXcgRGF0ZShkYXRhTGlzdFtpXS5kYXRlKS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KTtcbiAgICAgICAgY29uc3QgaGlnaFRlbXBfZiA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1heHRlbXBfZik7XG4gICAgICAgIGNvbnN0IGhpZ2hUZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5tYXh0ZW1wX2MpO1xuICAgICAgICBjb25zdCBsb3dUZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5taW50ZW1wX2YpO1xuICAgICAgICBjb25zdCBsb3dUZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5taW50ZW1wX2MpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdEljb24gPSBkYXRhTGlzdFtpXS5kYXkuY29uZGl0aW9uLmljb247XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmb3JlY2FzdE9iaiA9IHtcbiAgICAgICAgICAgIGRheTogZm9yZWNhc3REYXksXG4gICAgICAgICAgICBoaWdodGVtcF9mOiBoaWdoVGVtcF9mLFxuICAgICAgICAgICAgaGlnaHRlbXBfYzogaGlnaFRlbXBfYyxcbiAgICAgICAgICAgIGxvd3RlbXBfZjogbG93VGVtcF9mLFxuICAgICAgICAgICAgbG93dGVtcF9jOiBsb3dUZW1wX2MsXG4gICAgICAgICAgICBpY29uOiBmb3JlY2FzdEljb24sXG4gICAgICAgIH07XG4gICAgICAgIGRhaWx5Rm9yZWNhc3RBcnJheS5wdXNoKGZvcmVjYXN0T2JqKTtcbiAgICB9XG5cbiAgICB0aGlzLmRhaWx5Rm9yZWNhc3RBcnJheSA9IGRhaWx5Rm9yZWNhc3RBcnJheTtcblxuICAgIGNvbnN0IGhvdXJseURhdGFMaXN0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyO1xuICAgIGNvbnN0IGhvdXJseUZvcmVjYXN0QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RIb3VyID0gbmV3IERhdGUoaG91cmx5RGF0YUxpc3RbaV0udGltZSkudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyBob3VyOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9KTtcbiAgICAgICAgLy8gY29uc3QgbnVtZXJpY0hvdXIgPSBuZXcgRGF0YShob3VybHlEYXRhTGlzdFtpXS50aW1lKS50b0xvY2FsZVN0cmluZ1xuICAgICAgICBjb25zdCB0ZW1wZXJhdHVyZV9mID0gTWF0aC5yb3VuZChob3VybHlEYXRhTGlzdFtpXS50ZW1wX2YpO1xuICAgICAgICBjb25zdCB0ZW1wZXJhdHVyZV9jID0gTWF0aC5yb3VuZChob3VybHlEYXRhTGlzdFtpXS50ZW1wX2MpO1xuICAgICAgICBjb25zdCBob3VybHlGb3JlY2FzdEljb24gPSBob3VybHlEYXRhTGlzdFtpXS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhvdXJseUZvcmVjYXN0T2JqID0ge1xuICAgICAgICAgICAgaG91cjogZm9yZWNhc3RIb3VyLFxuICAgICAgICAgICAgdGVtcF9mOiB0ZW1wZXJhdHVyZV9mLFxuICAgICAgICAgICAgdGVtcF9jOiB0ZW1wZXJhdHVyZV9jLFxuICAgICAgICAgICAgaWNvbjogaG91cmx5Rm9yZWNhc3RJY29uLFxuICAgICAgICB9O1xuICAgICAgICBob3VybHlGb3JlY2FzdEFycmF5LnB1c2goaG91cmx5Rm9yZWNhc3RPYmopO1xuICAgIH1cblxuICAgIHRoaXMuaG91cmx5Rm9yZWNhc3RBcnJheSA9IGhvdXJseUZvcmVjYXN0QXJyYXk7XG5cbiAgICBjb25zdCBuZXh0RGF5RGF0YSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uaG91cjtcbiAgICBjb25zdCBuZXh0RGF5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICBjb25zdCBuZXh0RGF5Rm9yZWNhc3RIb3VyID0gbmV3IERhdGUobmV4dERheURhdGFbaV0udGltZSkudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyBob3VyOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgbmV4dERheVRlbXBfZiA9IE1hdGgucm91bmQobmV4dERheURhdGFbaV0udGVtcF9mKTtcbiAgICAgICAgY29uc3QgbmV4dERheVRlbXBfYyA9IE1hdGgucm91bmQobmV4dERheURhdGFbaV0udGVtcF9jKTtcbiAgICAgICAgY29uc3QgbmV4dERheUZvcmVjYXN0SWNvbiA9IG5leHREYXlEYXRhW2ldLmNvbmRpdGlvbi5pY29uO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmV4dERheUZvcmVjYXN0T2JqID0ge1xuICAgICAgICAgICAgaG91cjogbmV4dERheUZvcmVjYXN0SG91cixcbiAgICAgICAgICAgIHRlbXBfZjogbmV4dERheVRlbXBfZixcbiAgICAgICAgICAgIHRlbXBfYzogbmV4dERheVRlbXBfYyxcbiAgICAgICAgICAgIGljb246IG5leHREYXlGb3JlY2FzdEljb24sXG4gICAgICAgIH07XG4gICAgICAgIG5leHREYXlGb3JlY2FzdEFycmF5LnB1c2gobmV4dERheUZvcmVjYXN0T2JqKTtcbiAgICB9XG5cbiAgICB0aGlzLm5leHREYXlGb3JlY2FzdEFycmF5ID0gbmV4dERheUZvcmVjYXN0QXJyYXk7XG59XG5cbi8vIFJlbW92ZSBhbGwgY2hpbGQgZWxlbWVudHMgXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihkaXYpIHtcbiAgICB3aGlsZSAoZGl2Lmxhc3RDaGlsZCkge1xuICAgICAgICBkaXYucmVtb3ZlQ2hpbGQoZGl2Lmxhc3RDaGlsZCk7XG4gICAgfVxufVxuXG4vLyBSZXR1cm4gd2VhdGhlciBkYXRhIG9iamVjdCBmb3Igc3BlY2lmaWVkIGxvY2F0aW9uXG5mdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xuICAgIGZldGNoRGF0YShsb2NhdGlvbilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSBuZXcgRGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICByZXR1cm4oY3VycmVudERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG5cbiAgICAgICAgICAgIGNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBjZWxCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB1bml0VHlwZSA9ICdjZWwnO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZmFyQnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgdW5pdFR5cGUgPSAnZmFyJztcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGFpbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaG91cmx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZGFpbHlCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFR5cGUgPSAnZGFpbHknO1xuXG4gICAgICAgICAgICAgICAgaG91cmx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBkYWlseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGhvdXJseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkYWlseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGhvdXJseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0VHlwZSA9ICdob3VybHknO1xuXG4gICAgICAgICAgICAgICAgZGFpbHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIGhvdXJseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIG1haW5Db250ZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBlcnJvck1zZy50ZXh0Q29udGVudCA9ICdMb2NhdGlvbiBub3QgZm91bmQsIHBsZWFzZSBlbnRlciBhIHZhbGlkIGNpdHkgbmFtZSBvciB6aXAgY29kZSc7XG4gICAgICAgIH1cbiAgICApO1xufVxuXG4vLyBTdGF0ZXNcbmNvbnN0IHN0YXRlcyA9IHtcbiAgICAnQWxhYmFtYSc6ICdBTCcsXG4gICAgJ0FsYXNrYSc6ICdBSycsXG4gICAgJ0FtZXJpY2FuIFNhbW9hJzogJ0FTJyxcbiAgICAnQXJpem9uYSc6ICdBWicsXG4gICAgJ0Fya2Fuc2FzJzogJ0FSJyxcbiAgICAnQ2FsaWZvcm5pYSc6ICdDQScsXG4gICAgJ0NvbG9yYWRvJzogJ0NPJyxcbiAgICAnQ29ubmVjdGljdXQnOiAnQ1QnLFxuICAgICdEZWxhd2FyZSc6ICdERScsXG4gICAgJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJzogJ0RDJyxcbiAgICAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJzogJ0ZNJyxcbiAgICAnRmxvcmlkYSc6ICdGTCcsXG4gICAgJ0dlb3JnaWEnOiAnR0EnLFxuICAgICdHdWFtJzogJ0dVJyxcbiAgICAnSGF3YWlpJzogJ0hJJyxcbiAgICAnSWRhaG8nOiAnSUQnLFxuICAgICdJbGxpbm9pcyc6ICdJTCcsXG4gICAgJ0luZGlhbmEnOiAnSU4nLFxuICAgICdJb3dhJzogJ0lBJyxcbiAgICAnS2Fuc2FzJzogJ0tTJyxcbiAgICAnS2VudHVja3knOiAnS1knLFxuICAgICdMb3Vpc2lhbmEnOiAnTEEnLFxuICAgICdNYWluZSc6ICdNRScsXG4gICAgJ01hcnNoYWxsIElzbGFuZHMnOiAnTUgnLFxuICAgICdNYXJ5bGFuZCc6ICdNRCcsXG4gICAgJ01hc3NhY2h1c2V0dHMnOiAnTUEnLFxuICAgICdNaWNoaWdhbic6ICdNSScsXG4gICAgJ01pbm5lc290YSc6ICdNTicsXG4gICAgJ01pc3Npc3NpcHBpJzogJ01TJyxcbiAgICAnTWlzc291cmknOiAnTU8nLFxuICAgICdNb250YW5hJzogJ01UJyxcbiAgICAnTmVicmFza2EnOiAnTkUnLFxuICAgICdOZXZhZGEnOiAnTlYnLFxuICAgICdOZXcgSGFtcHNoaXJlJzogJ05IJyxcbiAgICAnTmV3IEplcnNleSc6ICdOSicsXG4gICAgJ05ldyBNZXhpY28nOiAnTk0nLFxuICAgICdOZXcgWW9yayc6ICdOWScsXG4gICAgJ05vcnRoIENhcm9saW5hJzogJ05DJyxcbiAgICAnTm9ydGggRGFrb3RhJzogJ05EJyxcbiAgICAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJzogJ01QJyxcbiAgICAnT2hpbyc6ICdPSCcsXG4gICAgJ09rbGFob21hJzogJ09LJyxcbiAgICAnT3JlZ29uJzogJ09SJyxcbiAgICAnUGFsYXUnOiAnUFcnLFxuICAgICdQZW5uc3lsdmFuaWEnOiAnUEEnLFxuICAgICdQdWVydG8gUmljbyc6ICdQUicsXG4gICAgJ1Job2RlIElzbGFuZCc6ICdSSScsXG4gICAgJ1NvdXRoIENhcm9saW5hJzogJ1NDJyxcbiAgICAnU291dGggRGFrb3RhJzogJ1NEJyxcbiAgICAnVGVubmVzc2VlJzogJ1ROJyxcbiAgICAnVGV4YXMnOiAnVFgnLFxuICAgICdVdGFoJzogJ1VUJyxcbiAgICAnVmVybW9udCc6ICdWVCcsXG4gICAgJ1ZpcmdpbiBJc2xhbmRzJzogJ1ZJJyxcbiAgICAnVmlyZ2luaWEnOiAnVkEnLFxuICAgICdXYXNoaW5ndG9uJzogJ1dBJyxcbiAgICAnV2VzdCBWaXJnaW5pYSc6ICdXVicsXG4gICAgJ1dpc2NvbnNpbic6ICdXSScsXG4gICAgJ1d5b21pbmcnOiAnV1knXG59XG5cbi8vIEdldCBzdGF0ZSBhYmJyZXZpYXRpb25cbmZ1bmN0aW9uIGdldFN0YXRlQWJicihzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZXNbc3RhdGVdO1xufVxuXG4vLyBEaXNwbGF5IGRhdGFcbmZ1bmN0aW9uIGRpc3BsYXlEYXRhKGRhdGEpIHtcblxuICAgIHJlbW92ZUNoaWxkcmVuKGRhaWx5Q29udGFpbmVyKTtcbiAgICByZW1vdmVDaGlsZHJlbihob3VybHlDb250YWluZXIpO1xuXG4gICAgLy8gRGlzcGxheSBjdXJyZW50IGZvcmVjYXN0IGRhdGFcbiAgICBpZiAodW5pdFR5cGUgPT0gJ2ZhcicpIHtcbiAgICAgICAgdGVtcCA9IGRhdGEudGVtcF9mO1xuICAgICAgICBmZWVsc0xpa2UgPSBkYXRhLmZlZWxzbGlrZV9mO1xuICAgICAgICBtYXh0ZW1wID0gZGF0YS5tYXh0ZW1wX2Y7XG4gICAgICAgIG1pbnRlbXAgPSBkYXRhLm1pbnRlbXBfZjtcbiAgICAgICAgdmlzID0gYCR7ZGF0YS52aXNfbWlsZXMgIH1tYDtcbiAgICAgICAgd2luZCA9IGAke2RhdGEud2luZF9tcGggIH1tcGhgO1xuICAgIH0gZWxzZSBpZiAodW5pdFR5cGUgPT0gJ2NlbCcpIHtcbiAgICAgICAgdGVtcCA9IGRhdGEudGVtcF9jO1xuICAgICAgICBmZWVsc0xpa2UgPSBkYXRhLmZlZWxzbGlrZV9jO1xuICAgICAgICBtYXh0ZW1wID0gZGF0YS5tYXh0ZW1wX2M7XG4gICAgICAgIG1pbnRlbXAgPSBkYXRhLm1pbnRlbXBfYztcbiAgICAgICAgdmlzID0gYCR7ZGF0YS52aXNfa20gIH1rbWA7XG4gICAgICAgIHdpbmQgPSBgJHtkYXRhLndpbmRfa3BoICB9a3BoYDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5jb3VudHJ5ID09ICdVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2EnIHx8IGRhdGEuY291bnRyeSA9PSAnVVNBJykge1xuICAgICAgICBzdGF0ZUFiYnIgPSBnZXRTdGF0ZUFiYnIoZGF0YS5yZWdpb24pO1xuICAgICAgICBpZiAoc3RhdGVBYmJyID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9jYXRpb24gPSBgJHtkYXRhLmxvY2F0aW9ufSwgVW5pdGVkIFN0YXRlc2A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2NhdGlvbiA9IGAke2RhdGEubG9jYXRpb259LCAke3N0YXRlQWJicn0sIFVuaXRlZCBTdGF0ZXNgO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9jYXRpb24gPSBgJHtkYXRhLmxvY2F0aW9ufSwgJHtkYXRhLmNvdW50cnl9YDtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKGRhdGEubG9jYWxUaW1lKTtcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gY3VycmVudERhdGUudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyB3ZWVrZGF5OiAnbG9uZycsIHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycsIGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9KTtcbiAgICBjb25zdCBjdXJyZW50SG91ciA9IGN1cnJlbnREYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgaG91cjogJ251bWVyaWMnIH0pO1xuXG4gICAgaWYgKGRhdGEuc3VucmlzZS5zdGFydHNXaXRoKDApKSB7XG4gICAgICAgIHN1bnJpc2UgPSBkYXRhLnN1bnJpc2Uuc2xpY2UoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3VucmlzZSA9IGRhdGEuc3VucmlzZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zdW5zZXQuc3RhcnRzV2l0aCgwKSkge1xuICAgICAgICBzdW5zZXQgPSBkYXRhLnN1bnNldC5zbGljZSgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdW5zZXQgPSBkYXRhLnN1bnNldDtcbiAgICB9XG5cbiAgICBsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBsb2NhdGlvbjtcbiAgICBsb2NhbFRpbWVEaXNwbGF5LnRleHRDb250ZW50ID0gZm9ybWF0dGVkRGF0ZTtcbiAgICBpY29uRGlzcGxheS5zcmMgPSBkYXRhLmljb247XG4gICAgdGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHt0ZW1wfcKwYDtcbiAgICBjb25kaXRpb25EaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS5jb25kaXRpb247XG4gICAgZmVlbHNMaWtlRGlzcGxheS50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7ZmVlbHNMaWtlfcKwYDtcbiAgICBoaWdoTG93RGlzcGxheS50ZXh0Q29udGVudCA9IGBIOiAke21heHRlbXB9wrAgTDogJHttaW50ZW1wfcKwYDtcbiAgICByYWluRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEucmFpbn0lYDtcbiAgICBjbG91ZERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNsb3VkfSVgO1xuICAgIHZpc2liaWxpdHlEaXNwbGF5LnRleHRDb250ZW50ID0gdmlzO1xuICAgIHdpbmREaXNwbGF5LnRleHRDb250ZW50ID0gd2luZDtcbiAgICBodW1pZGl0eURpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmh1bWlkaXR5fSVgO1xuICAgIHV2RGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEudXY7XG4gICAgc3VucmlzZURpc3BsYXkudGV4dENvbnRlbnQgPSBzdW5yaXNlO1xuICAgIHN1bnNldERpc3BsYXkudGV4dENvbnRlbnQgPSBzdW5zZXQ7XG5cbiAgICAvLyBEaXNwbGF5IGRhaWx5IG9yIGhvdXJseSBmb3JlY2FzdCBkYXRhIGRlcGVuZGluZyBvbiBzZWxlY3RlZCBidXR0b25cbiAgICBpZiAoZm9yZWNhc3RUeXBlID09PSAnZGFpbHknKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkYWlseURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGF5RGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgaGlnaFRlbXBEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBsb3dUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGFpbHlJY29uRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnREYXkgPSAnJztcbiAgICAgICAgICAgIGxldCBoaWdoVGVtcCA9ICcnO1xuICAgICAgICAgICAgbGV0IGxvd1RlbXAgPSAnJztcblxuICAgICAgICAgICAgZGFpbHlEaXYuY2xhc3NMaXN0LmFkZCgnZGFpbHktZGl2Jyk7XG5cbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudERheSA9ICdUb2RheSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXkgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5kYXk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1bml0VHlwZSA9PT0gJ2ZhcicpIHtcbiAgICAgICAgICAgICAgICBoaWdoVGVtcCA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmhpZ2h0ZW1wX2Y7XG4gICAgICAgICAgICAgICAgbG93VGVtcCA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmxvd3RlbXBfZjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodW5pdFR5cGUgPT09ICdjZWwnKSB7XG4gICAgICAgICAgICAgICAgaGlnaFRlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5oaWdodGVtcF9jO1xuICAgICAgICAgICAgICAgIGxvd1RlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5sb3d0ZW1wX2M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRheURpc3BsYXkudGV4dENvbnRlbnQgPSBjdXJyZW50RGF5O1xuICAgICAgICAgICAgaGlnaFRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYEg6ICR7aGlnaFRlbXB9wrBgO1xuICAgICAgICAgICAgbG93VGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgTDogJHtsb3dUZW1wfcKwYDtcbiAgICAgICAgICAgIGRhaWx5SWNvbkRpc3BsYXkuc3JjID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uaWNvbjtcblxuICAgICAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoZGF5RGlzcGxheSk7XG4gICAgICAgICAgICBkYWlseURpdi5hcHBlbmRDaGlsZChoaWdoVGVtcERpc3BsYXkpO1xuICAgICAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQobG93VGVtcERpc3BsYXkpO1xuICAgICAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoZGFpbHlJY29uRGlzcGxheSk7XG4gICAgICAgICAgICBkYWlseUNvbnRhaW5lci5hcHBlbmRDaGlsZChkYWlseURpdik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGZvcmVjYXN0VHlwZSA9PT0gJ2hvdXJseScpIHtcbiAgICAgICAgbGV0IGZpbmFsSG91cnNBcnJheSA9IFtdO1xuXG4gICAgICAgIGlmIChjdXJyZW50SG91ciA9PT0gJzEyIEFNJykge1xuICAgICAgICAgICAgZmluYWxIb3Vyc0FycmF5ID0gZGF0YS5ob3VybHlGb3JlY2FzdEFycmF5O1xuICAgICAgICAgICAgZmluYWxIb3Vyc0FycmF5LnNoaWZ0KCk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wSXRlbSA9IGRhdGEubmV4dERheUZvcmVjYXN0QXJyYXlbMF07XG4gICAgICAgICAgICBmaW5hbEhvdXJzQXJyYXkucHVzaCh0ZW1wSXRlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEhvdXIgPT09ICcxMSBQTScpIHtcbiAgICAgICAgICAgIGZpbmFsSG91cnNBcnJheSA9IGRhdGEubmV4dERheUZvcmVjYXN0QXJyYXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wQXJyYXkxID0gW107XG4gICAgICAgICAgICBsZXQgdGVtcF9pID0gJyc7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7aG91cn0gPSBkYXRhLmhvdXJseUZvcmVjYXN0QXJyYXlbaV07XG4gICAgICAgICAgICAgICAgaWYgKGhvdXIgPT09IGN1cnJlbnRIb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBfaSA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZW1wX2kgJiYgaSA+IHRlbXBfaSkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wQXJyYXkxLnB1c2goZGF0YS5ob3VybHlGb3JlY2FzdEFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0ZW1wQXJyYXkyID0gZGF0YS5uZXh0RGF5Rm9yZWNhc3RBcnJheS5zbGljZSgwLCAtdGVtcEFycmF5MS5sZW5ndGgpO1xuICAgICAgICAgICAgZmluYWxIb3Vyc0FycmF5ID0gdGVtcEFycmF5MS5jb25jYXQodGVtcEFycmF5Mik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGhvdXJseURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgaG91ckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGhvdXJseVRlbXBEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBob3VybHlJY29uRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgbGV0IGhvdXJseVRlbXAgPSAnJztcblxuICAgICAgICAgICAgaG91cmx5RGl2LmNsYXNzTGlzdC5hZGQoJ2hvdXJseS1kaXYnKTtcblxuICAgICAgICAgICAgaWYgKHVuaXRUeXBlID09PSAnZmFyJykge1xuICAgICAgICAgICAgICAgIGhvdXJseVRlbXAgPSBmaW5hbEhvdXJzQXJyYXlbaV0udGVtcF9mO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1bml0VHlwZSA9PT0gJ2NlbCcpIHtcbiAgICAgICAgICAgICAgICBob3VybHlUZW1wID0gZmluYWxIb3Vyc0FycmF5W2ldLnRlbXBfYztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaG91ckRpc3BsYXkudGV4dENvbnRlbnQgPSBmaW5hbEhvdXJzQXJyYXlbaV0uaG91cjtcbiAgICAgICAgICAgIGhvdXJseVRlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYCR7aG91cmx5VGVtcH3CsGA7XG4gICAgICAgICAgICBob3VybHlJY29uRGlzcGxheS5zcmMgPSBmaW5hbEhvdXJzQXJyYXlbaV0uaWNvbjtcblxuICAgICAgICAgICAgaG91cmx5RGl2LmFwcGVuZENoaWxkKGhvdXJEaXNwbGF5KTtcbiAgICAgICAgICAgIGhvdXJseURpdi5hcHBlbmRDaGlsZChob3VybHlJY29uRGlzcGxheSk7XG4gICAgICAgICAgICBob3VybHlEaXYuYXBwZW5kQ2hpbGQoaG91cmx5VGVtcERpc3BsYXkpO1xuICAgICAgICAgICAgaG91cmx5Q29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJseURpdik7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuXG4vLyBJbml0aWFsIGRpc3BsYXlcbmdldFdlYXRoZXJEYXRhKCdzZWF0dGxlJyk7XG5cbi8vIFNlYXJjaCBuZXcgbG9jYXRpb25cbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKCFzZWFyY2hGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICBzZWFyY2hGb3JtLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWFpbkNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgZXJyb3JNc2cudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgZ2V0V2VhdGhlckRhdGEoc2VhcmNoSW5wdXQudmFsdWUpO1xuICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=