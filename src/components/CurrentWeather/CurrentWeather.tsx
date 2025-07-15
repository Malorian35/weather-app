import React from 'react';
import { CurrentWeatherData, Weather } from '../../types/weatherTypes';
import './CurrentWeather.scss';

interface CurrentWeatherComponentProps {
  data: CurrentWeatherData;
}

const CurrentWeatherComponent: React.FC<CurrentWeatherComponentProps> = ({ data }) => {
  if (!data?.weather?.length) {
    return <div className="current-weather error">Нет данных о текущей погоде</div>;
  }

  const weather: Weather = data.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

  return (
    <div className="current-weather">
      <h2>Текущая погода {data.name && `в ${data.name}`}</h2>
      <div className="weather-info">
        <div className="weather-main">
          <img src={iconUrl} alt={weather.description} className="weather-icon" />
          <div className="temperature">{Math.round(data.temp)}°C</div>
        </div>
        <div className="weather-details">
          <div className="weather-description">
            {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
          </div>
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

export default CurrentWeatherComponent;