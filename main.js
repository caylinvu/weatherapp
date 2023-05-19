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
                displayData(response);
            });

            hourlyBtn.addEventListener('click', () => {
                dailyBtn.classList.remove('selected');
                hourlyBtn.classList.add('selected');
                forecastType = 'hourly';
                console.log(forecastType);
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

add hourly info

    fix UI

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxTQUFTO0FBQ3JELDJDQUEyQyxRQUFRO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7O0FBSUo7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWZvcm0nKTtcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpO1xuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1idG4nKTtcbmNvbnN0IGxvY2F0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbicpO1xuY29uc3QgbG9jYWxUaW1lRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhbC10aW1lJyk7XG5jb25zdCBpY29uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pY29uJyk7XG5jb25zdCB0ZW1wRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJyk7XG5jb25zdCBjb25kaXRpb25EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbicpO1xuY29uc3QgZmVlbHNMaWtlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVscy1saWtlJyk7XG5jb25zdCBoaWdoTG93RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoLWxvdycpO1xuY29uc3QgcmFpbkRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFpbicpO1xuY29uc3QgY2xvdWREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3VkJyk7XG5jb25zdCB2aXNpYmlsaXR5RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpYmlsaXR5Jyk7XG5jb25zdCB3aW5kRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kJyk7XG5jb25zdCBodW1pZGl0eURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaHVtaWRpdHknKTtcbmNvbnN0IHV2RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1dicpO1xuY29uc3Qgc3VucmlzZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VucmlzZScpO1xuY29uc3Qgc3Vuc2V0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdW5zZXQnKTtcbmNvbnN0IGNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWwtYnRuJyk7XG5jb25zdCBmYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFyLWJ0bicpO1xuY29uc3QgZGFpbHlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFpbHktYnRuJyk7XG5jb25zdCBob3VybHlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG91cmx5LWJ0bicpO1xuY29uc3QgZGFpbHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFpbHktY29udGFpbmVyJyk7XG5jb25zdCBob3VybHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG91cmx5LWNvbnRhaW5lcicpO1xubGV0IHVuaXRUeXBlID0gJ2Zhcic7XG5sZXQgZm9yZWNhc3RUeXBlID0gJ2RhaWx5JztcbmxldCB0ZW1wID0gJyc7XG5sZXQgZmVlbHNMaWtlID0gJyc7XG5sZXQgd2luZCA9ICcnO1xubGV0IHZpcyA9ICcnO1xubGV0IG1pbnRlbXAgPSAnJztcbmxldCBtYXh0ZW1wID0gJyc7XG5sZXQgbG9jYXRpb24gPSAnJztcbmxldCBzdGF0ZUFiYnIgPSAnJztcbmxldCBzdW5yaXNlID0gJyc7XG5sZXQgc3Vuc2V0ID0gJyc7XG5cbi8vIEZldGNoIHdlYXRoZXIgZGF0YSBmcm9tIHdlYXRoZXIgQVBJXG5hc3luYyBmdW5jdGlvbiBmZXRjaERhdGEobG9jYXRpb24pIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24mZm9yZWNhc3QuanNvbj9rZXk9Y2Q3N2E1NzdmNDM0NGI5NDljMDIwNTM0MDIzMTUwNSZxPSR7bG9jYXRpb259JmRheXM9MTBgLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgICAgIHJldHVybih3ZWF0aGVyRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSAgICBcbn1cblxuLy8gUHJvY2VzcyB0aGUganNvbiBkYXRhIGZyb20gQVBJIGFuZCByZXR1cm4gb2JqZWN0IHdpdGggb25seSByZXF1aXJlZCBkYXRhXG5mdW5jdGlvbiBEYXRhKGRhdGEpIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuICAgIHRoaXMucmVnaW9uID0gZGF0YS5sb2NhdGlvbi5yZWdpb247XG4gICAgdGhpcy5jb3VudHJ5ID0gZGF0YS5sb2NhdGlvbi5jb3VudHJ5O1xuICAgIHRoaXMubG9jYWxUaW1lID0gZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWU7XG4gICAgdGhpcy50ZW1wX2YgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wX2YpO1xuICAgIHRoaXMudGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcF9jKTtcbiAgICB0aGlzLmljb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb247XG4gICAgdGhpcy5jb25kaXRpb24gPSBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG4gICAgdGhpcy5mZWVsc2xpa2VfZiA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mKTtcbiAgICB0aGlzLmZlZWxzbGlrZV9jID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MpO1xuICAgIHRoaXMuaHVtaWRpdHkgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHk7XG4gICAgdGhpcy51diA9IGRhdGEuY3VycmVudC51djtcbiAgICB0aGlzLmNsb3VkID0gZGF0YS5jdXJyZW50LmNsb3VkO1xuICAgIHRoaXMud2luZF9tcGggPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX21waCk7XG4gICAgdGhpcy53aW5kX2twaCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LndpbmRfa3BoKTtcbiAgICB0aGlzLnZpc19taWxlcyA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnZpc19taWxlcyk7XG4gICAgdGhpcy52aXNfa20gPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC52aXNfa20pO1xuICAgIHRoaXMuc3VucmlzZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZTtcbiAgICB0aGlzLnN1bnNldCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0O1xuICAgIHRoaXMucmFpbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xuICAgIHRoaXMubWludGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2YpO1xuICAgIHRoaXMubWF4dGVtcF9mID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2YpO1xuICAgIHRoaXMubWludGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2MpO1xuICAgIHRoaXMubWF4dGVtcF9jID0gTWF0aC5yb3VuZChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2MpO1xuXG4gICAgY29uc3QgZGF0YUxpc3QgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5O1xuICAgIGNvbnN0IGRhaWx5Rm9yZWNhc3RBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdERheSA9IG5ldyBEYXRlKGRhdGFMaXN0W2ldLmRhdGUpLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ2xvbmcnIH0pO1xuICAgICAgICBjb25zdCBoaWdoVGVtcF9mID0gTWF0aC5yb3VuZChkYXRhTGlzdFtpXS5kYXkubWF4dGVtcF9mKTtcbiAgICAgICAgY29uc3QgaGlnaFRlbXBfYyA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1heHRlbXBfYyk7XG4gICAgICAgIGNvbnN0IGxvd1RlbXBfZiA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1pbnRlbXBfZik7XG4gICAgICAgIGNvbnN0IGxvd1RlbXBfYyA9IE1hdGgucm91bmQoZGF0YUxpc3RbaV0uZGF5Lm1pbnRlbXBfYyk7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0SWNvbiA9IGRhdGFMaXN0W2ldLmRheS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0T2JqID0ge1xuICAgICAgICAgICAgZGF5OiBmb3JlY2FzdERheSxcbiAgICAgICAgICAgIGhpZ2h0ZW1wX2Y6IGhpZ2hUZW1wX2YsXG4gICAgICAgICAgICBoaWdodGVtcF9jOiBoaWdoVGVtcF9jLFxuICAgICAgICAgICAgbG93dGVtcF9mOiBsb3dUZW1wX2YsXG4gICAgICAgICAgICBsb3d0ZW1wX2M6IGxvd1RlbXBfYyxcbiAgICAgICAgICAgIGljb246IGZvcmVjYXN0SWNvbixcbiAgICAgICAgfTtcbiAgICAgICAgZGFpbHlGb3JlY2FzdEFycmF5LnB1c2goZm9yZWNhc3RPYmopO1xuICAgIH1cblxuICAgIHRoaXMuZGFpbHlGb3JlY2FzdEFycmF5ID0gZGFpbHlGb3JlY2FzdEFycmF5O1xufVxuXG4vLyBSZXR1cm4gd2VhdGhlciBkYXRhIG9iamVjdCBmb3Igc3BlY2lmaWVkIGxvY2F0aW9uXG5mdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xuICAgIGZldGNoRGF0YShsb2NhdGlvbilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGEgPSBuZXcgRGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RGF0YSk7XG4gICAgICAgICAgICByZXR1cm4oY3VycmVudERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG5cbiAgICAgICAgICAgIGNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBmYXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBjZWxCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB1bml0VHlwZSA9ICdjZWwnO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZmFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGZhckJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIHVuaXRUeXBlID0gJ2Zhcic7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codW5pdFR5cGUpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkYWlseUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBob3VybHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBkYWlseUJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0VHlwZSA9ICdkYWlseSc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZm9yZWNhc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaG91cmx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRhaWx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaG91cmx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUeXBlID0gJ2hvdXJseSc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZm9yZWNhc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgfVxuICAgICk7XG59XG5cbi8vIFN0YXRlc1xuY29uc3Qgc3RhdGVzID0ge1xuICAgICdBbGFiYW1hJzogJ0FMJyxcbiAgICAnQWxhc2thJzogJ0FLJyxcbiAgICAnQW1lcmljYW4gU2Ftb2EnOiAnQVMnLFxuICAgICdBcml6b25hJzogJ0FaJyxcbiAgICAnQXJrYW5zYXMnOiAnQVInLFxuICAgICdDYWxpZm9ybmlhJzogJ0NBJyxcbiAgICAnQ29sb3JhZG8nOiAnQ08nLFxuICAgICdDb25uZWN0aWN1dCc6ICdDVCcsXG4gICAgJ0RlbGF3YXJlJzogJ0RFJyxcbiAgICAnRGlzdHJpY3QgT2YgQ29sdW1iaWEnOiAnREMnLFxuICAgICdGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWEnOiAnRk0nLFxuICAgICdGbG9yaWRhJzogJ0ZMJyxcbiAgICAnR2VvcmdpYSc6ICdHQScsXG4gICAgJ0d1YW0nOiAnR1UnLFxuICAgICdIYXdhaWknOiAnSEknLFxuICAgICdJZGFobyc6ICdJRCcsXG4gICAgJ0lsbGlub2lzJzogJ0lMJyxcbiAgICAnSW5kaWFuYSc6ICdJTicsXG4gICAgJ0lvd2EnOiAnSUEnLFxuICAgICdLYW5zYXMnOiAnS1MnLFxuICAgICdLZW50dWNreSc6ICdLWScsXG4gICAgJ0xvdWlzaWFuYSc6ICdMQScsXG4gICAgJ01haW5lJzogJ01FJyxcbiAgICAnTWFyc2hhbGwgSXNsYW5kcyc6ICdNSCcsXG4gICAgJ01hcnlsYW5kJzogJ01EJyxcbiAgICAnTWFzc2FjaHVzZXR0cyc6ICdNQScsXG4gICAgJ01pY2hpZ2FuJzogJ01JJyxcbiAgICAnTWlubmVzb3RhJzogJ01OJyxcbiAgICAnTWlzc2lzc2lwcGknOiAnTVMnLFxuICAgICdNaXNzb3VyaSc6ICdNTycsXG4gICAgJ01vbnRhbmEnOiAnTVQnLFxuICAgICdOZWJyYXNrYSc6ICdORScsXG4gICAgJ05ldmFkYSc6ICdOVicsXG4gICAgJ05ldyBIYW1wc2hpcmUnOiAnTkgnLFxuICAgICdOZXcgSmVyc2V5JzogJ05KJyxcbiAgICAnTmV3IE1leGljbyc6ICdOTScsXG4gICAgJ05ldyBZb3JrJzogJ05ZJyxcbiAgICAnTm9ydGggQ2Fyb2xpbmEnOiAnTkMnLFxuICAgICdOb3J0aCBEYWtvdGEnOiAnTkQnLFxuICAgICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnOiAnTVAnLFxuICAgICdPaGlvJzogJ09IJyxcbiAgICAnT2tsYWhvbWEnOiAnT0snLFxuICAgICdPcmVnb24nOiAnT1InLFxuICAgICdQYWxhdSc6ICdQVycsXG4gICAgJ1Blbm5zeWx2YW5pYSc6ICdQQScsXG4gICAgJ1B1ZXJ0byBSaWNvJzogJ1BSJyxcbiAgICAnUmhvZGUgSXNsYW5kJzogJ1JJJyxcbiAgICAnU291dGggQ2Fyb2xpbmEnOiAnU0MnLFxuICAgICdTb3V0aCBEYWtvdGEnOiAnU0QnLFxuICAgICdUZW5uZXNzZWUnOiAnVE4nLFxuICAgICdUZXhhcyc6ICdUWCcsXG4gICAgJ1V0YWgnOiAnVVQnLFxuICAgICdWZXJtb250JzogJ1ZUJyxcbiAgICAnVmlyZ2luIElzbGFuZHMnOiAnVkknLFxuICAgICdWaXJnaW5pYSc6ICdWQScsXG4gICAgJ1dhc2hpbmd0b24nOiAnV0EnLFxuICAgICdXZXN0IFZpcmdpbmlhJzogJ1dWJyxcbiAgICAnV2lzY29uc2luJzogJ1dJJyxcbiAgICAnV3lvbWluZyc6ICdXWSdcbn1cblxuLy8gR2V0IHN0YXRlIGFiYnJldmlhdGlvblxuZnVuY3Rpb24gZ2V0U3RhdGVBYmJyKHN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlc1tzdGF0ZV07XG59XG5cbi8vIERpc3BsYXkgZGF0YVxuZnVuY3Rpb24gZGlzcGxheURhdGEoZGF0YSkge1xuICAgIC8vIERpc3BsYXkgY3VycmVudCBmb3JlY2FzdCBkYXRhXG4gICAgaWYgKHVuaXRUeXBlID09ICdmYXInKSB7XG4gICAgICAgIHRlbXAgPSBkYXRhLnRlbXBfZjtcbiAgICAgICAgZmVlbHNMaWtlID0gZGF0YS5mZWVsc2xpa2VfZjtcbiAgICAgICAgbWF4dGVtcCA9IGRhdGEubWF4dGVtcF9mO1xuICAgICAgICBtaW50ZW1wID0gZGF0YS5taW50ZW1wX2Y7XG4gICAgICAgIHZpcyA9IGAke2RhdGEudmlzX21pbGVzICB9bWA7XG4gICAgICAgIHdpbmQgPSBgJHtkYXRhLndpbmRfbXBoICB9bXBoYDtcbiAgICB9IGVsc2UgaWYgKHVuaXRUeXBlID09ICdjZWwnKSB7XG4gICAgICAgIHRlbXAgPSBkYXRhLnRlbXBfYztcbiAgICAgICAgZmVlbHNMaWtlID0gZGF0YS5mZWVsc2xpa2VfYztcbiAgICAgICAgbWF4dGVtcCA9IGRhdGEubWF4dGVtcF9jO1xuICAgICAgICBtaW50ZW1wID0gZGF0YS5taW50ZW1wX2M7XG4gICAgICAgIHZpcyA9IGAke2RhdGEudmlzX2ttICB9a21gO1xuICAgICAgICB3aW5kID0gYCR7ZGF0YS53aW5kX2twaCAgfWtwaGA7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuY291bnRyeSA9PSAnVW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNhJyB8fCBkYXRhLmNvdW50cnkgPT0gJ1VTQScpIHtcbiAgICAgICAgc3RhdGVBYmJyID0gZ2V0U3RhdGVBYmJyKGRhdGEucmVnaW9uKTtcbiAgICAgICAgaWYgKHN0YXRlQWJiciA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sIFVuaXRlZCBTdGF0ZXNgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9jYXRpb24gPSBgJHtkYXRhLmxvY2F0aW9ufSwgJHtzdGF0ZUFiYnJ9LCBVbml0ZWQgU3RhdGVzYDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2F0aW9uID0gYCR7ZGF0YS5sb2NhdGlvbn0sICR7ZGF0YS5jb3VudHJ5fWA7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZShkYXRhLmxvY2FsVGltZSk7XG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGN1cnJlbnREYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ2xvbmcnLCB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnLCBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnLCBob3VyMTI6IHRydWUgfSk7XG5cbiAgICBpZiAoZGF0YS5zdW5yaXNlLnN0YXJ0c1dpdGgoMCkpIHtcbiAgICAgICAgc3VucmlzZSA9IGRhdGEuc3VucmlzZS5zbGljZSgxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdW5yaXNlID0gZGF0YS5zdW5yaXNlO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnN1bnNldC5zdGFydHNXaXRoKDApKSB7XG4gICAgICAgIHN1bnNldCA9IGRhdGEuc3Vuc2V0LnNsaWNlKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bnNldCA9IGRhdGEuc3Vuc2V0O1xuICAgIH1cblxuICAgIGxvY2F0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGxvY2F0aW9uO1xuICAgIGxvY2FsVGltZURpc3BsYXkudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWREYXRlO1xuICAgIGljb25EaXNwbGF5LnNyYyA9IGRhdGEuaWNvbjtcbiAgICB0ZW1wRGlzcGxheS50ZXh0Q29udGVudCA9IGAke3RlbXB9wrBgO1xuICAgIGNvbmRpdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBkYXRhLmNvbmRpdGlvbjtcbiAgICBmZWVsc0xpa2VEaXNwbGF5LnRleHRDb250ZW50ID0gYEZlZWxzIGxpa2UgJHtmZWVsc0xpa2V9wrBgO1xuICAgIGhpZ2hMb3dEaXNwbGF5LnRleHRDb250ZW50ID0gYEg6ICR7bWF4dGVtcH3CsCBMOiAke21pbnRlbXB9wrBgO1xuICAgIHJhaW5EaXNwbGF5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5yYWlufSVgO1xuICAgIGNsb3VkRGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2xvdWR9JWA7XG4gICAgdmlzaWJpbGl0eURpc3BsYXkudGV4dENvbnRlbnQgPSB2aXM7XG4gICAgd2luZERpc3BsYXkudGV4dENvbnRlbnQgPSB3aW5kO1xuICAgIGh1bWlkaXR5RGlzcGxheS50ZXh0Q29udGVudCA9IGAke2RhdGEuaHVtaWRpdHl9JWA7XG4gICAgdXZEaXNwbGF5LnRleHRDb250ZW50ID0gZGF0YS51djtcbiAgICBzdW5yaXNlRGlzcGxheS50ZXh0Q29udGVudCA9IHN1bnJpc2U7XG4gICAgc3Vuc2V0RGlzcGxheS50ZXh0Q29udGVudCA9IHN1bnNldDtcblxuICAgIC8vIERpc3BsYXkgZGFpbHkgZm9yZWNhc3QgZGF0YVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBjb25zdCBkYWlseURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBkYXlEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGhpZ2hUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBsb3dUZW1wRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBkYWlseUljb25EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGxldCBjdXJyZW50RGF5ID0gJyc7XG4gICAgICAgIGxldCBoaWdoVGVtcCA9ICcnO1xuICAgICAgICBsZXQgbG93VGVtcCA9ICcnO1xuXG4gICAgICAgIGRhaWx5RGl2LmNsYXNzTGlzdC5hZGQoJ2RhaWx5LWRpdicpO1xuXG4gICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnREYXkgPSAnVG9kYXknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudERheSA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmRheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bml0VHlwZSA9PSAnZmFyJykge1xuICAgICAgICAgICAgaGlnaFRlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5oaWdodGVtcF9mO1xuICAgICAgICAgICAgbG93VGVtcCA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmxvd3RlbXBfZjtcbiAgICAgICAgfSBlbHNlIGlmICh1bml0VHlwZSA9PSAnY2VsJykge1xuICAgICAgICAgICAgaGlnaFRlbXAgPSBkYXRhLmRhaWx5Rm9yZWNhc3RBcnJheVtpXS5oaWdodGVtcF9jO1xuICAgICAgICAgICAgbG93VGVtcCA9IGRhdGEuZGFpbHlGb3JlY2FzdEFycmF5W2ldLmxvd3RlbXBfYztcbiAgICAgICAgfVxuXG4gICAgICAgIGRheURpc3BsYXkudGV4dENvbnRlbnQgPSBjdXJyZW50RGF5O1xuICAgICAgICBoaWdoVGVtcERpc3BsYXkudGV4dENvbnRlbnQgPSBgSDogJHtoaWdoVGVtcH3CsGA7XG4gICAgICAgIGxvd1RlbXBEaXNwbGF5LnRleHRDb250ZW50ID0gYEw6ICR7bG93VGVtcH3CsGA7XG4gICAgICAgIGRhaWx5SWNvbkRpc3BsYXkuc3JjID0gZGF0YS5kYWlseUZvcmVjYXN0QXJyYXlbaV0uaWNvbjtcblxuICAgICAgICBkYWlseURpdi5hcHBlbmRDaGlsZChkYXlEaXNwbGF5KTtcbiAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRlbXBEaXNwbGF5KTtcbiAgICAgICAgZGFpbHlEaXYuYXBwZW5kQ2hpbGQobG93VGVtcERpc3BsYXkpO1xuICAgICAgICBkYWlseURpdi5hcHBlbmRDaGlsZChkYWlseUljb25EaXNwbGF5KTtcbiAgICAgICAgZGFpbHlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGFpbHlEaXYpO1xuICAgIH1cblxuICAgIC8vIERpc3BsYXkgaG91cmx5IGZvcmVjYXN0IGRhdGFcbn1cblxuLy8gSW5pdGlhbCBkaXNwbGF5XG5nZXRXZWF0aGVyRGF0YSgnc2VhdHRsZScpO1xuXG4vLyBTZWFyY2ggbmV3IGxvY2F0aW9uXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICghc2VhcmNoRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgc2VhcmNoRm9ybS5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaElucHV0LnZhbHVlKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4vLyBFVkVOVCBMSVNURU5FUlMgSUYgWU9VIFdBTlQgSVQgVE8gRkVUQ0ggREFUQSBFVkVSWSBUSU1FIFlPVSBUT0dHTEUgVU5JVFNcbi8vIGNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBmYXJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbi8vICAgICBjZWxCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbi8vICAgICB1bml0VHlwZSA9ICdjZWwnO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbi8vICAgICBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQpO1xuLy8gfSk7XG5cbi8vIGZhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBjZWxCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbi8vICAgICBmYXJCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbi8vICAgICB1bml0VHlwZSA9ICdmYXInO1xuLy8gICAgIGNvbnNvbGUubG9nKHVuaXRUeXBlKTtcbi8vICAgICBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbkRpc3BsYXkudGV4dENvbnRlbnQpO1xuLy8gfSk7XG5cblxuXG4vKiBcblRPIERPXG5cbmFkZCBob3VybHkgaW5mb1xuXG4gICAgZml4IFVJXG5cbmFkZCBkYWlseSBpbmZvXG5cbiAgICBmZXRjaCByZXF1aXJlZCBkYXRhXG5cbiAgICB0aWUgZGF0YSB0byBodG1sIGVsZW1lbnRzIG9yIGNyZWF0ZSBodG1sIGVsZW1lbnRzIHRvIGRpc3BsYXkgZGF0YVxuXG4gICAgZml4IFVJXG5cbmhhbmRsZSBlcnJvcnMgXG5cbiAgICBhZGQgZXJyb3IgbWVzc2FnZXMgd2hlbiBhbiBpbnZhbGlkIGxvY2F0aW9uIGlzIHNlYXJjaGVkXG5cbmFkZCBsb2FkaW5nIGljb25cblxubWF5YmUgYWRkIGxvY2FsIHN0b3JhZ2U/Pz8/XG5cbm1heWJlIGFkZCBhIHJlZnJlc2ggYnV0dG9uIG5leHQgdG8gdGltZT8/Pz9cblxuYWRkIGZvb3RlclxuICovIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9