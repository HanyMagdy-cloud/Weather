// src/services/weatherService.js

const API_KEY = "2bf7fe0f9cc27920750e7bc5dd4b9250"; // My API key



export const fetchCurrentWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch current weather');
    }
    return await response.json();
};

// Function to fetch 5-day weather forecast
export const fetchWeatherForecast = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
    }
    return await response.json();
};