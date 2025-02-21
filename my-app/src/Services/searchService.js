

// src/services/searchService.js
const API_KEY = '2bf7fe0f9cc27920750e7bc5dd4b9250'; // Make sure to replace this with your actual API key

export const fetchWeatherByCity = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return await response.json();
};