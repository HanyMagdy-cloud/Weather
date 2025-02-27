import { useState } from 'react';
import { CityService } from './cityService';

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
const cityService = new CityService(cities);

const FavoriteCitySelector = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [favoriteCities, setFavoriteCities] = useState(cityService.getFavoriteCities());
    const [selectedCity, setSelectedCity] = useState('');

    const filteredCities = cityService.updateFavoriteList(searchTerm);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCitySelect = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleSaveCity = () => {
        if (selectedCity && !favoriteCities.includes(selectedCity)) {
            cityService.saveCity(selectedCity);
            setFavoriteCities(cityService.getFavoriteCities());
            setSearchTerm('');
            setSelectedCity('');
        } else {
            alert('Please select a city to save or it is already saved.');
        }
    };

    return (
        <div>
            <h1>Select Your Favorite City</h1>
            <input
                type="text"
                placeholder="Search for a city..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSaveCity}>Save City</button>
            
            <select value={selectedCity} onChange={handleCitySelect}>
                <option value="">-- Select a Favorite City --</option>
                {filteredCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>

            <h2>Saved Favorite Cities</h2>
            <ul>
                {favoriteCities.map(city => (
                    <li key={city}>{city}</li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteCitySelector;