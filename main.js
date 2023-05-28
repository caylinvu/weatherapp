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

SEE IF HOURS WORK WITH 12AM

handle errors 

    add error messages when an invalid location is searched

add loading icon

maybe add local storage????

maybe add a refresh button next to time????

add footer
 */
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVJQUF1SSxTQUFTLFlBQVksYUFBYTtBQUN6SztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLGlGQUFpRixpQkFBaUI7QUFDbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHdGQUF3RiwrQkFBK0I7QUFDdkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLDRGQUE0RiwrQkFBK0I7QUFDM0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDLGtCQUFrQixnQkFBZ0I7QUFDbEMsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGNBQWM7QUFDL0Isa0JBQWtCLGdCQUFnQjtBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsY0FBYztBQUN4QyxVQUFVO0FBQ1YsMEJBQTBCLGNBQWMsSUFBSSxVQUFVO0FBQ3REO0FBQ0EsTUFBTTtBQUNOLHNCQUFzQixjQUFjLElBQUksYUFBYTtBQUNyRDs7QUFFQTtBQUNBLGdFQUFnRSxtSEFBbUg7QUFDbkwsOERBQThELGlCQUFpQjs7QUFFL0U7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsS0FBSztBQUN0QztBQUNBLGlEQUFpRCxVQUFVO0FBQzNELHVDQUF1QyxRQUFRLE9BQU8sUUFBUTtBQUM5RCxpQ0FBaUMsVUFBVTtBQUMzQyxrQ0FBa0MsV0FBVztBQUM3QztBQUNBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdELFNBQVM7QUFDekQsK0NBQStDLFFBQVE7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDLHVCQUF1QixNQUFNO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLFdBQVc7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7OztBQUlKO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtJyk7XG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtaW5wdXQnKTtcbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtYnRuJyk7XG5jb25zdCBsb2NhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcbmNvbnN0IGxvY2FsVGltZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYWwtdGltZScpO1xuY29uc3QgaWNvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbicpO1xuY29uc3QgdGVtcERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcCcpO1xuY29uc3QgY29uZGl0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24nKTtcbmNvbnN0IGZlZWxzTGlrZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHMtbGlrZScpO1xuY29uc3QgaGlnaExvd0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlnaC1sb3cnKTtcbmNvbnN0IHJhaW5EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhaW4nKTtcbmNvbnN0IGNsb3VkRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG91ZCcpO1xuY29uc3QgdmlzaWJpbGl0eURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaWJpbGl0eScpO1xuY29uc3Qgd2luZERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZCcpO1xuY29uc3QgaHVtaWRpdHlEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG5jb25zdCB1dkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXYnKTtcbmNvbnN0IHN1bnJpc2VEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1bnJpc2UnKTtcbmNvbnN0IHN1bnNldERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3Vuc2V0Jyk7XG5jb25zdCBjZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsLWJ0bicpO1xuY29uc3QgZmFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zhci1idG4nKTtcbmNvbnN0IGRhaWx5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhaWx5LWJ0bicpO1xuY29uc3QgaG91cmx5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdXJseS1idG4nKTtcbmNvbnN0IGRhaWx5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhaWx5LWNvbnRhaW5lcicpO1xuY29uc3QgaG91cmx5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJseS1jb250YWluZXInKTtcbmNvbnN0IGRhaWx5Rm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFpbHktZm9yZWNhc3QnKTtcbmNvbnN0IGhvdXJseUZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJseS1mb3JlY2FzdCcpO1xubGV0IHVuaXRUeXBlID0gJ2Zhcic7XG5sZXQgZm9yZWNhc3RUeXBlID0gJ2hvdXJseSc7XG5sZXQgdGVtcCA9ICcnO1xubGV0IGZlZWxzTGlrZSA9ICcnO1xubGV0IHdpbmQgPSAnJztcbmxldCB2aXMgPSAnJztcbmxldCBtaW50ZW1wID0gJyc7XG5sZXQgbWF4dGVtcCA9ICcnO1xubGV0IGxvY2F0aW9uID0gJyc7XG5sZXQgc3RhdGVBYmJyID0gJyc7XG5sZXQgc3VucmlzZSA9ICcnO1xubGV0IHN1bnNldCA9ICcnO1xuXG4vLyBDQU4gUkVNT1ZFIFRISVMgQUZURVIgRklOSVNISU5HIEhPVVJMWSBESVNQTEFZXG5pZiAoZm9yZWNhc3RUeXBlID09PSAnaG91cmx5Jykge1xuICAgIGhvdXJseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGRhaWx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYWlseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIGhvdXJseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuXG59IGVsc2UgaWYgKGZvcmVjYXN0VHlwZSA9PT0gJ2RhaWx5Jykge1xuICAgIGRhaWx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgaG91cmx5Rm9yZWNhc3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBob3VybHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICBkYWlseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xufVxuXG4vLyBGZXRjaCB3ZWF0aGVyIGRhdGEgZnJvbSB3ZWF0aGVyIEFQSVxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKGxvY2F0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uJmZvcmVjYXN0Lmpzb24/a2V5PWNkNzdhNTc3ZjQzNDRiOTQ5YzAyMDUzNDAyMzE1MDUmcT0ke2xvY2F0aW9ufSZkYXlzPTEwYCwge21vZGU6ICdjb3JzJ30pO1xuICAgICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuICAgICAgICByZXR1cm4od2VhdGhlckRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0gICAgXG59XG5cbi8vIFByb2Nlc3MgdGhlIGpzb24gZGF0YSBmcm9tIEFQSSBhbmQgcmV0dXJuIG9iamVjdCB3aXRoIG9ubHkgcmVxdWlyZWQgZGF0YVxuZnVuY3Rpb24gRGF0YShkYXRhKSB7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGRhdGEubG9jYXRpb24ubmFtZTtcbiAgICB0aGlzLnJlZ2lvbiA9IGRhdGEubG9jYXRpb24ucmVnaW9uO1xuICAgIHRoaXMuY291bnRyeSA9IGRhdGEubG9jYXRpb24uY291bnRyeTtcbiAgICB0aGlzLmxvY2FsVGltZSA9IGRhdGEubG9jYXRpb24ubG9jYWx0aW1lO1xuICAgIHRoaXMudGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9mKTtcbiAgICB0aGlzLnRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXBfYyk7XG4gICAgdGhpcy5pY29uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uO1xuICAgIHRoaXMuY29uZGl0aW9uID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuICAgIHRoaXMuZmVlbHNsaWtlX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc2xpa2VfZik7XG4gICAgdGhpcy5mZWVsc2xpa2VfYyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jKTtcbiAgICB0aGlzLmh1bWlkaXR5ID0gZGF0YS5jdXJyZW50Lmh1bWlkaXR5O1xuICAgIHRoaXMudXYgPSBkYXRhLmN1cnJlbnQudXY7XG4gICAgdGhpcy5jbG91ZCA9IGRhdGEuY3VycmVudC5jbG91ZDtcbiAgICB0aGlzLndpbmRfbXBoID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQud2luZF9tcGgpO1xuICAgIHRoaXMud2luZF9rcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX2twaCk7XG4gICAgdGhpcy52aXNfbWlsZXMgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfbWlsZXMpO1xuICAgIHRoaXMudmlzX2ttID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudmlzX2ttKTtcbiAgICB0aGlzLnN1bnJpc2UgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnJpc2U7XG4gICAgdGhpcy5zdW5zZXQgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldDtcbiAgICB0aGlzLnJhaW4gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcbiAgICB0aGlzLm1pbnRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mKTtcbiAgICB0aGlzLm1heHRlbXBfZiA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mKTtcbiAgICB0aGlzLm1pbnRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jKTtcbiAgICB0aGlzLm1heHRlbXBfYyA9IE1hdGgucm91bmQoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jKTtcblxuICAgIGNvbnN0IGRhdGFMaXN0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcbiAgICBjb25zdCBkYWlseUZvcmVjYXN0QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3REYXkgPSBuZXcgRGF0ZShkYXRhTGlzdFtpXS5kYXRlKS50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7IHdlZWtkYXk6ICdsb25nJyB9KTtcbiAgICAgICAgY29uc3QgaGlnaFRlbXBfZiA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1heHRlbXBfZik7XG4gICAgICAgIGNvbnN0IGhpZ2hUZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5tYXh0ZW1wX2MpO1xuICAgICAgICBjb25zdCBsb3dUZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5taW50ZW1wX2YpO1xuICAgICAgICBjb25zdCBsb3dUZW1wX2MgPSBNYXRoLnJvdW5kKGRhdGFMaXN0W2ldLmRheS5taW50ZW1wX2MpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdEljb24gPSBkYXRhTGlzdFtpXS5kYXkuY29uZGl0aW9uLmljb247XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmb3JlY2FzdE9iaiA9IHtcbiAgICAgICAgICAgIGRheTogZm9yZWNhc3REYXksXG4gICAgICAgICAgICBoaWdodGVtcF9mOiBoaWdoVGVtcF9mLFxuICAgICAgICAgICAgaGlnaHRlbXBfYzogaGlnaFRlbXBfYyxcbiAgICAgICAgICAgIGxvd3RlbXBfZjogbG93VGVtcF9mLFxuICAgICAgICAgICAgbG93dGVtcF9jOiBsb3dUZW1wX2MsXG4gICAgICAgICAgICBpY29uOiBmb3JlY2FzdEljb24sXG4gICAgICAgIH07XG4gICAgICAgIGRhaWx5Rm9yZWNhc3RBcnJheS5wdXNoKGZvcmVjYXN0T2JqKTtcbiAgICB9XG5cbiAgICB0aGlzLmRhaWx5Rm9yZWNhc3RBcnJheSA9IGRhaWx5Rm9yZWNhc3RBcnJheTtcblxuICAgIGNvbnN0IGhvdXJseURhdGFMaXN0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyO1xuICAgIGNvbnN0IGhvdXJseUZvcmVjYXN0QXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RIb3VyID0gbmV3IERhdGUoaG91cmx5RGF0YUxpc3RbaV0udGltZSkudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyBob3VyOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9KTtcbiAgICAgICAgLy8gY29uc3QgbnVtZXJpY0hvdXIgPSBuZXcgRGF0YShob3VybHlEYXRhTGlzdFtpXS50aW1lKS50b0xvY2FsZVN0cmluZ1xuICAgICAgICBjb25zdCB0ZW1wZXJhdHVyZV9mID0gTWF0aC5yb3VuZChob3VybHlEYXRhTGlzdFtpXS50ZW1wX2YpO1xuICAgICAgICBjb25zdCB0ZW1wZXJhdHVyZV9jID0gTWF0aC5yb3VuZChob3VybHlEYXRhTGlzdFtpXS50ZW1wX2MpO1xuICAgICAgICBjb25zdCBob3VybHlGb3JlY2FzdEljb24gPSBob3VybHlEYXRhTGlzdFtpXS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhvdXJseUZvcmVjYXN0T2JqID0ge1xuICAgICAgICAgICAgaG91cjogZm9yZWNhc3RIb3VyLFxuICAgICAgICAgICAgdGVtcF9mOiB0ZW1wZXJhdHVyZV9mLFxuICAgICAgICAgICAgdGVtcF9jOiB0ZW1wZXJhdHVyZV9jLFxuICAgICAgICAgICAgaWNvbjogaG91cmx5Rm9yZWNhc3RJY29uLFxuICAgICAgICB9O1xuICAgICAgICBob3VybHlGb3JlY2FzdEFycmF5LnB1c2goaG91cmx5Rm9yZWNhc3RPYmopO1xuICAgIH1cblxuICAgIHRoaXMuaG91cmx5Rm9yZWNhc3RBcnJheSA9IGhvdXJseUZvcmVjYXN0QXJyYXk7XG5cbiAgICBjb25zdCBuZXh0RGF5RGF0YSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uaG91cjtcbiAgICBjb25zdCBuZXh0RGF5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICBjb25zdCBuZXh0RGF5Rm9yZWNhc3RIb3VyID0gbmV3IERhdGUobmV4dERheURhdGFbaV0udGltZSkudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyBob3VyOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgbmV4dERheVRlbXBfZiA9IE1hdGgucm91bmQobmV4dERheURhdGFbaV0udGVtcF9mKTtcbiAgICAgICAgY29uc3QgbmV4dERheVRlbXBfYyA9IE1hdGgucm91bmQobmV4dERheURhdGFbaV0udGVtcF9jKTtcbiAgICAgICAgY29uc3QgbmV4dERheUZvcmVjYXN0SWNvbiA9IG5leHREYXlEYXRhW2ldLmNvbmRpdGlvbi5pY29uO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmV4dERheUZvcmVjYXN0T2JqID0ge1xuICAgICAgICAgICAgaG91cjogbmV4dERheUZvcmVjYXN0SG91cixcbiAgICAgICAgICAgIHRlbXBfZjogbmV4dERheVRlbXBfZixcbiAgICAgICAgICAgIHRlbXBfYzogbmV4dERheVRlbXBfYyxcbiAgICAgICAgICAgIGljb246IG5leHREYXlGb3JlY2FzdEljb24sXG4gICAgICAgIH07XG4gICAgICAgIG5leHREYXlGb3JlY2FzdEFycmF5LnB1c2gobmV4dERheUZvcmVjYXN0T2JqKTtcbiAgICB9XG5cbiAgICB0aGlzLm5leHREYXlGb3JlY2FzdEFycmF5ID0gbmV4dERheUZvcmVjYXN0QXJyYXk7XG59XG5cbi8vIFJlbW92ZSBhbGwgY2hpbGQgZWxlbWVudHMgXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihkaXYpIHtcbiAgICB3aGlsZSAoZGl2Lmxhc3RDaGlsZCkge1xuICAgICAgICBkaXYucmVtb3ZlQ2hpbGQoZGl2Lmxhc3RDaGlsZCk7XG4gICAgfVxufVxuXG4vLyBSZXR1cm4gd2VhdGhlciBkYXRhIG9iamVjdCBmb3Igc3BlY2lmaWVkIGxvY2F0aW9uXG5mdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xuICAgIGZldGNoRGF0YShsb2NhdGlvbilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSBuZXcgRGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RGF0YSk7XG4gICAgICAgICAgICByZXR1cm4oY3VycmVudERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG5cbiAgICAgICAgICAgIGNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBjZWxCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB1bml0VHlwZSA9ICdjZWwnO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZmFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGZhckJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIHVuaXRUeXBlID0gJ2Zhcic7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codW5pdFR5cGUpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkYWlseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBob3VybHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBkYWlseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0VHlwZSA9ICdkYWlseSc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZm9yZWNhc3RUeXBlKTtcblxuICAgICAgICAgICAgICAgIGhvdXJseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgZGFpbHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBob3VybHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGFpbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBob3VybHlCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFR5cGUgPSAnaG91cmx5JztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmb3JlY2FzdFR5cGUpO1xuXG4gICAgICAgICAgICAgICAgZGFpbHlGb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIGhvdXJseUZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgZGlzcGxheURhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIH1cbiAgICApO1xufVxuXG4vLyBTdGF0ZXNcbmNvbnN0IHN0YXRlcyA9IHtcbiAgICAnQWxhYmFtYSc6ICdBTCcsXG4gICAgJ0FsYXNrYSc6ICdBSycsXG4gICAgJ0FtZXJpY2FuIFNhbW9hJzogJ0FTJyxcbiAgICAnQXJpem9uYSc6ICdBWicsXG4gICAgJ0Fya2Fuc2FzJzogJ0FSJyxcbiAgICAnQ2FsaWZvcm5pYSc6ICdDQScsXG4gICAgJ0NvbG9yYWRvJzogJ0NPJyxcbiAgICAnQ29ubmVjdGljdXQnOiAnQ1QnLFxuICAgICdEZWxhd2FyZSc6ICdERScsXG4gICAgJ0Rpc3RyaWN0IE9mIENvbHVtYmlhJzogJ0RDJyxcbiAgICAnRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhJzogJ0ZNJyxcbiAgICAnRmxvcmlkYSc6ICdGTCcsXG4gICAgJ0dlb3JnaWEnOiAnR0EnLFxuICAgICdHdWFtJzogJ0dVJyxcbiAgICAnSGF3YWlpJzogJ0hJJyxcbiAgICAnSWRhaG8nOiAnSUQnLFxuICAgICdJbGxpbm9pcyc6ICdJTCcsXG4gICAgJ0luZGlhbmEnOiAnSU4nLFxuICAgICdJb3dhJzogJ0lBJyxcbiAgICAnS2Fuc2FzJzogJ0tTJyxcbiAgICAnS2VudHVja3knOiAnS1knLFxuICAgICdMb3Vpc2lhbmEnOiAnTEEnLFxuICAgICdNYWluZSc6ICdNRScsXG4gICAgJ01hcnNoYWxsIElzbGFuZHMnOiAnTUgnLFxuICAgICdNYXJ5bGFuZCc6ICdNRCcsXG4gICAgJ01hc3NhY2h1c2V0dHMnOiAnTUEnLFxuICAgICdNaWNoaWdhbic6ICdNSScsXG4gICAgJ01pbm5lc290YSc6ICdNTicsXG4gICAgJ01pc3Npc3NpcHBpJzogJ01TJyxcbiAgICAnTWlzc291cmknOiAnTU8nLFxuICAgICdNb250YW5hJzogJ01UJyxcbiAgICAnTmVicmFza2EnOiAnTkUnLFxuICAgICdOZXZhZGEnOiAnTlYnLFxuICAgICdOZXcgSGFtcHNoaXJlJzogJ05IJyxcbiAgICAnTmV3IEplcnNleSc6ICdOSicsXG4gICAgJ05ldyBNZXhpY28nOiAnTk0nLFxuICAgICdOZXcgWW9yayc6ICdOWScsXG4gICAgJ05vcnRoIENhcm9saW5hJzogJ05DJyxcbiAgICAnTm9ydGggRGFrb3RhJzogJ05EJyxcbiAgICAnTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzJzogJ01QJyxcbiAgICAnT2hpbyc6ICdPSCcsXG4gICAgJ09rbGFob21hJzogJ09LJyxcbiAgICAnT3JlZ29uJzogJ09SJyxcbiAgICAnUGFsYXUnOiAnUFcnLFxuICAgICdQZW5uc3lsdmFuaWEnOiAnUEEnLFxuICAgICdQdWVydG8gUmljbyc6ICdQUicsXG4gICAgJ1Job2RlIElzbGFuZCc6ICdSSScsXG4gICAgJ1NvdXRoIENhcm9saW5hJzogJ1NDJyxcbiAgICAnU291dGggRGFrb3RhJzogJ1NEJyxcbiAgICAnVGVubmVzc2VlJzogJ1ROJyxcbiAgICAnVGV4YXMnOiAnVFgnLFxuICAgICdVdGFoJzogJ1VUJyxcbiAgICAnVmVybW9udCc6ICdWVCcsXG4gICAgJ1ZpcmdpbiBJc2xhbmRzJzogJ1ZJJyxcbiAgICAnVmlyZ2luaWEnOiAnVkEnLFxuICAgICdXYXNoaW5ndG9uJzogJ1dBJyxcbiAgICAnV2VzdCBWaXJnaW5pYSc6ICdXVicsXG4gICAgJ1dpc2NvbnNpbic6ICdXSScsXG4gICAgJ1d5b21pbmcnOiAnV1knXG59XG5cbi8vIEdldCBzdGF0ZSBhYmJyZXZpYXRpb25cbmZ1bmN0aW9uIGdldFN0YXRlQWJicihzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZXNbc3RhdGVdO1xufVxuXG4vLyBEaXNwbGF5IGRhdGFcbmZ1bmN0aW9uIGRpc3BsYXlEYXRhKGRhdGEpIHtcblxuICAgIHJlbW92ZUNoaWxkcmVuKGRhaWx5Q29udGFpbmVyKTtcbiAgICByZW1vdmVDaGlsZHJlbihob3VybHlDb250YWluZXIpO1xuXG4gICAgLy8gRGlzcGxheSBjdXJyZW50IGZvcmVjYXN0IGRhdGFcbiAgICBpZiAodW5pdFR5cGUgPT0gJ2ZhcicpIHtcbiAgICAgICAgdGVtcCA9IGRhdGEudGVtcF9mO1xuICAgICAgICBmZWVsc0xpa2UgPSBkYXRhLmZlZWxzbGlrZV9mO1xuICAgICAgICBtYXh0ZW1wID0gZGF0YS5tYXh0ZW1wX2Y7XG4gICAgICAgIG1pbnRlbXAgPSBkYXRhLm1pbnRlbXBfZjtcbiAgICAgICAgdmlzID0gYCR7ZGF0YS52aXNfbWlsZXMgIH1tYDtcbiAgICAgICAgd2luZCA9IGAke2RhdGEud2luZF9tcGggIH1tcGhgO1xuICAgIH0gZWxzZSBpZiAodW5pdFR5cGUgPT0gJ2NlbCcpIHtcbiAgICAgICAgdGVtcCA9IGRhdGEudGVtcF9jO1xuICAgICAgICBmZWVsc0xpa2UgPSBkYXRhLmZlZWxzbGlrZV9jO1xuICAgICAgICBtYXh0ZW1wID0gZGF0YS5tYXh0ZW1wX2M7XG4gICAgICAgIG1pbnRlbXAgPSBkYXRhLm1pbnRlbXBfYztcbiAgICAgICAgdmlzID0gYCR7ZGF0YS52aXNfa20gIH1rbWA7XG4gICAgICAgIHdpbmQgPSBgJHtkYXRhLndpbmRfa3BoICB9a3BoYDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5jb3VudHJ5ID09ICdVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2EnIHx8IGRhdGEuY291bnRyeSA9PSAnVVNBJykge1xuICAgICAgICBzdGF0ZUFiYnIgPSBnZXRTdGF0ZUFiYnIoZGF0YS5yZWdpb24pO1xuICAgICAgICBpZiAoc3RhdGVBYmJyID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9jYXRpb24gPSBgJHtkYXRhLmxvY2F0aW9ufSwgVW5pdGVkIFN0YXRlc2A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2NhdGlvbiA9IGAke2RhdGEubG9jYXRpb259LCAke3N0YXRlQWJicn0sIFVuaXRlZCBTdGF0ZXNgO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9jYXRpb24gPSBgJHtkYXRhLmxvY2F0aW9ufSwgJHtkYXRhLmNvdW50cnl9YDtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKGRhdGEubG9jYWxUaW1lKTtcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gY3VycmVudERhdGUudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyB3ZWVrZGF5OiAnbG9uZycsIHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycsIGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycsIGhvdXIxMjogdHJ1ZSB9KTtcbiAgICBjb25zdCBjdXJyZW50SG91ciA9IGN1cnJlbnREYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgaG91cjogJ251bWVyaWMnIH0pO1xuXG4gICAgaWYgKGRhdGEuc3VucmlzZS5zdGFydHNXaXRoKDApKSB7XG4gICAgICAgIHN1bnJpc2UgPSBkYXRhLnN1bnJpc2Uuc2xpY2UoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3VucmlzZSA9IGRhdGEuc3VucmlzZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zdW5zZXQuc3RhcnRzV2l0aCgwKSkge1xuICAgICAgICBzdW5zZXQgPSBkYXRhLnN1bnNldC5zbGljZSgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdW5zZXQgPSBkYXRhLnN1bnNldDtcbiAgICB9XG5cbiAgICBsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBsb2NhdGlvbjtcbiAgICBsb2NhbFRpbWVEaXNwbGF5LnRleHRDb250ZW50ID0gZm9ybWF0dGVkRGF0ZTtcbiAgICBpY29uRGlzcGxheS5zcmMgPSBkYXRhLmljb247XG4gICAgdGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHt0ZW1wfcKwYDtcbiAgICBjb25kaXRpb25EaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS5jb25kaXRpb247XG4gICAgZmVlbHNMaWtlRGlzcGxheS50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlICR7ZmVlbHNMaWtlfcKwYDtcbiAgICBoaWdoTG93RGlzcGxheS50ZXh0Q29udGVudCA9IGBIOiAke21heHRlbXB9wrAgTDogJHttaW50ZW1wfcKwYDtcbiAgICByYWluRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEucmFpbn0lYDtcbiAgICBjbG91ZERpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNsb3VkfSVgO1xuICAgIHZpc2liaWxpdHlEaXNwbGF5LnRleHRDb250ZW50ID0gdmlzO1xuICAgIHdpbmREaXNwbGF5LnRleHRDb250ZW50ID0gd2luZDtcbiAgICBodW1pZGl0eURpc3BsYXkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmh1bWlkaXR5fSVgO1xuICAgIHV2RGlzcGxheS50ZXh0Q29udGVudCA9IGRhdGEudXY7XG4gICAgc3VucmlzZURpc3BsYXkudGV4dENvbnRlbnQgPSBzdW5yaXNlO1xuICAgIHN1bnNldERpc3BsYXkudGV4dENvbnRlbnQgPSBzdW5zZXQ7XG5cbiAgICAvLyBEaXNwbGF5IGRhaWx5IG9yIGhvdXJseSBmb3JlY2FzdCBkYXRhIGRlcGVuZGluZyBvbiBzZWxlY3RlZCBidXR0b25cbiAgICBpZiAoZm9yZWNhc3RUeXBlID09PSAnZGFpbHknKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGFpbHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGRheURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbG93VGVtcERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGRhaWx5SWNvbkRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50RGF5ID0gJyc7XG4gICAgICAgICAgICBsZXQgaGlnaFRlbXAgPSAnJztcbiAgICAgICAgICAgIGxldCBsb3dUZW1wID0gJyc7XG5cbiAgICAgICAgICAgIGRhaWx5RGl2LmNsYXNzTGlzdC5hZGQoJ2RhaWx5LWRpdicpO1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXkgPSAnVG9kYXknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF5ID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uZGF5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodW5pdFR5cGUgPT09ICdmYXInKSB7XG4gICAgICAgICAgICAgICAgaGlnaFRlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5oaWdodGVtcF9mO1xuICAgICAgICAgICAgICAgIGxvd1RlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5sb3d0ZW1wX2Y7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaXRUeXBlID09PSAnY2VsJykge1xuICAgICAgICAgICAgICAgIGhpZ2hUZW1wID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uaGlnaHRlbXBfYztcbiAgICAgICAgICAgICAgICBsb3dUZW1wID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0ubG93dGVtcF9jO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXlEaXNwbGF5LnRleHRDb250ZW50ID0gY3VycmVudERheTtcbiAgICAgICAgICAgIGhpZ2hUZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGBIOiAke2hpZ2hUZW1wfcKwYDtcbiAgICAgICAgICAgIGxvd1RlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYEw6ICR7bG93VGVtcH3CsGA7XG4gICAgICAgICAgICBkYWlseUljb25EaXNwbGF5LnNyYyA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmljb247XG5cbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGRheURpc3BsYXkpO1xuICAgICAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRlbXBEaXNwbGF5KTtcbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGxvd1RlbXBEaXNwbGF5KTtcbiAgICAgICAgICAgIGRhaWx5RGl2LmFwcGVuZENoaWxkKGRhaWx5SWNvbkRpc3BsYXkpO1xuICAgICAgICAgICAgZGFpbHlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGFpbHlEaXYpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChmb3JlY2FzdFR5cGUgPT09ICdob3VybHknKSB7XG4gICAgICAgIGxldCBmaW5hbEhvdXJzQXJyYXkgPSBbXTtcblxuICAgICAgICBpZiAoY3VycmVudEhvdXIgPT09ICcxMiBBTScpIHtcbiAgICAgICAgICAgIGZpbmFsSG91cnNBcnJheSA9IGRhdGEuaG91cmx5Rm9yZWNhc3RBcnJheTtcbiAgICAgICAgICAgIGZpbmFsSG91cnNBcnJheS5zaGlmdCgpO1xuICAgICAgICAgICAgY29uc3QgdGVtcEl0ZW0gPSBkYXRhLm5leHREYXlGb3JlY2FzdEFycmF5WzBdO1xuICAgICAgICAgICAgZmluYWxIb3Vyc0FycmF5LnB1c2godGVtcEl0ZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRIb3VyID09PSAnMTEgUE0nKSB7XG4gICAgICAgICAgICBmaW5hbEhvdXJzQXJyYXkgPSBkYXRhLm5leHREYXlGb3JlY2FzdEFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdGVtcEFycmF5MSA9IFtdO1xuICAgICAgICAgICAgbGV0IHRlbXBfaSA9ICcnO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2hvdXJ9ID0gZGF0YS5ob3VybHlGb3JlY2FzdEFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGlmIChob3VyID09PSBjdXJyZW50SG91cikge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wX2kgPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGVtcF9pICYmIGkgPiB0ZW1wX2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEFycmF5MS5wdXNoKGRhdGEuaG91cmx5Rm9yZWNhc3RBcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGVtcEFycmF5MiA9IGRhdGEubmV4dERheUZvcmVjYXN0QXJyYXkuc2xpY2UoMCwgLXRlbXBBcnJheTEubGVuZ3RoKTtcbiAgICAgICAgICAgIGZpbmFsSG91cnNBcnJheSA9IHRlbXBBcnJheTEuY29uY2F0KHRlbXBBcnJheTIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBob3VybHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGhvdXJEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBob3VybHlUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgaG91cmx5SWNvbkRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGxldCBob3VybHlUZW1wID0gJyc7XG5cbiAgICAgICAgICAgIGhvdXJseURpdi5jbGFzc0xpc3QuYWRkKCdob3VybHktZGl2Jyk7XG5cbiAgICAgICAgICAgIGlmICh1bml0VHlwZSA9PT0gJ2ZhcicpIHtcbiAgICAgICAgICAgICAgICBob3VybHlUZW1wID0gZmluYWxIb3Vyc0FycmF5W2ldLnRlbXBfZjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodW5pdFR5cGUgPT09ICdjZWwnKSB7XG4gICAgICAgICAgICAgICAgaG91cmx5VGVtcCA9IGZpbmFsSG91cnNBcnJheVtpXS50ZW1wX2M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhvdXJEaXNwbGF5LnRleHRDb250ZW50ID0gZmluYWxIb3Vyc0FycmF5W2ldLmhvdXI7XG4gICAgICAgICAgICBob3VybHlUZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2hvdXJseVRlbXB9wrBgO1xuICAgICAgICAgICAgaG91cmx5SWNvbkRpc3BsYXkuc3JjID0gZmluYWxIb3Vyc0FycmF5W2ldLmljb247XG5cbiAgICAgICAgICAgIGhvdXJseURpdi5hcHBlbmRDaGlsZChob3VyRGlzcGxheSk7XG4gICAgICAgICAgICBob3VybHlEaXYuYXBwZW5kQ2hpbGQoaG91cmx5VGVtcERpc3BsYXkpO1xuICAgICAgICAgICAgaG91cmx5RGl2LmFwcGVuZENoaWxkKGhvdXJseUljb25EaXNwbGF5KTtcbiAgICAgICAgICAgIGhvdXJseUNvbnRhaW5lci5hcHBlbmRDaGlsZChob3VybHlEaXYpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cblxuLy8gSW5pdGlhbCBkaXNwbGF5XG5nZXRXZWF0aGVyRGF0YSgnc2VhdHRsZScpO1xuXG4vLyBTZWFyY2ggbmV3IGxvY2F0aW9uXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICghc2VhcmNoRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgc2VhcmNoRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4vLyBFVkVOVCBMSVNURU5FUlMgSUYgWU9VIFdBTlQgSVQgVE8gRkVUQ0ggREFUQSBFVkVSWSBUSU1FIFlPVSBUT0dHTEUgVU5JVFNcbi8vIGNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBmYXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbi8vICAgICBjZWxCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbi8vICAgICB1bml0VHlwZSA9ICdjZWwnO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbi8vICAgICBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQpO1xuLy8gfSk7XG5cbi8vIGZhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBjZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbi8vICAgICBmYXJCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbi8vICAgICB1bml0VHlwZSA9ICdmYXInO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbi8vICAgICBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQpO1xuLy8gfSk7XG5cblxuXG4vKiBcblRPIERPXG5cbmFkZCBkYWlseSBpbmZvXG5cbiAgICBmZXRjaCByZXF1aXJlZCBkYXRhXG5cbiAgICB0aWUgZGF0YSB0byBodG1sIGVsZW1lbnRzIG9yIGNyZWF0ZSBodG1sIGVsZW1lbnRzIHRvIGRpc3BsYXkgZGF0YVxuXG4gICAgZml4IFVJXG5cblNFRSBJRiBIT1VSUyBXT1JLIFdJVEggMTJBTVxuXG5oYW5kbGUgZXJyb3JzIFxuXG4gICAgYWRkIGVycm9yIG1lc3NhZ2VzIHdoZW4gYW4gaW52YWxpZCBsb2NhdGlvbiBpcyBzZWFyY2hlZFxuXG5hZGQgbG9hZGluZyBpY29uXG5cbm1heWJlIGFkZCBsb2NhbCBzdG9yYWdlPz8/P1xuXG5tYXliZSBhZGQgYSByZWZyZXNoIGJ1dHRvbiBuZXh0IHRvIHRpbWU/Pz8/XG5cbmFkZCBmb290ZXJcbiAqLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==