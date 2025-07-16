import React, { useState, useEffect } from 'react';
import { searchCities } from '../../api/geocodingApi';
import { City } from '../../types/weatherTypes';
import './LocationSelector.scss';

interface LocationSelectorProps {
  onSelect: (lat: number, lon: number) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(() => {
        fetchCities();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setCities([]);
    }
  }, [query]);

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const results = await searchCities(query);
      setCities(results);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSelect(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // По умолчанию Севастополь при ошибке геолокации
          onSelect(44.6167, 33.5254);
        }
      );
    } else {
      // По умолчанию Севастополь если нет поддержки геолокации
      onSelect(44.6167, 33.5254);
    }
  };

  return (
    <div className="location-selector">
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск города..."
        />
        {isLoading && <span className="spinner"></span>}
        <button onClick={handleGeolocation}>Мое местоположение</button>
      </div>
      
      {cities.length > 0 && (
        <ul className="suggestions">
          {cities.map((city) => (
            <li 
              key={`${city.lat}-${city.lon}`}
              onClick={() => {
                onSelect(city.lat, city.lon);
                setQuery(`${city.name}, ${city.country}`);
                setCities([]);
              }}
            >
              {city.name}, {city.country} {city.state && `, ${city.state}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelector;