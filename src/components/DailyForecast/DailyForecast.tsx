import React from 'react';
import { DailyForecast } from '../../types/weatherTypes';

interface DailyForecastProps {
  forecast: DailyForecast[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'short' });
  };

  return (
    <div className="daily-forecast">
      <h2>Прогноз на 7 дней</h2>
      <div className="forecast-container">
        {forecast.slice(0, 7).map((day) => {
          const weather = day.weather[0];
          const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

          return (
            <div key={day.dt} className="forecast-day">
              <div className="day-header">
                <h3>{formatDate(day.dt)}</h3>
                <img src={iconUrl} alt={weather.description} />
              </div>
              <div className="day-temperatures">
                <div className="temp-day">
                  <span>Днём: </span>
                  {Math.round(day.temp.day)}°C
                </div>
                <div className="temp-night">
                  <span>Ночью: </span>
                  {Math.round(day.temp.night)}°C
                </div>
              </div>
              <div className="day-wind">
                <span>Ветер: </span>
                {Math.round(day.wind_speed)} м/с
              </div>
              {day.summary && (
                <div className="day-summary">
                  <span>Общее: </span>
                  {day.summary}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;