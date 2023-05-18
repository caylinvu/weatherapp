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