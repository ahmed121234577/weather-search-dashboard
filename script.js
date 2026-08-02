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

fetchWeatherData("Cairo")
    .then(data => console.log("Success:", data))
    .catch(err => console.error("Error:", err.message));

const  weatherbox = document.getElementById("weather");
const loadingbox = document.getElementById("loading");
const errorbox = document.getElementById("error");
const errorMessage = document.getElementById("error-message");

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
    document.getElementById("city-name").textContent = data.cityName;
    document.getElementById("temperature").textContent = `${data.temperature} °C`;
    document.getElementById("wind-speed").textContent = `${data.windSpeed} m/s`;
    document.getElementById("weather-code").textContent = `Weather Code: ${data.weatherCode}`;
    weatherbox.style.display = "block";
}

function showError(message) {
    hideAllStates();
    errorMessage.textContent = message;
    errorbox.style.display = "block";
}

hideAllStates();

