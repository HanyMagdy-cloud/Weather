// src/components/WeatherDisplay.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCurrentWeather } from '../services/weatherService';
import './WeatherDisplay.css'; // Import the CSS

const WeatherDisplay = ({ city }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchCurrentWeather(city);
                setWeather(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getWeather();
    }, [city]);

    if (error) return <div>Error: {error}</div>;
    if (!weather) return <div>Loading...</div>;

    return (
        <div className="weather-card">
            <h2>Current Weather in {weather.name}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Date & Time: {new Date(weather.dt * 1000).toLocaleString()}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
        </div>
    );
};

// Define PropTypes
WeatherDisplay.propTypes = {
    city: PropTypes.string.isRequired,
};

export default WeatherDisplay;