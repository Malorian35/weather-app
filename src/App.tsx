import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import LocationSelector from './components/LocationSelector/LocationSelector';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import DailyForecast from './components/DailyForecast/DailyForecast';
import { WeatherData } from './types/weatherTypes';
import './App.scss';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
        params: {
          lat,
          lon,
          exclude: 'minutely,hourly,alerts',
          units: 'metric',
          lang: 'ru',
          appid: 'ваш_api_ключ', // Замените на ваш ключ
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Не удалось загрузить данные о погоде. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  // По умолчанию загружаем погоду для Севастополя
  useEffect(() => {
    fetchWeather(44.6167, 33.5254);
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
            <CurrentWeather data={weatherData.current} />
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