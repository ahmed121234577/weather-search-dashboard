const cityinput = document.getElementById("cityInput");
const searchbutton = document.getElementById("searchBtn");

const  weatherbox = document.getElementById("weather");
const loadingbox = document.getElementById("loading");
const errorbox = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");

function getWeatherCondition(code,temp) {
    const numericCode = Number(code);
    if (temp <= 0 && [0, 1, 2, 3].includes(numericCode)) {
        return { icon: "🥶", label: "Freezing Clear" };
    }

    if (numericCode === 0) {
        return { icon: "☀️", label: "Clear Sky" };
    } 
    if ([1, 2, 3].includes(numericCode)) {
        return { icon: "🌤️", label: "Partly Cloudy" };
    } 
    if ([45, 48].includes(numericCode)) {
        return { icon: "🌫️", label: "Foggy" };
    } 
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(numericCode)) {
        return { icon: "🌧️", label: "Rainy" };
    } 
    if ([71, 73, 75, 77, 85, 86].includes(numericCode)) {
        return { icon: "❄️", label: "Snowy" };
    } 
    if ([95, 96, 99].includes(numericCode)) {
        return { icon: "⛈️", label: "Thunderstorm" };
    }

    return { icon: "🌡️", label: "Unknown" };
}

function hideAllStates() {
    weatherbox.style.display = "none";
    loadingbox.style.display = "none";
    errorbox.style.display = "none";
}

function showLoading() {
    hideAllStates();
    loadingbox.style.display = "block";
}

function showWeather(data) {
    hideAllStates();
    
   const condition = getWeatherCondition(data.weatherCode, data.temperature);
    const iconElement = document.getElementById("weatherIcon") || document.querySelector(".weatherIcon");
    if (iconElement) {
        iconElement.textContent = condition.icon;
    }
    document.getElementById("cityName").textContent = data.cityName;
    document.getElementById("temperature").textContent = `${data.temperature} °C`;
    document.getElementById("windSpeed").textContent = `${data.windSpeed} m/s`;
    const conditionLabel = document.getElementById("conditionLabel");
    if (conditionLabel) {
        conditionLabel.textContent = condition.label;
    }
    if (weatherbox) weatherbox.style.display = "block";
}

function showError(message) {
    hideAllStates();
    errorMessage.textContent = message;
    errorbox.style.display = "block";
}


hideAllStates();

async function fetchWeatherData(cityName) {
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) {
            throw new Error("Failed to reach geocoding service");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude, name } = geoData.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const weatherData = await weatherResponse.json();

        return {
            cityName: name,
            temperature: weatherData.current_weather.temperature,
            windSpeed: weatherData.current_weather.windspeed,
            weatherCode: weatherData.current_weather.weathercode
        };
        
    } catch (error) {
        throw error;
    }
}

async function handleSearch(cityName) {
    const cleanedCityName = cityName.trim();
    if (!cleanedCityName)  {
        hideAllStates();
        return;
    }
        showLoading();
    try {
        const data = await fetchWeatherData(cleanedCityName);
        showWeather(data);
    } catch (error) {
        showError(error.message);
    }
}
 if (searchbutton) {
        searchbutton.addEventListener("click", () => {
            const cityName = cityinput.value;
            handleSearch(cityName);
        });
    }   

if (cityinput) {
    cityinput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSearch(cityinput.value);
        }
    });
}

hideAllStates();

