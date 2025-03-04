// src/App.jsx
import { useState } from "react";
import "./App.css";

import WeatherDisplay from "./components/WeatherDisplay";
import WeatherDetails from "./components/WeatherDetails";
import { fetchWeatherByCity } from "./Services/searchService";
//import { CityService } from './Services/cityService';

//const cityService = new CityService([]); // Create an instance of CityService

const App = () => {
  const [city, setCity] = useState("Stockholm"); // Default city
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]); // List of favorite cities

  // Function to handle city search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const weatherData = await fetchWeatherByCity(searchTerm);
      setCity(weatherData.name);
      setSearchTerm("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to add the current city to favorites
  
  //creates a new array that includes all the elements from the existing favoriteCities array 
  // and adds the new city to the end. The spread syntax (...) is used to create a shallow copy of the array.

  const handleAddFavorite = () => {
    if (city && !favoriteCities.includes(city)) {
      setFavoriteCities([...favoriteCities, city]);
    }
  };

  // Function to remove the currently selected city from favorites
  const handleRemoveFavorite = () => {
    setFavoriteCities(favoriteCities.filter((favCity) => favCity !== city));
  };

  // Function to select a favorite city from the dropdown
  const handleFavoriteSelect = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Display error message if any */}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {/* Favorite Cities Section */}
      <button onClick={handleAddFavorite}>Add to Favorites</button>
      <h2>Favorite Cities </h2>

      {/* Dropdown to display favorite cities */}
      <select onChange={handleFavoriteSelect} value={city}>
        <option value="" disabled>
          Select a city
        </option>
        {favoriteCities.map((favCity, index) => (
          <option key={index} value={favCity}>
            {favCity}
          </option>
        ))}
      </select>

      {/* Button to remove the selected city from favorites */}
      <button
        onClick={handleRemoveFavorite}
        disabled={!favoriteCities.includes(city)} // Disable button if city is not in favorites
        style={{ marginLeft: "10px", color: "red" }}
      >
        Remove Selected City
      </button>

      {/* Display Weather Information */}
      <WeatherDisplay city={city} />
      <WeatherDetails city={city} />
    </div>
  );
};

export default App;
