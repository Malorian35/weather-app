import React, { useState, useEffect } from 'react';
import { searchCities } from '../../api/geocodingApi';
import { City } from '../../types/weatherTypes';

interface LocationSelectorProps {
  onSelect: (lat: number, lon: number) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [useGeolocation, setUseGeolocation] = useState(false);
  const [geolocationError, setGeolocationError] = useState('');

  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(() => {
        fetchCities();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const results = await searchCities(query);
      setCities(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setQuery(`${city.name}, ${city.country}${city.state ? `, ${city.state}` : ''}`);
    setShowSuggestions(false);
    onSelect(city.lat, city.lon);
  };

  const handleGeolocation = () => {
    setUseGeolocation(true);
    setGeolocationError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setGeolocationError('Не удалось получить ваше местоположение. Используем Севастополь по умолчанию.');
          // Координаты Севастополя по умолчанию
          onSelect(44.6167, 33.5254);
        }
      );
    } else {
      setGeolocationError('Геолокация не поддерживается вашим браузером. Используем Севастополь по умолчанию.');
      // Координаты Севастополя по умолчанию
      onSelect(44.6167, 33.5254);
    }
  };

  return (
    <div className="location-selector">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите город..."
          onFocus={() => setShowSuggestions(true)}
        />
        {isLoading && <div className="small-loader"></div>}
        <button onClick={handleGeolocation}>Использовать мое местоположение</button>
      </div>
      
      {geolocationError && <div className="error-message">{geolocationError}</div>}
      
      {showSuggestions && cities.length > 0 && (
        <ul className="suggestions">
          {cities.map((city) => (
            <li key={`${city.lat}-${city.lon}`} onClick={() => handleCitySelect(city)}>
              {city.name}, {city.country}{city.state ? `, ${city.state}` : ''}
            </li>
          ))}
        </ul>
      )}
      
      {selectedCity && (
        <div className="selected-city">
          Выбран: {selectedCity.name}, {selectedCity.country}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;