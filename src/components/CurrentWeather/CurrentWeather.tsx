import React from 'react';
import { CurrentWeather, Weather } from '../../types/weatherTypes';

interface CurrentWeatherProps {
  data: CurrentWeather;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const weather: Weather = data.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="current-weather">
      <h2>Текущая погода</h2>
      <div className="weather-info">
        <div className="weather-main">
          <img src={iconUrl} alt={weather.description} />
          <div className="temperature">{Math.round(data.temp)}°C</div>
        </div>
        <div className="weather-details">
          <div className="weather-description">{weather.description}</div>
          <div className="weather-wind">
            <span>Ветер: </span>
            {Math.round(data.wind_speed)} м/с
          </div>
          <div className="weather-humidity">
            <span>Влажность: </span>
            {data.humidity}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;