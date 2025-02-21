// src/components/WeatherDetails.jsx
import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchWeatherForecast } from '../services/weatherService';
import './WeatherDetails.css'; // Import the CSS

const WeatherDetails = ({ city }) => {
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getForecast = async () => {
            try {
                const data = await fetchWeatherForecast(city);
                setForecast(data.list);
            } catch (err) {
                setError(err.message);
            }
        };

        getForecast();
    }, [city]);

    if (error) return <div>Error: {error}</div>;
    if (!forecast.length) return <div>Loading forecast...</div>;

    const dailyForecast = [];
    forecast.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const icon = item.weather[0].icon; // OpenWeatherMap icon code
        const tempMin = item.main.temp_min;
        const tempMax = item.main.temp_max;

        if (dailyForecast.length < 5 && !dailyForecast.some(day => day.date === date)) {
            dailyForecast.push({
                date,
                tempMin,
                tempMax,
                icon,
            });
        }
    });

    return (
        <div className="details-container">
            {dailyForecast.map((day, index) => (
                <div className="details-card" key={index}>
                    <h3>{day.date}</h3>
                    <ul>
                        <li>Min: {day.tempMin} °C</li>
                        <li>Max: {day.tempMax} °C</li>
                    </ul>
                    <img 
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                        alt="weather icon" 
                        className="weather-icon" 
                    />
                </div>
            ))}
        </div>
    );
};

// Define PropTypes
WeatherDetails.propTypes = {
    city: PropTypes.string.isRequired,
};

export default WeatherDetails;