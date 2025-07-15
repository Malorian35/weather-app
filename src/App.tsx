import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './api/weatherApi';
import Loader from './components/Loader/Loader';
import LocationSelector from './components/LocationSelector/LocationSelector';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import DailyForecast from './components/DailyForecast/DailyForecast';
import { WeatherApiResponse } from './types/weatherTypes';
import './App.scss';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (lat: number = 44.6167, lon: number = 33.5254) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeatherData(lat, lon);
      setWeatherData(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
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
      </header>
      
      <main>
        <LocationSelector onSelect={fetchWeather} />
        {loading && <Loader />}
        {error && <div className="error-message">{error}</div>}
        {weatherData && !loading && (
          <>
            <CurrentWeather data={{ ...weatherData.current, name: weatherData.current.name || 'Севастополь' }} />
            <DailyForecast forecast={weatherData.daily} />
          </>
        )}
      </main>
      
      <footer>
        <p>Данные предоставлены OpenWeatherMap</p>
      </footer>
    </div>
  );
};

export default App;