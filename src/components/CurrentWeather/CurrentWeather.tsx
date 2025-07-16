import React from 'react';
import { CurrentWeatherData } from '../../types/weatherTypes';
import './CurrentWeather.scss';

interface CurrentWeatherProps {
  current: CurrentWeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current }) => {
  return (
    <div className="current-weather">
      <h2>Текущая погода в {current.name}</h2>
      <div className="weather-card">
        <img 
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} 
          alt={current.weather[0].description}
        />
        <div className="weather-info">
          <p>Температура: {Math.round(current.main.temp)}°C</p>
          <p>Ощущается как: {Math.round(current.main.feels_like)}°C</p>
          <p>Погода: {current.weather[0].description}</p>
          <p>Ветер: {current.wind.speed} м/с</p>
          <p>Влажность: {current.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;