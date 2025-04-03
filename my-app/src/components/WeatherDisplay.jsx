// src/components/WeatherDisplay.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCurrentWeather } from '../services/weatherService';
import "../style/WeatherDisplay.css";

const WeatherDisplay = ({ city }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchCurrentWeather(city); // Fetch current weather data
                setWeather(data); // Update state with fetched data
            } catch (err) {
                setError(err.message); // Store error if something goes wrong
            }
        };

        getWeather(); // Call function to fetch weather on component mount
    }, [city]); // Re-fetch data whenever the city changes

    if (error) return <div>Error: {error}</div>;
    if (!weather) return <div>Loading...</div>;

    return (
        <div className="weather-card">
            <h2>🌍 Current Weather in {weather.name}</h2>  
            <p> 📅 Date & Time: {new Date(weather.dt * 1000).toLocaleString()}</p>
            <p>🌡️ Temperature: {weather.main.temp} °C</p>
            <p>⛅ Condition: {weather.weather[0].description}</p>
            <p>🍃  Wind Speed: {weather.wind.speed} m/s</p>
            <p>🧭 Wind Direction: {weather.wind.deg}°</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
        </div>
    );
};

WeatherDisplay.propTypes = {
    city: PropTypes.string.isRequired,
};

export default WeatherDisplay;
