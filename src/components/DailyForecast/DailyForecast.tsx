import React from 'react';
import { DailyForecastData } from '../../types/weatherTypes';
import './DailyForecast.scss';

interface DailyForecastProps {
  forecast: DailyForecastData[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="daily-forecast">
      <h2>Прогноз на 5 дней</h2>
      <div className="forecast-grid">
        {forecast.map((day) => (
          <div key={day.dt} className="forecast-card">
            <h3>{formatDate(day.dt)}</h3>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
              alt={day.weather[0].description}
              className="weather-icon"
            />
            <div className="temp-container">
              <span className="temp-day">{Math.round(day.temp.day)}°</span>
              <div className="temp-night-container">
                <span className="temp-night">{Math.round(day.temp.night)}°</span>
                <span className="temp-minmax">
                  {Math.round(day.temp.min)}°/{Math.round(day.temp.max)}°
                </span>
              </div>
            </div>
            <div className="weather-details">
              <p>Ветер: {day.wind_speed} м/с</p>
              <p>Влажность: {day.humidity}%</p>
              <p className="weather-desc">{day.weather[0].description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;