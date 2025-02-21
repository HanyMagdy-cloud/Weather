// src/App.jsx
import  { useState } from 'react';
import './App.css';

import WeatherDisplay from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import { fetchWeatherByCity } from './Services/searchService';

const App = () => {
    const [city, setCity] = useState('Stockholm'); // Default city
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null); // To handle errors

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const weatherData = await fetchWeatherByCity(searchTerm);
            setCity(weatherData.name); // Update city with the search term
            setSearchTerm(''); // Clear the search input
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message); // Set error message
        }
    };

    return (
        <div className="App">
            <h1>Weather App</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search for a city..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            <WeatherDisplay city={city} />
            <WeatherDetails city={city} />
        </div>
    );
};

export default App;