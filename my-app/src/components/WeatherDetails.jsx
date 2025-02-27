// src/components/WeatherDetails.jsx
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchWeatherForecast } from "../services/weatherService";
import "../style/WeatherDetails.css";

const WeatherDetails = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const data = await fetchWeatherForecast(city); // Fetch 5-day weather forecast
        setForecast(data.list); // Update state with forecast data
      } catch (err) {
        setError(err.message); // Handle errors
      }
    };

    getForecast(); // Call function to fetch forecast
  }, [city]); // Re-fetch forecast when city changes

  if (error) return <div>Error: {error}</div>;
  if (!forecast.length) return <div>Loading forecast...</div>;

  // Extract unique daily forecasts (one per day)
  const dailyForecast = [];
  forecast.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString(); //converts a timestamp from the API into a human-readable date
    const icon = item.weather[0].icon;
    const tempMin = item.main.temp_min;
    const tempMax = item.main.temp_max;
    const windSpeed = item.wind.speed;
    const windDirection = item.wind.deg;

    if (
      dailyForecast.length < 5 &&
      !dailyForecast.some((day) => day.date === date)
    ) {
      dailyForecast.push({
        date,
        tempMin,
        tempMax,
        icon,
        windSpeed,
        windDirection,
        
      });
    }
  });

  return (
    <div className="details-container">
      {dailyForecast.map((day, index) => (
        <div className="details-card" key={index}>
          <h3>📅 {day.date}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt="weather icon"
            className="weather-icon"
          />
          <ul>
            <li>🌡️ Min: {day.tempMin} °C</li>
            <li>🌞 Max: {day.tempMax} °C</li>
            <li>🍃 Wind Speed: {day.windSpeed} m/s</li>
            <li>🧭 Wind Direction: {day.windDirection}°</li>
            

          </ul>
        </div>
      ))}
    </div>
  );
};

WeatherDetails.propTypes = {
  city: PropTypes.string.isRequired,
};

export default WeatherDetails;
