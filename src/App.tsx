import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './api/weatherApi';
import LocationSelector from './components/LocationSelector/LocationSelector';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import DailyForecast from './components/DailyForecast/DailyForecast';
import './App.css';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number = 44.6167, lon: number = 33.5254) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Прогноз погоды</h1>
        <LocationSelector onSelect={fetchWeather} />
      </header>
      
      <main>
        {loading && <div className="loader">Загрузка...</div>}
        {error && <div className="error">{error}</div>}
        
        {weatherData && !loading && (
          <>
            <CurrentWeather current={weatherData.current} />
            <DailyForecast forecast={weatherData.daily} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;